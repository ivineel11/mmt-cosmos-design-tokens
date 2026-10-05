
// Do not edit directly, this file was auto-generated.

package com.makemytrip.cosmos.tokens

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * The tokens that change with the brand. Every other token is the same in every brand and
 * stays on [CosmosTokens]. Read these from [LocalCosmosBrand], so one line switches a whole
 * screen:
 *
 *     CompositionLocalProvider(LocalCosmosBrand provides CosmosBrand.MyBiz) { MyBizFlow() }
 *
 *     Box(Modifier.background(LocalCosmosBrand.current.colorBgFillBrand))
 */
@Immutable
data class CosmosBrand(
  val id: String,
  val name: String,
  /** Brand-tinted container — tertiary button default, selected list rows, brand callouts. This is a background behind content; for a solid brand element such as a primary button use bg-fill-brand. */
  val colorBgSurfaceBrand: Color,
  /** Hover state for bg-surface-brand, and the hover background for brand controls that are transparent at rest (secondary and text buttons). */
  val colorBgSurfaceBrandHover: Color,
  /** Light pressed step for a brand-tinted surface, the same tint as bg-surface-brand-hover, for presses that should barely deepen. Pair the label with text-brand-on-bg-surface-hover. For the standard pressed state use bg-surface-brand-pressed-strong. */
  val colorBgSurfaceBrandPressedSubtle: Color,
  /** Pressed state for bg-surface-brand and for brand controls that are transparent at rest — secondary and tertiary button presses, the selected chip. Pair the label with text-brand-on-bg-surface-pressed. For a lighter press use bg-surface-brand-pressed-subtle. */
  val colorBgSurfaceBrandPressedStrong: Color,
  /** Brand tint for a control on an inverted or dark background, always laid at an opacity token (the inverse tertiary fill and the inverse hover and pressed layers of Button). Never used solid; on light backgrounds use bg-surface-brand. */
  val colorBgSurfaceBrandInverse: Color,
  /** Solid brand fill for the highest-emphasis action — primary button default. Pair the label with text-brand-on-bg-fill. For a tinted brand background use bg-surface-brand. */
  val colorBgFillBrand: Color,
  /** Hover state for bg-fill-brand — primary button hover. */
  val colorBgFillBrandHover: Color,
  /** Pressed/active state for bg-fill-brand — primary button pressed. */
  val colorBgFillBrandPressed: Color,
  /** Brand-coloured label on a neutral or brand-tinted background — secondary, tertiary and text button labels, selected tab labels. On a solid brand fill use text-brand-on-bg-fill. */
  val colorTextBrand: Color,
  /** Hover state for text-brand. */
  val colorTextBrandHover: Color,
  /** Pressed/active state for text-brand. */
  val colorTextBrandPressed: Color,
  /** Brand label colour on a tinted brand surface while hovered — the secondary, tertiary and text button labels. Darker than text-brand so the label keeps AA as the surface deepens beneath it. For a label on a solid brand fill use text-brand-on-bg-fill; for brand foreground marks such as the Radio dot use text-brand-hover, which tracks border-brand-hover instead. */
  val colorTextBrandOnBgSurfaceHover: Color,
  /** Brand label colour on a tinted brand surface while pressed. One step darker than text-brand-on-bg-surface-hover, matching the deeper surface underneath. */
  val colorTextBrandOnBgSurfacePressed: Color,
  /** Brand text on an inverted or dark background, such as the label of a secondary, tertiary or text button on a dark banner. Lighter than text-brand so it holds AA on near black and navy; on light backgrounds use text-brand. For inline links use text-link-inverse. */
  val colorTextBrandInverse: Color,
  /** Brand text on an inverted or dark background while its control is hovered. One step lighter than text-brand-inverse, the mirror of light, where hover darkens. */
  val colorTextBrandInverseHover: Color,
  /** Brand text on an inverted or dark background while its control is pressed. Two steps lighter than text-brand-inverse so the press reads against the deeper tint. */
  val colorTextBrandInversePressed: Color,
  /** Brand border on an unfilled control — secondary button default, selected card outline. */
  val colorBorderBrand: Color,
  /** Hover state for border-brand. */
  val colorBorderBrandHover: Color,
  /** Pressed/active state for border-brand. */
  val colorBorderBrandPressed: Color,
  /** Brand outline on an inverted or dark background, such as an inverse secondary button or the inverse focus ring. One step deeper than text-brand-inverse so the edge reads crisp; on light backgrounds use border-brand. */
  val colorBorderBrandInverse: Color,
  /** Brand outline on an inverted or dark background while its control is hovered. One step lighter than border-brand-inverse. */
  val colorBorderBrandInverseHover: Color,
  /** Brand outline on an inverted or dark background while its control is pressed. Two steps lighter than border-brand-inverse. */
  val colorBorderBrandInversePressed: Color,
  /** Brand-coloured icon on a neutral or brand-tinted background. On a solid brand fill use icon-brand-on-bg-fill. */
  val colorIconBrand: Color,
  /** Hovered brand icon on a neutral background, tracking text-brand-hover and border-brand-hover. On a tinted brand surface keep the icon in step with the label instead. */
  val colorIconBrandHover: Color,
  /** Pressed brand icon on a neutral background, tracking text-brand-pressed and border-brand-pressed. */
  val colorIconBrandPressed: Color,
  /** Brand icon on a tinted brand surface while hovered — the icons in secondary, tertiary and text buttons. Tracks text-brand-on-bg-surface-hover so icon and label stay one colour as the surface deepens. For a hovered brand icon on a neutral background use icon-brand-hover. */
  val colorIconBrandOnBgSurfaceHover: Color,
  /** Brand icon on a tinted brand surface while pressed — the icons in secondary, tertiary and text buttons. Tracks text-brand-on-bg-surface-pressed so icon and label stay one colour as the surface deepens. For a pressed brand icon on a neutral background use icon-brand-pressed. */
  val colorIconBrandOnBgSurfacePressed: Color,
  /** Brand icon on an inverted or dark background, such as the glyph of an inverse secondary, tertiary or text button. One step deeper than text-brand-inverse, like the other inverse icons; for an info status icon use icon-info-inverse. */
  val colorIconBrandInverse: Color,
  /** Brand icon on an inverted or dark background while its control is hovered. One step lighter than icon-brand-inverse. */
  val colorIconBrandInverseHover: Color,
  /** Brand icon on an inverted or dark background while its control is pressed. Two steps lighter than icon-brand-inverse. */
  val colorIconBrandInversePressed: Color,
  /** Background of the primary (solid fill) button — default intent, at rest. */
  val buttonBgPrimaryDefault: Color,
  /** Background of the primary (solid fill) button — default intent, on hover. */
  val buttonBgPrimaryHover: Color,
  /** Background of the primary (solid fill) button — default intent, while pressed. */
  val buttonBgPrimaryPressed: Color,
  /** Background of the primary (solid fill) button on an inverted or dark surface, default intent, at rest. The same fill as the light button; use button/bg-primary-default on light surfaces. */
  val buttonBgPrimaryInverseDefault: Color,
  /** Background of the primary (solid fill) button on an inverted or dark surface, default intent, on hover. The same fill as the light button; use button/bg-primary-hover on light surfaces. */
  val buttonBgPrimaryInverseHover: Color,
  /** Background of the primary (solid fill) button on an inverted or dark surface, default intent, while pressed. The same fill as the light button; use button/bg-primary-pressed on light surfaces. */
  val buttonBgPrimaryInversePressed: Color,
  /** Background of the secondary (outlined) button — default intent, on hover. */
  val buttonBgSecondaryHover: Color,
  /** Background of the secondary (outlined) button — default intent, while pressed. */
  val buttonBgSecondaryPressed: Color,
  /** Background of the secondary (outlined) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-secondary-inverse-hover so it works on near black, navy and photos under a scrim. */
  val buttonBgSecondaryInverseHover: Color,
  /** Background of the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-secondary-inverse-pressed so it works on near black, navy and photos under a scrim. */
  val buttonBgSecondaryInversePressed: Color,
  /** Background of the tertiary (tinted) button — default intent, at rest. */
  val buttonBgTertiaryDefault: Color,
  /** Background of the tertiary (tinted) button — default intent, on hover. */
  val buttonBgTertiaryHover: Color,
  /** Background of the tertiary (tinted) button — default intent, while pressed. */
  val buttonBgTertiaryPressed: Color,
  /** Background of the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. A translucent tint: render it at button/bg-opacity-tertiary-inverse-default so it works on near black, navy and photos under a scrim. */
  val buttonBgTertiaryInverseDefault: Color,
  /** Background of the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-tertiary-inverse-hover so it works on near black, navy and photos under a scrim. */
  val buttonBgTertiaryInverseHover: Color,
  /** Background of the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-tertiary-inverse-pressed so it works on near black, navy and photos under a scrim. */
  val buttonBgTertiaryInversePressed: Color,
  /** Background of the text (no fill or outline) button — default intent, on hover. */
  val buttonBgTextHover: Color,
  /** Background of the text (no fill or outline) button — default intent, while pressed. */
  val buttonBgTextPressed: Color,
  /** Background of the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-text-inverse-hover so it works on near black, navy and photos under a scrim. */
  val buttonBgTextInverseHover: Color,
  /** Background of the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-text-inverse-pressed so it works on near black, navy and photos under a scrim. */
  val buttonBgTextInversePressed: Color,
  /** Outline of the secondary (outlined) button — default intent, at rest. */
  val buttonBorderSecondaryDefault: Color,
  /** Outline of the secondary (outlined) button — default intent, on hover. */
  val buttonBorderSecondaryHover: Color,
  /** Outline of the secondary (outlined) button — default intent, while pressed. */
  val buttonBorderSecondaryPressed: Color,
  /** Outline of the secondary (outlined) button on an inverted or dark surface, default intent, at rest. */
  val buttonBorderSecondaryInverseDefault: Color,
  /** Outline of the secondary (outlined) button on an inverted or dark surface, default intent, on hover. */
  val buttonBorderSecondaryInverseHover: Color,
  /** Outline of the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. */
  val buttonBorderSecondaryInversePressed: Color,
  /** Colour of the keyboard focus ring. The ring is a separate rectangle outside the auto-layout of the button, not a border — the border-* tokens are a different slot. */
  val buttonFocusRing: Color,
  /** Colour of the keyboard focus ring around a button on an inverted or dark surface. Lighter than button/focus-ring, which falls below 3:1 on navy; use it for every inverse hierarchy with the default intent. */
  val buttonFocusRingInverse: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent. The icons keep this colour on focus. Matches button/label-secondary-default at every state, so glyphs and text read as one colour. */
  val buttonIconSecondaryDefault: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent, on hover. Matches button/label-secondary-hover. */
  val buttonIconSecondaryHover: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent, while pressed. Matches button/label-secondary-pressed. */
  val buttonIconSecondaryPressed: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons. */
  val buttonIconSecondaryInverseDefault: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons. */
  val buttonIconSecondaryInverseHover: Color,
  /** Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons. */
  val buttonIconSecondaryInversePressed: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent. The icons keep this colour on focus. Matches button/label-tertiary-default at every state, so glyphs and text read as one colour. */
  val buttonIconTertiaryDefault: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent, on hover. Matches button/label-tertiary-hover. */
  val buttonIconTertiaryHover: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent, while pressed. Matches button/label-tertiary-pressed. */
  val buttonIconTertiaryPressed: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons. */
  val buttonIconTertiaryInverseDefault: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons. */
  val buttonIconTertiaryInverseHover: Color,
  /** Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons. */
  val buttonIconTertiaryInversePressed: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent. The icons keep this colour on focus. Matches button/label-text-default at every state, so glyphs and text read as one colour. */
  val buttonIconTextDefault: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent, on hover. Matches button/label-text-hover. */
  val buttonIconTextHover: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent, while pressed. Matches button/label-text-pressed. */
  val buttonIconTextPressed: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons. */
  val buttonIconTextInverseDefault: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons. */
  val buttonIconTextInverseHover: Color,
  /** Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons. */
  val buttonIconTextInversePressed: Color,
  /** Colour of the text label in the secondary (outlined) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelSecondaryDefault: Color,
  /** Colour of the text label in the secondary (outlined) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelSecondaryHover: Color,
  /** Colour of the text label in the secondary (outlined) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelSecondaryPressed: Color,
  /** Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelSecondaryInverseDefault: Color,
  /** Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelSecondaryInverseHover: Color,
  /** Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelSecondaryInversePressed: Color,
  /** Colour of the text label in the tertiary (tinted) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelTertiaryDefault: Color,
  /** Colour of the text label in the tertiary (tinted) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelTertiaryHover: Color,
  /** Colour of the text label in the tertiary (tinted) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelTertiaryPressed: Color,
  /** Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelTertiaryInverseDefault: Color,
  /** Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelTertiaryInverseHover: Color,
  /** Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelTertiaryInversePressed: Color,
  /** Colour of the text label in the text (no fill or outline) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelTextDefault: Color,
  /** Colour of the text label in the text (no fill or outline) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelTextHover: Color,
  /** Colour of the text label in the text (no fill or outline) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens. */
  val buttonLabelTextPressed: Color,
  /** Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens. */
  val buttonLabelTextInverseDefault: Color,
  /** Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelTextInverseHover: Color,
  /** Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken. */
  val buttonLabelTextInversePressed: Color,
  /** Fill of the checkbox box — unchecked, on hover. */
  val checkboxBgUnselectedHover: Color,
  /** Fill of the checkbox box — unchecked, while pressed. */
  val checkboxBgUnselectedPressed: Color,
  /** Fill of the checkbox box — checked, at rest. */
  val checkboxBgSelectedDefault: Color,
  /** Fill of the checkbox box — checked, on hover. */
  val checkboxBgSelectedHover: Color,
  /** Fill of the checkbox box — checked, while pressed. */
  val checkboxBgSelectedPressed: Color,
  /** Outline of the checkbox box — unchecked, on hover. */
  val checkboxBorderUnselectedHover: Color,
  /** Outline of the checkbox box — unchecked, while pressed. */
  val checkboxBorderUnselectedPressed: Color,
  /** Outline of the checkbox box — checked, at rest. */
  val checkboxBorderSelectedDefault: Color,
  /** Fill of the radio circle in both selected and unselected states — on hover. */
  val radioBgHover: Color,
  /** Fill of the radio circle in both selected and unselected states — while pressed. */
  val radioBgPressed: Color,
  /** Outline of the radio circle — unselected, on hover. */
  val radioBorderUnselectedHover: Color,
  /** Outline of the radio circle — unselected, while pressed. */
  val radioBorderUnselectedPressed: Color,
  /** Outline of the radio circle — selected, at rest. */
  val radioBorderSelectedDefault: Color,
  /** Outline of the radio circle — selected, on hover. */
  val radioBorderSelectedHover: Color,
  /** Outline of the radio circle — selected, while pressed. */
  val radioBorderSelectedPressed: Color,
  /** Colour of the selected dot inside the circle — selected, at rest. */
  val radioDotSelectedDefault: Color,
  /** Colour of the selected dot inside the circle — selected, on hover. */
  val radioDotSelectedHover: Color,
  /** Colour of the selected dot inside the circle — selected, while pressed. */
  val radioDotSelectedPressed: Color,
  /** Colour of the focus state layer while the radio is selected. */
  val radioStateLayerSelected: Color,
  /** Fill of the chip container — selected, at rest and on keyboard focus. A tint rather than a solid brand fill, so a row of selected chips stays calm; the label and border carry the brand colour. */
  val chipBgSelectedDefault: Color,
  /** Fill of the chip container — selected, on hover. */
  val chipBgSelectedHover: Color,
  /** Fill of the chip container — selected, while pressed. */
  val chipBgSelectedPressed: Color,
  /** Outline of the chip — selected, at rest and on keyboard focus. Painted only when the border is switched on. */
  val chipBorderSelectedDefault: Color,
  /** Outline of the chip — selected, on hover. Painted only when the border is switched on. */
  val chipBorderSelectedHover: Color,
  /** Outline of the chip — selected, while pressed. Painted only when the border is switched on. */
  val chipBorderSelectedPressed: Color,
  /** Colour of the chip label — selected, at rest and on keyboard focus. */
  val chipLabelSelectedDefault: Color,
  /** Colour of the chip label — selected, on hover. Darkens with the fill so it holds AA contrast on bg-selected-hover. */
  val chipLabelSelectedHover: Color,
  /** Colour of the chip label — selected, while pressed. Darkens with the fill so it holds AA contrast on bg-selected-pressed. */
  val chipLabelSelectedPressed: Color,
  /** Colour of the leading icon, trailing icon and remove glyph — selected, in every enabled state. Does not apply to the leading image. */
  val chipIconSelectedDefault: Color,
  /** Circle behind the remove glyph of a removable chip — selected, when the remove button itself is hovered. */
  val chipRemoveBgSelectedHover: Color,
  /** Circle behind the remove glyph of a removable chip — selected, while the remove button itself is pressed. */
  val chipRemoveBgSelectedPressed: Color,
  /** Action label on a tinted neutral snackbar, at rest and on keyboard focus. Brand coloured, since a neutral message has no intent colour to follow. */
  val snackbarLabelControlTintedNeutralDefault: Color,
  /** Action label on a tinted neutral snackbar, on hover. Brand coloured, since a neutral message has no intent colour to follow; darkens with the fill so it keeps AA contrast. */
  val snackbarLabelControlTintedNeutralHover: Color,
  /** Action label on a tinted neutral snackbar, while pressed. Brand coloured, since a neutral message has no intent colour to follow; darkens with the fill so it keeps AA contrast. */
  val snackbarLabelControlTintedNeutralPressed: Color,
  /** Solid fill of a strong brand badge, used for promotional tags such as New, Deal or MMT Exclusive. Count badges default to strong; for a calmer tag use bg-subtle-brand. */
  val badgeBgStrongBrand: Color,
  /** Tinted fill of a subtle brand badge, the calm option for status tags beside content. Not used for dots, which are strong only. */
  val badgeBgSubtleBrand: Color,
  /** Count or text colour on a subtle brand badge. Paired with bg-subtle-brand and holds AA contrast on it. */
  val badgeLabelSubtleBrand: Color,
  /** Fill of a brand dot badge, a count-free marker for new or unread content. The same colour as bg-strong-brand, kept separate so it is checked for 3 to 1 contrast against both page canvases. */
  val badgeDotBrand: Color,
  /** Label colour of the selected tab at rest and on keyboard focus. Pairs with the brand indicator. */
  val tabLabelSelectedDefault: Color,
  /** Label colour of the selected tab on hover. Stays text-brand, which holds AA on the hover grey. */
  val tabLabelSelectedHover: Color,
  /** Label colour of the selected tab while pressed. One step darker than text-brand, which falls below AA on the pressed grey. */
  val tabLabelSelectedPressed: Color,
  /** Colour of the icon on the selected Primary tab, at rest and on keyboard focus. Matches label-selected-default. */
  val tabIconSelectedDefault: Color,
  /** Colour of the icon on the selected Primary tab on hover. */
  val tabIconSelectedHover: Color,
  /** Colour of the icon on the selected Primary tab while pressed, darkening with the label on the pressed grey. */
  val tabIconSelectedPressed: Color,
  /** Colour of the underline under the selected tab in every enabled state. Only the selected tab draws it. */
  val tabIndicatorDefault: Color,
  /** Fill of the light blue circle behind a leading icon, for a row that should stand out from its neutral neighbours. Use sparingly, at most one kind per list. */
  val listLeadingContainerBgBrand: Color,
  /** Colour of the icon inside a brand leading circle. Pairs with leading-container-bg-brand. */
  val listLeadingContainerIconBrand: Color,
  /** Track of a switch that is on, at rest. Also used by the Outlined backup style. Use track-on-disabled when the switch is disabled. */
  val switchTrackOnDefault: Color,
  /** Track of a switch that is on, under the pointer. Web only. */
  val switchTrackOnHover: Color,
  /** Track of a switch that is on, while held. */
  val switchTrackOnPressed: Color,
  /** Check glyph inside the white thumb of a switch that is on, at rest and on focus. Tracks track-on-default so glyph and track read as one colour. */
  val switchIconOnDefault: Color,
  /** Check glyph of a switch that is on, under the pointer. Tracks track-on-hover. Web only. */
  val switchIconOnHover: Color,
  /** Check glyph of a switch that is on, while held. Tracks track-on-pressed. */
  val switchIconOnPressed: Color,
  /** Outlined backup style only, not for product use. Check glyph inside the white thumb of a switch that is on, in every enabled state. Use outlined-icon-disabled when the switch is disabled. */
  val switchOutlinedIconOn: Color,
  /** Neutral thumb style, under test against the Brand thumb. Brand label of the selected segment at rest and on keyboard focus. For the pressed thumb use neutral-label-selected-pressed, because this colour falls below AA on the pressed grey. For a disabled segment use label-disabled. */
  val segmentedControlNeutralLabelSelectedDefault: Color,
  /** Neutral thumb style, under test against the Brand thumb. Brand label of the selected segment while the thumb is held. One step darker than neutral-label-selected-default so it keeps AA on the pressed grey. */
  val segmentedControlNeutralLabelSelectedPressed: Color,
  /** Neutral thumb style, under test against the Brand thumb. Optional leading icon of the selected segment at rest and on keyboard focus. Matches neutral-label-selected-default. */
  val segmentedControlNeutralIconSelectedDefault: Color,
  /** Neutral thumb style, under test against the Brand thumb. Optional leading icon of the selected segment while the thumb is held. Matches neutral-label-selected-pressed. */
  val segmentedControlNeutralIconSelectedPressed: Color,
  /** Brand thumb style, under test against the Neutral thumb. Solid brand thumb under the selected segment at rest and on keyboard focus. Drawn without a shadow. */
  val segmentedControlBrandThumbDefault: Color,
  /** Brand thumb style, under test against the Neutral thumb. Solid brand thumb while it is held, before a tap lands or while it is dragged. */
  val segmentedControlBrandThumbPressed: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Brand-tinted thumb under the selected segment at rest and on keyboard focus. The tint barely separates from the track, so tinted-thumb-border-default draws its edge. */
  val segmentedControlTintedThumbDefault: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Brand-tinted thumb while it is held, before a tap lands or while it is dragged. */
  val segmentedControlTintedThumbPressed: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Outline of the tinted thumb at rest and on keyboard focus. Drawn inside the thumb so it does not change size, and it carries the selection against the track. */
  val segmentedControlTintedThumbBorderDefault: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Outline of the tinted thumb while it is held. */
  val segmentedControlTintedThumbBorderPressed: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Label on the tinted thumb at rest and on keyboard focus. For the pressed thumb use tinted-label-selected-pressed, because this colour falls below AA on the pressed tint. */
  val segmentedControlTintedLabelSelectedDefault: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Label on the tinted thumb while it is held. One step darker than tinted-label-selected-default so it keeps AA on the pressed tint. */
  val segmentedControlTintedLabelSelectedPressed: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Optional leading icon on the tinted thumb at rest and on keyboard focus. Matches tinted-label-selected-default. */
  val segmentedControlTintedIconSelectedDefault: Color,
  /** Tinted thumb style, under test against the Neutral and Brand thumbs. Optional leading icon on the tinted thumb while it is held. Matches tinted-label-selected-pressed. */
  val segmentedControlTintedIconSelectedPressed: Color,
  /** Part of the track between the start and the thumb, or between the two thumbs of a range. Stays the same while the thumb is hovered or held; the thumb and halo show the state. Use track-active-disabled when disabled. */
  val sliderTrackActive: Color,
  /** Soft circle behind a thumb under the pointer, drawn under the track. Web only. Use halo-pressed while the thumb is held. */
  val sliderHaloHover: Color,
  /** Soft circle behind a thumb while it is held or dragged, drawn under the track, so the touch point stays visible around a finger. Halo press only; the Grow press enlarges the thumb to thumb-size-pressed instead. Use halo-hover for the pointer. */
  val sliderHaloPressed: Color,
  /** Trailing check on the selected row of a single-select menu, such as Sort by. It is the only mark of selection, so the label stays label-default. */
  val menuCheckDefault: Color,
  /** Label of the primary text action, such as Next or Got it, on a Light Rich tooltip, at rest and on focus. Brand blue, so it reads as the main action beside the grey Skip. Use primary-label-light-hover and primary-label-light-pressed as the fill changes. */
  val tooltipPrimaryLabelLight: Color,
  /** Label of the primary text action on a Light Rich tooltip under the pointer. Darkens with the control-bg-light-hover fill so it keeps AA contrast. Web only. */
  val tooltipPrimaryLabelLightHover: Color,
  /** Label of the primary text action on a Light Rich tooltip while pressed. Darkens with the control-bg-light-pressed fill so it keeps AA contrast. */
  val tooltipPrimaryLabelLightPressed: Color,
) {
  companion object {
    val MakeMyTrip = CosmosBrand(
      id = "mmt",
      name = "MakeMyTrip",
      colorBgSurfaceBrand = Color(0xFFEDF8FF),
      colorBgSurfaceBrandHover = Color(0xFFD6EFFF),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFD6EFFF),
      colorBgSurfaceBrandPressedStrong = Color(0xFFC2E8FF),
      colorBgSurfaceBrandInverse = Color(0xFF48BBFF),
      colorBgFillBrand = Color(0xFF0067E8),
      colorBgFillBrandHover = Color(0xFF0857C5),
      colorBgFillBrandPressed = Color(0xFF0D4C9B),
      colorTextBrand = Color(0xFF0067E8),
      colorTextBrandHover = Color(0xFF0681FF),
      colorTextBrandPressed = Color(0xFF0857C5),
      colorTextBrandOnBgSurfaceHover = Color(0xFF0857C5),
      colorTextBrandOnBgSurfacePressed = Color(0xFF0D4C9B),
      colorTextBrandInverse = Color(0xFF83D4FF),
      colorTextBrandInverseHover = Color(0xFFC2E8FF),
      colorTextBrandInversePressed = Color(0xFFD6EFFF),
      colorBorderBrand = Color(0xFF0067E8),
      colorBorderBrandHover = Color(0xFF0681FF),
      colorBorderBrandPressed = Color(0xFF0857C5),
      colorBorderBrandInverse = Color(0xFF48BBFF),
      colorBorderBrandInverseHover = Color(0xFF83D4FF),
      colorBorderBrandInversePressed = Color(0xFFC2E8FF),
      colorIconBrand = Color(0xFF0067E8),
      colorIconBrandHover = Color(0xFF0681FF),
      colorIconBrandPressed = Color(0xFF0857C5),
      colorIconBrandOnBgSurfaceHover = Color(0xFF0857C5),
      colorIconBrandOnBgSurfacePressed = Color(0xFF0D4C9B),
      colorIconBrandInverse = Color(0xFF48BBFF),
      colorIconBrandInverseHover = Color(0xFF83D4FF),
      colorIconBrandInversePressed = Color(0xFFC2E8FF),
      buttonBgPrimaryDefault = Color(0xFF0067E8),
      buttonBgPrimaryHover = Color(0xFF0857C5),
      buttonBgPrimaryPressed = Color(0xFF0D4C9B),
      buttonBgPrimaryInverseDefault = Color(0xFF0067E8),
      buttonBgPrimaryInverseHover = Color(0xFF0857C5),
      buttonBgPrimaryInversePressed = Color(0xFF0D4C9B),
      buttonBgSecondaryHover = Color(0xFFD6EFFF),
      buttonBgSecondaryPressed = Color(0xFFC2E8FF),
      buttonBgSecondaryInverseHover = Color(0xFF48BBFF),
      buttonBgSecondaryInversePressed = Color(0xFF48BBFF),
      buttonBgTertiaryDefault = Color(0xFFEDF8FF),
      buttonBgTertiaryHover = Color(0xFFD6EFFF),
      buttonBgTertiaryPressed = Color(0xFFC2E8FF),
      buttonBgTertiaryInverseDefault = Color(0xFF48BBFF),
      buttonBgTertiaryInverseHover = Color(0xFF48BBFF),
      buttonBgTertiaryInversePressed = Color(0xFF48BBFF),
      buttonBgTextHover = Color(0xFFEDF8FF),
      buttonBgTextPressed = Color(0xFFD6EFFF),
      buttonBgTextInverseHover = Color(0xFF48BBFF),
      buttonBgTextInversePressed = Color(0xFF48BBFF),
      buttonBorderSecondaryDefault = Color(0xFF0067E8),
      buttonBorderSecondaryHover = Color(0xFF0681FF),
      buttonBorderSecondaryPressed = Color(0xFF0857C5),
      buttonBorderSecondaryInverseDefault = Color(0xFF48BBFF),
      buttonBorderSecondaryInverseHover = Color(0xFF83D4FF),
      buttonBorderSecondaryInversePressed = Color(0xFFC2E8FF),
      buttonFocusRing = Color(0xFF0067E8),
      buttonFocusRingInverse = Color(0xFF48BBFF),
      buttonIconSecondaryDefault = Color(0xFF0067E8),
      buttonIconSecondaryHover = Color(0xFF0857C5),
      buttonIconSecondaryPressed = Color(0xFF0D4C9B),
      buttonIconSecondaryInverseDefault = Color(0xFF48BBFF),
      buttonIconSecondaryInverseHover = Color(0xFF83D4FF),
      buttonIconSecondaryInversePressed = Color(0xFFC2E8FF),
      buttonIconTertiaryDefault = Color(0xFF0067E8),
      buttonIconTertiaryHover = Color(0xFF0857C5),
      buttonIconTertiaryPressed = Color(0xFF0D4C9B),
      buttonIconTertiaryInverseDefault = Color(0xFF48BBFF),
      buttonIconTertiaryInverseHover = Color(0xFF83D4FF),
      buttonIconTertiaryInversePressed = Color(0xFFC2E8FF),
      buttonIconTextDefault = Color(0xFF0067E8),
      buttonIconTextHover = Color(0xFF0857C5),
      buttonIconTextPressed = Color(0xFF0D4C9B),
      buttonIconTextInverseDefault = Color(0xFF48BBFF),
      buttonIconTextInverseHover = Color(0xFF83D4FF),
      buttonIconTextInversePressed = Color(0xFFC2E8FF),
      buttonLabelSecondaryDefault = Color(0xFF0067E8),
      buttonLabelSecondaryHover = Color(0xFF0857C5),
      buttonLabelSecondaryPressed = Color(0xFF0D4C9B),
      buttonLabelSecondaryInverseDefault = Color(0xFF83D4FF),
      buttonLabelSecondaryInverseHover = Color(0xFFC2E8FF),
      buttonLabelSecondaryInversePressed = Color(0xFFD6EFFF),
      buttonLabelTertiaryDefault = Color(0xFF0067E8),
      buttonLabelTertiaryHover = Color(0xFF0857C5),
      buttonLabelTertiaryPressed = Color(0xFF0D4C9B),
      buttonLabelTertiaryInverseDefault = Color(0xFF83D4FF),
      buttonLabelTertiaryInverseHover = Color(0xFFC2E8FF),
      buttonLabelTertiaryInversePressed = Color(0xFFD6EFFF),
      buttonLabelTextDefault = Color(0xFF0067E8),
      buttonLabelTextHover = Color(0xFF0857C5),
      buttonLabelTextPressed = Color(0xFF0D4C9B),
      buttonLabelTextInverseDefault = Color(0xFF83D4FF),
      buttonLabelTextInverseHover = Color(0xFFC2E8FF),
      buttonLabelTextInversePressed = Color(0xFFD6EFFF),
      checkboxBgUnselectedHover = Color(0xFFEDF8FF),
      checkboxBgUnselectedPressed = Color(0xFFD6EFFF),
      checkboxBgSelectedDefault = Color(0xFF0067E8),
      checkboxBgSelectedHover = Color(0xFF0857C5),
      checkboxBgSelectedPressed = Color(0xFF0D4C9B),
      checkboxBorderUnselectedHover = Color(0xFF0067E8),
      checkboxBorderUnselectedPressed = Color(0xFF0857C5),
      checkboxBorderSelectedDefault = Color(0xFF0067E8),
      radioBgHover = Color(0xFFEDF8FF),
      radioBgPressed = Color(0xFFD6EFFF),
      radioBorderUnselectedHover = Color(0xFF0067E8),
      radioBorderUnselectedPressed = Color(0xFF0857C5),
      radioBorderSelectedDefault = Color(0xFF0067E8),
      radioBorderSelectedHover = Color(0xFF0681FF),
      radioBorderSelectedPressed = Color(0xFF0857C5),
      radioDotSelectedDefault = Color(0xFF0067E8),
      radioDotSelectedHover = Color(0xFF0681FF),
      radioDotSelectedPressed = Color(0xFF0857C5),
      radioStateLayerSelected = Color(0xFF0067E8),
      chipBgSelectedDefault = Color(0xFFEDF8FF),
      chipBgSelectedHover = Color(0xFFD6EFFF),
      chipBgSelectedPressed = Color(0xFFC2E8FF),
      chipBorderSelectedDefault = Color(0xFF0067E8),
      chipBorderSelectedHover = Color(0xFF0681FF),
      chipBorderSelectedPressed = Color(0xFF0857C5),
      chipLabelSelectedDefault = Color(0xFF0067E8),
      chipLabelSelectedHover = Color(0xFF0857C5),
      chipLabelSelectedPressed = Color(0xFF0D4C9B),
      chipIconSelectedDefault = Color(0xFF0067E8),
      chipRemoveBgSelectedHover = Color(0xFFC2E8FF),
      chipRemoveBgSelectedPressed = Color(0xFFC2E8FF),
      snackbarLabelControlTintedNeutralDefault = Color(0xFF0067E8),
      snackbarLabelControlTintedNeutralHover = Color(0xFF0857C5),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF0D4C9B),
      badgeBgStrongBrand = Color(0xFF0067E8),
      badgeBgSubtleBrand = Color(0xFFEDF8FF),
      badgeLabelSubtleBrand = Color(0xFF0067E8),
      badgeDotBrand = Color(0xFF0067E8),
      tabLabelSelectedDefault = Color(0xFF0067E8),
      tabLabelSelectedHover = Color(0xFF0067E8),
      tabLabelSelectedPressed = Color(0xFF0857C5),
      tabIconSelectedDefault = Color(0xFF0067E8),
      tabIconSelectedHover = Color(0xFF0067E8),
      tabIconSelectedPressed = Color(0xFF0857C5),
      tabIndicatorDefault = Color(0xFF0067E8),
      listLeadingContainerBgBrand = Color(0xFFEDF8FF),
      listLeadingContainerIconBrand = Color(0xFF0067E8),
      switchTrackOnDefault = Color(0xFF0067E8),
      switchTrackOnHover = Color(0xFF0857C5),
      switchTrackOnPressed = Color(0xFF0D4C9B),
      switchIconOnDefault = Color(0xFF0067E8),
      switchIconOnHover = Color(0xFF0857C5),
      switchIconOnPressed = Color(0xFF0D4C9B),
      switchOutlinedIconOn = Color(0xFF0067E8),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFF0067E8),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFF0857C5),
      segmentedControlNeutralIconSelectedDefault = Color(0xFF0067E8),
      segmentedControlNeutralIconSelectedPressed = Color(0xFF0857C5),
      segmentedControlBrandThumbDefault = Color(0xFF0067E8),
      segmentedControlBrandThumbPressed = Color(0xFF0D4C9B),
      segmentedControlTintedThumbDefault = Color(0xFFEDF8FF),
      segmentedControlTintedThumbPressed = Color(0xFFC2E8FF),
      segmentedControlTintedThumbBorderDefault = Color(0xFF0067E8),
      segmentedControlTintedThumbBorderPressed = Color(0xFF0857C5),
      segmentedControlTintedLabelSelectedDefault = Color(0xFF0067E8),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF0D4C9B),
      segmentedControlTintedIconSelectedDefault = Color(0xFF0067E8),
      segmentedControlTintedIconSelectedPressed = Color(0xFF0D4C9B),
      sliderTrackActive = Color(0xFF0067E8),
      sliderHaloHover = Color(0xFFEDF8FF),
      sliderHaloPressed = Color(0xFFD6EFFF),
      menuCheckDefault = Color(0xFF0067E8),
      tooltipPrimaryLabelLight = Color(0xFF0067E8),
      tooltipPrimaryLabelLightHover = Color(0xFF0857C5),
      tooltipPrimaryLabelLightPressed = Color(0xFF0D4C9B),
    )

    val MyBiz = CosmosBrand(
      id = "mybiz",
      name = "myBiz",
      colorBgSurfaceBrand = Color(0xFFFFF7ED),
      colorBgSurfaceBrandHover = Color(0xFFFFEDD4),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFEDD4),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFD6A8),
      colorBgSurfaceBrandInverse = Color(0xFFFF8904),
      colorBgFillBrand = Color(0xFFCA3500),
      colorBgFillBrandHover = Color(0xFF9F2D00),
      colorBgFillBrandPressed = Color(0xFF7E2A0C),
      colorTextBrand = Color(0xFFCA3500),
      colorTextBrandHover = Color(0xFFF54900),
      colorTextBrandPressed = Color(0xFF9F2D00),
      colorTextBrandOnBgSurfaceHover = Color(0xFF9F2D00),
      colorTextBrandOnBgSurfacePressed = Color(0xFF7E2A0C),
      colorTextBrandInverse = Color(0xFFFFB86A),
      colorTextBrandInverseHover = Color(0xFFFFD6A8),
      colorTextBrandInversePressed = Color(0xFFFFEDD4),
      colorBorderBrand = Color(0xFFCA3500),
      colorBorderBrandHover = Color(0xFFF54900),
      colorBorderBrandPressed = Color(0xFF9F2D00),
      colorBorderBrandInverse = Color(0xFFFF8904),
      colorBorderBrandInverseHover = Color(0xFFFFB86A),
      colorBorderBrandInversePressed = Color(0xFFFFD6A8),
      colorIconBrand = Color(0xFFCA3500),
      colorIconBrandHover = Color(0xFFF54900),
      colorIconBrandPressed = Color(0xFF9F2D00),
      colorIconBrandOnBgSurfaceHover = Color(0xFF9F2D00),
      colorIconBrandOnBgSurfacePressed = Color(0xFF7E2A0C),
      colorIconBrandInverse = Color(0xFFFF8904),
      colorIconBrandInverseHover = Color(0xFFFFB86A),
      colorIconBrandInversePressed = Color(0xFFFFD6A8),
      buttonBgPrimaryDefault = Color(0xFFCA3500),
      buttonBgPrimaryHover = Color(0xFF9F2D00),
      buttonBgPrimaryPressed = Color(0xFF7E2A0C),
      buttonBgPrimaryInverseDefault = Color(0xFFCA3500),
      buttonBgPrimaryInverseHover = Color(0xFF9F2D00),
      buttonBgPrimaryInversePressed = Color(0xFF7E2A0C),
      buttonBgSecondaryHover = Color(0xFFFFEDD4),
      buttonBgSecondaryPressed = Color(0xFFFFD6A8),
      buttonBgSecondaryInverseHover = Color(0xFFFF8904),
      buttonBgSecondaryInversePressed = Color(0xFFFF8904),
      buttonBgTertiaryDefault = Color(0xFFFFF7ED),
      buttonBgTertiaryHover = Color(0xFFFFEDD4),
      buttonBgTertiaryPressed = Color(0xFFFFD6A8),
      buttonBgTertiaryInverseDefault = Color(0xFFFF8904),
      buttonBgTertiaryInverseHover = Color(0xFFFF8904),
      buttonBgTertiaryInversePressed = Color(0xFFFF8904),
      buttonBgTextHover = Color(0xFFFFF7ED),
      buttonBgTextPressed = Color(0xFFFFEDD4),
      buttonBgTextInverseHover = Color(0xFFFF8904),
      buttonBgTextInversePressed = Color(0xFFFF8904),
      buttonBorderSecondaryDefault = Color(0xFFCA3500),
      buttonBorderSecondaryHover = Color(0xFFF54900),
      buttonBorderSecondaryPressed = Color(0xFF9F2D00),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF8904),
      buttonBorderSecondaryInverseHover = Color(0xFFFFB86A),
      buttonBorderSecondaryInversePressed = Color(0xFFFFD6A8),
      buttonFocusRing = Color(0xFFCA3500),
      buttonFocusRingInverse = Color(0xFFFF8904),
      buttonIconSecondaryDefault = Color(0xFFCA3500),
      buttonIconSecondaryHover = Color(0xFF9F2D00),
      buttonIconSecondaryPressed = Color(0xFF7E2A0C),
      buttonIconSecondaryInverseDefault = Color(0xFFFF8904),
      buttonIconSecondaryInverseHover = Color(0xFFFFB86A),
      buttonIconSecondaryInversePressed = Color(0xFFFFD6A8),
      buttonIconTertiaryDefault = Color(0xFFCA3500),
      buttonIconTertiaryHover = Color(0xFF9F2D00),
      buttonIconTertiaryPressed = Color(0xFF7E2A0C),
      buttonIconTertiaryInverseDefault = Color(0xFFFF8904),
      buttonIconTertiaryInverseHover = Color(0xFFFFB86A),
      buttonIconTertiaryInversePressed = Color(0xFFFFD6A8),
      buttonIconTextDefault = Color(0xFFCA3500),
      buttonIconTextHover = Color(0xFF9F2D00),
      buttonIconTextPressed = Color(0xFF7E2A0C),
      buttonIconTextInverseDefault = Color(0xFFFF8904),
      buttonIconTextInverseHover = Color(0xFFFFB86A),
      buttonIconTextInversePressed = Color(0xFFFFD6A8),
      buttonLabelSecondaryDefault = Color(0xFFCA3500),
      buttonLabelSecondaryHover = Color(0xFF9F2D00),
      buttonLabelSecondaryPressed = Color(0xFF7E2A0C),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFB86A),
      buttonLabelSecondaryInverseHover = Color(0xFFFFD6A8),
      buttonLabelSecondaryInversePressed = Color(0xFFFFEDD4),
      buttonLabelTertiaryDefault = Color(0xFFCA3500),
      buttonLabelTertiaryHover = Color(0xFF9F2D00),
      buttonLabelTertiaryPressed = Color(0xFF7E2A0C),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFB86A),
      buttonLabelTertiaryInverseHover = Color(0xFFFFD6A8),
      buttonLabelTertiaryInversePressed = Color(0xFFFFEDD4),
      buttonLabelTextDefault = Color(0xFFCA3500),
      buttonLabelTextHover = Color(0xFF9F2D00),
      buttonLabelTextPressed = Color(0xFF7E2A0C),
      buttonLabelTextInverseDefault = Color(0xFFFFB86A),
      buttonLabelTextInverseHover = Color(0xFFFFD6A8),
      buttonLabelTextInversePressed = Color(0xFFFFEDD4),
      checkboxBgUnselectedHover = Color(0xFFFFF7ED),
      checkboxBgUnselectedPressed = Color(0xFFFFEDD4),
      checkboxBgSelectedDefault = Color(0xFFCA3500),
      checkboxBgSelectedHover = Color(0xFF9F2D00),
      checkboxBgSelectedPressed = Color(0xFF7E2A0C),
      checkboxBorderUnselectedHover = Color(0xFFCA3500),
      checkboxBorderUnselectedPressed = Color(0xFF9F2D00),
      checkboxBorderSelectedDefault = Color(0xFFCA3500),
      radioBgHover = Color(0xFFFFF7ED),
      radioBgPressed = Color(0xFFFFEDD4),
      radioBorderUnselectedHover = Color(0xFFCA3500),
      radioBorderUnselectedPressed = Color(0xFF9F2D00),
      radioBorderSelectedDefault = Color(0xFFCA3500),
      radioBorderSelectedHover = Color(0xFFF54900),
      radioBorderSelectedPressed = Color(0xFF9F2D00),
      radioDotSelectedDefault = Color(0xFFCA3500),
      radioDotSelectedHover = Color(0xFFF54900),
      radioDotSelectedPressed = Color(0xFF9F2D00),
      radioStateLayerSelected = Color(0xFFCA3500),
      chipBgSelectedDefault = Color(0xFFFFF7ED),
      chipBgSelectedHover = Color(0xFFFFEDD4),
      chipBgSelectedPressed = Color(0xFFFFD6A8),
      chipBorderSelectedDefault = Color(0xFFCA3500),
      chipBorderSelectedHover = Color(0xFFF54900),
      chipBorderSelectedPressed = Color(0xFF9F2D00),
      chipLabelSelectedDefault = Color(0xFFCA3500),
      chipLabelSelectedHover = Color(0xFF9F2D00),
      chipLabelSelectedPressed = Color(0xFF7E2A0C),
      chipIconSelectedDefault = Color(0xFFCA3500),
      chipRemoveBgSelectedHover = Color(0xFFFFD6A8),
      chipRemoveBgSelectedPressed = Color(0xFFFFD6A8),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFCA3500),
      snackbarLabelControlTintedNeutralHover = Color(0xFF9F2D00),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF7E2A0C),
      badgeBgStrongBrand = Color(0xFFCA3500),
      badgeBgSubtleBrand = Color(0xFFFFF7ED),
      badgeLabelSubtleBrand = Color(0xFFCA3500),
      badgeDotBrand = Color(0xFFCA3500),
      tabLabelSelectedDefault = Color(0xFFCA3500),
      tabLabelSelectedHover = Color(0xFFCA3500),
      tabLabelSelectedPressed = Color(0xFF9F2D00),
      tabIconSelectedDefault = Color(0xFFCA3500),
      tabIconSelectedHover = Color(0xFFCA3500),
      tabIconSelectedPressed = Color(0xFF9F2D00),
      tabIndicatorDefault = Color(0xFFCA3500),
      listLeadingContainerBgBrand = Color(0xFFFFF7ED),
      listLeadingContainerIconBrand = Color(0xFFCA3500),
      switchTrackOnDefault = Color(0xFFCA3500),
      switchTrackOnHover = Color(0xFF9F2D00),
      switchTrackOnPressed = Color(0xFF7E2A0C),
      switchIconOnDefault = Color(0xFFCA3500),
      switchIconOnHover = Color(0xFF9F2D00),
      switchIconOnPressed = Color(0xFF7E2A0C),
      switchOutlinedIconOn = Color(0xFFCA3500),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFCA3500),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFF9F2D00),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFCA3500),
      segmentedControlNeutralIconSelectedPressed = Color(0xFF9F2D00),
      segmentedControlBrandThumbDefault = Color(0xFFCA3500),
      segmentedControlBrandThumbPressed = Color(0xFF7E2A0C),
      segmentedControlTintedThumbDefault = Color(0xFFFFF7ED),
      segmentedControlTintedThumbPressed = Color(0xFFFFD6A8),
      segmentedControlTintedThumbBorderDefault = Color(0xFFCA3500),
      segmentedControlTintedThumbBorderPressed = Color(0xFF9F2D00),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFCA3500),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF7E2A0C),
      segmentedControlTintedIconSelectedDefault = Color(0xFFCA3500),
      segmentedControlTintedIconSelectedPressed = Color(0xFF7E2A0C),
      sliderTrackActive = Color(0xFFCA3500),
      sliderHaloHover = Color(0xFFFFF7ED),
      sliderHaloPressed = Color(0xFFFFEDD4),
      menuCheckDefault = Color(0xFFCA3500),
      tooltipPrimaryLabelLight = Color(0xFFCA3500),
      tooltipPrimaryLabelLightHover = Color(0xFF9F2D00),
      tooltipPrimaryLabelLightPressed = Color(0xFF7E2A0C),
    )

    val all = listOf(MakeMyTrip, MyBiz)
  }
}

/** The brand of this part of the composition. Defaults to MakeMyTrip. */
val LocalCosmosBrand = staticCompositionLocalOf { CosmosBrand.MakeMyTrip }
