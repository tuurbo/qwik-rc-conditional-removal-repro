# Removing a conditional element re-inserts its later siblings (iframes reload, focus is lost)

1. `pnpm install && pnpm dev`
2. Open `/`. Note the time inside the frame.
3. Click **Toggle message** twice (show, then hide).

The frame's time changes: hiding the `<p>` reloaded the iframe.

When `{show.value && <p>Message</p>}` is removed, Qwik also removes and re-adds every element after it. Re-inserting an `<iframe>` reloads it, and re-inserting a focused element drops focus. With the keyboard: Tab to the button and press Space twice, and focus ends on `<body>`.

A MutationObserver on the `<section>`, while hiding:

```
removed <iframe>
removed <button>
added <iframe>
added <button>
removed <p>
```

Expected: only `removed <p>`. Showing the `<p>` is a single `added <p>`.

Real-world impact: Braintree hosted card fields are iframes after an error message. Clearing the error on resubmit reloads them, and `tokenize()` never settles, so the Pay button spins forever.

Workaround: no siblings move if the conditional is the only child of a wrapper (`<div>{show.value && <p>Message</p>}</div>`), lives in its own `component$`, or is always rendered and toggled with `hidden`.

Version: 2.0.0-rc.2. The route is in `src/routes/index.tsx`.
