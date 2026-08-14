// Step 2 — component collection + the button colour matrix (aliases semantic).

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
const ROWS = [["button/bg-primary-default","color/bg-fill-brand","F","C","semantic","component"],["button/bg-primary-hover","color/bg-fill-brand-hover","F","C","semantic","component"],["button/bg-primary-pressed","color/bg-fill-brand-pressed","F","C","semantic","component"],["button/bg-primary-disabled","color/bg-fill-disabled","F","C","semantic","component"],["button/label-primary-default","color/text-brand-on-bg-fill","T","C","semantic","component"],["button/label-primary-disabled","color/text-disabled","T","C","semantic","component"],["button/border-primary-default","color/transparent","S","C","semantic","component"],["button/border-primary-hover","color/transparent","S","C","semantic","component"],["button/border-primary-pressed","color/transparent","S","C","semantic","component"],["button/border-primary-disabled","color/transparent","S","C","semantic","component"],["button/bg-secondary-default","color/transparent","F","C","semantic","component"],["button/bg-secondary-hover","color/bg-surface-brand-hover","F","C","semantic","component"],["button/bg-secondary-pressed","color/bg-surface-brand-pressed","F","C","semantic","component"],["button/bg-secondary-disabled","color/transparent","F","C","semantic","component"],["button/label-secondary-default","color/text-brand","T","C","semantic","component"],["button/label-secondary-disabled","color/text-disabled","T","C","semantic","component"],["button/border-secondary-default","color/border-brand","S","C","semantic","component"],["button/border-secondary-hover","color/border-brand-hover","S","C","semantic","component"],["button/border-secondary-pressed","color/border-brand-pressed","S","C","semantic","component"],["button/border-secondary-disabled","color/border-disabled","S","C","semantic","component"],["button/bg-tertiary-default","color/bg-surface-brand","F","C","semantic","component"],["button/bg-tertiary-hover","color/bg-surface-brand-hover","F","C","semantic","component"],["button/bg-tertiary-pressed","color/bg-surface-brand-pressed","F","C","semantic","component"],["button/bg-tertiary-disabled","color/bg-surface-disabled","F","C","semantic","component"],["button/label-tertiary-default","color/text-brand","T","C","semantic","component"],["button/label-tertiary-disabled","color/text-disabled","T","C","semantic","component"],["button/border-tertiary-default","color/transparent","S","C","semantic","component"],["button/border-tertiary-hover","color/transparent","S","C","semantic","component"],["button/border-tertiary-pressed","color/transparent","S","C","semantic","component"],["button/border-tertiary-disabled","color/transparent","S","C","semantic","component"],["button/bg-text-default","color/transparent","F","C","semantic","component"],["button/bg-text-hover","color/bg-surface-brand","F","C","semantic","component"],["button/bg-text-pressed","color/bg-surface-brand-hover","F","C","semantic","component"],["button/bg-text-disabled","color/transparent","F","C","semantic","component"],["button/label-text-default","color/text-brand","T","C","semantic","component"],["button/label-text-disabled","color/text-disabled","T","C","semantic","component"],["button/border-text-default","color/transparent","S","C","semantic","component"],["button/border-text-hover","color/transparent","S","C","semantic","component"],["button/border-text-pressed","color/transparent","S","C","semantic","component"],["button/border-text-disabled","color/transparent","S","C","semantic","component"],["button/bg-primary-destructive-default","color/bg-fill-warning-strong","F","C","semantic","component"],["button/bg-primary-destructive-hover","color/bg-fill-warning-strong-hover","F","C","semantic","component"],["button/bg-primary-destructive-pressed","color/bg-fill-warning-strong-pressed","F","C","semantic","component"],["button/bg-primary-destructive-disabled","color/bg-fill-disabled","F","C","semantic","component"],["button/label-primary-destructive-default","color/text-warning-on-bg-fill-strong","T","C","semantic","component"],["button/label-primary-destructive-disabled","color/text-disabled","T","C","semantic","component"],["button/border-primary-destructive-default","color/transparent","S","C","semantic","component"],["button/border-primary-destructive-hover","color/transparent","S","C","semantic","component"],["button/border-primary-destructive-pressed","color/transparent","S","C","semantic","component"],["button/border-primary-destructive-disabled","color/transparent","S","C","semantic","component"],["button/bg-secondary-destructive-default","color/transparent","F","C","semantic","component"],["button/bg-secondary-destructive-hover","color/bg-surface-warning-hover","F","C","semantic","component"],["button/bg-secondary-destructive-pressed","color/bg-surface-warning-pressed","F","C","semantic","component"],["button/bg-secondary-destructive-disabled","color/transparent","F","C","semantic","component"],["button/label-secondary-destructive-default","color/text-warning","T","C","semantic","component"],["button/label-secondary-destructive-disabled","color/text-disabled","T","C","semantic","component"],["button/border-secondary-destructive-default","color/border-warning-strong","S","C","semantic","component"],["button/border-secondary-destructive-hover","color/border-warning-strong-hover","S","C","semantic","component"],["button/border-secondary-destructive-pressed","color/border-warning-strong-pressed","S","C","semantic","component"],["button/border-secondary-destructive-disabled","color/border-disabled","S","C","semantic","component"],["button/bg-tertiary-destructive-default","color/bg-surface-warning","F","C","semantic","component"],["button/bg-tertiary-destructive-hover","color/bg-surface-warning-hover","F","C","semantic","component"],["button/bg-tertiary-destructive-pressed","color/bg-surface-warning-pressed","F","C","semantic","component"],["button/bg-tertiary-destructive-disabled","color/bg-surface-disabled","F","C","semantic","component"],["button/label-tertiary-destructive-default","color/text-warning","T","C","semantic","component"],["button/label-tertiary-destructive-disabled","color/text-disabled","T","C","semantic","component"],["button/border-tertiary-destructive-default","color/transparent","S","C","semantic","component"],["button/border-tertiary-destructive-hover","color/transparent","S","C","semantic","component"],["button/border-tertiary-destructive-pressed","color/transparent","S","C","semantic","component"],["button/border-tertiary-destructive-disabled","color/transparent","S","C","semantic","component"],["button/bg-text-destructive-default","color/transparent","F","C","semantic","component"],["button/bg-text-destructive-hover","color/bg-surface-warning","F","C","semantic","component"],["button/bg-text-destructive-pressed","color/bg-surface-warning-hover","F","C","semantic","component"],["button/bg-text-destructive-disabled","color/transparent","F","C","semantic","component"],["button/label-text-destructive-default","color/text-warning","T","C","semantic","component"],["button/label-text-destructive-disabled","color/text-disabled","T","C","semantic","component"],["button/border-text-destructive-default","color/transparent","S","C","semantic","component"],["button/border-text-destructive-hover","color/transparent","S","C","semantic","component"],["button/border-text-destructive-pressed","color/transparent","S","C","semantic","component"],["button/border-text-destructive-disabled","color/transparent","S","C","semantic","component"],["button/focus-ring","color/border-focus","S","C","semantic","component"]];

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
