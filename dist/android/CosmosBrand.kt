
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
 *     CompositionLocalProvider(LocalCosmosBrand provides CosmosBrand.Goibibo) { MyBizFlow() }
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
  /** Typeface of every text style, and the one token a brand changes to swap its font. Apply a text style rather than this token, so size, line height and weight come with it. */
  val typefaceDefault: String,
  /** Weight of every bold text style, for emphasis in running text and every Button label. A brand sets its own emphasis weight here, so reach it through a bold text style. For promotional emphasis use the black styles, which read weight.black. */
  val weightBold: Int,
  /** Weight of every black text style, the heaviest a brand offers, for promotional and marketing emphasis rather than routine UI. For everyday emphasis use the bold styles, which read weight.bold. */
  val weightBlack: Int,
  /** Largest headline — page titles and hero headings; typically one per view. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineLargeRegularFontFamily: String,
  /** Largest headline — page titles and hero headings; typically one per view. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineLargeBoldFontFamily: String,
  /** Largest headline — page titles and hero headings; typically one per view. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineLargeBoldFontWeight: Int,
  /** Largest headline — page titles and hero headings; typically one per view. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineLargeBlackFontFamily: String,
  /** Largest headline — page titles and hero headings; typically one per view. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineLargeBlackFontWeight: Int,
  /** Headline for major section headings. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineMediumRegularFontFamily: String,
  /** Headline for major section headings. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineMediumBoldFontFamily: String,
  /** Headline for major section headings. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineMediumBoldFontWeight: Int,
  /** Headline for major section headings. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineMediumBlackFontFamily: String,
  /** Headline for major section headings. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineMediumBlackFontWeight: Int,
  /** Smallest headline — sub-section headings and modal titles. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineSmallRegularFontFamily: String,
  /** Smallest headline — sub-section headings and modal titles. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineSmallBoldFontFamily: String,
  /** Smallest headline — sub-section headings and modal titles. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineSmallBoldFontWeight: Int,
  /** Smallest headline — sub-section headings and modal titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineSmallBlackFontFamily: String,
  /** Smallest headline — sub-section headings and modal titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles. */
  val headlineSmallBlackFontWeight: Int,
  /** Largest title — card, sheet and dialog titles. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleLargeRegularFontFamily: String,
  /** Largest title — card, sheet and dialog titles. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleLargeBoldFontFamily: String,
  /** Largest title — card, sheet and dialog titles. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleLargeBoldFontWeight: Int,
  /** Largest title — card, sheet and dialog titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleLargeBlackFontFamily: String,
  /** Largest title — card, sheet and dialog titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleLargeBlackFontWeight: Int,
  /** Title for sub-sections and list-group headers. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleMediumRegularFontFamily: String,
  /** Title for sub-sections and list-group headers. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleMediumBoldFontFamily: String,
  /** Title for sub-sections and list-group headers. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleMediumBoldFontWeight: Int,
  /** Title for sub-sections and list-group headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleMediumBlackFontFamily: String,
  /** Title for sub-sections and list-group headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleMediumBlackFontWeight: Int,
  /** Smallest title — compact card headers and table column groups. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleSmallRegularFontFamily: String,
  /** Smallest title — compact card headers and table column groups. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleSmallBoldFontFamily: String,
  /** Smallest title — compact card headers and table column groups. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleSmallBoldFontWeight: Int,
  /** Smallest title — compact card headers and table column groups. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleSmallBlackFontFamily: String,
  /** Smallest title — compact card headers and table column groups. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles. */
  val titleSmallBlackFontWeight: Int,
  /** Body text for spacious reading layouts — article and detail copy. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyLargeRegularFontFamily: String,
  /** Body text for spacious reading layouts — article and detail copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyLargeBoldFontFamily: String,
  /** Body text for spacious reading layouts — article and detail copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyLargeBoldFontWeight: Int,
  /** Body text for spacious reading layouts — article and detail copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyLargeBlackFontFamily: String,
  /** Body text for spacious reading layouts — article and detail copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyLargeBlackFontWeight: Int,
  /** Default body text — the running copy most content uses. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyMediumRegularFontFamily: String,
  /** Default body text — the running copy most content uses. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyMediumBoldFontFamily: String,
  /** Default body text — the running copy most content uses. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyMediumBoldFontWeight: Int,
  /** Default body text — the running copy most content uses. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyMediumBlackFontFamily: String,
  /** Default body text — the running copy most content uses. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodyMediumBlackFontWeight: Int,
  /** Smallest body text — captions, helper text and legal copy. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodySmallRegularFontFamily: String,
  /** Smallest body text — captions, helper text and legal copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodySmallBoldFontFamily: String,
  /** Smallest body text — captions, helper text and legal copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodySmallBoldFontWeight: Int,
  /** Smallest body text — captions, helper text and legal copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodySmallBlackFontFamily: String,
  /** Smallest body text — captions, helper text and legal copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control. */
  val bodySmallBlackFontWeight: Int,
  /** Label for large controls — large buttons and inputs. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelLargeRegularFontFamily: String,
  /** Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelLargeBoldFontFamily: String,
  /** Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelLargeBoldFontWeight: Int,
  /** Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelLargeBlackFontFamily: String,
  /** Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelLargeBlackFontWeight: Int,
  /** Default control label — medium buttons, inputs, tabs and chips. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelMediumRegularFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelMediumBoldFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelMediumBoldFontWeight: Int,
  /** Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelMediumBlackFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelMediumBlackFontWeight: Int,
  /** Label for dense controls — small buttons, badges and table headers. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelSmallRegularFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelSmallBoldFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelSmallBoldFontWeight: Int,
  /** Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelSmallBlackFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads. */
  val labelSmallBlackFontWeight: Int,
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
  /** Colour of the leading icon, trailing icon and remove glyph — selected, Default and Focus. Hover and pressed have their own tokens so the icons darken with the label. Does not apply to the leading image. */
  val chipIconSelectedDefault: Color,
  /** Colour of the leading icon, trailing icon and remove glyph — selected, on hover. Matches chip/label-selected-hover so icons and label darken together as the fill deepens. */
  val chipIconSelectedHover: Color,
  /** Colour of the leading icon, trailing icon and remove glyph — selected, while pressed. Matches chip/label-selected-pressed. Also colours the remove glyph while the remove button itself is hovered or pressed, because its circle uses the pressed tint and icon-selected-default is too light on it. */
  val chipIconSelectedPressed: Color,
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
  /** Trailing check on the selected row of a single-select menu, such as Sort by, at rest, on hover and with focus. It is the only mark of selection, so the label stays label-default. Use check-pressed while the row is pressed. */
  val menuCheckDefault: Color,
  /** Trailing check on the selected row while the row is pressed. One step darker than check-default, which is too light on item-bg-pressed. */
  val menuCheckPressed: Color,
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
      colorBgSurfaceBrand = Color(0xFFEDFAFF),
      colorBgSurfaceBrandHover = Color(0xFFD6F3FF),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFD6F3FF),
      colorBgSurfaceBrandPressedStrong = Color(0xFFB5EAFF),
      colorBgSurfaceBrandInverse = Color(0xFF48BBFF),
      colorBgFillBrand = Color(0xFF0088FF),
      colorBgFillBrandHover = Color(0xFF0868C5),
      colorBgFillBrandPressed = Color(0xFF0D589B),
      colorTextBrand = Color(0xFF0088FF),
      colorTextBrandHover = Color(0xFF0698FF),
      colorTextBrandPressed = Color(0xFF0868C5),
      colorTextBrandOnBgSurfaceHover = Color(0xFF0868C5),
      colorTextBrandOnBgSurfacePressed = Color(0xFF0D589B),
      colorTextBrandInverse = Color(0xFF83DFFF),
      colorTextBrandInverseHover = Color(0xFFB5EAFF),
      colorTextBrandInversePressed = Color(0xFFD6F3FF),
      colorBorderBrand = Color(0xFF0088FF),
      colorBorderBrandHover = Color(0xFF0698FF),
      colorBorderBrandPressed = Color(0xFF0868C5),
      colorBorderBrandInverse = Color(0xFF48BBFF),
      colorBorderBrandInverseHover = Color(0xFF83DFFF),
      colorBorderBrandInversePressed = Color(0xFFB5EAFF),
      colorIconBrand = Color(0xFF0088FF),
      colorIconBrandHover = Color(0xFF0698FF),
      colorIconBrandPressed = Color(0xFF0868C5),
      colorIconBrandOnBgSurfaceHover = Color(0xFF0868C5),
      colorIconBrandOnBgSurfacePressed = Color(0xFF0D589B),
      colorIconBrandInverse = Color(0xFF48BBFF),
      colorIconBrandInverseHover = Color(0xFF83DFFF),
      colorIconBrandInversePressed = Color(0xFFB5EAFF),
      typefaceDefault = "Lato",
      weightBold = 700,
      weightBlack = 900,
      headlineLargeRegularFontFamily = "Lato",
      headlineLargeBoldFontFamily = "Lato",
      headlineLargeBoldFontWeight = 700,
      headlineLargeBlackFontFamily = "Lato",
      headlineLargeBlackFontWeight = 900,
      headlineMediumRegularFontFamily = "Lato",
      headlineMediumBoldFontFamily = "Lato",
      headlineMediumBoldFontWeight = 700,
      headlineMediumBlackFontFamily = "Lato",
      headlineMediumBlackFontWeight = 900,
      headlineSmallRegularFontFamily = "Lato",
      headlineSmallBoldFontFamily = "Lato",
      headlineSmallBoldFontWeight = 700,
      headlineSmallBlackFontFamily = "Lato",
      headlineSmallBlackFontWeight = 900,
      titleLargeRegularFontFamily = "Lato",
      titleLargeBoldFontFamily = "Lato",
      titleLargeBoldFontWeight = 700,
      titleLargeBlackFontFamily = "Lato",
      titleLargeBlackFontWeight = 900,
      titleMediumRegularFontFamily = "Lato",
      titleMediumBoldFontFamily = "Lato",
      titleMediumBoldFontWeight = 700,
      titleMediumBlackFontFamily = "Lato",
      titleMediumBlackFontWeight = 900,
      titleSmallRegularFontFamily = "Lato",
      titleSmallBoldFontFamily = "Lato",
      titleSmallBoldFontWeight = 700,
      titleSmallBlackFontFamily = "Lato",
      titleSmallBlackFontWeight = 900,
      bodyLargeRegularFontFamily = "Lato",
      bodyLargeBoldFontFamily = "Lato",
      bodyLargeBoldFontWeight = 700,
      bodyLargeBlackFontFamily = "Lato",
      bodyLargeBlackFontWeight = 900,
      bodyMediumRegularFontFamily = "Lato",
      bodyMediumBoldFontFamily = "Lato",
      bodyMediumBoldFontWeight = 700,
      bodyMediumBlackFontFamily = "Lato",
      bodyMediumBlackFontWeight = 900,
      bodySmallRegularFontFamily = "Lato",
      bodySmallBoldFontFamily = "Lato",
      bodySmallBoldFontWeight = 700,
      bodySmallBlackFontFamily = "Lato",
      bodySmallBlackFontWeight = 900,
      labelLargeRegularFontFamily = "Lato",
      labelLargeBoldFontFamily = "Lato",
      labelLargeBoldFontWeight = 700,
      labelLargeBlackFontFamily = "Lato",
      labelLargeBlackFontWeight = 900,
      labelMediumRegularFontFamily = "Lato",
      labelMediumBoldFontFamily = "Lato",
      labelMediumBoldFontWeight = 700,
      labelMediumBlackFontFamily = "Lato",
      labelMediumBlackFontWeight = 900,
      labelSmallRegularFontFamily = "Lato",
      labelSmallBoldFontFamily = "Lato",
      labelSmallBoldFontWeight = 700,
      labelSmallBlackFontFamily = "Lato",
      labelSmallBlackFontWeight = 900,
      buttonBgPrimaryDefault = Color(0xFF0088FF),
      buttonBgPrimaryHover = Color(0xFF0868C5),
      buttonBgPrimaryPressed = Color(0xFF0D589B),
      buttonBgPrimaryInverseDefault = Color(0xFF0088FF),
      buttonBgPrimaryInverseHover = Color(0xFF0868C5),
      buttonBgPrimaryInversePressed = Color(0xFF0D589B),
      buttonBgSecondaryHover = Color(0xFFD6F3FF),
      buttonBgSecondaryPressed = Color(0xFFB5EAFF),
      buttonBgSecondaryInverseHover = Color(0xFF48BBFF),
      buttonBgSecondaryInversePressed = Color(0xFF48BBFF),
      buttonBgTertiaryDefault = Color(0xFFEDFAFF),
      buttonBgTertiaryHover = Color(0xFFD6F3FF),
      buttonBgTertiaryPressed = Color(0xFFB5EAFF),
      buttonBgTertiaryInverseDefault = Color(0xFF48BBFF),
      buttonBgTertiaryInverseHover = Color(0xFF48BBFF),
      buttonBgTertiaryInversePressed = Color(0xFF48BBFF),
      buttonBgTextHover = Color(0xFFEDFAFF),
      buttonBgTextPressed = Color(0xFFD6F3FF),
      buttonBgTextInverseHover = Color(0xFF48BBFF),
      buttonBgTextInversePressed = Color(0xFF48BBFF),
      buttonBorderSecondaryDefault = Color(0xFF0088FF),
      buttonBorderSecondaryHover = Color(0xFF0698FF),
      buttonBorderSecondaryPressed = Color(0xFF0868C5),
      buttonBorderSecondaryInverseDefault = Color(0xFF48BBFF),
      buttonBorderSecondaryInverseHover = Color(0xFF83DFFF),
      buttonBorderSecondaryInversePressed = Color(0xFFB5EAFF),
      buttonFocusRing = Color(0xFF0088FF),
      buttonFocusRingInverse = Color(0xFF48BBFF),
      buttonIconSecondaryDefault = Color(0xFF0088FF),
      buttonIconSecondaryHover = Color(0xFF0868C5),
      buttonIconSecondaryPressed = Color(0xFF0D589B),
      buttonIconSecondaryInverseDefault = Color(0xFF48BBFF),
      buttonIconSecondaryInverseHover = Color(0xFF83DFFF),
      buttonIconSecondaryInversePressed = Color(0xFFB5EAFF),
      buttonIconTertiaryDefault = Color(0xFF0088FF),
      buttonIconTertiaryHover = Color(0xFF0868C5),
      buttonIconTertiaryPressed = Color(0xFF0D589B),
      buttonIconTertiaryInverseDefault = Color(0xFF48BBFF),
      buttonIconTertiaryInverseHover = Color(0xFF83DFFF),
      buttonIconTertiaryInversePressed = Color(0xFFB5EAFF),
      buttonIconTextDefault = Color(0xFF0088FF),
      buttonIconTextHover = Color(0xFF0868C5),
      buttonIconTextPressed = Color(0xFF0D589B),
      buttonIconTextInverseDefault = Color(0xFF48BBFF),
      buttonIconTextInverseHover = Color(0xFF83DFFF),
      buttonIconTextInversePressed = Color(0xFFB5EAFF),
      buttonLabelSecondaryDefault = Color(0xFF0088FF),
      buttonLabelSecondaryHover = Color(0xFF0868C5),
      buttonLabelSecondaryPressed = Color(0xFF0D589B),
      buttonLabelSecondaryInverseDefault = Color(0xFF83DFFF),
      buttonLabelSecondaryInverseHover = Color(0xFFB5EAFF),
      buttonLabelSecondaryInversePressed = Color(0xFFD6F3FF),
      buttonLabelTertiaryDefault = Color(0xFF0088FF),
      buttonLabelTertiaryHover = Color(0xFF0868C5),
      buttonLabelTertiaryPressed = Color(0xFF0D589B),
      buttonLabelTertiaryInverseDefault = Color(0xFF83DFFF),
      buttonLabelTertiaryInverseHover = Color(0xFFB5EAFF),
      buttonLabelTertiaryInversePressed = Color(0xFFD6F3FF),
      buttonLabelTextDefault = Color(0xFF0088FF),
      buttonLabelTextHover = Color(0xFF0868C5),
      buttonLabelTextPressed = Color(0xFF0D589B),
      buttonLabelTextInverseDefault = Color(0xFF83DFFF),
      buttonLabelTextInverseHover = Color(0xFFB5EAFF),
      buttonLabelTextInversePressed = Color(0xFFD6F3FF),
      checkboxBgUnselectedHover = Color(0xFFEDFAFF),
      checkboxBgUnselectedPressed = Color(0xFFD6F3FF),
      checkboxBgSelectedDefault = Color(0xFF0088FF),
      checkboxBgSelectedHover = Color(0xFF0868C5),
      checkboxBgSelectedPressed = Color(0xFF0D589B),
      checkboxBorderUnselectedHover = Color(0xFF0088FF),
      checkboxBorderUnselectedPressed = Color(0xFF0868C5),
      checkboxBorderSelectedDefault = Color(0xFF0088FF),
      radioBgHover = Color(0xFFEDFAFF),
      radioBgPressed = Color(0xFFD6F3FF),
      radioBorderUnselectedHover = Color(0xFF0088FF),
      radioBorderUnselectedPressed = Color(0xFF0868C5),
      radioBorderSelectedDefault = Color(0xFF0088FF),
      radioBorderSelectedHover = Color(0xFF0698FF),
      radioBorderSelectedPressed = Color(0xFF0868C5),
      radioDotSelectedDefault = Color(0xFF0088FF),
      radioDotSelectedHover = Color(0xFF0698FF),
      radioDotSelectedPressed = Color(0xFF0868C5),
      radioStateLayerSelected = Color(0xFF0088FF),
      chipBgSelectedDefault = Color(0xFFEDFAFF),
      chipBgSelectedHover = Color(0xFFD6F3FF),
      chipBgSelectedPressed = Color(0xFFB5EAFF),
      chipBorderSelectedDefault = Color(0xFF0088FF),
      chipBorderSelectedHover = Color(0xFF0698FF),
      chipBorderSelectedPressed = Color(0xFF0868C5),
      chipLabelSelectedDefault = Color(0xFF0088FF),
      chipLabelSelectedHover = Color(0xFF0868C5),
      chipLabelSelectedPressed = Color(0xFF0D589B),
      chipIconSelectedDefault = Color(0xFF0088FF),
      chipIconSelectedHover = Color(0xFF0868C5),
      chipIconSelectedPressed = Color(0xFF0D589B),
      chipRemoveBgSelectedHover = Color(0xFFB5EAFF),
      chipRemoveBgSelectedPressed = Color(0xFFB5EAFF),
      snackbarLabelControlTintedNeutralDefault = Color(0xFF0088FF),
      snackbarLabelControlTintedNeutralHover = Color(0xFF0868C5),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF0D589B),
      badgeBgStrongBrand = Color(0xFF0088FF),
      badgeBgSubtleBrand = Color(0xFFEDFAFF),
      badgeLabelSubtleBrand = Color(0xFF0088FF),
      badgeDotBrand = Color(0xFF0088FF),
      tabLabelSelectedDefault = Color(0xFF0088FF),
      tabLabelSelectedHover = Color(0xFF0088FF),
      tabLabelSelectedPressed = Color(0xFF0868C5),
      tabIconSelectedDefault = Color(0xFF0088FF),
      tabIconSelectedHover = Color(0xFF0088FF),
      tabIconSelectedPressed = Color(0xFF0868C5),
      tabIndicatorDefault = Color(0xFF0088FF),
      listLeadingContainerBgBrand = Color(0xFFEDFAFF),
      listLeadingContainerIconBrand = Color(0xFF0088FF),
      switchTrackOnDefault = Color(0xFF0088FF),
      switchTrackOnHover = Color(0xFF0868C5),
      switchTrackOnPressed = Color(0xFF0D589B),
      switchIconOnDefault = Color(0xFF0088FF),
      switchIconOnHover = Color(0xFF0868C5),
      switchIconOnPressed = Color(0xFF0D589B),
      switchOutlinedIconOn = Color(0xFF0088FF),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFF0088FF),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFF0868C5),
      segmentedControlNeutralIconSelectedDefault = Color(0xFF0088FF),
      segmentedControlNeutralIconSelectedPressed = Color(0xFF0868C5),
      segmentedControlBrandThumbDefault = Color(0xFF0088FF),
      segmentedControlBrandThumbPressed = Color(0xFF0D589B),
      segmentedControlTintedThumbDefault = Color(0xFFEDFAFF),
      segmentedControlTintedThumbPressed = Color(0xFFB5EAFF),
      segmentedControlTintedThumbBorderDefault = Color(0xFF0088FF),
      segmentedControlTintedThumbBorderPressed = Color(0xFF0868C5),
      segmentedControlTintedLabelSelectedDefault = Color(0xFF0088FF),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF0D589B),
      segmentedControlTintedIconSelectedDefault = Color(0xFF0088FF),
      segmentedControlTintedIconSelectedPressed = Color(0xFF0D589B),
      sliderTrackActive = Color(0xFF0088FF),
      sliderHaloHover = Color(0xFFEDFAFF),
      sliderHaloPressed = Color(0xFFD6F3FF),
      menuCheckDefault = Color(0xFF0088FF),
      menuCheckPressed = Color(0xFF0868C5),
      tooltipPrimaryLabelLight = Color(0xFF0088FF),
      tooltipPrimaryLabelLightHover = Color(0xFF0868C5),
      tooltipPrimaryLabelLightPressed = Color(0xFF0D589B),
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
      typefaceDefault = "Lato",
      weightBold = 700,
      weightBlack = 900,
      headlineLargeRegularFontFamily = "Lato",
      headlineLargeBoldFontFamily = "Lato",
      headlineLargeBoldFontWeight = 700,
      headlineLargeBlackFontFamily = "Lato",
      headlineLargeBlackFontWeight = 900,
      headlineMediumRegularFontFamily = "Lato",
      headlineMediumBoldFontFamily = "Lato",
      headlineMediumBoldFontWeight = 700,
      headlineMediumBlackFontFamily = "Lato",
      headlineMediumBlackFontWeight = 900,
      headlineSmallRegularFontFamily = "Lato",
      headlineSmallBoldFontFamily = "Lato",
      headlineSmallBoldFontWeight = 700,
      headlineSmallBlackFontFamily = "Lato",
      headlineSmallBlackFontWeight = 900,
      titleLargeRegularFontFamily = "Lato",
      titleLargeBoldFontFamily = "Lato",
      titleLargeBoldFontWeight = 700,
      titleLargeBlackFontFamily = "Lato",
      titleLargeBlackFontWeight = 900,
      titleMediumRegularFontFamily = "Lato",
      titleMediumBoldFontFamily = "Lato",
      titleMediumBoldFontWeight = 700,
      titleMediumBlackFontFamily = "Lato",
      titleMediumBlackFontWeight = 900,
      titleSmallRegularFontFamily = "Lato",
      titleSmallBoldFontFamily = "Lato",
      titleSmallBoldFontWeight = 700,
      titleSmallBlackFontFamily = "Lato",
      titleSmallBlackFontWeight = 900,
      bodyLargeRegularFontFamily = "Lato",
      bodyLargeBoldFontFamily = "Lato",
      bodyLargeBoldFontWeight = 700,
      bodyLargeBlackFontFamily = "Lato",
      bodyLargeBlackFontWeight = 900,
      bodyMediumRegularFontFamily = "Lato",
      bodyMediumBoldFontFamily = "Lato",
      bodyMediumBoldFontWeight = 700,
      bodyMediumBlackFontFamily = "Lato",
      bodyMediumBlackFontWeight = 900,
      bodySmallRegularFontFamily = "Lato",
      bodySmallBoldFontFamily = "Lato",
      bodySmallBoldFontWeight = 700,
      bodySmallBlackFontFamily = "Lato",
      bodySmallBlackFontWeight = 900,
      labelLargeRegularFontFamily = "Lato",
      labelLargeBoldFontFamily = "Lato",
      labelLargeBoldFontWeight = 700,
      labelLargeBlackFontFamily = "Lato",
      labelLargeBlackFontWeight = 900,
      labelMediumRegularFontFamily = "Lato",
      labelMediumBoldFontFamily = "Lato",
      labelMediumBoldFontWeight = 700,
      labelMediumBlackFontFamily = "Lato",
      labelMediumBlackFontWeight = 900,
      labelSmallRegularFontFamily = "Lato",
      labelSmallBoldFontFamily = "Lato",
      labelSmallBoldFontWeight = 700,
      labelSmallBlackFontFamily = "Lato",
      labelSmallBlackFontWeight = 900,
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
      chipIconSelectedHover = Color(0xFF9F2D00),
      chipIconSelectedPressed = Color(0xFF7E2A0C),
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
      menuCheckPressed = Color(0xFF9F2D00),
      tooltipPrimaryLabelLight = Color(0xFFCA3500),
      tooltipPrimaryLabelLightHover = Color(0xFF9F2D00),
      tooltipPrimaryLabelLightPressed = Color(0xFF7E2A0C),
    )

    val Goibibo = CosmosBrand(
      id = "goibibo",
      name = "Goibibo",
      colorBgSurfaceBrand = Color(0xFFFEF4EC),
      colorBgSurfaceBrandHover = Color(0xFFFFE8D4),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFE8D4),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFDCC2),
      colorBgSurfaceBrandInverse = Color(0xFFFF9749),
      colorBgFillBrand = Color(0xFFB35200),
      colorBgFillBrandHover = Color(0xFF974500),
      colorBgFillBrandPressed = Color(0xFF813A00),
      colorTextBrand = Color(0xFFB35200),
      colorTextBrandHover = Color(0xFFD26400),
      colorTextBrandPressed = Color(0xFF974500),
      colorTextBrandOnBgSurfaceHover = Color(0xFF974500),
      colorTextBrandOnBgSurfacePressed = Color(0xFF813A00),
      colorTextBrandInverse = Color(0xFFFFBC8A),
      colorTextBrandInverseHover = Color(0xFFFFDCC2),
      colorTextBrandInversePressed = Color(0xFFFFE8D4),
      colorBorderBrand = Color(0xFFB35200),
      colorBorderBrandHover = Color(0xFFD26400),
      colorBorderBrandPressed = Color(0xFF974500),
      colorBorderBrandInverse = Color(0xFFFF9749),
      colorBorderBrandInverseHover = Color(0xFFFFBC8A),
      colorBorderBrandInversePressed = Color(0xFFFFDCC2),
      colorIconBrand = Color(0xFFB35200),
      colorIconBrandHover = Color(0xFFD26400),
      colorIconBrandPressed = Color(0xFF974500),
      colorIconBrandOnBgSurfaceHover = Color(0xFF974500),
      colorIconBrandOnBgSurfacePressed = Color(0xFF813A00),
      colorIconBrandInverse = Color(0xFFFF9749),
      colorIconBrandInverseHover = Color(0xFFFFBC8A),
      colorIconBrandInversePressed = Color(0xFFFFDCC2),
      typefaceDefault = "Rubik",
      weightBold = 600,
      weightBlack = 700,
      headlineLargeRegularFontFamily = "Rubik",
      headlineLargeBoldFontFamily = "Rubik",
      headlineLargeBoldFontWeight = 600,
      headlineLargeBlackFontFamily = "Rubik",
      headlineLargeBlackFontWeight = 700,
      headlineMediumRegularFontFamily = "Rubik",
      headlineMediumBoldFontFamily = "Rubik",
      headlineMediumBoldFontWeight = 600,
      headlineMediumBlackFontFamily = "Rubik",
      headlineMediumBlackFontWeight = 700,
      headlineSmallRegularFontFamily = "Rubik",
      headlineSmallBoldFontFamily = "Rubik",
      headlineSmallBoldFontWeight = 600,
      headlineSmallBlackFontFamily = "Rubik",
      headlineSmallBlackFontWeight = 700,
      titleLargeRegularFontFamily = "Rubik",
      titleLargeBoldFontFamily = "Rubik",
      titleLargeBoldFontWeight = 600,
      titleLargeBlackFontFamily = "Rubik",
      titleLargeBlackFontWeight = 700,
      titleMediumRegularFontFamily = "Rubik",
      titleMediumBoldFontFamily = "Rubik",
      titleMediumBoldFontWeight = 600,
      titleMediumBlackFontFamily = "Rubik",
      titleMediumBlackFontWeight = 700,
      titleSmallRegularFontFamily = "Rubik",
      titleSmallBoldFontFamily = "Rubik",
      titleSmallBoldFontWeight = 600,
      titleSmallBlackFontFamily = "Rubik",
      titleSmallBlackFontWeight = 700,
      bodyLargeRegularFontFamily = "Rubik",
      bodyLargeBoldFontFamily = "Rubik",
      bodyLargeBoldFontWeight = 600,
      bodyLargeBlackFontFamily = "Rubik",
      bodyLargeBlackFontWeight = 700,
      bodyMediumRegularFontFamily = "Rubik",
      bodyMediumBoldFontFamily = "Rubik",
      bodyMediumBoldFontWeight = 600,
      bodyMediumBlackFontFamily = "Rubik",
      bodyMediumBlackFontWeight = 700,
      bodySmallRegularFontFamily = "Rubik",
      bodySmallBoldFontFamily = "Rubik",
      bodySmallBoldFontWeight = 600,
      bodySmallBlackFontFamily = "Rubik",
      bodySmallBlackFontWeight = 700,
      labelLargeRegularFontFamily = "Rubik",
      labelLargeBoldFontFamily = "Rubik",
      labelLargeBoldFontWeight = 600,
      labelLargeBlackFontFamily = "Rubik",
      labelLargeBlackFontWeight = 700,
      labelMediumRegularFontFamily = "Rubik",
      labelMediumBoldFontFamily = "Rubik",
      labelMediumBoldFontWeight = 600,
      labelMediumBlackFontFamily = "Rubik",
      labelMediumBlackFontWeight = 700,
      labelSmallRegularFontFamily = "Rubik",
      labelSmallBoldFontFamily = "Rubik",
      labelSmallBoldFontWeight = 600,
      labelSmallBlackFontFamily = "Rubik",
      labelSmallBlackFontWeight = 700,
      buttonBgPrimaryDefault = Color(0xFFB35200),
      buttonBgPrimaryHover = Color(0xFF974500),
      buttonBgPrimaryPressed = Color(0xFF813A00),
      buttonBgPrimaryInverseDefault = Color(0xFFB35200),
      buttonBgPrimaryInverseHover = Color(0xFF974500),
      buttonBgPrimaryInversePressed = Color(0xFF813A00),
      buttonBgSecondaryHover = Color(0xFFFFE8D4),
      buttonBgSecondaryPressed = Color(0xFFFFDCC2),
      buttonBgSecondaryInverseHover = Color(0xFFFF9749),
      buttonBgSecondaryInversePressed = Color(0xFFFF9749),
      buttonBgTertiaryDefault = Color(0xFFFEF4EC),
      buttonBgTertiaryHover = Color(0xFFFFE8D4),
      buttonBgTertiaryPressed = Color(0xFFFFDCC2),
      buttonBgTertiaryInverseDefault = Color(0xFFFF9749),
      buttonBgTertiaryInverseHover = Color(0xFFFF9749),
      buttonBgTertiaryInversePressed = Color(0xFFFF9749),
      buttonBgTextHover = Color(0xFFFEF4EC),
      buttonBgTextPressed = Color(0xFFFFE8D4),
      buttonBgTextInverseHover = Color(0xFFFF9749),
      buttonBgTextInversePressed = Color(0xFFFF9749),
      buttonBorderSecondaryDefault = Color(0xFFB35200),
      buttonBorderSecondaryHover = Color(0xFFD26400),
      buttonBorderSecondaryPressed = Color(0xFF974500),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF9749),
      buttonBorderSecondaryInverseHover = Color(0xFFFFBC8A),
      buttonBorderSecondaryInversePressed = Color(0xFFFFDCC2),
      buttonFocusRing = Color(0xFFB35200),
      buttonFocusRingInverse = Color(0xFFFF9749),
      buttonIconSecondaryDefault = Color(0xFFB35200),
      buttonIconSecondaryHover = Color(0xFF974500),
      buttonIconSecondaryPressed = Color(0xFF813A00),
      buttonIconSecondaryInverseDefault = Color(0xFFFF9749),
      buttonIconSecondaryInverseHover = Color(0xFFFFBC8A),
      buttonIconSecondaryInversePressed = Color(0xFFFFDCC2),
      buttonIconTertiaryDefault = Color(0xFFB35200),
      buttonIconTertiaryHover = Color(0xFF974500),
      buttonIconTertiaryPressed = Color(0xFF813A00),
      buttonIconTertiaryInverseDefault = Color(0xFFFF9749),
      buttonIconTertiaryInverseHover = Color(0xFFFFBC8A),
      buttonIconTertiaryInversePressed = Color(0xFFFFDCC2),
      buttonIconTextDefault = Color(0xFFB35200),
      buttonIconTextHover = Color(0xFF974500),
      buttonIconTextPressed = Color(0xFF813A00),
      buttonIconTextInverseDefault = Color(0xFFFF9749),
      buttonIconTextInverseHover = Color(0xFFFFBC8A),
      buttonIconTextInversePressed = Color(0xFFFFDCC2),
      buttonLabelSecondaryDefault = Color(0xFFB35200),
      buttonLabelSecondaryHover = Color(0xFF974500),
      buttonLabelSecondaryPressed = Color(0xFF813A00),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFBC8A),
      buttonLabelSecondaryInverseHover = Color(0xFFFFDCC2),
      buttonLabelSecondaryInversePressed = Color(0xFFFFE8D4),
      buttonLabelTertiaryDefault = Color(0xFFB35200),
      buttonLabelTertiaryHover = Color(0xFF974500),
      buttonLabelTertiaryPressed = Color(0xFF813A00),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFBC8A),
      buttonLabelTertiaryInverseHover = Color(0xFFFFDCC2),
      buttonLabelTertiaryInversePressed = Color(0xFFFFE8D4),
      buttonLabelTextDefault = Color(0xFFB35200),
      buttonLabelTextHover = Color(0xFF974500),
      buttonLabelTextPressed = Color(0xFF813A00),
      buttonLabelTextInverseDefault = Color(0xFFFFBC8A),
      buttonLabelTextInverseHover = Color(0xFFFFDCC2),
      buttonLabelTextInversePressed = Color(0xFFFFE8D4),
      checkboxBgUnselectedHover = Color(0xFFFEF4EC),
      checkboxBgUnselectedPressed = Color(0xFFFFE8D4),
      checkboxBgSelectedDefault = Color(0xFFB35200),
      checkboxBgSelectedHover = Color(0xFF974500),
      checkboxBgSelectedPressed = Color(0xFF813A00),
      checkboxBorderUnselectedHover = Color(0xFFB35200),
      checkboxBorderUnselectedPressed = Color(0xFF974500),
      checkboxBorderSelectedDefault = Color(0xFFB35200),
      radioBgHover = Color(0xFFFEF4EC),
      radioBgPressed = Color(0xFFFFE8D4),
      radioBorderUnselectedHover = Color(0xFFB35200),
      radioBorderUnselectedPressed = Color(0xFF974500),
      radioBorderSelectedDefault = Color(0xFFB35200),
      radioBorderSelectedHover = Color(0xFFD26400),
      radioBorderSelectedPressed = Color(0xFF974500),
      radioDotSelectedDefault = Color(0xFFB35200),
      radioDotSelectedHover = Color(0xFFD26400),
      radioDotSelectedPressed = Color(0xFF974500),
      radioStateLayerSelected = Color(0xFFB35200),
      chipBgSelectedDefault = Color(0xFFFEF4EC),
      chipBgSelectedHover = Color(0xFFFFE8D4),
      chipBgSelectedPressed = Color(0xFFFFDCC2),
      chipBorderSelectedDefault = Color(0xFFB35200),
      chipBorderSelectedHover = Color(0xFFD26400),
      chipBorderSelectedPressed = Color(0xFF974500),
      chipLabelSelectedDefault = Color(0xFFB35200),
      chipLabelSelectedHover = Color(0xFF974500),
      chipLabelSelectedPressed = Color(0xFF813A00),
      chipIconSelectedDefault = Color(0xFFB35200),
      chipIconSelectedHover = Color(0xFF974500),
      chipIconSelectedPressed = Color(0xFF813A00),
      chipRemoveBgSelectedHover = Color(0xFFFFDCC2),
      chipRemoveBgSelectedPressed = Color(0xFFFFDCC2),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFB35200),
      snackbarLabelControlTintedNeutralHover = Color(0xFF974500),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF813A00),
      badgeBgStrongBrand = Color(0xFFB35200),
      badgeBgSubtleBrand = Color(0xFFFEF4EC),
      badgeLabelSubtleBrand = Color(0xFFB35200),
      badgeDotBrand = Color(0xFFB35200),
      tabLabelSelectedDefault = Color(0xFFB35200),
      tabLabelSelectedHover = Color(0xFFB35200),
      tabLabelSelectedPressed = Color(0xFF974500),
      tabIconSelectedDefault = Color(0xFFB35200),
      tabIconSelectedHover = Color(0xFFB35200),
      tabIconSelectedPressed = Color(0xFF974500),
      tabIndicatorDefault = Color(0xFFB35200),
      listLeadingContainerBgBrand = Color(0xFFFEF4EC),
      listLeadingContainerIconBrand = Color(0xFFB35200),
      switchTrackOnDefault = Color(0xFFB35200),
      switchTrackOnHover = Color(0xFF974500),
      switchTrackOnPressed = Color(0xFF813A00),
      switchIconOnDefault = Color(0xFFB35200),
      switchIconOnHover = Color(0xFF974500),
      switchIconOnPressed = Color(0xFF813A00),
      switchOutlinedIconOn = Color(0xFFB35200),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFB35200),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFF974500),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFB35200),
      segmentedControlNeutralIconSelectedPressed = Color(0xFF974500),
      segmentedControlBrandThumbDefault = Color(0xFFB35200),
      segmentedControlBrandThumbPressed = Color(0xFF813A00),
      segmentedControlTintedThumbDefault = Color(0xFFFEF4EC),
      segmentedControlTintedThumbPressed = Color(0xFFFFDCC2),
      segmentedControlTintedThumbBorderDefault = Color(0xFFB35200),
      segmentedControlTintedThumbBorderPressed = Color(0xFF974500),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFB35200),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF813A00),
      segmentedControlTintedIconSelectedDefault = Color(0xFFB35200),
      segmentedControlTintedIconSelectedPressed = Color(0xFF813A00),
      sliderTrackActive = Color(0xFFB35200),
      sliderHaloHover = Color(0xFFFEF4EC),
      sliderHaloPressed = Color(0xFFFFE8D4),
      menuCheckDefault = Color(0xFFB35200),
      menuCheckPressed = Color(0xFF974500),
      tooltipPrimaryLabelLight = Color(0xFFB35200),
      tooltipPrimaryLabelLightHover = Color(0xFF974500),
      tooltipPrimaryLabelLightPressed = Color(0xFF813A00),
    )

    val all = listOf(MakeMyTrip, MyBiz, Goibibo)
  }
}

/** The brand of this part of the composition. Defaults to MakeMyTrip. */
val LocalCosmosBrand = staticCompositionLocalOf { CosmosBrand.MakeMyTrip }
