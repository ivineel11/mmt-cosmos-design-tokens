//
// CosmosBrand.swift
//

// Do not edit directly, this file was auto-generated.

import SwiftUI

/// The tokens that change with the brand. Every other token is the same in every brand
/// and stays on `CosmosTokens`. Read these from the environment, so one line switches a
/// whole screen:
///
///     MyBizFlow().environment(\.cosmosBrand, .goibibo)
///
///     @Environment(\.cosmosBrand) private var brand
///     Rectangle().fill(brand.colorBgFillBrand)
public struct CosmosBrand: Identifiable, Sendable {
    public let id: String
    public let name: String

    /// Brand-tinted container — tertiary button default, selected list rows, brand callouts. This is a background behind content; for a solid brand element such as a primary button use bg-fill-brand.
    public let colorBgSurfaceBrand: Color

    /// Hover state for bg-surface-brand, and the hover background for brand controls that are transparent at rest (secondary and text buttons).
    public let colorBgSurfaceBrandHover: Color

    /// Light pressed step for a brand-tinted surface, the same tint as bg-surface-brand-hover, for presses that should barely deepen. Pair the label with text-brand-on-bg-surface-hover. For the standard pressed state use bg-surface-brand-pressed-strong.
    public let colorBgSurfaceBrandPressedSubtle: Color

    /// Pressed state for bg-surface-brand and for brand controls that are transparent at rest — secondary and tertiary button presses, the selected chip. Pair the label with text-brand-on-bg-surface-pressed. For a lighter press use bg-surface-brand-pressed-subtle.
    public let colorBgSurfaceBrandPressedStrong: Color

    /// Brand tint for a control on an inverted or dark background, always laid at an opacity token (the inverse tertiary fill and the inverse hover and pressed layers of Button). Never used solid; on light backgrounds use bg-surface-brand.
    public let colorBgSurfaceBrandInverse: Color

    /// Solid brand fill for the highest-emphasis action — primary button default. Pair the label with text-brand-on-bg-fill. For a tinted brand background use bg-surface-brand.
    public let colorBgFillBrand: Color

    /// Hover state for bg-fill-brand — primary button hover.
    public let colorBgFillBrandHover: Color

    /// Pressed/active state for bg-fill-brand — primary button pressed.
    public let colorBgFillBrandPressed: Color

    /// Brand-coloured label on a neutral or brand-tinted background — secondary, tertiary and text button labels, selected tab labels. On a solid brand fill use text-brand-on-bg-fill.
    public let colorTextBrand: Color

    /// Hover state for text-brand.
    public let colorTextBrandHover: Color

    /// Pressed/active state for text-brand.
    public let colorTextBrandPressed: Color

    /// Brand label colour on a tinted brand surface while hovered — the secondary, tertiary and text button labels. Darker than text-brand so the label keeps AA as the surface deepens beneath it. For a label on a solid brand fill use text-brand-on-bg-fill; for brand foreground marks such as the Radio dot use text-brand-hover, which tracks border-brand-hover instead.
    public let colorTextBrandOnBgSurfaceHover: Color

    /// Brand label colour on a tinted brand surface while pressed. One step darker than text-brand-on-bg-surface-hover, matching the deeper surface underneath.
    public let colorTextBrandOnBgSurfacePressed: Color

    /// Brand text on an inverted or dark background, such as the label of a secondary, tertiary or text button on a dark banner. Lighter than text-brand so it holds AA on near black and navy; on light backgrounds use text-brand. For inline links use text-link-inverse.
    public let colorTextBrandInverse: Color

    /// Brand text on an inverted or dark background while its control is hovered. One step lighter than text-brand-inverse, the mirror of light, where hover darkens.
    public let colorTextBrandInverseHover: Color

    /// Brand text on an inverted or dark background while its control is pressed. Two steps lighter than text-brand-inverse so the press reads against the deeper tint.
    public let colorTextBrandInversePressed: Color

    /// Brand border on an unfilled control — secondary button default, selected card outline.
    public let colorBorderBrand: Color

    /// Hover state for border-brand.
    public let colorBorderBrandHover: Color

    /// Pressed/active state for border-brand.
    public let colorBorderBrandPressed: Color

    /// Brand outline on an inverted or dark background, such as an inverse secondary button or the inverse focus ring. One step deeper than text-brand-inverse so the edge reads crisp; on light backgrounds use border-brand.
    public let colorBorderBrandInverse: Color

    /// Brand outline on an inverted or dark background while its control is hovered. One step lighter than border-brand-inverse.
    public let colorBorderBrandInverseHover: Color

    /// Brand outline on an inverted or dark background while its control is pressed. Two steps lighter than border-brand-inverse.
    public let colorBorderBrandInversePressed: Color

    /// Brand-coloured icon on a neutral or brand-tinted background. On a solid brand fill use icon-brand-on-bg-fill.
    public let colorIconBrand: Color

    /// Hovered brand icon on a neutral background, tracking text-brand-hover and border-brand-hover. On a tinted brand surface keep the icon in step with the label instead.
    public let colorIconBrandHover: Color

    /// Pressed brand icon on a neutral background, tracking text-brand-pressed and border-brand-pressed.
    public let colorIconBrandPressed: Color

    /// Brand icon on a tinted brand surface while hovered — the icons in secondary, tertiary and text buttons. Tracks text-brand-on-bg-surface-hover so icon and label stay one colour as the surface deepens. For a hovered brand icon on a neutral background use icon-brand-hover.
    public let colorIconBrandOnBgSurfaceHover: Color

    /// Brand icon on a tinted brand surface while pressed — the icons in secondary, tertiary and text buttons. Tracks text-brand-on-bg-surface-pressed so icon and label stay one colour as the surface deepens. For a pressed brand icon on a neutral background use icon-brand-pressed.
    public let colorIconBrandOnBgSurfacePressed: Color

    /// Brand icon on an inverted or dark background, such as the glyph of an inverse secondary, tertiary or text button. One step deeper than text-brand-inverse, like the other inverse icons; for an info status icon use icon-info-inverse.
    public let colorIconBrandInverse: Color

    /// Brand icon on an inverted or dark background while its control is hovered. One step lighter than icon-brand-inverse.
    public let colorIconBrandInverseHover: Color

    /// Brand icon on an inverted or dark background while its control is pressed. Two steps lighter than icon-brand-inverse.
    public let colorIconBrandInversePressed: Color

    /// Typeface of every text style, and the one token a brand changes to swap its font. Apply a text style rather than this token, so size, line height and weight come with it.
    public let typefaceDefault: String

    /// Weight of every bold text style, for emphasis in running text and every Button label. A brand sets its own emphasis weight here, so reach it through a bold text style. For promotional emphasis use the black styles, which read weight.black.
    public let weightBold: Int

    /// Weight of every black text style, the heaviest a brand offers, for promotional and marketing emphasis rather than routine UI. For everyday emphasis use the bold styles, which read weight.bold.
    public let weightBlack: Int

    /// Largest headline — page titles and hero headings; typically one per view. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineLargeRegularFontFamily: String

    /// Largest headline — page titles and hero headings; typically one per view. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineLargeBoldFontFamily: String

    /// Largest headline — page titles and hero headings; typically one per view. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineLargeBoldFontWeight: Int

    /// Largest headline — page titles and hero headings; typically one per view. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineLargeBlackFontFamily: String

    /// Largest headline — page titles and hero headings; typically one per view. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineLargeBlackFontWeight: Int

    /// Headline for major section headings. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineMediumRegularFontFamily: String

    /// Headline for major section headings. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineMediumBoldFontFamily: String

    /// Headline for major section headings. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineMediumBoldFontWeight: Int

    /// Headline for major section headings. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineMediumBlackFontFamily: String

    /// Headline for major section headings. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineMediumBlackFontWeight: Int

    /// Smallest headline — sub-section headings and modal titles. Regular weight, the default. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineSmallRegularFontFamily: String

    /// Smallest headline — sub-section headings and modal titles. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineSmallBoldFontFamily: String

    /// Smallest headline — sub-section headings and modal titles. Bold weight for emphasis within the role. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineSmallBoldFontWeight: Int

    /// Smallest headline — sub-section headings and modal titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineSmallBlackFontFamily: String

    /// Smallest headline — sub-section headings and modal titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Reserve headline for page-level hierarchy; for the title of a contained element use the title styles.
    public let headlineSmallBlackFontWeight: Int

