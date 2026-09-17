//#region src/session.js
var e = /* @__PURE__ */ new Set([
	"again",
	"hard",
	"good"
]);
function t(e, t = Math.random) {
	let n = [...e];
	for (let e = n.length - 1; e > 0; e--) {
		let r = Math.floor(t() * (e + 1));
		[n[e], n[r]] = [n[r], n[e]];
	}
	return n;
}
function n(e, n = Math.random) {
	if (!Array.isArray(e) || e.length === 0) throw Error("A flashcard pool must contain at least one card");
	if (new Set(e).size !== e.length) throw Error("Flashcard IDs must be unique within a pool");
	return {
		queue: t(e, n),
		completed: /* @__PURE__ */ new Set(),
		revealed: !1
	};
}
function r(e) {
	return e.queue[0] ?? null;
}
function i(e) {
	if (!r(e)) throw Error("The flashcard session is complete");
	e.revealed = !0;
}
function a(t, n) {
	if (!e.has(n)) throw Error(`Unknown flashcard rating: ${n}`);
	let i = r(t);
	if (!i) throw Error("The flashcard session is complete");
	if (!t.revealed) throw Error("Reveal the solution before rating this card");
	return t.queue.shift(), n === "again" ? t.queue.splice(Math.min(2, t.queue.length), 0, i) : n === "hard" ? t.queue.push(i) : t.completed.add(i), t.revealed = !1, i;
}
function o(e, t) {
	return {
		currentCardId: r(e),
		revealed: e.revealed,
		completed: e.completed.size,
		total: t,
		remaining: e.queue.length,
		done: e.queue.length === 0
	};
}
//#endregion
//#region src/parser.js
function s(e) {
	let t = [...e.querySelectorAll(":scope > [data-flashcard]")];
	if (!t.length) throw Error("This review slide does not contain any [data-flashcard] elements");
	let n = /* @__PURE__ */ new Set();
	return t.map((e, t) => {
		let r = e.dataset.cardId?.trim();
		if (!r) throw Error(`Flashcard ${t + 1} is missing data-card-id`);
		if (n.has(r)) throw Error(`Duplicate flashcard ID: ${r}`);
		let i = e.querySelector(":scope > [data-question]"), a = e.querySelector(":scope > [data-solution]");
		if (!i || !a) throw Error(`Flashcard "${r}" requires one [data-question] and one [data-solution] element`);
		return n.add(r), e.hidden = !0, {
			id: r,
			node: e,
			question: i,
			solution: a
		};
	});
}
//#endregion
//#region src/plugin.js
var c = .64, l = .28, u = .02, d = () => {
	let e = document.createElement("div");
	return e.className = "reveal-flashcards", e.innerHTML = "\n    <div class=\"reveal-flashcards__status\" role=\"status\" aria-live=\"polite\"></div>\n    <div class=\"reveal-flashcards__progress\" aria-live=\"polite\"></div>\n    <div class=\"reveal-flashcards__card\" role=\"region\" aria-label=\"Flashcard\">\n      <div class=\"reveal-flashcards__label\">Question</div>\n      <div class=\"reveal-flashcards__question\"></div>\n      <div class=\"reveal-flashcards__writing-area\" aria-label=\"Space to write your answer\">\n        <div class=\"reveal-flashcards__writing-prompt\"><span aria-hidden=\"true\">✍</span> Write down your answer before checking!</div>\n      </div>\n      <div class=\"reveal-flashcards__solution\" hidden>\n        <div class=\"reveal-flashcards__label\">Solution</div>\n        <div class=\"reveal-flashcards__solution-content\"></div>\n      </div>\n    </div>\n    <div class=\"reveal-flashcards__actions\">\n      <button type=\"button\" data-action=\"reveal\">Show solution</button>\n      <div class=\"reveal-flashcards__ratings\" hidden>\n        <button type=\"button\" data-rating=\"again\">Again</button>\n        <button type=\"button\" data-rating=\"hard\">Hard</button>\n        <button type=\"button\" data-rating=\"good\">Good</button>\n      </div>\n      <button type=\"button\" data-action=\"restart\" hidden>Start again</button>\n    </div>", e;
}, f = (e, t) => {
	t.replaceChildren(...[...e.childNodes].map((e) => e.cloneNode(!0)));
};
function p(e = {}) {
	let t, r = /* @__PURE__ */ new Map(), p = e.random || Math.random, m = (e) => {
		let n = typeof e == "string" ? document.querySelector(e) : e || t?.getCurrentSlide();
		if (!n || !r.has(n)) throw Error("No flashcard pool is available for the selected slide");
		return n;
	}, h = (e, t, n = !1) => {
		let r = e.root.querySelector(".reveal-flashcards__status");
		r.textContent = t, r.classList.toggle("is-error", n);
	}, g = (e) => {
		let n = Number(t?.getConfig?.().height), r = Number.isFinite(n) && n > 0 ? n : e.slide.parentElement?.clientHeight || 700, i = Math.max(1, r - 48), a = c;
		for (e.root.style.setProperty("--flashcards-content-size", `${a}em`); e.root.offsetHeight > i && a > l;) a = Math.max(l, Number((a - u).toFixed(2))), e.root.style.setProperty("--flashcards-content-size", `${a}em`);
		e.root.dataset.contentSize = a.toFixed(2);
	}, _ = (e) => {
		let n = o(e.session, e.cards.length), r = e.root.querySelector(".reveal-flashcards__card"), i = e.root.querySelector("[data-action=\"reveal\"]"), a = e.root.querySelector(".reveal-flashcards__ratings"), s = e.root.querySelector("[data-action=\"restart\"]");
		if (e.root.querySelector(".reveal-flashcards__progress").textContent = n.done ? `${n.total} of ${n.total} cards completed` : `${n.completed} of ${n.total} completed · ${n.remaining} in queue`, h(e, n.done ? "Review complete." : ""), n.done) {
			r.hidden = !0, i.hidden = !0, a.hidden = !0, s.hidden = !1, s.focus({ preventScroll: !0 });
			return;
		}
		let c = e.byId.get(n.currentCardId);
		r.hidden = !1, s.hidden = !0, f(c.question, e.root.querySelector(".reveal-flashcards__question")), f(c.solution, e.root.querySelector(".reveal-flashcards__solution-content"));
		let l = e.root.querySelector(".reveal-flashcards__solution");
		l.hidden = !n.revealed, i.hidden = n.revealed, a.hidden = !n.revealed, (n.revealed ? a.querySelector("[data-rating=\"again\"]") : i).focus({ preventScroll: !0 }), g(e), t?.layout?.(), t?.dispatchEvent?.({
			type: "resize",
			data: { source: "flashcards" }
		}), globalThis.requestAnimationFrame?.(() => {
			g(e), t?.layout?.(), t?.dispatchEvent?.({
				type: "resize",
				data: { source: "flashcards-settled" }
			});
		});
	}, v = (e) => {
		let t = r.get(m(e));
		return t.session = n(t.cards.map((e) => e.id), p), _(t), o(t.session, t.cards.length);
	}, y = (e) => {
		let t = r.get(m(e));
		return i(t.session), _(t), o(t.session, t.cards.length);
	}, b = (e, n) => {
		let i = r.get(m(n));
		if (![
			"again",
			"hard",
			"good"
		].includes(e)) throw Error(`Unknown flashcard rating: ${e}`);
		if (!i.session.revealed) throw Error("Reveal the solution before rating this card");
		try {
			t.getPlugin?.("ink")?.clear?.();
		} catch (e) {
			console.warn("Reveal Flashcards: could not clear Reveal Ink", e);
		}
		return a(i.session, e), _(i), o(i.session, i.cards.length);
	}, x = (e) => {
		let t = r.get(m(e));
		return o(t.session, t.cards.length);
	}, S = (e) => {
		e.hasAttribute("data-transition") || (e.dataset.transition = "none");
		let t = d();
		e.append(t);
		try {
			let n = s(e), i = {
				slide: e,
				cards: n,
				byId: new Map(n.map((e) => [e.id, e])),
				root: t,
				session: null,
				listener: null
			};
			i.listener = (n) => {
				let r = n.target.closest("button");
				if (r && t.contains(r)) try {
					r.dataset.action === "reveal" ? y(e) : r.dataset.action === "restart" ? v(e) : r.dataset.rating && b(r.dataset.rating, e);
				} catch (e) {
					h(i, e.message, !0);
				}
			}, t.addEventListener("click", i.listener), r.set(e, i), v(e);
		} catch (n) {
			let i = {
				slide: e,
				cards: [],
				root: t,
				session: {
					queue: [],
					completed: /* @__PURE__ */ new Set(),
					revealed: !1
				}
			};
			r.set(e, i), t.querySelector(".reveal-flashcards__card").hidden = !0, t.querySelector(".reveal-flashcards__actions").hidden = !0, t.querySelector(".reveal-flashcards__progress").hidden = !0, h(i, n.message, !0);
		}
	};
	return {
		id: "flashcards",
		init(e) {
			t = e, t.getRevealElement().querySelectorAll(".slides section[data-flashcards]").forEach(S);
		},
		start: v,
		reveal: y,
		rate: b,
		restart: v,
		getState: x,
		destroy() {
			for (let e of r.values()) {
				e.listener && e.root.removeEventListener("click", e.listener), e.root.remove();
				for (let t of e.cards) t.node.hidden = !1;
			}
			r.clear(), t = void 0;
		}
	};
}
//#endregion
export { p as default };
