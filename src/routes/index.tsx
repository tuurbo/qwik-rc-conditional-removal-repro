import { component$, useSignal } from "@qwik.dev/core";

// Shows when the frame was (re)loaded.
const frame = `<p>Loaded at <b id="t"></b></p><script>t.textContent = new Date().toLocaleTimeString()</script>`;

export default component$(() => {
  const show = useSignal(false);

  return (
    <section>
      {show.value && <p>Message</p>}
      <iframe srcdoc={frame} />
      <button onClick$={() => (show.value = !show.value)}>Toggle message</button>
    </section>
  );
});
