// Step 4 — usage documentation for the Button component set and all 120 variants.
//
// Paste into the Figma MCP `use_figma` tool. Idempotent: it overwrites the
// descriptions it owns and touches nothing else, so it can be re-run after an edit.
//
// Descriptions are composed from per-axis rules rather than written out 120 times.
// Hand-writing them would guarantee that Primary/Large/Destructive/Hover eventually
// contradicts Primary/Large/Destructive/Pressed. Composing them means a rule is
// stated once and every variant that inherits it says the same thing.
//
// Deliberately contains no code, prop names or framework references — this is
// guidance for someone placing a button in a design.

const page = figma.root.children.find(p => p.name === 'Button');
await figma.setCurrentPageAsync(page);
const set = await figma.getNodeByIdAsync('58:202');

// ---------------------------------------------------------------------------
// Component set
// ---------------------------------------------------------------------------

set.description = [
  'Cosmos Button — how a user commits to an action.',
  '',
  'WHEN TO USE A BUTTON',
  'Use a button when something happens: submitting, confirming, saving, paying,',
  'deleting, opening a sheet. If the element only moves the user somewhere else and',
  'changes nothing, use a link instead.',
  '',
  'CHOOSING A HIERARCHY',
  'Emphasis is a hierarchy, not a state. Choose by how important the action is on the',
  'screen, never by how the button looks.',
  '  Primary    The one action you want taken. One per screen, or one per card.',
  '             Two primaries compete and neither wins.',
  '  Secondary  A genuine alternative sitting beside the primary — Cancel next to',
  '             Save, Modify next to Confirm.',
  '  Tertiary   A supporting action inside a card or a dense list, where an outlined',
  '             button would add too much weight.',
  '  Text       The lightest action: See all, Read more, Change. Use it where a',
  '             filled or outlined shape would just be noise.',
  '',
  'CHOOSING A SIZE',
  '  Large   Full-width CTAs, sticky bottom bars, single-action sheets.',
  '  Medium  The default. Forms, dialogs, most in-page actions.',
  '  Small   Dense surfaces only — filter rows, table cells, compact cards.',
  'Never pick a size to make a button fit a space. Change the layout instead.',
  '',
  'INTENT',
  'Default covers almost everything. Destructive is only for actions that lose data or',
  'cannot be undone: delete an item, cancel a booking, remove a traveller. Destructive',
  'is not a way to show bad news or an error — it marks danger the user is about to',
  'cause.',
  '',
  'STATES',
  'Hover, Pressed and Focus exist so you can present an interaction in a spec or a',
  'study. Do not build screens out of them: place the Default state and let the',
  'prototype do the rest. Disabled is the only state worth placing deliberately.',
  '',
  'WIDTH',
  'The button hugs its label. For a full-width button, select the instance and set',
  'horizontal resizing to Fill container. Do not drag it wider and never set a fixed',
  'width — labels grow in other languages and a fixed width truncates them.',
  '',
  'LOADING',
  'Loading is a separate toggle rather than a state, because a button can be loading',
  'and hovered at the same time. Turn it on while the action is in flight and keep the',
  'original label; do not swap it for “Loading…”.',
  '',
  'DO',
  '  Write labels as a verb plus an object: Add traveller, Apply coupon, View fare.',
  '  Keep labels to one to three words.',
  '  Give exactly one action the most emphasis in any view.',
  '  Pair a destructive action with a plain, obvious way out.',
  '  Use Fill container for full-width instances.',
  '  Leave at least 4px clear around an instance so the focus ring is never clipped.',
  '',
  "DON’T",
  "  Don’t place two Primary buttons in the same view.",
  "  Don’t use a button for pure navigation — that is a link.",
  "  Don’t detach an instance to recolour it. A missing colour means a missing token;",
  '  raise it rather than painting over it.',
  "  Don’t override padding, radius or height. They come from tokens and they carry",
  '  the minimum touch target.',
  "  Don’t write labels in sentence case or end them with a full stop.",
  "  Don’t leave a submit button Disabled without telling the user what is missing.",
  "  Don’t sit a Text button directly beside a Primary — the weight gap reads as a",
  '  mistake rather than a hierarchy.',
  '',
  'ACCESSIBILITY',
  'Every size holds a minimum height from a token, so the touch target survives font',
  'scaling. Do not place anything smaller than Small on a touch surface. The focus ring',
  'is drawn outside the button so it never changes the layout — but it can be clipped',
  'by a tight parent frame, so give instances room.',
].join('\n');

// ---------------------------------------------------------------------------
// Per-axis rules
// ---------------------------------------------------------------------------

const PURPOSE = {
  Primary: {
    Default: 'The single most important action on the screen — the one thing you want the user to do.',
    Destructive: 'The button that actually carries out a destructive action. This is the confirm in a delete flow, not the trigger for it.',
  },
  Secondary: {
    Default: 'A real alternative standing beside the primary action, with equal standing but less pull.',
    Destructive: 'A destructive action that is available but is not where you are steering the user.',
  },
  Tertiary: {
    Default: 'A supporting action inside a card or a dense area, where an outline would carry too much weight.',
    Destructive: 'A low-emphasis destructive action inside a card or a list row.',
  },
  Text: {
    Default: 'The lightest action there is — no shape, just a label. See all, Read more, Change.',
    Destructive: 'The lightest destructive action, such as Remove on a single list row.',
  },
};

const SIZE_LINE = {
  Large: 'Large is for full-width CTAs, sticky bottom bars and single-action sheets. It carries the largest touch target of the three.',
  Medium: 'Medium is the default size, for forms, dialogs and most in-page actions.',
  Small: 'Small is for dense surfaces only — filter rows, table cells, compact cards.',
};

