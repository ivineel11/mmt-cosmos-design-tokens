
// Do not edit directly, this file was auto-generated.

package com.makemytrip.cosmos.tokens

import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.spring
import androidx.compose.runtime.Immutable

/**
 * A spring from the Cosmos motion tokens (`CosmosTokens.spring*`). Compose's spring() is
 * generic over the value it animates, so turn the token into a spec where it is used:
 *
 *     val offset by animateFloatAsState(target, CosmosTokens.springSnappy.spec())
 */
@Immutable
data class CosmosSpring(val dampingRatio: Float, val stiffness: Float) {
  fun <T> spec(visibilityThreshold: T? = null): SpringSpec<T> =
    spring(dampingRatio = dampingRatio, stiffness = stiffness, visibilityThreshold = visibilityThreshold)
}
