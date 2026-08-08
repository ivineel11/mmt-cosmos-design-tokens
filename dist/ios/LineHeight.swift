//
// LineHeight.swift
//

// Do not edit directly, this file was auto-generated.

import SwiftUI
import UIKit

public extension View {
    /// Applies a design-token line height to text.
    ///
    /// Design tokens (`CosmosTokens.*LineHeight`) express the **total line-box height**
    /// (the Figma/CSS/Android model). SwiftUI's `.lineSpacing(_:)` instead adds space
    /// only *between* lines, so applying a token value directly would over-space text.
    /// This modifier converts it: it subtracts the font's intrinsic line height to get
    /// the inter-line spacing, then pads the top and bottom by half the leading so a
    /// single line (and the first/last line of a paragraph) occupies the same vertical
    /// box it does on web and Android.
    ///
    /// - Parameters:
    ///   - lineHeight: Total line-box height, e.g. `CosmosTokens.bodyMediumRegularLineHeight`.
    ///   - uiFont: The `UIFont` actually used to render the text. Its `lineHeight`
    ///     provides the intrinsic metrics SwiftUI does not expose.
    func lineHeight(_ lineHeight: CGFloat, for uiFont: UIFont) -> some View {
        let leading = max(0, lineHeight - uiFont.lineHeight)
        return self
            .lineSpacing(leading)
            .padding(.vertical, leading / 2)
    }

    /// Convenience overload that resolves a `UIFont` from a token font family and size,
    /// falling back to the system font of that size if the custom font is unavailable.
    ///
    /// - Parameters:
    ///   - lineHeight: Total line-box height, e.g. `CosmosTokens.bodyMediumRegularLineHeight`.
    ///   - fontName: Token font family, e.g. `CosmosTokens.bodyMediumRegularFontFamily`.
    ///   - fontSize: Token font size, e.g. `CosmosTokens.bodyMediumRegularFontSize`.
    func lineHeight(_ lineHeight: CGFloat, fontName: String, fontSize: CGFloat) -> some View {
        let uiFont = UIFont(name: fontName, size: fontSize)
            ?? .systemFont(ofSize: fontSize)
        return self.lineHeight(lineHeight, for: uiFont)
    }
}
