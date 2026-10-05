
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
      colorBgSurfaceBrand = Color(0xFFFFF4F1),
      colorBgSurfaceBrandHover = Color(0xFFFFE6E2),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFE6E2),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFDBD6),
      colorBgSurfaceBrandInverse = Color(0xFFFF9392),
      colorBgFillBrand = Color(0xFFCF2D4C),
      colorBgFillBrandHover = Color(0xFFAC2C42),
      colorBgFillBrandPressed = Color(0xFF8D2A39),
      colorTextBrand = Color(0xFFCF2D4C),
      colorTextBrandHover = Color(0xFFF13E5B),
      colorTextBrandPressed = Color(0xFFAC2C42),
      colorTextBrandOnBgSurfaceHover = Color(0xFFAC2C42),
      colorTextBrandOnBgSurfacePressed = Color(0xFF8D2A39),
      colorTextBrandInverse = Color(0xFFFFB9B3),
      colorTextBrandInverseHover = Color(0xFFFFDBD6),
      colorTextBrandInversePressed = Color(0xFFFFE6E2),
      colorBorderBrand = Color(0xFFCF2D4C),
      colorBorderBrandHover = Color(0xFFF13E5B),
      colorBorderBrandPressed = Color(0xFFAC2C42),
      colorBorderBrandInverse = Color(0xFFFF9392),
      colorBorderBrandInverseHover = Color(0xFFFFB9B3),
      colorBorderBrandInversePressed = Color(0xFFFFDBD6),
      colorIconBrand = Color(0xFFCF2D4C),
      colorIconBrandHover = Color(0xFFF13E5B),
      colorIconBrandPressed = Color(0xFFAC2C42),
      colorIconBrandOnBgSurfaceHover = Color(0xFFAC2C42),
      colorIconBrandOnBgSurfacePressed = Color(0xFF8D2A39),
      colorIconBrandInverse = Color(0xFFFF9392),
      colorIconBrandInverseHover = Color(0xFFFFB9B3),
      colorIconBrandInversePressed = Color(0xFFFFDBD6),
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
      buttonBgPrimaryDefault = Color(0xFFCF2D4C),
      buttonBgPrimaryHover = Color(0xFFAC2C42),
      buttonBgPrimaryPressed = Color(0xFF8D2A39),
      buttonBgPrimaryInverseDefault = Color(0xFFCF2D4C),
      buttonBgPrimaryInverseHover = Color(0xFFAC2C42),
      buttonBgPrimaryInversePressed = Color(0xFF8D2A39),
      buttonBgSecondaryHover = Color(0xFFFFE6E2),
      buttonBgSecondaryPressed = Color(0xFFFFDBD6),
      buttonBgSecondaryInverseHover = Color(0xFFFF9392),
      buttonBgSecondaryInversePressed = Color(0xFFFF9392),
      buttonBgTertiaryDefault = Color(0xFFFFF4F1),
      buttonBgTertiaryHover = Color(0xFFFFE6E2),
      buttonBgTertiaryPressed = Color(0xFFFFDBD6),
      buttonBgTertiaryInverseDefault = Color(0xFFFF9392),
      buttonBgTertiaryInverseHover = Color(0xFFFF9392),
      buttonBgTertiaryInversePressed = Color(0xFFFF9392),
      buttonBgTextHover = Color(0xFFFFF4F1),
      buttonBgTextPressed = Color(0xFFFFE6E2),
      buttonBgTextInverseHover = Color(0xFFFF9392),
      buttonBgTextInversePressed = Color(0xFFFF9392),
      buttonBorderSecondaryDefault = Color(0xFFCF2D4C),
      buttonBorderSecondaryHover = Color(0xFFF13E5B),
      buttonBorderSecondaryPressed = Color(0xFFAC2C42),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF9392),
      buttonBorderSecondaryInverseHover = Color(0xFFFFB9B3),
      buttonBorderSecondaryInversePressed = Color(0xFFFFDBD6),
      buttonFocusRing = Color(0xFFCF2D4C),
      buttonFocusRingInverse = Color(0xFFFF9392),
      buttonIconSecondaryDefault = Color(0xFFCF2D4C),
      buttonIconSecondaryHover = Color(0xFFAC2C42),
      buttonIconSecondaryPressed = Color(0xFF8D2A39),
      buttonIconSecondaryInverseDefault = Color(0xFFFF9392),
      buttonIconSecondaryInverseHover = Color(0xFFFFB9B3),
      buttonIconSecondaryInversePressed = Color(0xFFFFDBD6),
      buttonIconTertiaryDefault = Color(0xFFCF2D4C),
      buttonIconTertiaryHover = Color(0xFFAC2C42),
      buttonIconTertiaryPressed = Color(0xFF8D2A39),
      buttonIconTertiaryInverseDefault = Color(0xFFFF9392),
      buttonIconTertiaryInverseHover = Color(0xFFFFB9B3),
      buttonIconTertiaryInversePressed = Color(0xFFFFDBD6),
      buttonIconTextDefault = Color(0xFFCF2D4C),
      buttonIconTextHover = Color(0xFFAC2C42),
      buttonIconTextPressed = Color(0xFF8D2A39),
      buttonIconTextInverseDefault = Color(0xFFFF9392),
      buttonIconTextInverseHover = Color(0xFFFFB9B3),
      buttonIconTextInversePressed = Color(0xFFFFDBD6),
      buttonLabelSecondaryDefault = Color(0xFFCF2D4C),
      buttonLabelSecondaryHover = Color(0xFFAC2C42),
      buttonLabelSecondaryPressed = Color(0xFF8D2A39),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFB9B3),
      buttonLabelSecondaryInverseHover = Color(0xFFFFDBD6),
      buttonLabelSecondaryInversePressed = Color(0xFFFFE6E2),
      buttonLabelTertiaryDefault = Color(0xFFCF2D4C),
      buttonLabelTertiaryHover = Color(0xFFAC2C42),
      buttonLabelTertiaryPressed = Color(0xFF8D2A39),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFB9B3),
      buttonLabelTertiaryInverseHover = Color(0xFFFFDBD6),
      buttonLabelTertiaryInversePressed = Color(0xFFFFE6E2),
      buttonLabelTextDefault = Color(0xFFCF2D4C),
      buttonLabelTextHover = Color(0xFFAC2C42),
      buttonLabelTextPressed = Color(0xFF8D2A39),
      buttonLabelTextInverseDefault = Color(0xFFFFB9B3),
      buttonLabelTextInverseHover = Color(0xFFFFDBD6),
      buttonLabelTextInversePressed = Color(0xFFFFE6E2),
      checkboxBgUnselectedHover = Color(0xFFFFF4F1),
      checkboxBgUnselectedPressed = Color(0xFFFFE6E2),
      checkboxBgSelectedDefault = Color(0xFFCF2D4C),
      checkboxBgSelectedHover = Color(0xFFAC2C42),
      checkboxBgSelectedPressed = Color(0xFF8D2A39),
      checkboxBorderUnselectedHover = Color(0xFFCF2D4C),
      checkboxBorderUnselectedPressed = Color(0xFFAC2C42),
      checkboxBorderSelectedDefault = Color(0xFFCF2D4C),
      radioBgHover = Color(0xFFFFF4F1),
      radioBgPressed = Color(0xFFFFE6E2),
      radioBorderUnselectedHover = Color(0xFFCF2D4C),
      radioBorderUnselectedPressed = Color(0xFFAC2C42),
      radioBorderSelectedDefault = Color(0xFFCF2D4C),
      radioBorderSelectedHover = Color(0xFFF13E5B),
      radioBorderSelectedPressed = Color(0xFFAC2C42),
      radioDotSelectedDefault = Color(0xFFCF2D4C),
      radioDotSelectedHover = Color(0xFFF13E5B),
      radioDotSelectedPressed = Color(0xFFAC2C42),
      radioStateLayerSelected = Color(0xFFCF2D4C),
      chipBgSelectedDefault = Color(0xFFFFF4F1),
      chipBgSelectedHover = Color(0xFFFFE6E2),
      chipBgSelectedPressed = Color(0xFFFFDBD6),
      chipBorderSelectedDefault = Color(0xFFCF2D4C),
      chipBorderSelectedHover = Color(0xFFF13E5B),
      chipBorderSelectedPressed = Color(0xFFAC2C42),
      chipLabelSelectedDefault = Color(0xFFCF2D4C),
      chipLabelSelectedHover = Color(0xFFAC2C42),
      chipLabelSelectedPressed = Color(0xFF8D2A39),
      chipIconSelectedDefault = Color(0xFFCF2D4C),
      chipRemoveBgSelectedHover = Color(0xFFFFDBD6),
      chipRemoveBgSelectedPressed = Color(0xFFFFDBD6),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFCF2D4C),
      snackbarLabelControlTintedNeutralHover = Color(0xFFAC2C42),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF8D2A39),
      badgeBgStrongBrand = Color(0xFFCF2D4C),
      badgeBgSubtleBrand = Color(0xFFFFF4F1),
      badgeLabelSubtleBrand = Color(0xFFCF2D4C),
      badgeDotBrand = Color(0xFFCF2D4C),
      tabLabelSelectedDefault = Color(0xFFCF2D4C),
      tabLabelSelectedHover = Color(0xFFCF2D4C),
      tabLabelSelectedPressed = Color(0xFFAC2C42),
      tabIconSelectedDefault = Color(0xFFCF2D4C),
      tabIconSelectedHover = Color(0xFFCF2D4C),
      tabIconSelectedPressed = Color(0xFFAC2C42),
      tabIndicatorDefault = Color(0xFFCF2D4C),
      listLeadingContainerBgBrand = Color(0xFFFFF4F1),
      listLeadingContainerIconBrand = Color(0xFFCF2D4C),
      switchTrackOnDefault = Color(0xFFCF2D4C),
      switchTrackOnHover = Color(0xFFAC2C42),
      switchTrackOnPressed = Color(0xFF8D2A39),
      switchIconOnDefault = Color(0xFFCF2D4C),
      switchIconOnHover = Color(0xFFAC2C42),
      switchIconOnPressed = Color(0xFF8D2A39),
      switchOutlinedIconOn = Color(0xFFCF2D4C),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFCF2D4C),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFFAC2C42),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFCF2D4C),
      segmentedControlNeutralIconSelectedPressed = Color(0xFFAC2C42),
      segmentedControlBrandThumbDefault = Color(0xFFCF2D4C),
      segmentedControlBrandThumbPressed = Color(0xFF8D2A39),
      segmentedControlTintedThumbDefault = Color(0xFFFFF4F1),
      segmentedControlTintedThumbPressed = Color(0xFFFFDBD6),
      segmentedControlTintedThumbBorderDefault = Color(0xFFCF2D4C),
      segmentedControlTintedThumbBorderPressed = Color(0xFFAC2C42),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFCF2D4C),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF8D2A39),
      segmentedControlTintedIconSelectedDefault = Color(0xFFCF2D4C),
      segmentedControlTintedIconSelectedPressed = Color(0xFF8D2A39),
      sliderTrackActive = Color(0xFFCF2D4C),
      sliderHaloHover = Color(0xFFFFF4F1),
      sliderHaloPressed = Color(0xFFFFE6E2),
      menuCheckDefault = Color(0xFFCF2D4C),
      tooltipPrimaryLabelLight = Color(0xFFCF2D4C),
      tooltipPrimaryLabelLightHover = Color(0xFFAC2C42),
      tooltipPrimaryLabelLightPressed = Color(0xFF8D2A39),
    )

    val Goibibo = CosmosBrand(
      id = "goibibo",
      name = "Goibibo",
      colorBgSurfaceBrand = Color(0xFFFFF5ED),
      colorBgSurfaceBrandHover = Color(0xFFFFE6D6),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFE6D6),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFDBC4),
      colorBgSurfaceBrandInverse = Color(0xFFFF975A),
      colorBgFillBrand = Color(0xFFB94C00),
      colorBgFillBrandHover = Color(0xFF9F3F00),
      colorBgFillBrandPressed = Color(0xFF873500),
      colorTextBrand = Color(0xFFB94C00),
      colorTextBrandHover = Color(0xFFDB5D00),
      colorTextBrandPressed = Color(0xFF9F3F00),
      colorTextBrandOnBgSurfaceHover = Color(0xFF9F3F00),
      colorTextBrandOnBgSurfacePressed = Color(0xFF873500),
      colorTextBrandInverse = Color(0xFFFFBC91),
      colorTextBrandInverseHover = Color(0xFFFFDBC4),
      colorTextBrandInversePressed = Color(0xFFFFE6D6),
      colorBorderBrand = Color(0xFFB94C00),
      colorBorderBrandHover = Color(0xFFDB5D00),
      colorBorderBrandPressed = Color(0xFF9F3F00),
      colorBorderBrandInverse = Color(0xFFFF975A),
      colorBorderBrandInverseHover = Color(0xFFFFBC91),
      colorBorderBrandInversePressed = Color(0xFFFFDBC4),
      colorIconBrand = Color(0xFFB94C00),
      colorIconBrandHover = Color(0xFFDB5D00),
      colorIconBrandPressed = Color(0xFF9F3F00),
      colorIconBrandOnBgSurfaceHover = Color(0xFF9F3F00),
      colorIconBrandOnBgSurfacePressed = Color(0xFF873500),
      colorIconBrandInverse = Color(0xFFFF975A),
      colorIconBrandInverseHover = Color(0xFFFFBC91),
      colorIconBrandInversePressed = Color(0xFFFFDBC4),
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
      buttonBgPrimaryDefault = Color(0xFFB94C00),
      buttonBgPrimaryHover = Color(0xFF9F3F00),
      buttonBgPrimaryPressed = Color(0xFF873500),
      buttonBgPrimaryInverseDefault = Color(0xFFB94C00),
      buttonBgPrimaryInverseHover = Color(0xFF9F3F00),
      buttonBgPrimaryInversePressed = Color(0xFF873500),
      buttonBgSecondaryHover = Color(0xFFFFE6D6),
      buttonBgSecondaryPressed = Color(0xFFFFDBC4),
      buttonBgSecondaryInverseHover = Color(0xFFFF975A),
      buttonBgSecondaryInversePressed = Color(0xFFFF975A),
      buttonBgTertiaryDefault = Color(0xFFFFF5ED),
      buttonBgTertiaryHover = Color(0xFFFFE6D6),
      buttonBgTertiaryPressed = Color(0xFFFFDBC4),
      buttonBgTertiaryInverseDefault = Color(0xFFFF975A),
      buttonBgTertiaryInverseHover = Color(0xFFFF975A),
      buttonBgTertiaryInversePressed = Color(0xFFFF975A),
      buttonBgTextHover = Color(0xFFFFF5ED),
      buttonBgTextPressed = Color(0xFFFFE6D6),
      buttonBgTextInverseHover = Color(0xFFFF975A),
      buttonBgTextInversePressed = Color(0xFFFF975A),
      buttonBorderSecondaryDefault = Color(0xFFB94C00),
      buttonBorderSecondaryHover = Color(0xFFDB5D00),
      buttonBorderSecondaryPressed = Color(0xFF9F3F00),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF975A),
      buttonBorderSecondaryInverseHover = Color(0xFFFFBC91),
      buttonBorderSecondaryInversePressed = Color(0xFFFFDBC4),
      buttonFocusRing = Color(0xFFB94C00),
      buttonFocusRingInverse = Color(0xFFFF975A),
      buttonIconSecondaryDefault = Color(0xFFB94C00),
      buttonIconSecondaryHover = Color(0xFF9F3F00),
      buttonIconSecondaryPressed = Color(0xFF873500),
      buttonIconSecondaryInverseDefault = Color(0xFFFF975A),
      buttonIconSecondaryInverseHover = Color(0xFFFFBC91),
      buttonIconSecondaryInversePressed = Color(0xFFFFDBC4),
      buttonIconTertiaryDefault = Color(0xFFB94C00),
      buttonIconTertiaryHover = Color(0xFF9F3F00),
      buttonIconTertiaryPressed = Color(0xFF873500),
      buttonIconTertiaryInverseDefault = Color(0xFFFF975A),
      buttonIconTertiaryInverseHover = Color(0xFFFFBC91),
      buttonIconTertiaryInversePressed = Color(0xFFFFDBC4),
      buttonIconTextDefault = Color(0xFFB94C00),
      buttonIconTextHover = Color(0xFF9F3F00),
      buttonIconTextPressed = Color(0xFF873500),
      buttonIconTextInverseDefault = Color(0xFFFF975A),
      buttonIconTextInverseHover = Color(0xFFFFBC91),
      buttonIconTextInversePressed = Color(0xFFFFDBC4),
      buttonLabelSecondaryDefault = Color(0xFFB94C00),
      buttonLabelSecondaryHover = Color(0xFF9F3F00),
      buttonLabelSecondaryPressed = Color(0xFF873500),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFBC91),
      buttonLabelSecondaryInverseHover = Color(0xFFFFDBC4),
      buttonLabelSecondaryInversePressed = Color(0xFFFFE6D6),
      buttonLabelTertiaryDefault = Color(0xFFB94C00),
      buttonLabelTertiaryHover = Color(0xFF9F3F00),
      buttonLabelTertiaryPressed = Color(0xFF873500),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFBC91),
      buttonLabelTertiaryInverseHover = Color(0xFFFFDBC4),
      buttonLabelTertiaryInversePressed = Color(0xFFFFE6D6),
      buttonLabelTextDefault = Color(0xFFB94C00),
      buttonLabelTextHover = Color(0xFF9F3F00),
      buttonLabelTextPressed = Color(0xFF873500),
      buttonLabelTextInverseDefault = Color(0xFFFFBC91),
      buttonLabelTextInverseHover = Color(0xFFFFDBC4),
      buttonLabelTextInversePressed = Color(0xFFFFE6D6),
      checkboxBgUnselectedHover = Color(0xFFFFF5ED),
      checkboxBgUnselectedPressed = Color(0xFFFFE6D6),
      checkboxBgSelectedDefault = Color(0xFFB94C00),
      checkboxBgSelectedHover = Color(0xFF9F3F00),
      checkboxBgSelectedPressed = Color(0xFF873500),
      checkboxBorderUnselectedHover = Color(0xFFB94C00),
      checkboxBorderUnselectedPressed = Color(0xFF9F3F00),
      checkboxBorderSelectedDefault = Color(0xFFB94C00),
      radioBgHover = Color(0xFFFFF5ED),
      radioBgPressed = Color(0xFFFFE6D6),
      radioBorderUnselectedHover = Color(0xFFB94C00),
      radioBorderUnselectedPressed = Color(0xFF9F3F00),
      radioBorderSelectedDefault = Color(0xFFB94C00),
      radioBorderSelectedHover = Color(0xFFDB5D00),
      radioBorderSelectedPressed = Color(0xFF9F3F00),
      radioDotSelectedDefault = Color(0xFFB94C00),
      radioDotSelectedHover = Color(0xFFDB5D00),
      radioDotSelectedPressed = Color(0xFF9F3F00),
      radioStateLayerSelected = Color(0xFFB94C00),
      chipBgSelectedDefault = Color(0xFFFFF5ED),
      chipBgSelectedHover = Color(0xFFFFE6D6),
      chipBgSelectedPressed = Color(0xFFFFDBC4),
      chipBorderSelectedDefault = Color(0xFFB94C00),
      chipBorderSelectedHover = Color(0xFFDB5D00),
      chipBorderSelectedPressed = Color(0xFF9F3F00),
      chipLabelSelectedDefault = Color(0xFFB94C00),
      chipLabelSelectedHover = Color(0xFF9F3F00),
      chipLabelSelectedPressed = Color(0xFF873500),
      chipIconSelectedDefault = Color(0xFFB94C00),
      chipRemoveBgSelectedHover = Color(0xFFFFDBC4),
      chipRemoveBgSelectedPressed = Color(0xFFFFDBC4),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFB94C00),
      snackbarLabelControlTintedNeutralHover = Color(0xFF9F3F00),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF873500),
      badgeBgStrongBrand = Color(0xFFB94C00),
      badgeBgSubtleBrand = Color(0xFFFFF5ED),
      badgeLabelSubtleBrand = Color(0xFFB94C00),
      badgeDotBrand = Color(0xFFB94C00),
      tabLabelSelectedDefault = Color(0xFFB94C00),
      tabLabelSelectedHover = Color(0xFFB94C00),
      tabLabelSelectedPressed = Color(0xFF9F3F00),
      tabIconSelectedDefault = Color(0xFFB94C00),
      tabIconSelectedHover = Color(0xFFB94C00),
      tabIconSelectedPressed = Color(0xFF9F3F00),
      tabIndicatorDefault = Color(0xFFB94C00),
      listLeadingContainerBgBrand = Color(0xFFFFF5ED),
      listLeadingContainerIconBrand = Color(0xFFB94C00),
      switchTrackOnDefault = Color(0xFFB94C00),
      switchTrackOnHover = Color(0xFF9F3F00),
      switchTrackOnPressed = Color(0xFF873500),
      switchIconOnDefault = Color(0xFFB94C00),
      switchIconOnHover = Color(0xFF9F3F00),
      switchIconOnPressed = Color(0xFF873500),
      switchOutlinedIconOn = Color(0xFFB94C00),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFB94C00),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFF9F3F00),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFB94C00),
      segmentedControlNeutralIconSelectedPressed = Color(0xFF9F3F00),
      segmentedControlBrandThumbDefault = Color(0xFFB94C00),
      segmentedControlBrandThumbPressed = Color(0xFF873500),
      segmentedControlTintedThumbDefault = Color(0xFFFFF5ED),
      segmentedControlTintedThumbPressed = Color(0xFFFFDBC4),
      segmentedControlTintedThumbBorderDefault = Color(0xFFB94C00),
      segmentedControlTintedThumbBorderPressed = Color(0xFF9F3F00),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFB94C00),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF873500),
      segmentedControlTintedIconSelectedDefault = Color(0xFFB94C00),
      segmentedControlTintedIconSelectedPressed = Color(0xFF873500),
      sliderTrackActive = Color(0xFFB94C00),
      sliderHaloHover = Color(0xFFFFF5ED),
      sliderHaloPressed = Color(0xFFFFE6D6),
      menuCheckDefault = Color(0xFFB94C00),
      tooltipPrimaryLabelLight = Color(0xFFB94C00),
      tooltipPrimaryLabelLightHover = Color(0xFF9F3F00),
      tooltipPrimaryLabelLightPressed = Color(0xFF873500),
    )

    val all = listOf(MakeMyTrip, MyBiz, Goibibo)
  }
}

/** The brand of this part of the composition. Defaults to MakeMyTrip. */
val LocalCosmosBrand = staticCompositionLocalOf { CosmosBrand.MakeMyTrip }
