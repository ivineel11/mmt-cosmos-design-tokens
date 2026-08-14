// Step 3 — button geometry: radius, min-height, padding, gap, icon size, focus ring.

// Look up or create a collection by name. Never creates a duplicate.
async function getCollection(name, create) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  const found = all.find(c => c.name === name);
  if (found) return found;
  if (!create) throw new Error('Missing collection: ' + name);
  return figma.variables.createVariableCollection(name);
}

// Create-or-update a single variable. Idempotent by (collection, name).
async function upsert(spec, collections, index) {
  const collection = collections[spec.collection];
  const existing = index[spec.collection + '::' + spec.name];
  const variable = existing || figma.variables.createVariable(spec.name, collection, spec.resolvedType);
  const modeId = collection.modes[0].modeId;

  if (spec.aliasOf) {
    const target = index[spec.aliasCollection + '::' + spec.aliasOf];
    if (!target) throw new Error('Alias target not found: ' + spec.aliasCollection + '/' + spec.aliasOf + ' (for ' + spec.name + ')');
    variable.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: target.id });
  } else {
    variable.setValueForMode(modeId, spec.value);
  }

  variable.scopes = spec.scopes;
  for (const platform of Object.keys(spec.codeSyntax)) {
    variable.setVariableCodeSyntax(platform, spec.codeSyntax[platform]);
  }
  index[spec.collection + '::' + spec.name] = variable;
  return { name: spec.name, id: variable.id, created: !existing };
}

// Index every local variable by 'collectionName::variableName' so aliases resolve
// by name rather than by an ID guessed from a previous run.
async function buildIndex(collections) {
  const byId = {};
  for (const key of Object.keys(collections)) byId[collections[key].id] = key;
  const index = {};
  for (const variable of await figma.variables.getLocalVariablesAsync()) {
    const collectionName = byId[variable.variableCollectionId];
    if (collectionName) index[collectionName + '::' + variable.name] = variable;
  }
  return index;
}

const SCOPES = {"F":["FRAME_FILL","SHAPE_FILL"],"T":["TEXT_FILL"],"S":["STROKE_COLOR"],"A":["FRAME_FILL","SHAPE_FILL","STROKE_COLOR"],"W":["WIDTH_HEIGHT"],"R":["CORNER_RADIUS"],"L":["STROKE_FLOAT"],"G":["GAP"],"N":[]};

// [name, aliasTargetName | rawValue, scopeKey, COLOR|FLOAT, aliasCollection, collection]
const ROWS = [["button/focus-ring-width","borderWidth/2","L","F","primitives","component"],["button/focus-ring-offset","space/3xs","G","F","semantic","component"],["button/border-width","borderWidth/1","L","F","primitives","component"],["button/radius","radius/md","R","F","semantic","component"],["button/min-height-lg","space/6xl","W","F","semantic","component"],["button/min-height-md","space/5xl","W","F","semantic","component"],["button/min-height-sm","space/3xl","W","F","semantic","component"],["button/padding-x-lg","space/lg","G","F","semantic","component"],["button/padding-x-md","space/md","G","F","semantic","component"],["button/padding-x-sm","space/sm","G","F","semantic","component"],["button/padding-y-lg","space/sm","G","F","semantic","component"],["button/padding-y-md","space/xs","G","F","semantic","component"],["button/padding-y-sm","space/2xs","G","F","semantic","component"],["button/gap-lg","space/xs","G","F","semantic","component"],["button/gap-md","space/xs","G","F","semantic","component"],["button/gap-sm","space/2xs","G","F","semantic","component"],["button/icon-size-lg","icon/sm","W","F","semantic","component"],["button/icon-size-md","icon/sm","W","F","semantic","component"],["button/icon-size-sm","icon/xs","W","F","semantic","component"]];

const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\//g, '-').toLowerCase();
const camel = (n) => n.split(/[/-]/).filter(Boolean).map((p, i) => i ? p[0].toUpperCase() + p.slice(1) : p).join('');

const SPECS = ROWS.map(([name, target, scopeKey, type, aliasCollection, collection]) => ({
  name,
  collection,
  resolvedType: type === 'C' ? 'COLOR' : 'FLOAT',
  aliasOf: aliasCollection ? target : null,
  aliasCollection,
  value: aliasCollection ? null : target,
  scopes: SCOPES[scopeKey],
  codeSyntax: {
    WEB: 'var(--' + kebab(name) + ')',
    ANDROID: 'CosmosTokens.' + camel(name),
    iOS: 'CosmosTokens.' + camel(name),
  },
}));

const collections = {};
collections["component"] = await getCollection("component", true);
collections["primitives"] = await getCollection("primitives", false);
collections["semantic"] = await getCollection("semantic", false);

const index = await buildIndex(collections);

const results = [];
for (const spec of SPECS) results.push(await upsert(spec, collections, index));

return {
  collectionIds: Object.keys(collections).reduce((acc, k) => (acc[k] = collections[k].id, acc), {}),
  total: results.length,
  created: results.filter(r => r.created).length,
  updated: results.filter(r => !r.created).length,
  variableIds: results.reduce((acc, r) => (acc[r.name] = r.id, acc), {}),
};
