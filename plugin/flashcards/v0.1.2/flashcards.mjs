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
var c = () => {
	let e = document.createElement("div");
	return e.className = "reveal-flashcards", e.innerHTML = "\n    <div class=\"reveal-flashcards__status\" role=\"status\" aria-live=\"polite\"></div>\n    <div class=\"reveal-flashcards__progress\" aria-live=\"polite\"></div>\n    <div class=\"reveal-flashcards__card\" role=\"region\" aria-label=\"Flashcard\" tabindex=\"0\">\n      <div class=\"reveal-flashcards__label\">Question</div>\n      <div class=\"reveal-flashcards__question\"></div>\n      <div class=\"reveal-flashcards__solution\" hidden>\n        <div class=\"reveal-flashcards__label\">Solution</div>\n        <div class=\"reveal-flashcards__solution-content\"></div>\n      </div>\n    </div>\n    <div class=\"reveal-flashcards__actions\">\n      <button type=\"button\" data-action=\"reveal\">Show solution</button>\n      <div class=\"reveal-flashcards__ratings\" hidden>\n        <button type=\"button\" data-rating=\"again\">Again</button>\n        <button type=\"button\" data-rating=\"hard\">Hard</button>\n        <button type=\"button\" data-rating=\"good\">Good</button>\n      </div>\n      <button type=\"button\" data-action=\"restart\" hidden>Start again</button>\n    </div>", e.querySelector(".reveal-flashcards__card").addEventListener("keydown", (e) => e.stopPropagation()), e;
}, l = (e, t) => {
	t.replaceChildren(...[...e.childNodes].map((e) => e.cloneNode(!0)));
};
function u(e = {}) {
	let t, r, u, d = /* @__PURE__ */ new Map(), f = e.random || Math.random, p = (e) => {
		let n = typeof e == "string" ? document.querySelector(e) : e || t?.getCurrentSlide();
		if (!n || !d.has(n)) throw Error("No flashcard pool is available for the selected slide");
		return n;
	}, m = (e, t, n = !1) => {
		let r = e.root.querySelector(".reveal-flashcards__status");
		r.textContent = t, r.classList.toggle("is-error", n);
	}, h = (e) => {
		if (!t) return;
		let n = Number(t?.getComputedSlideSize?.().height ?? t?.getConfig?.().height), r = Number.isFinite(n) && n > 0 ? n : e.slide.parentElement?.clientHeight || 700, i = t.getRevealElement().getBoundingClientRect(), a = t.getRevealElement().querySelector(".reveal-ink-toolbar")?.getBoundingClientRect(), o = a?.height > 0 ? Math.max(0, i.bottom - a.top) : 0, s = t.getScale?.() || 1, c = o ? Math.max(48, (o + 16) / s) : 48;
		e.root.style.setProperty("--flashcards-max-height", `${Math.max(1, r - c)}px`);
	}, g = () => {
		cancelAnimationFrame(r), r = requestAnimationFrame(() => {
			let e = d.get(t?.getCurrentSlide());
			e && (h(e), t.layout?.());
		});
	}, _ = (e) => {
		let n = o(e.session, e.cards.length), r = e.root.querySelector(".reveal-flashcards__card"), i = e.root.querySelector("[data-action=\"reveal\"]"), a = e.root.querySelector(".reveal-flashcards__ratings"), s = e.root.querySelector("[data-action=\"restart\"]");
		if (e.root.querySelector(".reveal-flashcards__progress").textContent = n.done ? `${n.total} of ${n.total} cards completed` : `${n.completed} of ${n.total} completed · ${n.remaining} in queue`, m(e, n.done ? "Review complete." : ""), n.done) {
			r.hidden = !0, i.hidden = !0, a.hidden = !0, s.hidden = !1, s.focus({ preventScroll: !0 });
			return;
		}
		let c = e.byId.get(n.currentCardId);
		r.hidden = !1, s.hidden = !0, l(c.question, e.root.querySelector(".reveal-flashcards__question")), l(c.solution, e.root.querySelector(".reveal-flashcards__solution-content"));
		let u = e.root.querySelector(".reveal-flashcards__solution");
		u.hidden = !n.revealed, r.scrollTop = 0, i.hidden = n.revealed, a.hidden = !n.revealed, (n.revealed ? a.querySelector("[data-rating=\"again\"]") : i).focus({ preventScroll: !0 }), h(e), t?.layout?.(), t?.dispatchEvent?.({
			type: "resize",
			data: { source: "flashcards" }
		}), globalThis.requestAnimationFrame?.(() => {
			h(e), t?.layout?.(), t?.dispatchEvent?.({
				type: "resize",
				data: { source: "flashcards-settled" }
			});
		});
	}, v = (e) => {
		let t = d.get(p(e));
		return t.session = n(t.cards.map((e) => e.id), f), _(t), o(t.session, t.cards.length);
	}, y = (e) => {
		let t = d.get(p(e));
		return i(t.session), _(t), o(t.session, t.cards.length);
	}, b = (e, n) => {
		let r = d.get(p(n));
		if (![
			"again",
			"hard",
			"good"
		].includes(e)) throw Error(`Unknown flashcard rating: ${e}`);
		if (!r.session.revealed) throw Error("Reveal the solution before rating this card");
		try {
			t.getPlugin?.("ink")?.clear?.();
		} catch (e) {
			console.warn("Reveal Flashcards: could not clear Reveal Ink", e);
		}
		return a(r.session, e), _(r), o(r.session, r.cards.length);
	}, x = (e) => {
		let t = d.get(p(e));
		return o(t.session, t.cards.length);
	}, S = (e) => {
		e.hasAttribute("data-transition") || (e.dataset.transition = "none");
		let t = c();
		e.append(t);
		try {
			let n = s(e), r = {
				slide: e,
				cards: n,
				byId: new Map(n.map((e) => [e.id, e])),
				root: t,
				session: null,
				listener: null
			};
			r.listener = (n) => {
				let i = n.target.closest("button");
				if (i && t.contains(i)) try {
					i.dataset.action === "reveal" ? y(e) : i.dataset.action === "restart" ? v(e) : i.dataset.rating && b(i.dataset.rating, e);
				} catch (e) {
					m(r, e.message, !0);
				}
			}, t.addEventListener("click", r.listener), d.set(e, r), v(e);
		} catch (n) {
			let r = {
				slide: e,
				cards: [],
				root: t,
				session: {
					queue: [],
					completed: /* @__PURE__ */ new Set(),
					revealed: !1
				}
			};
			d.set(e, r), t.querySelector(".reveal-flashcards__card").hidden = !0, t.querySelector(".reveal-flashcards__actions").hidden = !0, t.querySelector(".reveal-flashcards__progress").hidden = !0, m(r, n.message, !0);
		}
	};
	return {
		id: "flashcards",
		init(e) {
			t = e, t.getRevealElement().querySelectorAll(".slides section[data-flashcards]").forEach(S);
			for (let e of [
				"ready",
				"resize",
				"slidechanged"
			]) t.on(e, g);
			let n = t.getRevealElement().querySelector(".reveal-ink-toolbar");
			n && globalThis.ResizeObserver && (u = new ResizeObserver(g), u.observe(n));
		},
		start: v,
		reveal: y,
		rate: b,
		restart: v,
		getState: x,
		destroy() {
			cancelAnimationFrame(r), u?.disconnect();
			for (let e of [
				"ready",
				"resize",
				"slidechanged"
			]) t.off(e, g);
			for (let e of d.values()) {
				e.listener && e.root.removeEventListener("click", e.listener), e.root.remove();
				for (let t of e.cards) t.node.hidden = !1;
			}
			d.clear(), t = void 0;
		}
	};
}
//#endregion
export { u as default };
