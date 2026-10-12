//#region src/tools.js
function e(e) {
	return [
		"navigate",
		"pen",
		"highlighter",
		"eraser"
	].includes(e) ? e : "navigate";
}
//#endregion
//#region node_modules/perfect-freehand/dist/esm/index.mjs
var { PI: t } = Math, n = t + 1e-4, r = .5, i = [1, 1];
function a(e, t, n, r = (e) => e) {
	return e * r(.5 - t * (.5 - n));
}
var { min: o } = Math;
function s(e, t, n) {
	let r = o(1, t / n);
	return o(1, e + (o(1, 1 - r) - e) * (r * .275));
}
function c(e) {
	return [-e[0], -e[1]];
}
function l(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function u(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function d(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function f(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function p(e, t) {
	return [e[0] * t, e[1] * t];
}
function m(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function h(e, t) {
	return [e[0] / t, e[1] / t];
}
function g(e) {
	return [e[1], -e[0]];
}
function _(e, t) {
	let n = t[0];
	return e[0] = t[1], e[1] = -n, e;
}
function v(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function y(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function b(e) {
	return Math.hypot(e[0], e[1]);
}
function x(e, t) {
	let n = e[0] - t[0], r = e[1] - t[1];
	return n * n + r * r;
}
function S(e) {
	return h(e, b(e));
}
function C(e, t) {
	return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function w(e, t, n) {
	let r = Math.sin(n), i = Math.cos(n), a = e[0] - t[0], o = e[1] - t[1], s = a * i - o * r, c = a * r + o * i;
	return [s + t[0], c + t[1]];
}
function T(e, t, n, r) {
	let i = Math.sin(r), a = Math.cos(r), o = t[0] - n[0], s = t[1] - n[1], c = o * a - s * i, l = o * i + s * a;
	return e[0] = c + n[0], e[1] = l + n[1], e;
}
function E(e, t, n) {
	return l(e, p(d(t, e), n));
}
function D(e, t, n, r) {
	let i = n[0] - t[0], a = n[1] - t[1];
	return e[0] = t[0] + i * r, e[1] = t[1] + a * r, e;
}
function O(e, t, n) {
	return l(e, p(t, n));
}
var k = [0, 0], A = [0, 0], j = [0, 0];
function M(e, t) {
	let r = O(e, S(g(d(e, l(e, [1, 1])))), -t), i = [], a = 1 / 13;
	for (let t = a; t <= 1; t += a) i.push(w(r, e, n * 2 * t));
	return i;
}
function N(e, t, r) {
	let i = [], a = 1 / r;
	for (let r = a; r <= 1; r += a) i.push(w(t, e, n * r));
	return i;
}
function P(e, t, n) {
	let r = d(t, n), i = p(r, .5), a = p(r, .51);
	return [
		d(e, i),
		d(e, a),
		l(e, a),
		l(e, i)
	];
}
function F(e, t, r, i) {
	let a = [], o = O(e, t, r), s = 1 / i;
	for (let t = s; t < 1; t += s) a.push(w(o, e, n * 3 * t));
	return a;
}
function ee(e, t, n) {
	return [
		l(e, p(t, n)),
		l(e, p(t, n * .99)),
		d(e, p(t, n * .99)),
		d(e, p(t, n))
	];
}
function I(e, t, n) {
	return e === !1 || e === void 0 ? 0 : e === !0 ? Math.max(t, n) : e;
}
function te(e, t, n) {
	return e.slice(0, 10).reduce((e, r) => {
		let i = r.pressure;
		return t && (i = s(e, r.distance, n)), (e + i) / 2;
	}, e[0].pressure);
}
function L(e, t = {}) {
	let { size: r = 16, smoothing: i = .5, thinning: o = .5, simulatePressure: p = !0, easing: h = (e) => e, start: y = {}, end: b = {}, last: S = !1 } = t, { cap: C = !0, easing: w = (e) => e * (2 - e) } = y, { cap: E = !0, easing: O = (e) => --e * e * e + 1 } = b;
	if (e.length === 0 || r <= 0) return [];
	let L = e[e.length - 1].runningLength, R = I(y.taper, r, L), z = I(b.taper, r, L), B = (r * i) ** 2, V = [], H = [], U = te(e, p, r), W = a(r, o, e[e.length - 1].pressure, h), G, K = e[0].vector, q = e[0].point, J = q, Y = q, X = J, Z = !1;
	for (let t = 0; t < e.length; t++) {
		let { pressure: i } = e[t], { point: c, vector: g, distance: y, runningLength: b } = e[t], S = t === e.length - 1;
		if (!S && L - b < 3) continue;
		o ? (p && (i = s(U, y, r)), W = a(r, o, i, h)) : W = r / 2, G === void 0 && (G = W);
		let C = b < R ? w(b / R) : 1, E = L - b < z ? O((L - b) / z) : 1;
		W = Math.max(.01, W * Math.min(C, E));
		let M = (S ? e[t] : e[t + 1]).vector, N = S ? 1 : v(g, M), P = v(g, K) < 0 && !Z, F = N !== null && N < 0;
		if (P || F) {
			_(k, K), m(k, k, W);
			for (let e = 0; e <= 1; e += .07692307692307693) f(A, c, k), T(A, A, c, n * e), Y = [A[0], A[1]], V.push(Y), u(j, c, k), T(j, j, c, n * -e), X = [j[0], j[1]], H.push(X);
			q = Y, J = X, F && (Z = !0);
			continue;
		}
		if (Z = !1, S) {
			_(k, g), m(k, k, W), V.push(d(c, k)), H.push(l(c, k));
			continue;
		}
		D(k, M, g, N), _(k, k), m(k, k, W), f(A, c, k), Y = [A[0], A[1]], (t <= 1 || x(q, Y) > B) && (V.push(Y), q = Y), u(j, c, k), X = [j[0], j[1]], (t <= 1 || x(J, X) > B) && (H.push(X), J = X), U = i, K = g;
	}
	let Q = [e[0].point[0], e[0].point[1]], ne = e.length > 1 ? [e[e.length - 1].point[0], e[e.length - 1].point[1]] : l(e[0].point, [1, 1]), re = [], $ = [];
	if (e.length === 1) {
		if (!(R || z) || S) return M(Q, G || W);
	} else {
		R || z && e.length === 1 || (C ? re.push(...N(Q, H[0], 13)) : re.push(...P(Q, V[0], H[0])));
		let t = g(c(e[e.length - 1].vector));
		z || R && e.length === 1 ? $.push(ne) : E ? $.push(...F(ne, t, W, 29)) : $.push(...ee(ne, t, W));
	}
	return V.concat($, H.reverse(), re);
}
var R = [0, 0];
function z(e) {
	return e != null && e >= 0;
}
function B(e, t = {}) {
	let { streamline: n = .5, size: a = 16, last: o = !1 } = t;
	if (e.length === 0) return [];
	let s = .15 + (1 - n) * .85, c = Array.isArray(e[0]) ? e : e.map(({ x: e, y: t, pressure: n = r }) => [
		e,
		t,
		n
	]);
	if (c.length === 2) {
		let e = c[1];
		c = c.slice(0, -1);
		for (let t = 1; t < 5; t++) c.push(E(c[0], e, t / 4));
	}
	c.length === 1 && (c = [...c, [...l(c[0], i), ...c[0].slice(2)]]);
	let u = [{
		point: [c[0][0], c[0][1]],
		pressure: z(c[0][2]) ? c[0][2] : .25,
		vector: [...i],
		distance: 0,
		runningLength: 0
	}], d = !1, p = 0, m = u[0], h = c.length - 1;
	for (let e = 1; e < c.length; e++) {
		let t = o && e === h ? [c[e][0], c[e][1]] : E(m.point, c[e], s);
		if (y(m.point, t)) continue;
		let n = C(t, m.point);
		if (p += n, e < h && !d) {
			if (p < a) continue;
			d = !0;
		}
		f(R, m.point, t), m = {
			point: t,
			pressure: z(c[e][2]) ? c[e][2] : r,
			vector: S(R),
			distance: n,
			runningLength: p
		}, u.push(m);
	}
	return u[0].vector = u[1]?.vector || [0, 0], u;
}
function V(e, t = {}) {
	return L(B(e, t), t);
}
//#endregion
//#region src/coordinates.js
var H = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e));
function U(e, t, n = !1) {
	if (!(t.width > 0 && t.height > 0)) throw Error("Ink surface has no size");
	return [
		H((e.clientX - t.left) / t.width, n ? -100 : 0, n ? 100 : 1),
		H((e.clientY - t.top) / t.height, n ? -100 : 0, n ? 100 : 1),
		H(e.pressure > 0 ? e.pressure : .5)
	];
}
function W([e, t, n], r, i) {
	return [
		e * r,
		t * i,
		n
	];
}
function G(e, t) {
	return e.id ? `id:${e.id}` : `index:${t.h}:${t.v || 0}`;
}
function K(e, t, n) {
	let r = n[0] - t[0], i = n[1] - t[1], a = r || i ? H(((e[0] - t[0]) * r + (e[1] - t[1]) * i) / (r * r + i * i)) : 0;
	return Math.hypot(e[0] - t[0] - a * r, e[1] - t[1] - a * i);
}
//#endregion
//#region src/renderer.js
var q = "http://www.w3.org/2000/svg";
function J(e, t = !0) {
	return V(e.points.map((t) => W(t, 960, 960 / e.aspect)), {
		size: e.width,
		...e.options,
		last: t
	});
}
function Y(e) {
	if (!e.length) return "";
	let t = (e, t) => [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
	return `M ${t(e.at(-1), e[0]).join(" ")} ` + e.map((n, r) => `Q ${n.join(" ")} ${t(n, e[(r + 1) % e.length]).join(" ")}`).join(" ") + " Z";
}
function X(e, t, n, r, i) {
	let a = J(e).map(([t, n]) => [t, n * e.aspect / r]), o = W(t, 960, 960 / r), s = W(n, 960, 960 / r), c = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]), l = !1;
	for (let e = 0, t = a.length - 1; e < a.length; t = e++) {
		let n = a[e], r = a[t];
		if (n[1] > o[1] != r[1] > o[1] && o[0] < (r[0] - n[0]) * (o[1] - n[1]) / (r[1] - n[1]) + n[0] && (l = !l), Math.min(K(n, o, s), K(r, o, s), K(o, n, r), K(s, n, r)) <= i || c(o, s, n) * c(o, s, r) < 0 && c(n, r, o) * c(n, r, s) < 0) return !0;
	}
	return l;
}
var Z = class {
	constructor() {
		this.surfaces = /* @__PURE__ */ new Map();
	}
	surface(e) {
		if (!this.surfaces.has(e)) {
			let t = document.createElementNS(q, "svg");
			t.classList.add("reveal-ink-surface"), t.setAttribute("aria-hidden", "true"), t.setAttribute("preserveAspectRatio", "none"), e.append(t), this.surfaces.set(e, t);
		}
		return this.surfaces.get(e);
	}
	layout(e, t, n, r, i, a = 0) {
		let o = this.surface(e), s = r.getBoundingClientRect(), c = s.width / i, l = s.height / i, u = (c - t) / 2, d = (l - n) / 2;
		if (o.style.width = `${c}px`, o.style.height = `${l}px`, o.style.left = `${-u}px`, o.style.top = `${-e.offsetTop - d}px`, o.setAttribute("viewBox", `${-u * 960 / t} ${(-d + a * n) * 960 / t} ${c * 960 / t} ${l * 960 / t}`), /Firefox\//.test(navigator.userAgent)) {
			let t = e.getBoundingClientRect(), n = t.left + t.width / 2, r = s.left + s.width / 2;
			if (Math.abs(n - r) < 2) {
				let n = t.width / e.offsetWidth;
				o.style.left = `${(s.left - t.left) / n}px`, o.style.top = `${(s.top - t.top) / n}px`;
				let r = o.getBoundingClientRect();
				o.style.left = `${parseFloat(o.style.left) + (s.left - r.left) / n}px`, o.style.top = `${parseFloat(o.style.top) + (s.top - r.top) / n}px`;
			}
		}
		return o.inkRect = {
			left: s.left + u * i,
			top: s.top + d * i - a * n * i,
			width: t * i,
			height: n * i
		}, o;
	}
	path(e, t = !0) {
		let n = document.createElementNS(q, "path");
		return n.dataset.stroke = e.id, n.setAttribute("d", Y(J(e, t))), n.setAttribute("fill", e.color), n.setAttribute("opacity", e.tool === "highlighter" ? "0.3" : "1"), n;
	}
	render(e, t, n) {
		let r = this.surface(e);
		r.replaceChildren();
		for (let e of t) {
			let t = this.path(e);
			t.setAttribute("transform", `scale(1 ${e.aspect / n})`), r.append(t);
		}
	}
	preview(e, t) {
		let n = this.surface(e);
		if (n.querySelector("[data-preview]")?.remove(), t) {
			let e = this.path(t, !1);
			e.dataset.preview = "", n.append(e);
		}
	}
	destroy() {
		for (let e of this.surfaces.values()) e.remove();
		this.surfaces.clear();
	}
}, Q = class {
	constructor(e = 100) {
		this.limit = e, this.entries = /* @__PURE__ */ new Map();
	}
	entry(e) {
		return this.entries.has(e) || this.entries.set(e, {
			undo: [],
			redo: []
		}), this.entries.get(e);
	}
	record(e, t, n) {
		let r = this.entry(e);
		r.undo.push({
			before: t,
			after: n
		}), r.undo.length > this.limit && r.undo.shift(), r.redo = [];
	}
	undo(e) {
		let t = this.entry(e), n = t.undo.pop();
		return n ? (t.redo.push(n), n.before) : null;
	}
	redo(e) {
		let t = this.entry(e), n = t.redo.pop();
		return n ? (t.undo.push(n), n.after) : null;
	}
	clear() {
		this.entries.clear();
	}
}, ne = class {
	constructor(e = globalThis.indexedDB) {
		this.factory = e, this.db = null;
	}
	open() {
		return this.factory ? new Promise((e, t) => {
			let n = this.factory.open("reveal-ink", 1);
			n.onupgradeneeded = () => n.result.createObjectStore("presentations"), n.onerror = () => t(n.error), n.onblocked = () => t(/* @__PURE__ */ Error("Storage upgrade blocked; close other presentation tabs")), n.onsuccess = () => {
				this.db = n.result, this.db.onversionchange = () => this.close(), e();
			};
		}) : Promise.reject(/* @__PURE__ */ Error("IndexedDB is unavailable"));
	}
	load(e) {
		return this.transaction("readonly", (t) => t.get(e));
	}
	save(e, t) {
		return this.transaction("readwrite", (n) => n.put(t, e));
	}
	transaction(e, t) {
		return new Promise((n, r) => {
			if (!this.db) return r(/* @__PURE__ */ Error("Annotation storage is closed"));
			let i = this.db.transaction("presentations", e), a = t(i.objectStore("presentations"));
			i.oncomplete = () => n(a.result), i.onerror = i.onabort = () => r(i.error || /* @__PURE__ */ Error("Annotation save failed"));
		});
	}
	close() {
		this.db?.close(), this.db = null;
	}
};
//#endregion
//#region src/storage.js
function re(e) {
	if (e.adapter) return e.adapter;
	if (e.type !== "indexeddb") throw Error("Unknown storage type; supply a storage adapter");
	return new ne();
}
function $(e) {
	return {
		version: 2,
		presentation: e,
		slides: Object.create(null)
	};
}
function ie(e, t) {
	let n = typeof e == "string" ? JSON.parse(e) : e;
	if (!n || ![1, 2].includes(n.version) || typeof n.presentation != "string" || !n.slides || typeof n.slides != "object" || Array.isArray(n.slides)) throw Error("Unsupported annotation format (expected version 1 or 2)");
	let r = $(t ?? n.presentation), i = 0;
	for (let [e, t] of Object.entries(n.slides)) {
		if (e.length > 512 || !Array.isArray(t)) throw Error("Invalid slide annotations");
		let a = /* @__PURE__ */ new Set();
		r.slides[e] = t.map((e) => {
			if (!e || typeof e.id != "string" || a.has(e.id) || !["pen", "highlighter"].includes(e.tool) || !/^#[0-9a-f]{6}$/i.test(e.color) || !Number.isFinite(e.width) || e.width <= 0 || e.width > 200 || !Array.isArray(e.points) || !e.points.length || !Number.isFinite(e.aspect) || e.aspect <= 0 || e.aspect > 20 || !e.options || ![
				"thinning",
				"smoothing",
				"streamline"
			].every((t) => Number.isFinite(e.options[t]) && e.options[t] >= 0 && e.options[t] <= 1) || typeof e.options.simulatePressure != "boolean") throw Error("Invalid stroke");
			a.add(e.id);
			let t = e.points.map((e) => {
				if (++i > 1e6 || !Array.isArray(e) || e.length !== 3 || !e.every((e, t) => Number.isFinite(e) && (t === 2 || n.version === 1 ? e >= 0 && e <= 1 : e >= -100 && e <= 100))) throw Error("Invalid or excessively large annotation data");
				return [...e];
			});
			return {
				id: e.id,
				tool: e.tool,
				width: e.width,
				color: e.color,
				aspect: e.aspect,
				options: {
					thinning: e.options.thinning,
					smoothing: e.options.smoothing,
					streamline: e.options.streamline,
					simulatePressure: e.options.simulatePressure
				},
				points: t
			};
		});
	}
	return r;
}
function ae(e) {
	return JSON.stringify(ie(e));
}
function oe(e) {
	let t = new Blob([ae(e)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
	r.href = n, r.download = `${e.presentation.replace(/[^a-z0-9_-]/gi, "-").slice(0, 100) || "presentation"}.annotations.json`, r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
}
//#endregion
//#region src/input.js
function se(e, t) {
	let n = new AbortController(), r = null, i = 0, a = 0, o = (t, r, i = {}) => e.addEventListener(t, r, {
		capture: !0,
		signal: n.signal,
		...i
	}), s = document.createElement("span");
	s.className = "reveal-ink-pen-cursor", s.hidden = !0, s.setAttribute("aria-hidden", "true"), e.append(s);
	let c = null, l = () => {
		s.hidden = !0, c = null;
	};
	function u(n) {
		if (n.pointerType === "touch") return;
		if (n.pointerType !== "pen" || !t.enabled()) {
			l();
			return;
		}
		let r = e.getBoundingClientRect(), i = document.elementFromPoint(n.clientX, n.clientY);
		if (!r.width || !r.height || n.clientX < r.left || n.clientX > r.right || n.clientY < r.top || n.clientY > r.bottom || !i || !e.contains(i) || i.closest("button, input, select, textarea, .reveal-ink-toolbar, .reveal-ink-palette, .reveal-ink-scroll, .controls")) {
			l();
			return;
		}
		let a = e.offsetWidth / r.width, o = e.offsetHeight / r.height;
		s.style.left = `${(n.clientX - r.left) * a - e.clientLeft}px`, s.style.top = `${(n.clientY - r.top) * o - e.clientTop}px`, s.style.width = `${6 * a}px`, s.style.height = `${6 * o}px`, c = n.pointerId, s.hidden = !1;
	}
	o("pointerdown", u), o("pointermove", u);
	for (let t of [
		"pointerup",
		"pointercancel",
		"lostpointercapture",
		"pointerleave"
	]) o(t, (n) => {
		n.pointerId === c && (t !== "pointerleave" || n.target === e) && l();
	});
	window.addEventListener("blur", l, { signal: n.signal });
	let d = (e) => {
		e.cancelable && e.preventDefault(), e.stopImmediatePropagation();
	};
	function f(e) {
		let t = e.getCoalescedEvents?.() || [];
		return t.length || (t = [e]), t.map((e) => U(e, r.rect, !0));
	}
	function p(n) {
		if (!r || n && n.pointerId !== r.id) return;
		let o = r;
		r = null, cancelAnimationFrame(i), i = 0, t.finish(), e.hasPointerCapture?.(o.id) && e.releasePointerCapture(o.id), a = performance.now() + 400;
	}
	let m = (e) => e.closest(".reveal-ink-toolbar, .reveal-ink-toggle, .reveal-ink-palette, .reveal-ink-canvas-return, .reveal-ink-scroll");
	o("pointerdown", (n) => {
		if (t.enabled() && n.target.closest(".controls")) {
			d(n);
			return;
		}
		if (r) {
			n.pointerType !== "touch" && d(n);
			return;
		}
		if (!["pen", "mouse"].includes(n.pointerType) || n.button !== 0 || !t.enabled() || n.target.closest("button, input, select, textarea, .reveal-ink-toolbar, .controls")) return;
		let i = t.surface();
		if (!i) return;
		let a = i.getBoundingClientRect();
		if (!(n.clientX < a.left || n.clientX > a.right || n.clientY < a.top || n.clientY > a.bottom)) {
			d(n), r = {
				id: n.pointerId,
				rect: i.inkRect || a
			}, t.start(U(n, r.rect, !0), n.pointerType);
			try {
				e.setPointerCapture(n.pointerId);
			} catch {}
		}
	}), o("pointermove", (e) => {
		r && r.id === e.pointerId && (d(e), t.move(f(e)), i ||= requestAnimationFrame(() => {
			i = 0, t.preview();
		}));
	}), o("pointerup", (e) => {
		r && r.id === e.pointerId && (d(e), t.move([U({
			clientX: e.clientX,
			clientY: e.clientY,
			pressure: t.pressure()
		}, r.rect, !0)]), p(e));
	}), o("pointercancel", p), o("lostpointercapture", p), o("wheel", (n) => {
		t.canvas() && !m(n.target) && (d(n), r || t.scroll(n.deltaY * (n.deltaMode === 1 ? 16 : n.deltaMode === 2 ? e.clientHeight : 1)));
	}, { passive: !1 });
	let h = null;
	for (let e of [
		"touchstart",
		"touchmove",
		"touchend",
		"touchcancel"
	]) o(e, (n) => {
		if (t.canvas() && !m(n.target)) {
			if (d(n), !r && n.touches.length === 2) {
				let r = (n.touches[0].clientY + n.touches[1].clientY) / 2;
				e === "touchmove" && h !== null && t.scroll(h - r), h = r;
			} else h = null;
			return;
		}
		h = null, t.enabled() && (r || !m(n.target)) && d(n);
	}, { passive: !1 });
	return o("click", (e) => {
		if (t.enabled() && e.target.closest(".controls")) {
			d(e);
			return;
		}
		performance.now() < a && !e.target.closest(".reveal-ink-toolbar, .reveal-ink-toggle, .reveal-ink-palette, .reveal-ink-scroll, .reveal-ink-canvas-return") && d(e);
	}), {
		finish() {
			l(), p();
		},
		destroy() {
			l(), p(), n.abort(), cancelAnimationFrame(i), s.remove();
		}
	};
}
//#endregion
//#region src/toolbar.js
function ce(e, t, n) {
	let r = document.createElement("div");
	r.className = "reveal-ink-toolbar", r.setAttribute("role", "toolbar"), r.setAttribute("aria-label", "Slide handwriting");
	let i = {};
	function a(e, t, n = r) {
		let i = document.createElement("button");
		return i.type = "button", i.textContent = e, i.setAttribute("aria-label", e), i.addEventListener("click", t), n.append(i), i;
	}
	for (let [e, n] of [
		["navigate", "Navigate"],
		["pen", "Pen"],
		["highlighter", "Highlight"]
	]) i[e] = a(n, () => t.tool(e)), i[e].dataset.tool = e;
	i.undo = a("Undo", t.undo), i.redo = a("Redo", t.redo);
	let o = document.createElement("details"), s = document.createElement("summary");
	s.textContent = "More", o.append(s), r.append(o);
	let c = document.createElement("div");
	c.className = "reveal-ink-options", o.append(c);
	let l = document.createElement("label");
	l.textContent = "Color";
	let u = document.createElement("input");
	u.type = "color", u.value = n.pen.color, u.addEventListener("input", () => t.color(u.value)), l.append(u), c.append(l);
	let d = document.createElement("div");
	d.className = "reveal-ink-palette", d.setAttribute("role", "group"), d.setAttribute("aria-label", "Preset colors");
	let f = [];
	function p(e) {
		u.value = e;
		for (let t of f) t.setAttribute("aria-pressed", String(t.dataset.color === e.toLowerCase()));
	}
	for (let [e, n] of [
		["White", "#ffffff"],
		["Black", "#000000"],
		["C0", "#8dd3c7"],
		["C1", "#feffb3"],
		["C2", "#bfbbd9"],
		["C3", "#fa8174"],
		["C4", "#81b1d2"]
	]) {
		let r = a(e, () => {
			t.color(n), p(n);
		}, d);
		r.className = "reveal-ink-swatch", r.dataset.color = n, r.style.setProperty("--ink-swatch-color", n), r.title = `${e} (${n})`, f.push(r);
	}
	u.addEventListener("input", () => p(u.value)), e.append(d), d.addEventListener("keydown", (e) => e.stopPropagation());
	let m = document.createElement("label");
	m.textContent = "Width";
	let h = document.createElement("input");
	h.type = "range", h.min = "1", h.max = "40", h.step = "0.5", h.value = n.pen.width, h.addEventListener("input", () => t.width(Number(h.value))), m.append(h), c.append(m);
	function g(e, t, n, r) {
		let i = a("", n, d);
		i.className = `reveal-ink-palette-tool ${r}`, i.setAttribute("aria-label", e), i.title = e;
		let o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		o.setAttribute("viewBox", "0 0 24 24"), o.setAttribute("aria-hidden", "true");
		let s = document.createElementNS(o.namespaceURI, "path");
		return s.setAttribute("d", t), o.append(s), i.append(o), i;
	}
	let _ = g("Erase", "M4 14 14 4a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3L11 21H7l-3-3a3 3 0 0 1 0-4ZM9 9l8 8M11 21h10", () => t.tool("eraser"), "reveal-ink-eraser"), v = g("Toggle extra canvas", "M14 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9M17 2v6M14 5h6M7 12h6M7 16h10", t.canvas, "reveal-ink-canvas-toggle");
	v.setAttribute("aria-label", "Toggle extra canvas");
	let y = {};
	for (let [e, r] of [["smoothing", "Smoothing"], ["streamline", "Stabilizer"]]) {
		let i = document.createElement("label");
		i.textContent = r;
		let a = document.createElement("input");
		a.type = "range", a.min = "0", a.max = "1", a.step = "0.05", a.value = n.pen[e], a.setAttribute("aria-label", r), a.title = e === "streamline" ? "Lower values follow the pen faster" : "Round the stroke outline", a.addEventListener("input", () => t.filter(e, Number(a.value))), i.append(a), c.append(i), y[e] = a;
	}
	a("Clear current surface", t.clear, c), a("Export JSON", t.export, c);
	let b = document.createElement("input");
	b.type = "file", b.accept = ".json,application/json", b.hidden = !0, a("Import JSON…", () => b.click(), c), b.addEventListener("change", async () => {
		b.files[0] && confirm("Replace all annotations in this presentation with this file? Export first to keep a backup.") && await t.import(b.files[0]), b.value = "";
	}), c.append(b);
	let x = document.createElement("span");
	x.className = "reveal-ink-status", x.setAttribute("role", "status"), x.setAttribute("aria-live", "polite"), r.append(x), r.addEventListener("keydown", (e) => e.stopPropagation());
	let S = !1, C = !1, w = !1, T = a("", () => j(!1), e);
	T.className = "reveal-ink-toggle", T.setAttribute("aria-label", "Show handwriting toolbar"), T.title = "Show handwriting toolbar";
	let E = a("", () => j(!0));
	E.className = "reveal-ink-collapse", E.setAttribute("aria-label", "Hide handwriting toolbar");
	let D = document.createElement("div");
	D.className = "reveal-ink-scroll";
	let O = document.createElement("input");
	O.type = "range", O.min = "0", O.max = "3", O.step = "0.01", O.setAttribute("aria-label", "Canvas vertical position"), O.addEventListener("input", () => t.scrollTo(Number(O.value))), D.append(O), a("↓", () => t.scrollBy(.8), D).setAttribute("aria-label", "More canvas below"), D.addEventListener("keydown", (e) => e.stopPropagation()), e.append(D);
	let k = !1;
	function A() {
		D.hidden = C || !k, d.hidden = C || w, r.hidden = C || S, T.hidden = C || !S, T.setAttribute("aria-expanded", String(!S));
	}
	function j(e) {
		S = e, e && (o.open = !1), A();
	}
	return T.addEventListener("keydown", (e) => e.stopPropagation()), e.append(r), A(), {
		update(e, t, n) {
			w = e === "navigate", _.setAttribute("aria-pressed", String(e === "eraser")), A();
			for (let [t, n] of Object.entries(i)) n.dataset.tool && n.setAttribute("aria-pressed", String(t === e));
			i.undo.disabled = !t.undo.length, i.redo.disabled = !t.redo.length, p(n.color), h.value = n.width;
			for (let e of Object.keys(y)) y[e].value = n[e];
		},
		status(e, t = !1) {
			x.textContent = t ? e : "", x.hidden = !t, x.classList.toggle("error", t), t && j(!1);
		},
		canvas(e) {
			k = e, v.setAttribute("aria-pressed", String(e)), A();
		},
		scroll(e, t) {
			O.max = t, O.value = e;
		},
		collapse() {
			j(!0);
		},
		hide(e) {
			C = e, A();
		},
		destroy() {
			r.remove(), T.remove(), d.remove(), D.remove();
		}
	};
}
//#endregion
//#region src/plugin.js
function le() {
	let t, n, r, i, a, o, s, c, l, u, d = !1, f, p = "navigate", m = null, h = null, g = null, _ = !1, v = !1, y = Promise.resolve(), b = 0, x = new Q(), S = [], C = /* @__PURE__ */ new Map(), w = () => d && C.get(f) || 0, T = () => Math.min(90, j().reduce((e, t) => t.points.reduce((e, t) => Math.max(e, t[1] + 1), e), Math.max(3, w() + 2)));
	function E() {
		if (!l) return;
		let { width: e, height: r } = k();
		s.layout(l, e, r, n, t.getScale(), w()), o.scroll(w(), T());
	}
	function D(e) {
		d && !N() && (c?.finish(), C.set(f, Math.max(0, Math.min(90, e))), E());
	}
	let O = () => r[p === "highlighter" ? "highlighter" : "pen"], k = () => t.getComputedSlideSize(), A = () => k().width / k().height, j = () => i.slides[u] || [], M = (e, n) => {
		t.on(e, n), S.push([e, n]);
	}, N = () => t.isOverview() || t.isPaused() || t.isScrollView?.();
	function P() {
		o.update(p, x.entry(u), O()), o.canvas(d), o.scroll(w(), T()), n.classList.toggle("ink-active", p !== "navigate" && !N()), o.hide(!!N());
	}
	function F() {
		l && (s.surface(l).classList.toggle("ink-extra-canvas", d), s.render(l, j(), A()));
	}
	function ee() {
		if (!v || !r.storage.autosave) return y;
		let e = structuredClone(i), t = ++b;
		return o.status("Saving…"), y = y.then(() => a.save(r.presentation, e)).then(() => {
			!_ && t === b && o.status("Saved on this device");
		}).catch((e) => {
			_ || o.status("Save failed — export a backup", !0), console.error("Reveal Ink:", e);
		}), y;
	}
	function I(e) {
		e !== j() && (x.record(u, e, j()), ee()), F(), P();
	}
	function te() {
		if (!h) return;
		m && (i.slides[u] = [...h, m]);
		let e = h;
		h = null, m = null, g = null, I(e);
	}
	function L() {
		c?.finish();
		let e = t.getCurrentSlide();
		l !== e && (l && s.surface(l).classList.remove("ink-extra-canvas"), d = !1), l = e, l && (f = G(l, t.getIndices(l)), u = d ? `canvas:${f}` : f, E(), F(), P());
	}
	function R() {
		c?.finish(), l && (d = !d, u = d ? `canvas:${f}` : f, E(), F(), P());
	}
	function z(e) {
		if (![
			"pen",
			"highlighter",
			"eraser",
			"navigate"
		].includes(e)) throw Error("Unknown ink tool");
		c?.finish(), p = e, l && P();
	}
	function B(e) {
		if (c?.finish(), !l) return;
		let t = x[e](u);
		t && (i.slides[u] = t, F(), P(), ee());
	}
	function V(e) {
		let t = j().filter((t) => !X(t, g || e, e, A(), r.eraser.radius));
		t.length !== j().length && (i.slides[u] = t), g = e;
	}
	async function H(e) {
		let t = ie(e, r.presentation);
		c?.finish(), i = t, x.clear(), F(), P(), await ee();
	}
	let U = {
		id: "ink",
		async init(f) {
			t = f;
			let y = t.getConfig().ink || {};
			if (y.enabled === !1) return;
			p = e(y.initialTool), r = {
				presentation: y.presentation || `${location.origin}${location.pathname}`,
				pen: {
					width: 3.5,
					color: "#ffffff",
					thinning: .2,
					smoothing: .35,
					streamline: .15,
					pressure: !0,
					...y.pen
				},
				highlighter: {
					width: 14,
					color: "#feffb3",
					thinning: 0,
					smoothing: .35,
					streamline: .15,
					pressure: !1,
					...y.highlighter
				},
				eraser: {
					radius: 12,
					...y.eraser
				},
				storage: {
					type: "indexeddb",
					autosave: !0,
					...y.storage
				}
			}, n = t.getRevealElement(), s = new Z(), i = $(r.presentation), o = ce(n, {
				tool: z,
				canvas: R,
				scrollTo: D,
				scrollBy: (e) => D(w() + e),
				filter(e, t) {
					c?.finish(), O()[e] = t;
				},
				undo: () => B("undo"),
				redo: () => B("redo"),
				color(e) {
					c?.finish(), p === "eraser" && (p = "pen"), O().color = e, P();
				},
				width(e) {
					c?.finish(), O().width = e;
				},
				clear() {
					if (c?.finish(), !l || !j().length) return;
					let e = j();
					i.slides[u] = [], I(e);
				},
				export() {
					c?.finish(), oe(i);
				},
				async import(e) {
					try {
						if (e.size > 52428800) throw Error("Annotation file is too large");
						await H(await e.text());
					} catch (e) {
						o.status(`Import failed: ${e.message}`, !0);
					}
				}
			}, r), o.hide(!0);
			try {
				a = re(r.storage), await a.open();
				let e = await a.load(r.presentation);
				e && (i = ie(e, r.presentation)), v = !0, o.status(r.storage.autosave ? "" : "Autosave off — export to keep", !r.storage.autosave);
			} catch (e) {
				o.status("Storage unavailable — use Export", !0), console.error("Reveal Ink:", e);
			}
			if (_) {
				a?.close();
				return;
			}
			c = se(n, {
				enabled: () => !!l && p !== "navigate" && !N(),
				surface: () => l && s.surface(l),
				canvas: () => d && !N(),
				scroll: (e) => D(w() + e / (k().height * t.getScale())),
				start(e, t) {
					if (o.collapse(), h = j(), g = e, p === "eraser") {
						V(e), F();
						return;
					}
					let n = O();
					m = {
						id: globalThis.crypto?.randomUUID?.() || `stroke-${Date.now()}-${Math.random().toString(36).slice(2)}`,
						tool: p,
						width: n.width,
						color: n.color,
						aspect: A(),
						options: {
							thinning: n.pressure ? n.thinning : 0,
							smoothing: n.smoothing,
							streamline: n.streamline,
							simulatePressure: n.pressure && t !== "pen"
						},
						points: [e]
					}, s.preview(l, m);
				},
				move(e) {
					for (let t of e) if (m) {
						let e = m.points.at(-1);
						(Math.hypot((t[0] - e[0]) * 960, (t[1] - e[1]) * 960 / A()) > .1 || t[2] !== e[2]) && m.points.push(t);
					} else V(t);
				},
				preview() {
					m ? s.preview(l, m) : F();
				},
				pressure: () => m?.points.at(-1)?.[2] || .5,
				finish: te
			});
			let b, x = (e = 0) => {
				let r = t.getCurrentSlide(), i = n.getBoundingClientRect(), a = r?.getBoundingClientRect();
				if (a && Math.abs(a.left + a.width / 2 - (i.left + i.width / 2)) < 2 || e >= 120) {
					L(), b = 0;
					return;
				}
				b = requestAnimationFrame(() => x(e + 1));
			};
			M("slidechanged", () => {
				L(), cancelAnimationFrame(b), b = requestAnimationFrame(() => x());
			});
			for (let e of [
				"ready",
				"slidetransitionend",
				"resize",
				"overviewshown",
				"overviewhidden",
				"paused",
				"resumed",
				"scrollviewactivated",
				"scrollviewdeactivated"
			]) M(e, L);
			let S = new MutationObserver((e) => {
				let n = t.getCurrentSlide();
				n && e.some((e) => e.target.contains(n)) && (cancelAnimationFrame(b), b = requestAnimationFrame(() => x()));
			});
			S.observe(t.getSlidesElement(), {
				subtree: !0,
				attributes: !0,
				attributeFilter: ["style"]
			});
			let C = () => c?.finish();
			window.addEventListener("pagehide", C);
			let T = () => {
				document.hidden && C();
			};
			document.addEventListener("visibilitychange", T), U.cleanup = () => {
				S.disconnect(), cancelAnimationFrame(b), window.removeEventListener("pagehide", C), document.removeEventListener("visibilitychange", T);
			}, t.isReady() && L();
		},
		setTool: z,
		toggleCanvas: R,
		scrollCanvas: D,
		undo: () => B("undo"),
		redo: () => B("redo"),
		clear() {
			if (c?.finish(), l && j().length) {
				let e = j();
				i.slides[u] = [], I(e);
			}
		},
		exportJSON() {
			return c?.finish(), ae(i);
		},
		importJSON: H,
		flush() {
			return c?.finish(), y;
		},
		async destroy() {
			c?.destroy(), _ = !0;
			for (let [e, n] of S) t.off(e, n);
			U.cleanup?.(), o?.destroy(), s?.destroy(), n?.classList.remove("ink-active"), await y, a?.close();
		}
	};
	return U;
}
//#endregion
export { le as default };
