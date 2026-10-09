
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
  /** Brand-tinted container — selected list rows, brand callouts. This is a background behind content; for a tinted brand control such as the tertiary button use bg-fill-brand-subtlest, and for a solid brand element use bg-fill-brand. */
  val colorBgSurfaceBrand: Color,
  /** Hover state for a tappable brand-tinted container (bg-surface-brand), such as a selected list row. For brand controls such as secondary, tertiary and text buttons use bg-fill-brand-subtlest-hover. */
  val colorBgSurfaceBrandHover: Color,
  /** Light pressed step for a brand-tinted surface, the same tint as bg-surface-brand-hover, for presses that should barely deepen. Pair the label with text-brand-on-bg-surface-hover. For the standard pressed state use bg-surface-brand-pressed-strong. */
  val colorBgSurfaceBrandPressedSubtle: Color,
  /** Pressed state for a tappable brand-tinted container (bg-surface-brand). Pair the label with text-brand-on-bg-surface-pressed. For brand controls such as button presses and the selected chip use bg-fill-brand-subtlest-pressed; for a lighter press use bg-surface-brand-pressed-subtle. */
  val colorBgSurfaceBrandPressedStrong: Color,
  /** Solid brand fill for the highest-emphasis action — primary button default. Pair the label with text-brand-on-bg-fill. For a tinted brand control use bg-fill-brand-subtlest, and for a tinted brand container use bg-surface-brand. */
  val colorBgFillBrand: Color,
  /** Hover state for bg-fill-brand — primary button hover. */
  val colorBgFillBrandHover: Color,
  /** Pressed/active state for bg-fill-brand — primary button pressed. */
  val colorBgFillBrandPressed: Color,
  /** Lightest brand fill for a tinted brand control — the tertiary button at rest, the selected chip, the tinted segmented thumb, low-emphasis brand badges and the brand icon well of a list row. It also colours the hover of brand controls that are transparent at rest, such as checkbox, radio and text button. Pair the label with text-brand. For a brand container behind content use bg-surface-brand, and for a solid brand element use bg-fill-brand. */
  val colorBgFillBrandSubtlest: Color,
  /** Hover state for bg-fill-brand-subtlest — secondary, tertiary and selected chip hovers, and the press of brand controls that start transparent (checkbox, radio, text button, slider halo). Pair the label with text-brand-on-bg-fill-subtlest-hover. */
  val colorBgFillBrandSubtlestHover: Color,
  /** Pressed state for bg-fill-brand-subtlest — secondary and tertiary button presses, the pressed selected chip and its remove button, the pressed tinted segmented thumb. Pair the label with text-brand-on-bg-fill-subtlest-pressed. */
  val colorBgFillBrandSubtlestPressed: Color,
  /** Brand tint for a control on an inverted or dark background, always laid at an opacity token (the inverse tertiary fill and the inverse hover and pressed layers of Button). Never used solid; on light backgrounds use bg-fill-brand-subtlest. */
  val colorBgFillBrandInverse: Color,
  /** Brand-coloured label on a neutral or brand-tinted background — secondary, tertiary and text button labels, selected tab labels. On a solid brand fill use text-brand-on-bg-fill. */
  val colorTextBrand: Color,
  /** Hover state for text-brand. */
  val colorTextBrandHover: Color,
  /** Pressed/active state for text-brand. */
  val colorTextBrandPressed: Color,
  /** Brand label colour on a tinted brand container while hovered — the action of a neutral snackbar or light tooltip. Darker than text-brand so the label keeps AA as the surface deepens beneath it. For labels on tinted brand controls such as secondary, tertiary and text buttons use text-brand-on-bg-fill-subtlest-hover, and on a solid brand fill use text-brand-on-bg-fill. */
  val colorTextBrandOnBgSurfaceHover: Color,
  /** Brand label colour on a tinted brand surface while pressed. One step darker than text-brand-on-bg-surface-hover, matching the deeper surface underneath. */
  val colorTextBrandOnBgSurfacePressed: Color,
  /** Brand label colour on a tinted brand control while hovered (bg-fill-brand-subtlest-hover) — secondary, tertiary and text button labels and the selected chip. Darker than text-brand so the label keeps AA as the fill deepens. For a brand container such as a snackbar use text-brand-on-bg-surface-hover; for brand marks such as the Radio dot use text-brand-hover. */
  val colorTextBrandOnBgFillSubtlestHover: Color,
  /** Brand label colour on a tinted brand control while pressed (bg-fill-brand-subtlest-pressed). One step darker than text-brand-on-bg-fill-subtlest-hover, matching the deeper fill underneath. */
  val colorTextBrandOnBgFillSubtlestPressed: Color,
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
  /** Brand icon on a tinted brand container while hovered. Tracks text-brand-on-bg-surface-hover so icon and label stay one colour as the surface deepens. For icons in brand controls such as buttons and chips use icon-brand-on-bg-fill-subtlest-hover, and for a hovered brand icon on a neutral background use icon-brand-hover. */
  val colorIconBrandOnBgSurfaceHover: Color,
  /** Brand icon on a tinted brand container while pressed. Tracks text-brand-on-bg-surface-pressed so icon and label stay one colour as the surface deepens. For icons in brand controls such as buttons and chips use icon-brand-on-bg-fill-subtlest-pressed, and for a pressed brand icon on a neutral background use icon-brand-pressed. */
  val colorIconBrandOnBgSurfacePressed: Color,
  /** Brand icon in a tinted brand control while hovered — icons in secondary, tertiary and text buttons, the selected chip, and the hovered on-switch check. Tracks text-brand-on-bg-fill-subtlest-hover so icon and label stay one colour. For a hovered brand icon on a neutral background use icon-brand-hover. */
  val colorIconBrandOnBgFillSubtlestHover: Color,
  /** Brand icon in a tinted brand control while pressed. Tracks text-brand-on-bg-fill-subtlest-pressed so icon and label stay one colour. For a pressed brand icon on a neutral background use icon-brand-pressed. */
  val colorIconBrandOnBgFillSubtlestPressed: Color,
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
  /** Largest paragraph text — long reading on spacious screens, such as destination guides and articles. Regular weight, the default. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphLargeRegularFontFamily: String,
  /** Largest paragraph text — long reading on spacious screens, such as destination guides and articles. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphLargeBoldFontFamily: String,
  /** Largest paragraph text — long reading on spacious screens, such as destination guides and articles. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphLargeBoldFontWeight: Int,
  /** Default paragraph text — hotel and property descriptions, reviews, FAQ answers and policy details. Regular weight, the default. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphMediumRegularFontFamily: String,
  /** Default paragraph text — hotel and property descriptions, reviews, FAQ answers and policy details. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphMediumBoldFontFamily: String,
  /** Default paragraph text — hotel and property descriptions, reviews, FAQ answers and policy details. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphMediumBoldFontWeight: Int,
  /** Smallest paragraph text — terms and conditions, fare rules and other fine print. Regular weight, the default. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphSmallRegularFontFamily: String,
  /** Smallest paragraph text — terms and conditions, fare rules and other fine print. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphSmallBoldFontFamily: String,
  /** Smallest paragraph text — terms and conditions, fare rules and other fine print. Bold weight for emphasis within the role. Paragraph has looser leading than body so blocks of three or more lines stay easy to follow; use paragraph for text the user reads in full and body for short copy inside a component. */
  val paragraphSmallBoldFontWeight: Int,
  /** Largest body text — prominent short copy such as list row titles and input values. Regular weight, the default. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyLargeRegularFontFamily: String,
  /** Largest body text — prominent short copy such as list row titles and input values. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyLargeBoldFontFamily: String,
  /** Largest body text — prominent short copy such as list row titles and input values. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyLargeBoldFontWeight: Int,
  /** Largest body text — prominent short copy such as list row titles and input values. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyLargeBlackFontFamily: String,
  /** Largest body text — prominent short copy such as list row titles and input values. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyLargeBlackFontWeight: Int,
  /** Default body text — short copy inside components, such as list supporting text, snackbar messages and card details. Regular weight, the default. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyMediumRegularFontFamily: String,
  /** Default body text — short copy inside components, such as list supporting text, snackbar messages and card details. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyMediumBoldFontFamily: String,
  /** Default body text — short copy inside components, such as list supporting text, snackbar messages and card details. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyMediumBoldFontWeight: Int,
  /** Default body text — short copy inside components, such as list supporting text, snackbar messages and card details. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyMediumBlackFontFamily: String,
  /** Default body text — short copy inside components, such as list supporting text, snackbar messages and card details. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodyMediumBlackFontWeight: Int,
  /** Smallest body text — captions, helper and error text, and metadata. Regular weight, the default. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodySmallRegularFontFamily: String,
  /** Smallest body text — captions, helper and error text, and metadata. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodySmallBoldFontFamily: String,
  /** Smallest body text — captions, helper and error text, and metadata. Bold weight for emphasis within the role. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodySmallBoldFontWeight: Int,
  /** Smallest body text — captions, helper and error text, and metadata. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodySmallBlackFontFamily: String,
  /** Smallest body text — captions, helper and error text, and metadata. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body and label share the same metrics; use body for short copy inside a component, paragraph for text the user reads in full, and label for text that names a control. */
  val bodySmallBlackFontWeight: Int,
  /** Label for large controls — large buttons and inputs. Regular weight, the default. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelLargeRegularFontFamily: String,
  /** Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelLargeBoldFontFamily: String,
  /** Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelLargeBoldFontWeight: Int,
  /** Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelLargeBlackFontFamily: String,
  /** Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelLargeBlackFontWeight: Int,
  /** Default control label — medium buttons, inputs, tabs and chips. Regular weight, the default. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelMediumRegularFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelMediumBoldFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelMediumBoldFontWeight: Int,
  /** Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelMediumBlackFontFamily: String,
  /** Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelMediumBlackFontWeight: Int,
  /** Label for dense controls — small buttons, badges and table headers. Regular weight, the default. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelSmallRegularFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelSmallBoldFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelSmallBoldFontWeight: Int,
  /** Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
  val labelSmallBlackFontFamily: String,
  /** Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label and body share the same metrics; use label for text that names a control, and body or paragraph for text the user reads. */
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
  /** Outline of the active field, the one that has focus and receives typing, in the Active and Typing states. Drawn at border-width-active. A field in the error state keeps border-error-active instead. */
  val inputBorderActive: Color,
) {
  companion object {
    val MakeMyTrip = CosmosBrand(
      id = "mmt",
      name = "MakeMyTrip",
      colorBgSurfaceBrand = Color(0xFFEDFAFF),
      colorBgSurfaceBrandHover = Color(0xFFD6F3FF),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFD6F3FF),
      colorBgSurfaceBrandPressedStrong = Color(0xFFB5EAFF),
      colorBgFillBrand = Color(0xFF0088FF),
      colorBgFillBrandHover = Color(0xFF0868C5),
      colorBgFillBrandPressed = Color(0xFF0D589B),
      colorBgFillBrandSubtlest = Color(0xFFEDFAFF),
      colorBgFillBrandSubtlestHover = Color(0xFFD6F3FF),
      colorBgFillBrandSubtlestPressed = Color(0xFFB5EAFF),
      colorBgFillBrandInverse = Color(0xFF48BBFF),
      colorTextBrand = Color(0xFF0088FF),
      colorTextBrandHover = Color(0xFF0698FF),
      colorTextBrandPressed = Color(0xFF0868C5),
      colorTextBrandOnBgSurfaceHover = Color(0xFF0868C5),
      colorTextBrandOnBgSurfacePressed = Color(0xFF0D589B),
      colorTextBrandOnBgFillSubtlestHover = Color(0xFF0868C5),
      colorTextBrandOnBgFillSubtlestPressed = Color(0xFF0D589B),
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
      colorIconBrandOnBgFillSubtlestHover = Color(0xFF0868C5),
      colorIconBrandOnBgFillSubtlestPressed = Color(0xFF0D589B),
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
      paragraphLargeRegularFontFamily = "Lato",
      paragraphLargeBoldFontFamily = "Lato",
      paragraphLargeBoldFontWeight = 700,
      paragraphMediumRegularFontFamily = "Lato",
      paragraphMediumBoldFontFamily = "Lato",
      paragraphMediumBoldFontWeight = 700,
      paragraphSmallRegularFontFamily = "Lato",
      paragraphSmallBoldFontFamily = "Lato",
      paragraphSmallBoldFontWeight = 700,
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
      inputBorderActive = Color(0xFF0088FF),
    )

    val MyBiz = CosmosBrand(
      id = "mybiz",
      name = "myBiz",
      colorBgSurfaceBrand = Color(0xFFFFF2ED),
      colorBgSurfaceBrandHover = Color(0xFFFFE0D4),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFE0D4),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFBCA8),
      colorBgFillBrand = Color(0xFFFF4929),
      colorBgFillBrandHover = Color(0xFFFE2B11),
      colorBgFillBrandPressed = Color(0xFFEF1107),
      colorBgFillBrandSubtlest = Color(0xFFFFF2ED),
      colorBgFillBrandSubtlestHover = Color(0xFFFFE0D4),
      colorBgFillBrandSubtlestPressed = Color(0xFFFFBCA8),
      colorBgFillBrandInverse = Color(0xFFFF8F71),
      colorTextBrand = Color(0xFFFF4929),
      colorTextBrandHover = Color(0xFFFE2B11),
      colorTextBrandPressed = Color(0xFFEF1107),
      colorTextBrandOnBgSurfaceHover = Color(0xFFEF1107),
      colorTextBrandOnBgSurfacePressed = Color(0xFFC6080A),
      colorTextBrandOnBgFillSubtlestHover = Color(0xFFEF1107),
      colorTextBrandOnBgFillSubtlestPressed = Color(0xFFC6080A),
      colorTextBrandInverse = Color(0xFFFFBCA8),
      colorTextBrandInverseHover = Color(0xFFFFE0D4),
      colorTextBrandInversePressed = Color(0xFFFFF2ED),
      colorBorderBrand = Color(0xFFFF4929),
      colorBorderBrandHover = Color(0xFFFE2B11),
      colorBorderBrandPressed = Color(0xFFEF1107),
      colorBorderBrandInverse = Color(0xFFFF8F71),
      colorBorderBrandInverseHover = Color(0xFFFFBCA8),
      colorBorderBrandInversePressed = Color(0xFFFFE0D4),
      colorIconBrand = Color(0xFFFF4929),
      colorIconBrandHover = Color(0xFFFE2B11),
      colorIconBrandPressed = Color(0xFFEF1107),
      colorIconBrandOnBgSurfaceHover = Color(0xFFEF1107),
      colorIconBrandOnBgSurfacePressed = Color(0xFFC6080A),
      colorIconBrandOnBgFillSubtlestHover = Color(0xFFEF1107),
      colorIconBrandOnBgFillSubtlestPressed = Color(0xFFC6080A),
      colorIconBrandInverse = Color(0xFFFF8F71),
      colorIconBrandInverseHover = Color(0xFFFFBCA8),
      colorIconBrandInversePressed = Color(0xFFFFE0D4),
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
      paragraphLargeRegularFontFamily = "Lato",
      paragraphLargeBoldFontFamily = "Lato",
      paragraphLargeBoldFontWeight = 700,
      paragraphMediumRegularFontFamily = "Lato",
      paragraphMediumBoldFontFamily = "Lato",
      paragraphMediumBoldFontWeight = 700,
      paragraphSmallRegularFontFamily = "Lato",
      paragraphSmallBoldFontFamily = "Lato",
      paragraphSmallBoldFontWeight = 700,
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
      buttonBgPrimaryDefault = Color(0xFFFF4929),
      buttonBgPrimaryHover = Color(0xFFFE2B11),
      buttonBgPrimaryPressed = Color(0xFFEF1107),
      buttonBgPrimaryInverseDefault = Color(0xFFFF4929),
      buttonBgPrimaryInverseHover = Color(0xFFFE2B11),
      buttonBgPrimaryInversePressed = Color(0xFFEF1107),
      buttonBgSecondaryHover = Color(0xFFFFE0D4),
      buttonBgSecondaryPressed = Color(0xFFFFBCA8),
      buttonBgSecondaryInverseHover = Color(0xFFFF8F71),
      buttonBgSecondaryInversePressed = Color(0xFFFF8F71),
      buttonBgTertiaryDefault = Color(0xFFFFF2ED),
      buttonBgTertiaryHover = Color(0xFFFFE0D4),
      buttonBgTertiaryPressed = Color(0xFFFFBCA8),
      buttonBgTertiaryInverseDefault = Color(0xFFFF8F71),
      buttonBgTertiaryInverseHover = Color(0xFFFF8F71),
      buttonBgTertiaryInversePressed = Color(0xFFFF8F71),
      buttonBgTextHover = Color(0xFFFFF2ED),
      buttonBgTextPressed = Color(0xFFFFE0D4),
      buttonBgTextInverseHover = Color(0xFFFF8F71),
      buttonBgTextInversePressed = Color(0xFFFF8F71),
      buttonBorderSecondaryDefault = Color(0xFFFF4929),
      buttonBorderSecondaryHover = Color(0xFFFE2B11),
      buttonBorderSecondaryPressed = Color(0xFFEF1107),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF8F71),
      buttonBorderSecondaryInverseHover = Color(0xFFFFBCA8),
      buttonBorderSecondaryInversePressed = Color(0xFFFFE0D4),
      buttonFocusRing = Color(0xFFFF4929),
      buttonFocusRingInverse = Color(0xFFFF8F71),
      buttonIconSecondaryDefault = Color(0xFFFF4929),
      buttonIconSecondaryHover = Color(0xFFEF1107),
      buttonIconSecondaryPressed = Color(0xFFC6080A),
      buttonIconSecondaryInverseDefault = Color(0xFFFF8F71),
      buttonIconSecondaryInverseHover = Color(0xFFFFBCA8),
      buttonIconSecondaryInversePressed = Color(0xFFFFE0D4),
      buttonIconTertiaryDefault = Color(0xFFFF4929),
      buttonIconTertiaryHover = Color(0xFFEF1107),
      buttonIconTertiaryPressed = Color(0xFFC6080A),
      buttonIconTertiaryInverseDefault = Color(0xFFFF8F71),
      buttonIconTertiaryInverseHover = Color(0xFFFFBCA8),
      buttonIconTertiaryInversePressed = Color(0xFFFFE0D4),
      buttonIconTextDefault = Color(0xFFFF4929),
      buttonIconTextHover = Color(0xFFEF1107),
      buttonIconTextPressed = Color(0xFFC6080A),
      buttonIconTextInverseDefault = Color(0xFFFF8F71),
      buttonIconTextInverseHover = Color(0xFFFFBCA8),
      buttonIconTextInversePressed = Color(0xFFFFE0D4),
      buttonLabelSecondaryDefault = Color(0xFFFF4929),
      buttonLabelSecondaryHover = Color(0xFFEF1107),
      buttonLabelSecondaryPressed = Color(0xFFC6080A),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFBCA8),
      buttonLabelSecondaryInverseHover = Color(0xFFFFE0D4),
      buttonLabelSecondaryInversePressed = Color(0xFFFFF2ED),
      buttonLabelTertiaryDefault = Color(0xFFFF4929),
      buttonLabelTertiaryHover = Color(0xFFEF1107),
      buttonLabelTertiaryPressed = Color(0xFFC6080A),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFBCA8),
      buttonLabelTertiaryInverseHover = Color(0xFFFFE0D4),
      buttonLabelTertiaryInversePressed = Color(0xFFFFF2ED),
      buttonLabelTextDefault = Color(0xFFFF4929),
      buttonLabelTextHover = Color(0xFFEF1107),
      buttonLabelTextPressed = Color(0xFFC6080A),
      buttonLabelTextInverseDefault = Color(0xFFFFBCA8),
      buttonLabelTextInverseHover = Color(0xFFFFE0D4),
      buttonLabelTextInversePressed = Color(0xFFFFF2ED),
      checkboxBgUnselectedHover = Color(0xFFFFF2ED),
      checkboxBgUnselectedPressed = Color(0xFFFFE0D4),
      checkboxBgSelectedDefault = Color(0xFFFF4929),
      checkboxBgSelectedHover = Color(0xFFFE2B11),
      checkboxBgSelectedPressed = Color(0xFFEF1107),
      checkboxBorderUnselectedHover = Color(0xFFFF4929),
      checkboxBorderUnselectedPressed = Color(0xFFEF1107),
      checkboxBorderSelectedDefault = Color(0xFFFF4929),
      radioBgHover = Color(0xFFFFF2ED),
      radioBgPressed = Color(0xFFFFE0D4),
      radioBorderUnselectedHover = Color(0xFFFF4929),
      radioBorderUnselectedPressed = Color(0xFFEF1107),
      radioBorderSelectedDefault = Color(0xFFFF4929),
      radioBorderSelectedHover = Color(0xFFFE2B11),
      radioBorderSelectedPressed = Color(0xFFEF1107),
      radioDotSelectedDefault = Color(0xFFFF4929),
      radioDotSelectedHover = Color(0xFFFE2B11),
      radioDotSelectedPressed = Color(0xFFEF1107),
      radioStateLayerSelected = Color(0xFFFF4929),
      chipBgSelectedDefault = Color(0xFFFFF2ED),
      chipBgSelectedHover = Color(0xFFFFE0D4),
      chipBgSelectedPressed = Color(0xFFFFBCA8),
      chipBorderSelectedDefault = Color(0xFFFF4929),
      chipBorderSelectedHover = Color(0xFFFE2B11),
      chipBorderSelectedPressed = Color(0xFFEF1107),
      chipLabelSelectedDefault = Color(0xFFFF4929),
      chipLabelSelectedHover = Color(0xFFEF1107),
      chipLabelSelectedPressed = Color(0xFFC6080A),
      chipIconSelectedDefault = Color(0xFFFF4929),
      chipIconSelectedHover = Color(0xFFEF1107),
      chipIconSelectedPressed = Color(0xFFC6080A),
      chipRemoveBgSelectedHover = Color(0xFFFFBCA8),
      chipRemoveBgSelectedPressed = Color(0xFFFFBCA8),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFFF4929),
      snackbarLabelControlTintedNeutralHover = Color(0xFFEF1107),
      snackbarLabelControlTintedNeutralPressed = Color(0xFFC6080A),
      badgeBgStrongBrand = Color(0xFFFF4929),
      badgeBgSubtleBrand = Color(0xFFFFF2ED),
      badgeLabelSubtleBrand = Color(0xFFFF4929),
      badgeDotBrand = Color(0xFFFF4929),
      tabLabelSelectedDefault = Color(0xFFFF4929),
      tabLabelSelectedHover = Color(0xFFFF4929),
      tabLabelSelectedPressed = Color(0xFFEF1107),
      tabIconSelectedDefault = Color(0xFFFF4929),
      tabIconSelectedHover = Color(0xFFFF4929),
      tabIconSelectedPressed = Color(0xFFEF1107),
      tabIndicatorDefault = Color(0xFFFF4929),
      listLeadingContainerBgBrand = Color(0xFFFFF2ED),
      listLeadingContainerIconBrand = Color(0xFFFF4929),
      switchTrackOnDefault = Color(0xFFFF4929),
      switchTrackOnHover = Color(0xFFFE2B11),
      switchTrackOnPressed = Color(0xFFEF1107),
      switchIconOnDefault = Color(0xFFFF4929),
      switchIconOnHover = Color(0xFFEF1107),
      switchIconOnPressed = Color(0xFFC6080A),
      switchOutlinedIconOn = Color(0xFFFF4929),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFFF4929),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFFEF1107),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFFF4929),
      segmentedControlNeutralIconSelectedPressed = Color(0xFFEF1107),
      segmentedControlBrandThumbDefault = Color(0xFFFF4929),
      segmentedControlBrandThumbPressed = Color(0xFFEF1107),
      segmentedControlTintedThumbDefault = Color(0xFFFFF2ED),
      segmentedControlTintedThumbPressed = Color(0xFFFFBCA8),
      segmentedControlTintedThumbBorderDefault = Color(0xFFFF4929),
      segmentedControlTintedThumbBorderPressed = Color(0xFFEF1107),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFFF4929),
      segmentedControlTintedLabelSelectedPressed = Color(0xFFC6080A),
      segmentedControlTintedIconSelectedDefault = Color(0xFFFF4929),
      segmentedControlTintedIconSelectedPressed = Color(0xFFC6080A),
      sliderTrackActive = Color(0xFFFF4929),
      sliderHaloHover = Color(0xFFFFF2ED),
      sliderHaloPressed = Color(0xFFFFE0D4),
      menuCheckDefault = Color(0xFFFF4929),
      menuCheckPressed = Color(0xFFEF1107),
      tooltipPrimaryLabelLight = Color(0xFFFF4929),
      tooltipPrimaryLabelLightHover = Color(0xFFEF1107),
      tooltipPrimaryLabelLightPressed = Color(0xFFC6080A),
      inputBorderActive = Color(0xFFFF4929),
    )

    val Goibibo = CosmosBrand(
      id = "goibibo",
      name = "Goibibo",
      colorBgSurfaceBrand = Color(0xFFFFF7EC),
      colorBgSurfaceBrandHover = Color(0xFFFFEDD3),
      colorBgSurfaceBrandPressedSubtle = Color(0xFFFFEDD3),
      colorBgSurfaceBrandPressedStrong = Color(0xFFFFD7A5),
      colorBgFillBrand = Color(0xFFF45900),
      colorBgFillBrandHover = Color(0xFFCC4102),
      colorBgFillBrandPressed = Color(0xFFA1340B),
      colorBgFillBrandSubtlest = Color(0xFFFFF7EC),
      colorBgFillBrandSubtlestHover = Color(0xFFFFEDD3),
      colorBgFillBrandSubtlestPressed = Color(0xFFFFD7A5),
      colorBgFillBrandInverse = Color(0xFFFF9332),
      colorTextBrand = Color(0xFFF45900),
      colorTextBrandHover = Color(0xFFCC4102),
      colorTextBrandPressed = Color(0xFFA1340B),
      colorTextBrandOnBgSurfaceHover = Color(0xFFA1340B),
      colorTextBrandOnBgSurfacePressed = Color(0xFF822D0C),
      colorTextBrandOnBgFillSubtlestHover = Color(0xFFA1340B),
      colorTextBrandOnBgFillSubtlestPressed = Color(0xFF822D0C),
      colorTextBrandInverse = Color(0xFFFFBB6D),
      colorTextBrandInverseHover = Color(0xFFFFD7A5),
      colorTextBrandInversePressed = Color(0xFFFFEDD3),
      colorBorderBrand = Color(0xFFF45900),
      colorBorderBrandHover = Color(0xFFCC4102),
      colorBorderBrandPressed = Color(0xFFA1340B),
      colorBorderBrandInverse = Color(0xFFFF9332),
      colorBorderBrandInverseHover = Color(0xFFFFBB6D),
      colorBorderBrandInversePressed = Color(0xFFFFD7A5),
      colorIconBrand = Color(0xFFF45900),
      colorIconBrandHover = Color(0xFFCC4102),
      colorIconBrandPressed = Color(0xFFA1340B),
      colorIconBrandOnBgSurfaceHover = Color(0xFFA1340B),
      colorIconBrandOnBgSurfacePressed = Color(0xFF822D0C),
      colorIconBrandOnBgFillSubtlestHover = Color(0xFFA1340B),
      colorIconBrandOnBgFillSubtlestPressed = Color(0xFF822D0C),
      colorIconBrandInverse = Color(0xFFFF9332),
      colorIconBrandInverseHover = Color(0xFFFFBB6D),
      colorIconBrandInversePressed = Color(0xFFFFD7A5),
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
      paragraphLargeRegularFontFamily = "Rubik",
      paragraphLargeBoldFontFamily = "Rubik",
      paragraphLargeBoldFontWeight = 600,
      paragraphMediumRegularFontFamily = "Rubik",
      paragraphMediumBoldFontFamily = "Rubik",
      paragraphMediumBoldFontWeight = 600,
      paragraphSmallRegularFontFamily = "Rubik",
      paragraphSmallBoldFontFamily = "Rubik",
      paragraphSmallBoldFontWeight = 600,
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
      buttonBgPrimaryDefault = Color(0xFFF45900),
      buttonBgPrimaryHover = Color(0xFFCC4102),
      buttonBgPrimaryPressed = Color(0xFFA1340B),
      buttonBgPrimaryInverseDefault = Color(0xFFF45900),
      buttonBgPrimaryInverseHover = Color(0xFFCC4102),
      buttonBgPrimaryInversePressed = Color(0xFFA1340B),
      buttonBgSecondaryHover = Color(0xFFFFEDD3),
      buttonBgSecondaryPressed = Color(0xFFFFD7A5),
      buttonBgSecondaryInverseHover = Color(0xFFFF9332),
      buttonBgSecondaryInversePressed = Color(0xFFFF9332),
      buttonBgTertiaryDefault = Color(0xFFFFF7EC),
      buttonBgTertiaryHover = Color(0xFFFFEDD3),
      buttonBgTertiaryPressed = Color(0xFFFFD7A5),
      buttonBgTertiaryInverseDefault = Color(0xFFFF9332),
      buttonBgTertiaryInverseHover = Color(0xFFFF9332),
      buttonBgTertiaryInversePressed = Color(0xFFFF9332),
      buttonBgTextHover = Color(0xFFFFF7EC),
      buttonBgTextPressed = Color(0xFFFFEDD3),
      buttonBgTextInverseHover = Color(0xFFFF9332),
      buttonBgTextInversePressed = Color(0xFFFF9332),
      buttonBorderSecondaryDefault = Color(0xFFF45900),
      buttonBorderSecondaryHover = Color(0xFFCC4102),
      buttonBorderSecondaryPressed = Color(0xFFA1340B),
      buttonBorderSecondaryInverseDefault = Color(0xFFFF9332),
      buttonBorderSecondaryInverseHover = Color(0xFFFFBB6D),
      buttonBorderSecondaryInversePressed = Color(0xFFFFD7A5),
      buttonFocusRing = Color(0xFFF45900),
      buttonFocusRingInverse = Color(0xFFFF9332),
      buttonIconSecondaryDefault = Color(0xFFF45900),
      buttonIconSecondaryHover = Color(0xFFA1340B),
      buttonIconSecondaryPressed = Color(0xFF822D0C),
      buttonIconSecondaryInverseDefault = Color(0xFFFF9332),
      buttonIconSecondaryInverseHover = Color(0xFFFFBB6D),
      buttonIconSecondaryInversePressed = Color(0xFFFFD7A5),
      buttonIconTertiaryDefault = Color(0xFFF45900),
      buttonIconTertiaryHover = Color(0xFFA1340B),
      buttonIconTertiaryPressed = Color(0xFF822D0C),
      buttonIconTertiaryInverseDefault = Color(0xFFFF9332),
      buttonIconTertiaryInverseHover = Color(0xFFFFBB6D),
      buttonIconTertiaryInversePressed = Color(0xFFFFD7A5),
      buttonIconTextDefault = Color(0xFFF45900),
      buttonIconTextHover = Color(0xFFA1340B),
      buttonIconTextPressed = Color(0xFF822D0C),
      buttonIconTextInverseDefault = Color(0xFFFF9332),
      buttonIconTextInverseHover = Color(0xFFFFBB6D),
      buttonIconTextInversePressed = Color(0xFFFFD7A5),
      buttonLabelSecondaryDefault = Color(0xFFF45900),
      buttonLabelSecondaryHover = Color(0xFFA1340B),
      buttonLabelSecondaryPressed = Color(0xFF822D0C),
      buttonLabelSecondaryInverseDefault = Color(0xFFFFBB6D),
      buttonLabelSecondaryInverseHover = Color(0xFFFFD7A5),
      buttonLabelSecondaryInversePressed = Color(0xFFFFEDD3),
      buttonLabelTertiaryDefault = Color(0xFFF45900),
      buttonLabelTertiaryHover = Color(0xFFA1340B),
      buttonLabelTertiaryPressed = Color(0xFF822D0C),
      buttonLabelTertiaryInverseDefault = Color(0xFFFFBB6D),
      buttonLabelTertiaryInverseHover = Color(0xFFFFD7A5),
      buttonLabelTertiaryInversePressed = Color(0xFFFFEDD3),
      buttonLabelTextDefault = Color(0xFFF45900),
      buttonLabelTextHover = Color(0xFFA1340B),
      buttonLabelTextPressed = Color(0xFF822D0C),
      buttonLabelTextInverseDefault = Color(0xFFFFBB6D),
      buttonLabelTextInverseHover = Color(0xFFFFD7A5),
      buttonLabelTextInversePressed = Color(0xFFFFEDD3),
      checkboxBgUnselectedHover = Color(0xFFFFF7EC),
      checkboxBgUnselectedPressed = Color(0xFFFFEDD3),
      checkboxBgSelectedDefault = Color(0xFFF45900),
      checkboxBgSelectedHover = Color(0xFFCC4102),
      checkboxBgSelectedPressed = Color(0xFFA1340B),
      checkboxBorderUnselectedHover = Color(0xFFF45900),
      checkboxBorderUnselectedPressed = Color(0xFFA1340B),
      checkboxBorderSelectedDefault = Color(0xFFF45900),
      radioBgHover = Color(0xFFFFF7EC),
      radioBgPressed = Color(0xFFFFEDD3),
      radioBorderUnselectedHover = Color(0xFFF45900),
      radioBorderUnselectedPressed = Color(0xFFA1340B),
      radioBorderSelectedDefault = Color(0xFFF45900),
      radioBorderSelectedHover = Color(0xFFCC4102),
      radioBorderSelectedPressed = Color(0xFFA1340B),
      radioDotSelectedDefault = Color(0xFFF45900),
      radioDotSelectedHover = Color(0xFFCC4102),
      radioDotSelectedPressed = Color(0xFFA1340B),
      radioStateLayerSelected = Color(0xFFF45900),
      chipBgSelectedDefault = Color(0xFFFFF7EC),
      chipBgSelectedHover = Color(0xFFFFEDD3),
      chipBgSelectedPressed = Color(0xFFFFD7A5),
      chipBorderSelectedDefault = Color(0xFFF45900),
      chipBorderSelectedHover = Color(0xFFCC4102),
      chipBorderSelectedPressed = Color(0xFFA1340B),
      chipLabelSelectedDefault = Color(0xFFF45900),
      chipLabelSelectedHover = Color(0xFFA1340B),
      chipLabelSelectedPressed = Color(0xFF822D0C),
      chipIconSelectedDefault = Color(0xFFF45900),
      chipIconSelectedHover = Color(0xFFA1340B),
      chipIconSelectedPressed = Color(0xFF822D0C),
      chipRemoveBgSelectedHover = Color(0xFFFFD7A5),
      chipRemoveBgSelectedPressed = Color(0xFFFFD7A5),
      snackbarLabelControlTintedNeutralDefault = Color(0xFFF45900),
      snackbarLabelControlTintedNeutralHover = Color(0xFFA1340B),
      snackbarLabelControlTintedNeutralPressed = Color(0xFF822D0C),
      badgeBgStrongBrand = Color(0xFFF45900),
      badgeBgSubtleBrand = Color(0xFFFFF7EC),
      badgeLabelSubtleBrand = Color(0xFFF45900),
      badgeDotBrand = Color(0xFFF45900),
      tabLabelSelectedDefault = Color(0xFFF45900),
      tabLabelSelectedHover = Color(0xFFF45900),
      tabLabelSelectedPressed = Color(0xFFA1340B),
      tabIconSelectedDefault = Color(0xFFF45900),
      tabIconSelectedHover = Color(0xFFF45900),
      tabIconSelectedPressed = Color(0xFFA1340B),
      tabIndicatorDefault = Color(0xFFF45900),
      listLeadingContainerBgBrand = Color(0xFFFFF7EC),
      listLeadingContainerIconBrand = Color(0xFFF45900),
      switchTrackOnDefault = Color(0xFFF45900),
      switchTrackOnHover = Color(0xFFCC4102),
      switchTrackOnPressed = Color(0xFFA1340B),
      switchIconOnDefault = Color(0xFFF45900),
      switchIconOnHover = Color(0xFFA1340B),
      switchIconOnPressed = Color(0xFF822D0C),
      switchOutlinedIconOn = Color(0xFFF45900),
      segmentedControlNeutralLabelSelectedDefault = Color(0xFFF45900),
      segmentedControlNeutralLabelSelectedPressed = Color(0xFFA1340B),
      segmentedControlNeutralIconSelectedDefault = Color(0xFFF45900),
      segmentedControlNeutralIconSelectedPressed = Color(0xFFA1340B),
      segmentedControlBrandThumbDefault = Color(0xFFF45900),
      segmentedControlBrandThumbPressed = Color(0xFFA1340B),
      segmentedControlTintedThumbDefault = Color(0xFFFFF7EC),
      segmentedControlTintedThumbPressed = Color(0xFFFFD7A5),
      segmentedControlTintedThumbBorderDefault = Color(0xFFF45900),
      segmentedControlTintedThumbBorderPressed = Color(0xFFA1340B),
      segmentedControlTintedLabelSelectedDefault = Color(0xFFF45900),
      segmentedControlTintedLabelSelectedPressed = Color(0xFF822D0C),
      segmentedControlTintedIconSelectedDefault = Color(0xFFF45900),
      segmentedControlTintedIconSelectedPressed = Color(0xFF822D0C),
      sliderTrackActive = Color(0xFFF45900),
      sliderHaloHover = Color(0xFFFFF7EC),
      sliderHaloPressed = Color(0xFFFFEDD3),
      menuCheckDefault = Color(0xFFF45900),
      menuCheckPressed = Color(0xFFA1340B),
      tooltipPrimaryLabelLight = Color(0xFFF45900),
      tooltipPrimaryLabelLightHover = Color(0xFFA1340B),
      tooltipPrimaryLabelLightPressed = Color(0xFF822D0C),
      inputBorderActive = Color(0xFFF45900),
    )

    val all = listOf(MakeMyTrip, MyBiz, Goibibo)
  }
}

/** The brand of this part of the composition. Defaults to MakeMyTrip. */
val LocalCosmosBrand = staticCompositionLocalOf { CosmosBrand.MakeMyTrip }