    /// Largest title — card, sheet and dialog titles. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleLargeRegularFontFamily: String

    /// Largest title — card, sheet and dialog titles. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleLargeBoldFontFamily: String

    /// Largest title — card, sheet and dialog titles. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleLargeBoldFontWeight: Int

    /// Largest title — card, sheet and dialog titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleLargeBlackFontFamily: String

    /// Largest title — card, sheet and dialog titles. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleLargeBlackFontWeight: Int

    /// Title for sub-sections and list-group headers. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleMediumRegularFontFamily: String

    /// Title for sub-sections and list-group headers. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleMediumBoldFontFamily: String

    /// Title for sub-sections and list-group headers. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleMediumBoldFontWeight: Int

    /// Title for sub-sections and list-group headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleMediumBlackFontFamily: String

    /// Title for sub-sections and list-group headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleMediumBlackFontWeight: Int

    /// Smallest title — compact card headers and table column groups. Regular weight, the default. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleSmallRegularFontFamily: String

    /// Smallest title — compact card headers and table column groups. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleSmallBoldFontFamily: String

    /// Smallest title — compact card headers and table column groups. Bold weight for emphasis within the role. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleSmallBoldFontWeight: Int

    /// Smallest title — compact card headers and table column groups. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleSmallBlackFontFamily: String

    /// Smallest title — compact card headers and table column groups. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Titles name a contained piece of UI; for page-level hierarchy use the headline styles.
    public let titleSmallBlackFontWeight: Int

    /// Body text for spacious reading layouts — article and detail copy. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyLargeRegularFontFamily: String

    /// Body text for spacious reading layouts — article and detail copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyLargeBoldFontFamily: String

    /// Body text for spacious reading layouts — article and detail copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyLargeBoldFontWeight: Int

    /// Body text for spacious reading layouts — article and detail copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyLargeBlackFontFamily: String

    /// Body text for spacious reading layouts — article and detail copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyLargeBlackFontWeight: Int

    /// Default body text — the running copy most content uses. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyMediumRegularFontFamily: String

    /// Default body text — the running copy most content uses. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyMediumBoldFontFamily: String

    /// Default body text — the running copy most content uses. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyMediumBoldFontWeight: Int

    /// Default body text — the running copy most content uses. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyMediumBlackFontFamily: String

    /// Default body text — the running copy most content uses. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodyMediumBlackFontWeight: Int

    /// Smallest body text — captions, helper text and legal copy. Regular weight, the default. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodySmallRegularFontFamily: String

    /// Smallest body text — captions, helper text and legal copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodySmallBoldFontFamily: String

    /// Smallest body text — captions, helper text and legal copy. Bold weight for emphasis within the role. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodySmallBoldFontWeight: Int

    /// Smallest body text — captions, helper text and legal copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodySmallBlackFontFamily: String

    /// Smallest body text — captions, helper text and legal copy. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Body has looser leading than label because it runs over several lines; use body for prose the user reads and label for text that names a control.
    public let bodySmallBlackFontWeight: Int

    /// Label for large controls — large buttons and inputs. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelLargeRegularFontFamily: String

    /// Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelLargeBoldFontFamily: String

    /// Label for large controls — large buttons and inputs. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelLargeBoldFontWeight: Int

    /// Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelLargeBlackFontFamily: String

    /// Label for large controls — large buttons and inputs. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelLargeBlackFontWeight: Int

    /// Default control label — medium buttons, inputs, tabs and chips. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelMediumRegularFontFamily: String

    /// Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelMediumBoldFontFamily: String

    /// Default control label — medium buttons, inputs, tabs and chips. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelMediumBoldFontWeight: Int

    /// Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelMediumBlackFontFamily: String

    /// Default control label — medium buttons, inputs, tabs and chips. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelMediumBlackFontWeight: Int

    /// Label for dense controls — small buttons, badges and table headers. Regular weight, the default. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelSmallRegularFontFamily: String

    /// Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelSmallBoldFontFamily: String

    /// Label for dense controls — small buttons, badges and table headers. Bold weight for emphasis within the role. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelSmallBoldFontWeight: Int

    /// Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelSmallBlackFontFamily: String

    /// Label for dense controls — small buttons, badges and table headers. Heaviest weight, for promotional and marketing emphasis rather than routine UI. Label keeps tighter leading than body to fit single-line text in fixed-height controls; use label for text that names a control and body for prose the user reads.
    public let labelSmallBlackFontWeight: Int

    /// Background of the primary (solid fill) button — default intent, at rest.
    public let buttonBgPrimaryDefault: Color

    /// Background of the primary (solid fill) button — default intent, on hover.
    public let buttonBgPrimaryHover: Color

    /// Background of the primary (solid fill) button — default intent, while pressed.
    public let buttonBgPrimaryPressed: Color

    /// Background of the primary (solid fill) button on an inverted or dark surface, default intent, at rest. The same fill as the light button; use button/bg-primary-default on light surfaces.
    public let buttonBgPrimaryInverseDefault: Color

    /// Background of the primary (solid fill) button on an inverted or dark surface, default intent, on hover. The same fill as the light button; use button/bg-primary-hover on light surfaces.
    public let buttonBgPrimaryInverseHover: Color

    /// Background of the primary (solid fill) button on an inverted or dark surface, default intent, while pressed. The same fill as the light button; use button/bg-primary-pressed on light surfaces.
    public let buttonBgPrimaryInversePressed: Color

    /// Background of the secondary (outlined) button — default intent, on hover.
    public let buttonBgSecondaryHover: Color

    /// Background of the secondary (outlined) button — default intent, while pressed.
    public let buttonBgSecondaryPressed: Color

    /// Background of the secondary (outlined) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-secondary-inverse-hover so it works on near black, navy and photos under a scrim.
    public let buttonBgSecondaryInverseHover: Color

    /// Background of the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-secondary-inverse-pressed so it works on near black, navy and photos under a scrim.
    public let buttonBgSecondaryInversePressed: Color

    /// Background of the tertiary (tinted) button — default intent, at rest.
    public let buttonBgTertiaryDefault: Color

    /// Background of the tertiary (tinted) button — default intent, on hover.
    public let buttonBgTertiaryHover: Color

    /// Background of the tertiary (tinted) button — default intent, while pressed.
    public let buttonBgTertiaryPressed: Color

    /// Background of the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. A translucent tint: render it at button/bg-opacity-tertiary-inverse-default so it works on near black, navy and photos under a scrim.
    public let buttonBgTertiaryInverseDefault: Color

    /// Background of the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-tertiary-inverse-hover so it works on near black, navy and photos under a scrim.
    public let buttonBgTertiaryInverseHover: Color

    /// Background of the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-tertiary-inverse-pressed so it works on near black, navy and photos under a scrim.
    public let buttonBgTertiaryInversePressed: Color

    /// Background of the text (no fill or outline) button — default intent, on hover.
    public let buttonBgTextHover: Color

    /// Background of the text (no fill or outline) button — default intent, while pressed.
    public let buttonBgTextPressed: Color

    /// Background of the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. A translucent tint: render it at button/bg-opacity-text-inverse-hover so it works on near black, navy and photos under a scrim.
    public let buttonBgTextInverseHover: Color

    /// Background of the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. A translucent tint: render it at button/bg-opacity-text-inverse-pressed so it works on near black, navy and photos under a scrim.
    public let buttonBgTextInversePressed: Color

    /// Outline of the secondary (outlined) button — default intent, at rest.
    public let buttonBorderSecondaryDefault: Color

    /// Outline of the secondary (outlined) button — default intent, on hover.
    public let buttonBorderSecondaryHover: Color

    /// Outline of the secondary (outlined) button — default intent, while pressed.
    public let buttonBorderSecondaryPressed: Color

    /// Outline of the secondary (outlined) button on an inverted or dark surface, default intent, at rest.
    public let buttonBorderSecondaryInverseDefault: Color

    /// Outline of the secondary (outlined) button on an inverted or dark surface, default intent, on hover.
    public let buttonBorderSecondaryInverseHover: Color

    /// Outline of the secondary (outlined) button on an inverted or dark surface, default intent, while pressed.
    public let buttonBorderSecondaryInversePressed: Color

    /// Colour of the keyboard focus ring. The ring is a separate rectangle outside the auto-layout of the button, not a border — the border-* tokens are a different slot.
    public let buttonFocusRing: Color

