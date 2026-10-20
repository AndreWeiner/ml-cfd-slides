/* Classic scripts also work when the deck is opened directly in Firefox. */
(function () {
  const RevealClass = window.Reveal;
  const editor = Boolean(window.__editorInitialize);
  const deck = new RevealClass({
    width: 960, height: 700, center: false, hash: true, progress: true,
    slideNumber: 'c', navigationMode: 'default',
    katex: { local: 'public/libs/katex' },
    plugins: [RevealNotes, RevealMath.KaTeX, RevealFlashcards, ...(editor ? [] : [RevealInk])],
    ink: { presentation: 'ml-fluid-mechanics-introduction', pen: { color: '#ffffff' }, storage: { type: 'indexeddb', autosave: true } }
  });
  window.Reveal = deck;
  deck.initialize(editor ? { view: 'slide', scrollActivationWidth: null, showHiddenSlides: true } : {});
}());
