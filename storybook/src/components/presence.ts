import { useEffect, useRef, useState } from "react";

/** The longest transition on `element`, duration plus delay, in milliseconds. */
function longestTransition(element: Element): number {
  const style = getComputedStyle(element);
  const toMs = (value: string) => value.split(",").map((part) => parseFloat(part) * (part.trim().endsWith("ms") ? 1 : 1000) || 0);
  const durations = toMs(style.transitionDuration);
  const delays = toMs(style.transitionDelay);
  return Math.max(0, ...durations.map((duration, i) => duration + (delays[i % delays.length] ?? 0)));
}

/**
 * Calls `done` once the exit transition on `element` has finished, read from its own CSS
 * so the motion tokens stay the only source of the timing. A timer backs up transitionend,
 * which never fires for a zero duration or a transition the browser skips. Returns a cleanup.
 */
export function afterExit(element: Element | null, done: () => void): () => void {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    done();
  };
  const onEnd = (event: Event) => {
    if (event.target === element) finish();
  };
  element?.addEventListener("transitionend", onEnd);
  const timer = window.setTimeout(finish, element ? longestTransition(element) + 50 : 0);
  return () => {
    finished = true;
    element?.removeEventListener("transitionend", onEnd);
    window.clearTimeout(timer);
  };
}

/**
 * Keeps an element mounted while its exit transition runs. `exiting` is true from the moment
 * `present` turns false until the transition on the element `getElement` returns has ended;
 * mark the element with it (for example data-exiting) so its CSS can fade it out. Turning
 * `present` back on mid-exit keeps the same element, so the transition reverses instead of
 * restarting.
 */
export function usePresence(present: boolean, getElement: () => Element | null) {
  const latest = useRef(getElement);
  useEffect(() => {
    latest.current = getElement;
  });
  const [wasPresent, setWasPresent] = useState(present);
  const [exiting, setExiting] = useState(false);
  if (present !== wasPresent) {
    setWasPresent(present);
    setExiting(!present);
  }
  useEffect(() => {
    if (!exiting) return;
    return afterExit(latest.current(), () => setExiting(false));
  }, [exiting]);
  return { mounted: present || exiting, exiting };
}