    /// Colour of the keyboard focus ring around a button on an inverted or dark surface. Lighter than button/focus-ring, which falls below 3:1 on navy; use it for every inverse hierarchy with the default intent.
    public let buttonFocusRingInverse: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent. The icons keep this colour on focus. Matches button/label-secondary-default at every state, so glyphs and text read as one colour.
    public let buttonIconSecondaryDefault: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent, on hover. Matches button/label-secondary-hover.
    public let buttonIconSecondaryHover: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button — default intent, while pressed. Matches button/label-secondary-pressed.
    public let buttonIconSecondaryPressed: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons.
    public let buttonIconSecondaryInverseDefault: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons.
    public let buttonIconSecondaryInverseHover: Color

    /// Colour of the leading, trailing and loading icons in the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons.
    public let buttonIconSecondaryInversePressed: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent. The icons keep this colour on focus. Matches button/label-tertiary-default at every state, so glyphs and text read as one colour.
    public let buttonIconTertiaryDefault: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent, on hover. Matches button/label-tertiary-hover.
    public let buttonIconTertiaryHover: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted fill) button — default intent, while pressed. Matches button/label-tertiary-pressed.
    public let buttonIconTertiaryPressed: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons.
    public let buttonIconTertiaryInverseDefault: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons.
    public let buttonIconTertiaryInverseHover: Color

    /// Colour of the leading, trailing and loading icons in the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons.
    public let buttonIconTertiaryInversePressed: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent. The icons keep this colour on focus. Matches button/label-text-default at every state, so glyphs and text read as one colour.
    public let buttonIconTextDefault: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent, on hover. Matches button/label-text-hover.
    public let buttonIconTextHover: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button — default intent, while pressed. Matches button/label-text-pressed.
    public let buttonIconTextPressed: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, at rest. One step deeper than the label, like the other inverse icons.
    public let buttonIconTextInverseDefault: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. One step deeper than the label, like the other inverse icons.
    public let buttonIconTextInverseHover: Color

    /// Colour of the leading, trailing and loading icons in the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. One step deeper than the label, like the other inverse icons.
    public let buttonIconTextInversePressed: Color

    /// Colour of the text label in the secondary (outlined) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelSecondaryDefault: Color

    /// Colour of the text label in the secondary (outlined) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelSecondaryHover: Color

    /// Colour of the text label in the secondary (outlined) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelSecondaryPressed: Color

    /// Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelSecondaryInverseDefault: Color

    /// Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelSecondaryInverseHover: Color

    /// Colour of the text label in the secondary (outlined) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelSecondaryInversePressed: Color

    /// Colour of the text label in the tertiary (tinted) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelTertiaryDefault: Color

    /// Colour of the text label in the tertiary (tinted) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelTertiaryHover: Color

    /// Colour of the text label in the tertiary (tinted) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelTertiaryPressed: Color

    /// Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelTertiaryInverseDefault: Color

    /// Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelTertiaryInverseHover: Color

    /// Colour of the text label in the tertiary (tinted) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelTertiaryInversePressed: Color

    /// Colour of the text label in the text (no fill or outline) button — default intent. The label keeps this colour on focus; hover and pressed have their own tokens. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelTextDefault: Color

    /// Colour of the text label in the text (no fill or outline) button — default intent, on hover. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelTextHover: Color

    /// Colour of the text label in the text (no fill or outline) button — default intent, while pressed. Darker than the resting label so it holds AA as the tinted background deepens.
    public let buttonLabelTextPressed: Color

    /// Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, at rest. The label keeps this colour on focus. The icon slots bind to the matching button/icon-* tokens.
    public let buttonLabelTextInverseDefault: Color

    /// Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, on hover. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelTextInverseHover: Color

    /// Colour of the text label in the text (no fill or outline) button on an inverted or dark surface, default intent, while pressed. Lighter than the resting label, the mirror of the light button, where hover and press darken.
    public let buttonLabelTextInversePressed: Color

    /// Fill of the checkbox box — unchecked, on hover.
    public let checkboxBgUnselectedHover: Color

    /// Fill of the checkbox box — unchecked, while pressed.
    public let checkboxBgUnselectedPressed: Color

    /// Fill of the checkbox box — checked, at rest.
    public let checkboxBgSelectedDefault: Color

    /// Fill of the checkbox box — checked, on hover.
    public let checkboxBgSelectedHover: Color

    /// Fill of the checkbox box — checked, while pressed.
    public let checkboxBgSelectedPressed: Color

    /// Outline of the checkbox box — unchecked, on hover.
    public let checkboxBorderUnselectedHover: Color

    /// Outline of the checkbox box — unchecked, while pressed.
    public let checkboxBorderUnselectedPressed: Color

    /// Outline of the checkbox box — checked, at rest.
    public let checkboxBorderSelectedDefault: Color

    /// Fill of the radio circle in both selected and unselected states — on hover.
    public let radioBgHover: Color

    /// Fill of the radio circle in both selected and unselected states — while pressed.
    public let radioBgPressed: Color

    /// Outline of the radio circle — unselected, on hover.
    public let radioBorderUnselectedHover: Color

    /// Outline of the radio circle — unselected, while pressed.
    public let radioBorderUnselectedPressed: Color

    /// Outline of the radio circle — selected, at rest.
    public let radioBorderSelectedDefault: Color

    /// Outline of the radio circle — selected, on hover.
    public let radioBorderSelectedHover: Color

    /// Outline of the radio circle — selected, while pressed.
    public let radioBorderSelectedPressed: Color

    /// Colour of the selected dot inside the circle — selected, at rest.
    public let radioDotSelectedDefault: Color

    /// Colour of the selected dot inside the circle — selected, on hover.
    public let radioDotSelectedHover: Color

    /// Colour of the selected dot inside the circle — selected, while pressed.
    public let radioDotSelectedPressed: Color

    /// Colour of the focus state layer while the radio is selected.
    public let radioStateLayerSelected: Color

    /// Fill of the chip container — selected, at rest and on keyboard focus. A tint rather than a solid brand fill, so a row of selected chips stays calm; the label and border carry the brand colour.
    public let chipBgSelectedDefault: Color

    /// Fill of the chip container — selected, on hover.
    public let chipBgSelectedHover: Color

    /// Fill of the chip container — selected, while pressed.
    public let chipBgSelectedPressed: Color

    /// Outline of the chip — selected, at rest and on keyboard focus. Painted only when the border is switched on.
    public let chipBorderSelectedDefault: Color

    /// Outline of the chip — selected, on hover. Painted only when the border is switched on.
    public let chipBorderSelectedHover: Color

    /// Outline of the chip — selected, while pressed. Painted only when the border is switched on.
    public let chipBorderSelectedPressed: Color

    /// Colour of the chip label — selected, at rest and on keyboard focus.
    public let chipLabelSelectedDefault: Color

    /// Colour of the chip label — selected, on hover. Darkens with the fill so it holds AA contrast on bg-selected-hover.
    public let chipLabelSelectedHover: Color

    /// Colour of the chip label — selected, while pressed. Darkens with the fill so it holds AA contrast on bg-selected-pressed.
    public let chipLabelSelectedPressed: Color

    /// Colour of the leading icon, trailing icon and remove glyph — selected, Default and Focus. Hover and pressed have their own tokens so the icons darken with the label. Does not apply to the leading image.
    public let chipIconSelectedDefault: Color

    /// Colour of the leading icon, trailing icon and remove glyph — selected, on hover. Matches chip/label-selected-hover so icons and label darken together as the fill deepens.
    public let chipIconSelectedHover: Color

    /// Colour of the leading icon, trailing icon and remove glyph — selected, while pressed. Matches chip/label-selected-pressed. Also colours the remove glyph while the remove button itself is hovered or pressed, because its circle uses the pressed tint and icon-selected-default is too light on it.
    public let chipIconSelectedPressed: Color

    /// Circle behind the remove glyph of a removable chip — selected, when the remove button itself is hovered.
    public let chipRemoveBgSelectedHover: Color

    /// Circle behind the remove glyph of a removable chip — selected, while the remove button itself is pressed.
    public let chipRemoveBgSelectedPressed: Color

    /// Action label on a tinted neutral snackbar, at rest and on keyboard focus. Brand coloured, since a neutral message has no intent colour to follow.
    public let snackbarLabelControlTintedNeutralDefault: Color

    /// Action label on a tinted neutral snackbar, on hover. Brand coloured, since a neutral message has no intent colour to follow; darkens with the fill so it keeps AA contrast.
    public let snackbarLabelControlTintedNeutralHover: Color

    /// Action label on a tinted neutral snackbar, while pressed. Brand coloured, since a neutral message has no intent colour to follow; darkens with the fill so it keeps AA contrast.
    public let snackbarLabelControlTintedNeutralPressed: Color

    /// Solid fill of a strong brand badge, used for promotional tags such as New, Deal or MMT Exclusive. Count badges default to strong; for a calmer tag use bg-subtle-brand.
    public let badgeBgStrongBrand: Color

    /// Tinted fill of a subtle brand badge, the calm option for status tags beside content. Not used for dots, which are strong only.
    public let badgeBgSubtleBrand: Color

    /// Count or text colour on a subtle brand badge. Paired with bg-subtle-brand and holds AA contrast on it.
    public let badgeLabelSubtleBrand: Color

    /// Fill of a brand dot badge, a count-free marker for new or unread content. The same colour as bg-strong-brand, kept separate so it is checked for 3 to 1 contrast against both page canvases.
    public let badgeDotBrand: Color

    /// Label colour of the selected tab at rest and on keyboard focus. Pairs with the brand indicator.
    public let tabLabelSelectedDefault: Color

    /// Label colour of the selected tab on hover. Stays text-brand, which holds AA on the hover grey.
    public let tabLabelSelectedHover: Color

    /// Label colour of the selected tab while pressed. One step darker than text-brand, which falls below AA on the pressed grey.
    public let tabLabelSelectedPressed: Color

    /// Colour of the icon on the selected Primary tab, at rest and on keyboard focus. Matches label-selected-default.
    public let tabIconSelectedDefault: Color

    /// Colour of the icon on the selected Primary tab on hover.
    public let tabIconSelectedHover: Color

    /// Colour of the icon on the selected Primary tab while pressed, darkening with the label on the pressed grey.
    public let tabIconSelectedPressed: Color

    /// Colour of the underline under the selected tab in every enabled state. Only the selected tab draws it.
    public let tabIndicatorDefault: Color

    /// Fill of the light blue circle behind a leading icon, for a row that should stand out from its neutral neighbours. Use sparingly, at most one kind per list.
    public let listLeadingContainerBgBrand: Color

    /// Colour of the icon inside a brand leading circle. Pairs with leading-container-bg-brand.
    public let listLeadingContainerIconBrand: Color

    /// Track of a switch that is on, at rest. Also used by the Outlined backup style. Use track-on-disabled when the switch is disabled.
    public let switchTrackOnDefault: Color

    /// Track of a switch that is on, under the pointer. Web only.
    public let switchTrackOnHover: Color

    /// Track of a switch that is on, while held.
    public let switchTrackOnPressed: Color

    /// Check glyph inside the white thumb of a switch that is on, at rest and on focus. Tracks track-on-default so glyph and track read as one colour.
    public let switchIconOnDefault: Color

    /// Check glyph of a switch that is on, under the pointer. Tracks track-on-hover. Web only.
    public let switchIconOnHover: Color

    /// Check glyph of a switch that is on, while held. Tracks track-on-pressed.
    public let switchIconOnPressed: Color

    /// Outlined backup style only, not for product use. Check glyph inside the white thumb of a switch that is on, in every enabled state. Use outlined-icon-disabled when the switch is disabled.
    public let switchOutlinedIconOn: Color

    /// Neutral thumb style, under test against the Brand thumb. Brand label of the selected segment at rest and on keyboard focus. For the pressed thumb use neutral-label-selected-pressed, because this colour falls below AA on the pressed grey. For a disabled segment use label-disabled.
    public let segmentedControlNeutralLabelSelectedDefault: Color

    /// Neutral thumb style, under test against the Brand thumb. Brand label of the selected segment while the thumb is held. One step darker than neutral-label-selected-default so it keeps AA on the pressed grey.
    public let segmentedControlNeutralLabelSelectedPressed: Color

    /// Neutral thumb style, under test against the Brand thumb. Optional leading icon of the selected segment at rest and on keyboard focus. Matches neutral-label-selected-default.
    public let segmentedControlNeutralIconSelectedDefault: Color

    /// Neutral thumb style, under test against the Brand thumb. Optional leading icon of the selected segment while the thumb is held. Matches neutral-label-selected-pressed.
    public let segmentedControlNeutralIconSelectedPressed: Color

    /// Brand thumb style, under test against the Neutral thumb. Solid brand thumb under the selected segment at rest and on keyboard focus. Drawn without a shadow.
    public let segmentedControlBrandThumbDefault: Color

    /// Brand thumb style, under test against the Neutral thumb. Solid brand thumb while it is held, before a tap lands or while it is dragged.
    public let segmentedControlBrandThumbPressed: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Brand-tinted thumb under the selected segment at rest and on keyboard focus. The tint barely separates from the track, so tinted-thumb-border-default draws its edge.
    public let segmentedControlTintedThumbDefault: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Brand-tinted thumb while it is held, before a tap lands or while it is dragged.
    public let segmentedControlTintedThumbPressed: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Outline of the tinted thumb at rest and on keyboard focus. Drawn inside the thumb so it does not change size, and it carries the selection against the track.
    public let segmentedControlTintedThumbBorderDefault: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Outline of the tinted thumb while it is held.
    public let segmentedControlTintedThumbBorderPressed: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Label on the tinted thumb at rest and on keyboard focus. For the pressed thumb use tinted-label-selected-pressed, because this colour falls below AA on the pressed tint.
    public let segmentedControlTintedLabelSelectedDefault: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Label on the tinted thumb while it is held. One step darker than tinted-label-selected-default so it keeps AA on the pressed tint.
    public let segmentedControlTintedLabelSelectedPressed: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Optional leading icon on the tinted thumb at rest and on keyboard focus. Matches tinted-label-selected-default.
    public let segmentedControlTintedIconSelectedDefault: Color

    /// Tinted thumb style, under test against the Neutral and Brand thumbs. Optional leading icon on the tinted thumb while it is held. Matches tinted-label-selected-pressed.
    public let segmentedControlTintedIconSelectedPressed: Color

    /// Part of the track between the start and the thumb, or between the two thumbs of a range. Stays the same while the thumb is hovered or held; the thumb and halo show the state. Use track-active-disabled when disabled.
    public let sliderTrackActive: Color

    /// Soft circle behind a thumb under the pointer, drawn under the track. Web only. Use halo-pressed while the thumb is held.
    public let sliderHaloHover: Color

    /// Soft circle behind a thumb while it is held or dragged, drawn under the track, so the touch point stays visible around a finger. Halo press only; the Grow press enlarges the thumb to thumb-size-pressed instead. Use halo-hover for the pointer.
    public let sliderHaloPressed: Color

    /// Trailing check on the selected row of a single-select menu, such as Sort by, at rest, on hover and with focus. It is the only mark of selection, so the label stays label-default. Use check-pressed while the row is pressed.
    public let menuCheckDefault: Color

    /// Trailing check on the selected row while the row is pressed. One step darker than check-default, which is too light on item-bg-pressed.
    public let menuCheckPressed: Color

    /// Label of the primary text action, such as Next or Got it, on a Light Rich tooltip, at rest and on focus. Brand blue, so it reads as the main action beside the grey Skip. Use primary-label-light-hover and primary-label-light-pressed as the fill changes.
    public let tooltipPrimaryLabelLight: Color

    /// Label of the primary text action on a Light Rich tooltip under the pointer. Darkens with the control-bg-light-hover fill so it keeps AA contrast. Web only.
    public let tooltipPrimaryLabelLightHover: Color

    /// Label of the primary text action on a Light Rich tooltip while pressed. Darkens with the control-bg-light-pressed fill so it keeps AA contrast.
    public let tooltipPrimaryLabelLightPressed: Color

    public static let makeMyTrip = CosmosBrand(
        id: "mmt",
        name: "MakeMyTrip",
        colorBgSurfaceBrand: Color(red: 0.929412, green: 0.980392, blue: 1),
        colorBgSurfaceBrandHover: Color(red: 0.839216, green: 0.952941, blue: 1),
        colorBgSurfaceBrandPressedSubtle: Color(red: 0.839216, green: 0.952941, blue: 1),
        colorBgSurfaceBrandPressedStrong: Color(red: 0.709804, green: 0.917647, blue: 1),
        colorBgSurfaceBrandInverse: Color(red: 0.282353, green: 0.733333, blue: 1),
        colorBgFillBrand: Color(red: 0, green: 0.533333, blue: 1),
        colorBgFillBrandHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorBgFillBrandPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        colorTextBrand: Color(red: 0, green: 0.533333, blue: 1),
        colorTextBrandHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        colorTextBrandPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorTextBrandOnBgSurfaceHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorTextBrandOnBgSurfacePressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        colorTextBrandInverse: Color(red: 0.513725, green: 0.87451, blue: 1),
        colorTextBrandInverseHover: Color(red: 0.709804, green: 0.917647, blue: 1),
        colorTextBrandInversePressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        colorBorderBrand: Color(red: 0, green: 0.533333, blue: 1),
        colorBorderBrandHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        colorBorderBrandPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorBorderBrandInverse: Color(red: 0.282353, green: 0.733333, blue: 1),
        colorBorderBrandInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        colorBorderBrandInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        colorIconBrand: Color(red: 0, green: 0.533333, blue: 1),
        colorIconBrandHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        colorIconBrandPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorIconBrandOnBgSurfaceHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        colorIconBrandOnBgSurfacePressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        colorIconBrandInverse: Color(red: 0.282353, green: 0.733333, blue: 1),
        colorIconBrandInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        colorIconBrandInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        typefaceDefault: "Lato",
        weightBold: 700,
        weightBlack: 900,
        headlineLargeRegularFontFamily: "Lato",
        headlineLargeBoldFontFamily: "Lato",
        headlineLargeBoldFontWeight: 700,
        headlineLargeBlackFontFamily: "Lato",
        headlineLargeBlackFontWeight: 900,
        headlineMediumRegularFontFamily: "Lato",
        headlineMediumBoldFontFamily: "Lato",
        headlineMediumBoldFontWeight: 700,
        headlineMediumBlackFontFamily: "Lato",
        headlineMediumBlackFontWeight: 900,
        headlineSmallRegularFontFamily: "Lato",
        headlineSmallBoldFontFamily: "Lato",
        headlineSmallBoldFontWeight: 700,
        headlineSmallBlackFontFamily: "Lato",
        headlineSmallBlackFontWeight: 900,
        titleLargeRegularFontFamily: "Lato",
        titleLargeBoldFontFamily: "Lato",
        titleLargeBoldFontWeight: 700,
        titleLargeBlackFontFamily: "Lato",
        titleLargeBlackFontWeight: 900,
        titleMediumRegularFontFamily: "Lato",
        titleMediumBoldFontFamily: "Lato",
        titleMediumBoldFontWeight: 700,
        titleMediumBlackFontFamily: "Lato",
        titleMediumBlackFontWeight: 900,
        titleSmallRegularFontFamily: "Lato",
        titleSmallBoldFontFamily: "Lato",
        titleSmallBoldFontWeight: 700,
        titleSmallBlackFontFamily: "Lato",
        titleSmallBlackFontWeight: 900,
        bodyLargeRegularFontFamily: "Lato",
        bodyLargeBoldFontFamily: "Lato",
        bodyLargeBoldFontWeight: 700,
        bodyLargeBlackFontFamily: "Lato",
        bodyLargeBlackFontWeight: 900,
        bodyMediumRegularFontFamily: "Lato",
        bodyMediumBoldFontFamily: "Lato",
        bodyMediumBoldFontWeight: 700,
        bodyMediumBlackFontFamily: "Lato",
        bodyMediumBlackFontWeight: 900,
        bodySmallRegularFontFamily: "Lato",
        bodySmallBoldFontFamily: "Lato",
        bodySmallBoldFontWeight: 700,
        bodySmallBlackFontFamily: "Lato",
        bodySmallBlackFontWeight: 900,
        labelLargeRegularFontFamily: "Lato",
        labelLargeBoldFontFamily: "Lato",
        labelLargeBoldFontWeight: 700,
        labelLargeBlackFontFamily: "Lato",
        labelLargeBlackFontWeight: 900,
        labelMediumRegularFontFamily: "Lato",
        labelMediumBoldFontFamily: "Lato",
        labelMediumBoldFontWeight: 700,
        labelMediumBlackFontFamily: "Lato",
        labelMediumBlackFontWeight: 900,
        labelSmallRegularFontFamily: "Lato",
        labelSmallBoldFontFamily: "Lato",
        labelSmallBoldFontWeight: 700,
        labelSmallBlackFontFamily: "Lato",
        labelSmallBlackFontWeight: 900,
        buttonBgPrimaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonBgPrimaryHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonBgPrimaryPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonBgPrimaryInverseDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonBgPrimaryInverseHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonBgPrimaryInversePressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonBgSecondaryHover: Color(red: 0.839216, green: 0.952941, blue: 1),
        buttonBgSecondaryPressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonBgSecondaryInverseHover: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgSecondaryInversePressed: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgTertiaryDefault: Color(red: 0.929412, green: 0.980392, blue: 1),
        buttonBgTertiaryHover: Color(red: 0.839216, green: 0.952941, blue: 1),
        buttonBgTertiaryPressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonBgTertiaryInverseDefault: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgTertiaryInverseHover: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgTertiaryInversePressed: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgTextHover: Color(red: 0.929412, green: 0.980392, blue: 1),
        buttonBgTextPressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        buttonBgTextInverseHover: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBgTextInversePressed: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBorderSecondaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonBorderSecondaryHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        buttonBorderSecondaryPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonBorderSecondaryInverseDefault: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonBorderSecondaryInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonBorderSecondaryInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonFocusRing: Color(red: 0, green: 0.533333, blue: 1),
        buttonFocusRingInverse: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonIconSecondaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonIconSecondaryHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonIconSecondaryPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonIconSecondaryInverseDefault: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonIconSecondaryInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonIconSecondaryInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonIconTertiaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonIconTertiaryHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonIconTertiaryPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonIconTertiaryInverseDefault: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonIconTertiaryInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonIconTertiaryInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonIconTextDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonIconTextHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonIconTextPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonIconTextInverseDefault: Color(red: 0.282353, green: 0.733333, blue: 1),
        buttonIconTextInverseHover: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonIconTextInversePressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonLabelSecondaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonLabelSecondaryHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonLabelSecondaryPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonLabelSecondaryInverseDefault: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonLabelSecondaryInverseHover: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonLabelSecondaryInversePressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        buttonLabelTertiaryDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonLabelTertiaryHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonLabelTertiaryPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonLabelTertiaryInverseDefault: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonLabelTertiaryInverseHover: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonLabelTertiaryInversePressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        buttonLabelTextDefault: Color(red: 0, green: 0.533333, blue: 1),
        buttonLabelTextHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        buttonLabelTextPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        buttonLabelTextInverseDefault: Color(red: 0.513725, green: 0.87451, blue: 1),
        buttonLabelTextInverseHover: Color(red: 0.709804, green: 0.917647, blue: 1),
        buttonLabelTextInversePressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        checkboxBgUnselectedHover: Color(red: 0.929412, green: 0.980392, blue: 1),
        checkboxBgUnselectedPressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        checkboxBgSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        checkboxBgSelectedHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        checkboxBgSelectedPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        checkboxBorderUnselectedHover: Color(red: 0, green: 0.533333, blue: 1),
        checkboxBorderUnselectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        checkboxBorderSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        radioBgHover: Color(red: 0.929412, green: 0.980392, blue: 1),
        radioBgPressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        radioBorderUnselectedHover: Color(red: 0, green: 0.533333, blue: 1),
        radioBorderUnselectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        radioBorderSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        radioBorderSelectedHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        radioBorderSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        radioDotSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        radioDotSelectedHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        radioDotSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        radioStateLayerSelected: Color(red: 0, green: 0.533333, blue: 1),
        chipBgSelectedDefault: Color(red: 0.929412, green: 0.980392, blue: 1),
        chipBgSelectedHover: Color(red: 0.839216, green: 0.952941, blue: 1),
        chipBgSelectedPressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        chipBorderSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        chipBorderSelectedHover: Color(red: 0.023529, green: 0.596078, blue: 1),
        chipBorderSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        chipLabelSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        chipLabelSelectedHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        chipLabelSelectedPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        chipIconSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        chipIconSelectedHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        chipIconSelectedPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        chipRemoveBgSelectedHover: Color(red: 0.709804, green: 0.917647, blue: 1),
        chipRemoveBgSelectedPressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        snackbarLabelControlTintedNeutralDefault: Color(red: 0, green: 0.533333, blue: 1),
        snackbarLabelControlTintedNeutralHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        snackbarLabelControlTintedNeutralPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        badgeBgStrongBrand: Color(red: 0, green: 0.533333, blue: 1),
        badgeBgSubtleBrand: Color(red: 0.929412, green: 0.980392, blue: 1),
        badgeLabelSubtleBrand: Color(red: 0, green: 0.533333, blue: 1),
        badgeDotBrand: Color(red: 0, green: 0.533333, blue: 1),
        tabLabelSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        tabLabelSelectedHover: Color(red: 0, green: 0.533333, blue: 1),
        tabLabelSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        tabIconSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        tabIconSelectedHover: Color(red: 0, green: 0.533333, blue: 1),
        tabIconSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        tabIndicatorDefault: Color(red: 0, green: 0.533333, blue: 1),
        listLeadingContainerBgBrand: Color(red: 0.929412, green: 0.980392, blue: 1),
        listLeadingContainerIconBrand: Color(red: 0, green: 0.533333, blue: 1),
        switchTrackOnDefault: Color(red: 0, green: 0.533333, blue: 1),
        switchTrackOnHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        switchTrackOnPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        switchIconOnDefault: Color(red: 0, green: 0.533333, blue: 1),
        switchIconOnHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        switchIconOnPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        switchOutlinedIconOn: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlNeutralLabelSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlNeutralLabelSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        segmentedControlNeutralIconSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlNeutralIconSelectedPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        segmentedControlBrandThumbDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlBrandThumbPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        segmentedControlTintedThumbDefault: Color(red: 0.929412, green: 0.980392, blue: 1),
        segmentedControlTintedThumbPressed: Color(red: 0.709804, green: 0.917647, blue: 1),
        segmentedControlTintedThumbBorderDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlTintedThumbBorderPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        segmentedControlTintedLabelSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlTintedLabelSelectedPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        segmentedControlTintedIconSelectedDefault: Color(red: 0, green: 0.533333, blue: 1),
        segmentedControlTintedIconSelectedPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843),
        sliderTrackActive: Color(red: 0, green: 0.533333, blue: 1),
        sliderHaloHover: Color(red: 0.929412, green: 0.980392, blue: 1),
        sliderHaloPressed: Color(red: 0.839216, green: 0.952941, blue: 1),
        menuCheckDefault: Color(red: 0, green: 0.533333, blue: 1),
        menuCheckPressed: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        tooltipPrimaryLabelLight: Color(red: 0, green: 0.533333, blue: 1),
        tooltipPrimaryLabelLightHover: Color(red: 0.031373, green: 0.407843, blue: 0.772549),
        tooltipPrimaryLabelLightPressed: Color(red: 0.05098, green: 0.345098, blue: 0.607843)
    )

    public static let myBiz = CosmosBrand(
        id: "mybiz",
        name: "myBiz",
        colorBgSurfaceBrand: Color(red: 1, green: 0.94902, blue: 0.929412),
        colorBgSurfaceBrandHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        colorBgSurfaceBrandPressedSubtle: Color(red: 1, green: 0.878431, blue: 0.831373),
        colorBgSurfaceBrandPressedStrong: Color(red: 1, green: 0.737255, blue: 0.658824),
        colorBgSurfaceBrandInverse: Color(red: 1, green: 0.560784, blue: 0.443137),
        colorBgFillBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        colorBgFillBrandHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        colorBgFillBrandPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorTextBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        colorTextBrandHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        colorTextBrandPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorTextBrandOnBgSurfaceHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorTextBrandOnBgSurfacePressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        colorTextBrandInverse: Color(red: 1, green: 0.737255, blue: 0.658824),
        colorTextBrandInverseHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        colorTextBrandInversePressed: Color(red: 1, green: 0.94902, blue: 0.929412),
        colorBorderBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        colorBorderBrandHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        colorBorderBrandPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorBorderBrandInverse: Color(red: 1, green: 0.560784, blue: 0.443137),
        colorBorderBrandInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        colorBorderBrandInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        colorIconBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        colorIconBrandHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        colorIconBrandPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorIconBrandOnBgSurfaceHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        colorIconBrandOnBgSurfacePressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        colorIconBrandInverse: Color(red: 1, green: 0.560784, blue: 0.443137),
        colorIconBrandInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        colorIconBrandInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        typefaceDefault: "Lato",
        weightBold: 700,
        weightBlack: 900,
        headlineLargeRegularFontFamily: "Lato",
        headlineLargeBoldFontFamily: "Lato",
        headlineLargeBoldFontWeight: 700,
        headlineLargeBlackFontFamily: "Lato",
        headlineLargeBlackFontWeight: 900,
        headlineMediumRegularFontFamily: "Lato",
        headlineMediumBoldFontFamily: "Lato",
        headlineMediumBoldFontWeight: 700,
        headlineMediumBlackFontFamily: "Lato",
        headlineMediumBlackFontWeight: 900,
        headlineSmallRegularFontFamily: "Lato",
        headlineSmallBoldFontFamily: "Lato",
        headlineSmallBoldFontWeight: 700,
        headlineSmallBlackFontFamily: "Lato",
        headlineSmallBlackFontWeight: 900,
        titleLargeRegularFontFamily: "Lato",
        titleLargeBoldFontFamily: "Lato",
        titleLargeBoldFontWeight: 700,
        titleLargeBlackFontFamily: "Lato",
        titleLargeBlackFontWeight: 900,
        titleMediumRegularFontFamily: "Lato",
        titleMediumBoldFontFamily: "Lato",
        titleMediumBoldFontWeight: 700,
        titleMediumBlackFontFamily: "Lato",
        titleMediumBlackFontWeight: 900,
        titleSmallRegularFontFamily: "Lato",
        titleSmallBoldFontFamily: "Lato",
        titleSmallBoldFontWeight: 700,
        titleSmallBlackFontFamily: "Lato",
        titleSmallBlackFontWeight: 900,
        bodyLargeRegularFontFamily: "Lato",
        bodyLargeBoldFontFamily: "Lato",
        bodyLargeBoldFontWeight: 700,
        bodyLargeBlackFontFamily: "Lato",
        bodyLargeBlackFontWeight: 900,
        bodyMediumRegularFontFamily: "Lato",
        bodyMediumBoldFontFamily: "Lato",
        bodyMediumBoldFontWeight: 700,
        bodyMediumBlackFontFamily: "Lato",
        bodyMediumBlackFontWeight: 900,
        bodySmallRegularFontFamily: "Lato",
        bodySmallBoldFontFamily: "Lato",
        bodySmallBoldFontWeight: 700,
        bodySmallBlackFontFamily: "Lato",
        bodySmallBlackFontWeight: 900,
        labelLargeRegularFontFamily: "Lato",
        labelLargeBoldFontFamily: "Lato",
        labelLargeBoldFontWeight: 700,
        labelLargeBlackFontFamily: "Lato",
        labelLargeBlackFontWeight: 900,
        labelMediumRegularFontFamily: "Lato",
        labelMediumBoldFontFamily: "Lato",
        labelMediumBoldFontWeight: 700,
        labelMediumBlackFontFamily: "Lato",
        labelMediumBlackFontWeight: 900,
        labelSmallRegularFontFamily: "Lato",
        labelSmallBoldFontFamily: "Lato",
        labelSmallBoldFontWeight: 700,
        labelSmallBlackFontFamily: "Lato",
        labelSmallBlackFontWeight: 900,
        buttonBgPrimaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonBgPrimaryHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        buttonBgPrimaryPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonBgPrimaryInverseDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonBgPrimaryInverseHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        buttonBgPrimaryInversePressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonBgSecondaryHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonBgSecondaryPressed: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonBgSecondaryInverseHover: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgSecondaryInversePressed: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgTertiaryDefault: Color(red: 1, green: 0.94902, blue: 0.929412),
        buttonBgTertiaryHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonBgTertiaryPressed: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonBgTertiaryInverseDefault: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgTertiaryInverseHover: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgTertiaryInversePressed: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgTextHover: Color(red: 1, green: 0.94902, blue: 0.929412),
        buttonBgTextPressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonBgTextInverseHover: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBgTextInversePressed: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBorderSecondaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonBorderSecondaryHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        buttonBorderSecondaryPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonBorderSecondaryInverseDefault: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonBorderSecondaryInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonBorderSecondaryInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonFocusRing: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonFocusRingInverse: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonIconSecondaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonIconSecondaryHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonIconSecondaryPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonIconSecondaryInverseDefault: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonIconSecondaryInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonIconSecondaryInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonIconTertiaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonIconTertiaryHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonIconTertiaryPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonIconTertiaryInverseDefault: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonIconTertiaryInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonIconTertiaryInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonIconTextDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonIconTextHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonIconTextPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonIconTextInverseDefault: Color(red: 1, green: 0.560784, blue: 0.443137),
        buttonIconTextInverseHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonIconTextInversePressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonLabelSecondaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonLabelSecondaryHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonLabelSecondaryPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonLabelSecondaryInverseDefault: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonLabelSecondaryInverseHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonLabelSecondaryInversePressed: Color(red: 1, green: 0.94902, blue: 0.929412),
        buttonLabelTertiaryDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonLabelTertiaryHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonLabelTertiaryPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonLabelTertiaryInverseDefault: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonLabelTertiaryInverseHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonLabelTertiaryInversePressed: Color(red: 1, green: 0.94902, blue: 0.929412),
        buttonLabelTextDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        buttonLabelTextHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        buttonLabelTextPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        buttonLabelTextInverseDefault: Color(red: 1, green: 0.737255, blue: 0.658824),
        buttonLabelTextInverseHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        buttonLabelTextInversePressed: Color(red: 1, green: 0.94902, blue: 0.929412),
        checkboxBgUnselectedHover: Color(red: 1, green: 0.94902, blue: 0.929412),
        checkboxBgUnselectedPressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        checkboxBgSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        checkboxBgSelectedHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        checkboxBgSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        checkboxBorderUnselectedHover: Color(red: 1, green: 0.286275, blue: 0.160784),
        checkboxBorderUnselectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        checkboxBorderSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        radioBgHover: Color(red: 1, green: 0.94902, blue: 0.929412),
        radioBgPressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        radioBorderUnselectedHover: Color(red: 1, green: 0.286275, blue: 0.160784),
        radioBorderUnselectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        radioBorderSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        radioBorderSelectedHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        radioBorderSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        radioDotSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        radioDotSelectedHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        radioDotSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        radioStateLayerSelected: Color(red: 1, green: 0.286275, blue: 0.160784),
        chipBgSelectedDefault: Color(red: 1, green: 0.94902, blue: 0.929412),
        chipBgSelectedHover: Color(red: 1, green: 0.878431, blue: 0.831373),
        chipBgSelectedPressed: Color(red: 1, green: 0.737255, blue: 0.658824),
        chipBorderSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        chipBorderSelectedHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        chipBorderSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        chipLabelSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        chipLabelSelectedHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        chipLabelSelectedPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        chipIconSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        chipIconSelectedHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        chipIconSelectedPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        chipRemoveBgSelectedHover: Color(red: 1, green: 0.737255, blue: 0.658824),
        chipRemoveBgSelectedPressed: Color(red: 1, green: 0.737255, blue: 0.658824),
        snackbarLabelControlTintedNeutralDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        snackbarLabelControlTintedNeutralHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        snackbarLabelControlTintedNeutralPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        badgeBgStrongBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        badgeBgSubtleBrand: Color(red: 1, green: 0.94902, blue: 0.929412),
        badgeLabelSubtleBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        badgeDotBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        tabLabelSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        tabLabelSelectedHover: Color(red: 1, green: 0.286275, blue: 0.160784),
        tabLabelSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        tabIconSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        tabIconSelectedHover: Color(red: 1, green: 0.286275, blue: 0.160784),
        tabIconSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        tabIndicatorDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        listLeadingContainerBgBrand: Color(red: 1, green: 0.94902, blue: 0.929412),
        listLeadingContainerIconBrand: Color(red: 1, green: 0.286275, blue: 0.160784),
        switchTrackOnDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        switchTrackOnHover: Color(red: 0.996078, green: 0.168627, blue: 0.066667),
        switchTrackOnPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        switchIconOnDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        switchIconOnHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        switchIconOnPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        switchOutlinedIconOn: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlNeutralLabelSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlNeutralLabelSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        segmentedControlNeutralIconSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlNeutralIconSelectedPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        segmentedControlBrandThumbDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlBrandThumbPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        segmentedControlTintedThumbDefault: Color(red: 1, green: 0.94902, blue: 0.929412),
        segmentedControlTintedThumbPressed: Color(red: 1, green: 0.737255, blue: 0.658824),
        segmentedControlTintedThumbBorderDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlTintedThumbBorderPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        segmentedControlTintedLabelSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlTintedLabelSelectedPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        segmentedControlTintedIconSelectedDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        segmentedControlTintedIconSelectedPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216),
        sliderTrackActive: Color(red: 1, green: 0.286275, blue: 0.160784),
        sliderHaloHover: Color(red: 1, green: 0.94902, blue: 0.929412),
        sliderHaloPressed: Color(red: 1, green: 0.878431, blue: 0.831373),
        menuCheckDefault: Color(red: 1, green: 0.286275, blue: 0.160784),
        menuCheckPressed: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        tooltipPrimaryLabelLight: Color(red: 1, green: 0.286275, blue: 0.160784),
        tooltipPrimaryLabelLightHover: Color(red: 0.937255, green: 0.066667, blue: 0.027451),
        tooltipPrimaryLabelLightPressed: Color(red: 0.776471, green: 0.031373, blue: 0.039216)
    )

    public static let goibibo = CosmosBrand(
        id: "goibibo",
        name: "Goibibo",
        colorBgSurfaceBrand: Color(red: 1, green: 0.968627, blue: 0.92549),
        colorBgSurfaceBrandHover: Color(red: 1, green: 0.929412, blue: 0.827451),
        colorBgSurfaceBrandPressedSubtle: Color(red: 1, green: 0.929412, blue: 0.827451),
        colorBgSurfaceBrandPressedStrong: Color(red: 1, green: 0.843137, blue: 0.647059),
        colorBgSurfaceBrandInverse: Color(red: 1, green: 0.576471, blue: 0.196078),
        colorBgFillBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        colorBgFillBrandHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        colorBgFillBrandPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorTextBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        colorTextBrandHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        colorTextBrandPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorTextBrandOnBgSurfaceHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorTextBrandOnBgSurfacePressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        colorTextBrandInverse: Color(red: 1, green: 0.733333, blue: 0.427451),
        colorTextBrandInverseHover: Color(red: 1, green: 0.843137, blue: 0.647059),
        colorTextBrandInversePressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        colorBorderBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        colorBorderBrandHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        colorBorderBrandPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorBorderBrandInverse: Color(red: 1, green: 0.576471, blue: 0.196078),
        colorBorderBrandInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        colorBorderBrandInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        colorIconBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        colorIconBrandHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        colorIconBrandPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorIconBrandOnBgSurfaceHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        colorIconBrandOnBgSurfacePressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        colorIconBrandInverse: Color(red: 1, green: 0.576471, blue: 0.196078),
        colorIconBrandInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        colorIconBrandInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        typefaceDefault: "Rubik",
        weightBold: 600,
        weightBlack: 700,
        headlineLargeRegularFontFamily: "Rubik",
        headlineLargeBoldFontFamily: "Rubik",
        headlineLargeBoldFontWeight: 600,
        headlineLargeBlackFontFamily: "Rubik",
        headlineLargeBlackFontWeight: 700,
        headlineMediumRegularFontFamily: "Rubik",
        headlineMediumBoldFontFamily: "Rubik",
        headlineMediumBoldFontWeight: 600,
        headlineMediumBlackFontFamily: "Rubik",
        headlineMediumBlackFontWeight: 700,
        headlineSmallRegularFontFamily: "Rubik",
        headlineSmallBoldFontFamily: "Rubik",
        headlineSmallBoldFontWeight: 600,
        headlineSmallBlackFontFamily: "Rubik",
        headlineSmallBlackFontWeight: 700,
        titleLargeRegularFontFamily: "Rubik",
        titleLargeBoldFontFamily: "Rubik",
        titleLargeBoldFontWeight: 600,
        titleLargeBlackFontFamily: "Rubik",
        titleLargeBlackFontWeight: 700,
        titleMediumRegularFontFamily: "Rubik",
        titleMediumBoldFontFamily: "Rubik",
        titleMediumBoldFontWeight: 600,
        titleMediumBlackFontFamily: "Rubik",
        titleMediumBlackFontWeight: 700,
        titleSmallRegularFontFamily: "Rubik",
        titleSmallBoldFontFamily: "Rubik",
        titleSmallBoldFontWeight: 600,
        titleSmallBlackFontFamily: "Rubik",
        titleSmallBlackFontWeight: 700,
        bodyLargeRegularFontFamily: "Rubik",
        bodyLargeBoldFontFamily: "Rubik",
        bodyLargeBoldFontWeight: 600,
        bodyLargeBlackFontFamily: "Rubik",
        bodyLargeBlackFontWeight: 700,
        bodyMediumRegularFontFamily: "Rubik",
        bodyMediumBoldFontFamily: "Rubik",
        bodyMediumBoldFontWeight: 600,
        bodyMediumBlackFontFamily: "Rubik",
        bodyMediumBlackFontWeight: 700,
        bodySmallRegularFontFamily: "Rubik",
        bodySmallBoldFontFamily: "Rubik",
        bodySmallBoldFontWeight: 600,
        bodySmallBlackFontFamily: "Rubik",
        bodySmallBlackFontWeight: 700,
        labelLargeRegularFontFamily: "Rubik",
        labelLargeBoldFontFamily: "Rubik",
        labelLargeBoldFontWeight: 600,
        labelLargeBlackFontFamily: "Rubik",
        labelLargeBlackFontWeight: 700,
        labelMediumRegularFontFamily: "Rubik",
        labelMediumBoldFontFamily: "Rubik",
        labelMediumBoldFontWeight: 600,
        labelMediumBlackFontFamily: "Rubik",
        labelMediumBlackFontWeight: 700,
        labelSmallRegularFontFamily: "Rubik",
        labelSmallBoldFontFamily: "Rubik",
        labelSmallBoldFontWeight: 600,
        labelSmallBlackFontFamily: "Rubik",
        labelSmallBlackFontWeight: 700,
        buttonBgPrimaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonBgPrimaryHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        buttonBgPrimaryPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonBgPrimaryInverseDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonBgPrimaryInverseHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        buttonBgPrimaryInversePressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonBgSecondaryHover: Color(red: 1, green: 0.929412, blue: 0.827451),
        buttonBgSecondaryPressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonBgSecondaryInverseHover: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgSecondaryInversePressed: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgTertiaryDefault: Color(red: 1, green: 0.968627, blue: 0.92549),
        buttonBgTertiaryHover: Color(red: 1, green: 0.929412, blue: 0.827451),
        buttonBgTertiaryPressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonBgTertiaryInverseDefault: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgTertiaryInverseHover: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgTertiaryInversePressed: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgTextHover: Color(red: 1, green: 0.968627, blue: 0.92549),
        buttonBgTextPressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        buttonBgTextInverseHover: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBgTextInversePressed: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBorderSecondaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonBorderSecondaryHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        buttonBorderSecondaryPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonBorderSecondaryInverseDefault: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonBorderSecondaryInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonBorderSecondaryInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonFocusRing: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonFocusRingInverse: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonIconSecondaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonIconSecondaryHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonIconSecondaryPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonIconSecondaryInverseDefault: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonIconSecondaryInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonIconSecondaryInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonIconTertiaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonIconTertiaryHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonIconTertiaryPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonIconTertiaryInverseDefault: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonIconTertiaryInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonIconTertiaryInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonIconTextDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonIconTextHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonIconTextPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonIconTextInverseDefault: Color(red: 1, green: 0.576471, blue: 0.196078),
        buttonIconTextInverseHover: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonIconTextInversePressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonLabelSecondaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonLabelSecondaryHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonLabelSecondaryPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonLabelSecondaryInverseDefault: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonLabelSecondaryInverseHover: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonLabelSecondaryInversePressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        buttonLabelTertiaryDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonLabelTertiaryHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonLabelTertiaryPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonLabelTertiaryInverseDefault: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonLabelTertiaryInverseHover: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonLabelTertiaryInversePressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        buttonLabelTextDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        buttonLabelTextHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        buttonLabelTextPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        buttonLabelTextInverseDefault: Color(red: 1, green: 0.733333, blue: 0.427451),
        buttonLabelTextInverseHover: Color(red: 1, green: 0.843137, blue: 0.647059),
        buttonLabelTextInversePressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        checkboxBgUnselectedHover: Color(red: 1, green: 0.968627, blue: 0.92549),
        checkboxBgUnselectedPressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        checkboxBgSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        checkboxBgSelectedHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        checkboxBgSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        checkboxBorderUnselectedHover: Color(red: 0.956863, green: 0.34902, blue: 0),
        checkboxBorderUnselectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        checkboxBorderSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        radioBgHover: Color(red: 1, green: 0.968627, blue: 0.92549),
        radioBgPressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        radioBorderUnselectedHover: Color(red: 0.956863, green: 0.34902, blue: 0),
        radioBorderUnselectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        radioBorderSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        radioBorderSelectedHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        radioBorderSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        radioDotSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        radioDotSelectedHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        radioDotSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        radioStateLayerSelected: Color(red: 0.956863, green: 0.34902, blue: 0),
        chipBgSelectedDefault: Color(red: 1, green: 0.968627, blue: 0.92549),
        chipBgSelectedHover: Color(red: 1, green: 0.929412, blue: 0.827451),
        chipBgSelectedPressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        chipBorderSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        chipBorderSelectedHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        chipBorderSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        chipLabelSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        chipLabelSelectedHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        chipLabelSelectedPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        chipIconSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        chipIconSelectedHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        chipIconSelectedPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        chipRemoveBgSelectedHover: Color(red: 1, green: 0.843137, blue: 0.647059),
        chipRemoveBgSelectedPressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        snackbarLabelControlTintedNeutralDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        snackbarLabelControlTintedNeutralHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        snackbarLabelControlTintedNeutralPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        badgeBgStrongBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        badgeBgSubtleBrand: Color(red: 1, green: 0.968627, blue: 0.92549),
        badgeLabelSubtleBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        badgeDotBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        tabLabelSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        tabLabelSelectedHover: Color(red: 0.956863, green: 0.34902, blue: 0),
        tabLabelSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        tabIconSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        tabIconSelectedHover: Color(red: 0.956863, green: 0.34902, blue: 0),
        tabIconSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        tabIndicatorDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        listLeadingContainerBgBrand: Color(red: 1, green: 0.968627, blue: 0.92549),
        listLeadingContainerIconBrand: Color(red: 0.956863, green: 0.34902, blue: 0),
        switchTrackOnDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        switchTrackOnHover: Color(red: 0.8, green: 0.254902, blue: 0.007843),
        switchTrackOnPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        switchIconOnDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        switchIconOnHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        switchIconOnPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        switchOutlinedIconOn: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlNeutralLabelSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlNeutralLabelSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        segmentedControlNeutralIconSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlNeutralIconSelectedPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        segmentedControlBrandThumbDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlBrandThumbPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        segmentedControlTintedThumbDefault: Color(red: 1, green: 0.968627, blue: 0.92549),
        segmentedControlTintedThumbPressed: Color(red: 1, green: 0.843137, blue: 0.647059),
        segmentedControlTintedThumbBorderDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlTintedThumbBorderPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        segmentedControlTintedLabelSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlTintedLabelSelectedPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        segmentedControlTintedIconSelectedDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        segmentedControlTintedIconSelectedPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059),
        sliderTrackActive: Color(red: 0.956863, green: 0.34902, blue: 0),
        sliderHaloHover: Color(red: 1, green: 0.968627, blue: 0.92549),
        sliderHaloPressed: Color(red: 1, green: 0.929412, blue: 0.827451),
        menuCheckDefault: Color(red: 0.956863, green: 0.34902, blue: 0),
        menuCheckPressed: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        tooltipPrimaryLabelLight: Color(red: 0.956863, green: 0.34902, blue: 0),
        tooltipPrimaryLabelLightHover: Color(red: 0.631373, green: 0.203922, blue: 0.043137),
        tooltipPrimaryLabelLightPressed: Color(red: 0.509804, green: 0.176471, blue: 0.047059)
    )

    public static let all: [CosmosBrand] = [.makeMyTrip, .myBiz, .goibibo]
}

private struct CosmosBrandKey: EnvironmentKey {
    static let defaultValue = CosmosBrand.makeMyTrip
}

public extension EnvironmentValues {
    /// The brand of this part of the view hierarchy. Defaults to MakeMyTrip.
    var cosmosBrand: CosmosBrand {
        get { self[CosmosBrandKey.self] }
        set { self[CosmosBrandKey.self] = newValue }
    }
}