const SIZE_RULES = {
  Large: { do: ['Reach for Large when the button is the whole point of the screen.'], dont: ["Don’t use Large for a secondary action tucked inside a card."] },
  Medium: { do: ['Default to Medium unless the surface argues otherwise.'], dont: [] },
  Small: { do: ['Keep Small for genuinely dense layouts.'], dont: ["Don’t make Small the main call to action on a screen, and never put one on its own in a touch target."] },
};

const HIERARCHY_RULES = {
  Primary: {
    do: ['Keep it to one per screen or one per card.', 'Place it where the platform puts its confirming action.'],
    dont: ["Don’t sit two Primary buttons side by side — the hierarchy collapses.", "Don’t use Primary for a Cancel or a Back."],
  },
  Secondary: {
    do: ['Pair it with a Primary; a lone Secondary usually wants to be Primary.', 'Use it for the escape route: Cancel, Not now, Go back.'],
    dont: ["Don’t use Secondary as a quieter Primary. If it is the main action, make it Primary.", "Don’t stack more than two Secondary buttons in a row."],
  },
  Tertiary: {
    do: ['Use it inside cards, banners and list rows where an outline would fight the container.', 'Keep the filled surface subtle enough that the card still reads as one block.'],
    dont: ["Don’t use Tertiary as a screen’s main call to action.", "Don’t mix Tertiary and Secondary in the same group — pick one supporting level."],
  },
  Text: {
    do: ['Use it for the lightest, most repeatable actions.', 'Keep the label short enough to scan in a dense list.'],
    dont: ["Don’t use a Text button where a link belongs — a button does something, a link goes somewhere.", "Don’t place a Text button immediately beside a Primary; the weight gap reads as a mistake."],
  },
};

const INTENT_RULES = {
  Default: { do: [], dont: [] },
  Destructive: {
    do: ['Name the consequence in the label: Delete booking, not OK.', 'Always offer a plain, obvious way out beside it.'],
    dont: ["Don’t use Destructive to signal an error or bad news — it marks danger the user is about to cause.", "Don’t make a destructive action the default focus of a dialog."],
  },
};

const STATE = {
  Default: {
    line: 'This is the resting state, and the only state you should place by hand in a design.',
    do: ['Use this variant when laying out a screen.'],
    dont: [],
  },
  Hover: {
    line: 'Design-only. The pointer is over the button. Use it in a spec sheet or an interaction study, never as the resting state of a screen.',
    do: ['Use it to document what a pointer does.'],
    dont: ["Don’t place Hover in a screen mock — reviewers will read it as the normal appearance.", "Don’t rely on Hover on touch surfaces, where there is no pointer to hover with."],
  },
  Pressed: {
    line: 'Design-only. The moment of the tap or click. It exists to document the interaction, not to appear in a layout.',
    do: ['Use it when showing the full interaction sequence.'],
    dont: ["Don’t place Pressed in a screen mock.", "Don’t use Pressed to show a selected or active item — that is a different component."],
  },
  Focus: {
    line: 'Design-only. Keyboard focus. Show it when documenting keyboard navigation or accessibility behaviour.',
    do: ['Use it in accessibility and keyboard-flow documentation.', 'Leave at least 4px clear around the instance so the ring is not clipped.'],
    dont: ["Don’t place Focus in a screen mock.", "Don’t remove or recolour the ring — it is the only cue a keyboard user gets."],
  },
  Disabled: {
    line: 'The action is not available yet. This is the one state worth placing deliberately in a design.',
    do: ['Say somewhere nearby what the user has to do to enable it.', 'Prefer showing an error after an attempt over disabling the button up front.'],
    dont: ["Don’t disable a button as the only feedback — a dead button with no explanation is a dead end.", "Don’t use Disabled to mean loading; turn on the Loading toggle instead."],
  },
};

// ---------------------------------------------------------------------------
// Compose and apply
// ---------------------------------------------------------------------------

const bullets = (lines) => lines.map(l => '  · ' + l);
const dedupe = (lines) => lines.filter((l, i) => lines.indexOf(l) === i);

function describe(hierarchy, state, size, intent) {
  const dos = dedupe([
    ...STATE[state].do,
    ...HIERARCHY_RULES[hierarchy].do,
    ...INTENT_RULES[intent].do,
    ...SIZE_RULES[size].do,
  ]);
  const donts = dedupe([
    ...STATE[state].dont,
    ...HIERARCHY_RULES[hierarchy].dont,
    ...INTENT_RULES[intent].dont,
    ...SIZE_RULES[size].dont,
  ]);

  const out = [
    hierarchy + ' · ' + intent + ' intent · ' + size + ' · ' + state,
    '',
    PURPOSE[hierarchy][intent],
    SIZE_LINE[size],
    '',
    'WHEN TO USE',
    '  ' + STATE[state].line,
    '',
    'DO',
    ...bullets(dos),
  ];
  if (donts.length) out.push('', "DON’T", ...bullets(donts));
  return out.join('\n');
}

let applied = 0;
const lengths = [];
for (const variant of set.children) {
  const props = Object.fromEntries(variant.name.split(', ').map(p => p.split('=')));
  variant.description = describe(props.Hierarchy, props.State, props.Size, props.Intent);
  lengths.push(variant.description.length);
  applied++;
}

return {
  setDescriptionLength: set.description.length,
  variantsDescribed: applied,
  shortestVariantDescription: Math.min(...lengths),
  longestVariantDescription: Math.max(...lengths),
  sample: set.children.find(c => c.name === 'Hierarchy=Primary, State=Disabled, Size=Large, Intent=Destructive').description,
};
