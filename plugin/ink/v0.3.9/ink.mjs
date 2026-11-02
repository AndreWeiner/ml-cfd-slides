//#region src/save-queue.js
var e = class {
	constructor(e, t = () => {}, n = 100) {
		this.write = e, this.onError = t, this.delay = n, this.pending = null, this.running = !1, this.timer = null, this.waiters = [];
	}
	enqueue(e) {
		this.pending = e, !this.running && this.timer === null && (this.timer = setTimeout(() => {
			this.timer = null, this.drain();
		}, this.delay));
	}
	async drain() {
		if (!this.running) {
			this.running = !0;
			try {
				for (; this.pending;) {
					let e = this.pending;
					this.pending = null;
					try {
						await this.write(e);
					} catch (e) {
						this.onError(e);
					}
				}
			} finally {
				this.running = !1;
				let e = this.waiters.splice(0);
				for (let t of e) t();
			}
		}
	}
	flush() {
		if (this.timer !== null && (clearTimeout(this.timer), this.timer = null), !this.pending && !this.running) return Promise.resolve();
		let e = new Promise((e) => this.waiters.push(e));
		return this.drain(), e;
	}
};
//#endregion
//#region src/tools.js
function t(e) {
	return [
		"navigate",
		"pen",
		"highlighter",
		"laser",
		"eraser"
	].includes(e) ? e : "navigate";
}
//#endregion
//#region node_modules/perfect-freehand/dist/esm/index.mjs
var { PI: n } = Math, r = n + 1e-4, i = .5, a = [1, 1];
function o(e, t, n, r = (e) => e) {
	return e * r(.5 - t * (.5 - n));
}
var { min: s } = Math;
function c(e, t, n) {
	let r = s(1, t / n);
	return s(1, e + (s(1, 1 - r) - e) * (r * .275));
}
function l(e) {
	return [-e[0], -e[1]];
}
function u(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function d(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function f(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function p(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function m(e, t) {
	return [e[0] * t, e[1] * t];
}
function h(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function g(e, t) {
	return [e[0] / t, e[1] / t];
}
function _(e) {
	return [e[1], -e[0]];
}
function v(e, t) {
	let n = t[0];
	return e[0] = t[1], e[1] = -n, e;
}
function y(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function b(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function x(e) {
	return Math.hypot(e[0], e[1]);
}
function S(e, t) {
	let n = e[0] - t[0], r = e[1] - t[1];
	return n * n + r * r;
}
function C(e) {
	return g(e, x(e));
}
function w(e, t) {
	return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function T(e, t, n) {
	let r = Math.sin(n), i = Math.cos(n), a = e[0] - t[0], o = e[1] - t[1], s = a * i - o * r, c = a * r + o * i;
	return [s + t[0], c + t[1]];
}
function E(e, t, n, r) {
	let i = Math.sin(r), a = Math.cos(r), o = t[0] - n[0], s = t[1] - n[1], c = o * a - s * i, l = o * i + s * a;
	return e[0] = c + n[0], e[1] = l + n[1], e;
}
function D(e, t, n) {
	return u(e, m(f(t, e), n));
}
function O(e, t, n, r) {
	let i = n[0] - t[0], a = n[1] - t[1];
	return e[0] = t[0] + i * r, e[1] = t[1] + a * r, e;
}
function k(e, t, n) {
	return u(e, m(t, n));
}
var A = [0, 0], j = [0, 0], M = [0, 0];
function N(e, t) {
	let n = k(e, C(_(f(e, u(e, [1, 1])))), -t), i = [], a = 1 / 13;
	for (let t = a; t <= 1; t += a) i.push(T(n, e, r * 2 * t));
	return i;
}
function P(e, t, n) {
	let i = [], a = 1 / n;
	for (let n = a; n <= 1; n += a) i.push(T(t, e, r * n));
	return i;
}
function F(e, t, n) {
	let r = f(t, n), i = m(r, .5), a = m(r, .51);
	return [
		f(e, i),
		f(e, a),
		u(e, a),
		u(e, i)
	];
}
function I(e, t, n, i) {
	let a = [], o = k(e, t, n), s = 1 / i;
	for (let t = s; t < 1; t += s) a.push(T(o, e, r * 3 * t));
	return a;
}
function L(e, t, n) {
	return [
		u(e, m(t, n)),
		u(e, m(t, n * .99)),
		f(e, m(t, n * .99)),
		f(e, m(t, n))
	];
}
function R(e, t, n) {
	return e === !1 || e === void 0 ? 0 : e === !0 ? Math.max(t, n) : e;
}
function ee(e, t, n) {
	return e.slice(0, 10).reduce((e, r) => {
		let i = r.pressure;
		return t && (i = c(e, r.distance, n)), (e + i) / 2;
	}, e[0].pressure);
}
function z(e, t = {}) {
	let { size: n = 16, smoothing: i = .5, thinning: a = .5, simulatePressure: s = !0, easing: m = (e) => e, start: g = {}, end: b = {}, last: x = !1 } = t, { cap: C = !0, easing: w = (e) => e * (2 - e) } = g, { cap: T = !0, easing: D = (e) => --e * e * e + 1 } = b;
	if (e.length === 0 || n <= 0) return [];
	let k = e[e.length - 1].runningLength, z = R(g.taper, n, k), B = R(b.taper, n, k), V = (n * i) ** 2, H = [], U = [], W = ee(e, s, n), G = o(n, a, e[e.length - 1].pressure, m), K, te = e[0].vector, q = e[0].point, J = q, Y = q, X = J, Z = !1;
	for (let t = 0; t < e.length; t++) {
		let { pressure: i } = e[t], { point: l, vector: g, distance: _, runningLength: b } = e[t], x = t === e.length - 1;
		if (!x && k - b < 3) continue;
		a ? (s && (i = c(W, _, n)), G = o(n, a, i, m)) : G = n / 2, K === void 0 && (K = G);
		let C = b < z ? w(b / z) : 1, T = k - b < B ? D((k - b) / B) : 1;
		G = Math.max(.01, G * Math.min(C, T));
		let N = (x ? e[t] : e[t + 1]).vector, P = x ? 1 : y(g, N), F = y(g, te) < 0 && !Z, I = P !== null && P < 0;
		if (F || I) {
			v(A, te), h(A, A, G);
			for (let e = 0; e <= 1; e += .07692307692307693) p(j, l, A), E(j, j, l, r * e), Y = [j[0], j[1]], H.push(Y), d(M, l, A), E(M, M, l, r * -e), X = [M[0], M[1]], U.push(X);
			q = Y, J = X, I && (Z = !0);
			continue;
		}
		if (Z = !1, x) {
			v(A, g), h(A, A, G), H.push(f(l, A)), U.push(u(l, A));
			continue;
		}
		O(A, N, g, P), v(A, A), h(A, A, G), p(j, l, A), Y = [j[0], j[1]], (t <= 1 || S(q, Y) > V) && (H.push(Y), q = Y), d(M, l, A), X = [M[0], M[1]], (t <= 1 || S(J, X) > V) && (U.push(X), J = X), W = i, te = g;
	}
	let Q = [e[0].point[0], e[0].point[1]], ne = e.length > 1 ? [e[e.length - 1].point[0], e[e.length - 1].point[1]] : u(e[0].point, [1, 1]), re = [], $ = [];
	if (e.length === 1) {
		if (!(z || B) || x) return N(Q, K || G);
	} else {
		z || B && e.length === 1 || (C ? re.push(...P(Q, U[0], 13)) : re.push(...F(Q, H[0], U[0])));
		let t = _(l(e[e.length - 1].vector));
		B || z && e.length === 1 ? $.push(ne) : T ? $.push(...I(ne, t, G, 29)) : $.push(...L(ne, t, G));
	}
	return H.concat($, U.reverse(), re);
}
var B = [0, 0];
function V(e) {
	return e != null && e >= 0;
}
function H(e, t = {}) {
	let { streamline: n = .5, size: r = 16, last: o = !1 } = t;
	if (e.length === 0) return [];
	let s = .15 + (1 - n) * .85, c = Array.isArray(e[0]) ? e : e.map(({ x: e, y: t, pressure: n = i }) => [
		e,
		t,
		n
	]);
	if (c.length === 2) {
		let e = c[1];
		c = c.slice(0, -1);
		for (let t = 1; t < 5; t++) c.push(D(c[0], e, t / 4));
	}
	c.length === 1 && (c = [...c, [...u(c[0], a), ...c[0].slice(2)]]);
	let l = [{
		point: [c[0][0], c[0][1]],
		pressure: V(c[0][2]) ? c[0][2] : .25,
		vector: [...a],
		distance: 0,
		runningLength: 0
	}], d = !1, f = 0, m = l[0], h = c.length - 1;
	for (let e = 1; e < c.length; e++) {
		let t = o && e === h ? [c[e][0], c[e][1]] : D(m.point, c[e], s);
		if (b(m.point, t)) continue;
		let n = w(t, m.point);
		if (f += n, e < h && !d) {
			if (f < r) continue;
			d = !0;
		}
		p(B, m.point, t), m = {
			point: t,
			pressure: V(c[e][2]) ? c[e][2] : i,
			vector: C(B),
			distance: n,
			runningLength: f
		}, l.push(m);
	}
	return l[0].vector = l[1]?.vector || [0, 0], l;
}
function U(e, t = {}) {
	return z(H(e, t), t);
}
//#endregion
//#region src/coordinates.js
var W = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e));
function G(e, t, n = !1) {
	if (!(t.width > 0 && t.height > 0)) throw Error("Ink surface has no size");
	return [
		W((e.clientX - t.left) / t.width, n ? -100 : 0, n ? 100 : 1),
		W((e.clientY - t.top) / t.height, n ? -100 : 0, n ? 100 : 1),
		W(e.pressure > 0 ? e.pressure : .5)
	];
}
function K([e, t, n], r, i) {
	return [
		e * r,
		t * i,
		n
	];
}
function te(e, t) {
	return e.id ? `id:${e.id}` : `index:${t.h}:${t.v || 0}`;
}
function q(e, t, n) {
	let r = n[0] - t[0], i = n[1] - t[1], a = r || i ? W(((e[0] - t[0]) * r + (e[1] - t[1]) * i) / (r * r + i * i)) : 0;
	return Math.hypot(e[0] - t[0] - a * r, e[1] - t[1] - a * i);
}
//#endregion
//#region src/renderer.js
var J = "http://www.w3.org/2000/svg";
function Y(e, t = !0) {
	return U(e.points.map((t) => K(t, 960, 960 / e.aspect)), {
		size: e.width,
		...e.options,
		last: t
	});
}
function X(e) {
	if (!e.length) return "";
	let t = (e, t) => [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
	return `M ${t(e.at(-1), e[0]).join(" ")} ` + e.map((n, r) => `Q ${n.join(" ")} ${t(n, e[(r + 1) % e.length]).join(" ")}`).join(" ") + " Z";
}
var Z = /* @__PURE__ */ new WeakMap();
function Q(e) {
	let t = Z.get(e);
	if (!t) {
		let n = Y(e), r = Infinity, i = Infinity, a = -Infinity, o = -Infinity;
		for (let [e, t] of n) r = Math.min(r, e), a = Math.max(a, e), i = Math.min(i, t), o = Math.max(o, t);
		t = {
			points: n,
			minX: r,
			minY: i,
			maxX: a,
			maxY: o
		}, Z.set(e, t);
	}
	return t;
}
function ne(e, t, n, r, i) {
	let a = Q(e), o = e.aspect / r, s = t[0] * 960, c = t[1] * 960 / r, l = n[0] * 960, u = n[1] * 960 / r;
	if (Math.max(s, l) + i < a.minX || Math.min(s, l) - i > a.maxX || Math.max(c, u) + i < a.minY * o || Math.min(c, u) - i > a.maxY * o) return !1;
	a.aspect !== r && (a.transformed = a.points.map(([e, t]) => [e, t * o]), a.aspect = r);
	let d = a.transformed, f = K(t, 960, 960 / r), p = K(n, 960, 960 / r), m = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]), h = !1;
	for (let e = 0, t = d.length - 1; e < d.length; t = e++) {
		let n = d[e], r = d[t];
		if (n[1] > f[1] != r[1] > f[1] && f[0] < (r[0] - n[0]) * (f[1] - n[1]) / (r[1] - n[1]) + n[0] && (h = !h), Math.min(q(n, f, p), q(r, f, p), q(f, n, r), q(p, n, r)) <= i || m(f, p, n) * m(f, p, r) < 0 && m(n, r, f) * m(n, r, p) < 0) return !0;
	}
	return h;
}
var re = class {
	constructor() {
		this.surfaces = /* @__PURE__ */ new Map(), this.paths = /* @__PURE__ */ new WeakMap();
	}
	surface(e) {
		if (!this.surfaces.has(e)) {
			let t = document.createElementNS(J, "svg");
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
		let n = document.createElementNS(J, "path");
		n.dataset.stroke = e.id;
		let r = t ? Q(e) : null;
		return n.setAttribute("d", r ? r.path ??= X(r.points) : X(Y(e, !1))), n.setAttribute("fill", e.color), n.setAttribute("opacity", e.tool === "highlighter" ? "0.3" : "1"), n;
	}
	render(e, t, n) {
		let r = this.surface(e);
		r.querySelector("[data-preview]")?.remove();
		let i = this.paths.get(r);
		i || (i = /* @__PURE__ */ new Map(), this.paths.set(r, i));
		let a = new Set(t);
		for (let [e, t] of i) a.has(e) || (t.node.remove(), i.delete(e));
		let o = r.querySelector(".reveal-ink-laser");
		for (let e = t.length - 1; e >= 0; e--) {
			let a = t[e], s = i.get(a);
			s || (s = { node: this.path(a) }, i.set(a, s)), (s.node.parentNode !== r || s.node.nextSibling !== o) && r.insertBefore(s.node, o), o = s.node, s.aspect !== n && (s.node.setAttribute("transform", `scale(1 ${a.aspect / n})`), s.aspect = n);
		}
	}
	preview(e, t) {
		let n = this.surface(e);
		if (n.querySelector("[data-preview]")?.remove(), t) {
			let e = this.path(t, !1);
			e.dataset.preview = "", n.append(e);
		}
	}
	laser(e, t, n, r) {
		let i = document.createElementNS(J, "g");
		i.classList.add("reveal-ink-laser"), i.append(this.path(t)), this.surface(e).append(i), i.animate([{ opacity: 1 }, { opacity: 0 }], {
			delay: n,
			duration: r,
			fill: "forwards"
		}).finished.then(() => i.remove()).catch(() => {});
	}
	clearLaser() {
		for (let e of this.surfaces.values()) for (let t of e.querySelectorAll(".reveal-ink-laser")) t.getAnimations().forEach((e) => e.cancel()), t.remove();
	}
	destroy() {
		this.clearLaser();
		for (let e of this.surfaces.values()) e.remove();
		this.surfaces.clear();
	}
}, $ = class {
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
}, ie = class {
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
function ae(e) {
	if (e.adapter) return e.adapter;
	if (e.type !== "indexeddb") throw Error("Unknown storage type; supply a storage adapter");
	return new ie();
}
function oe(e) {
	return {
		version: 2,
		presentation: e,
		slides: Object.create(null)
	};
}
function se(e, t) {
	let n = typeof e == "string" ? JSON.parse(e) : e;
	if (!n || ![1, 2].includes(n.version) || typeof n.presentation != "string" || !n.slides || typeof n.slides != "object" || Array.isArray(n.slides)) throw Error("Unsupported annotation format (expected version 1 or 2)");
	let r = oe(t ?? n.presentation), i = 0;
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
function ce(e) {
	return JSON.stringify(se(e));
}
function le(e) {
	let t = new Blob([ce(e)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
	r.href = n, r.download = `${e.presentation.replace(/[^a-z0-9_-]/gi, "-").slice(0, 100) || "presentation"}.annotations.json`, r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
}
//#endregion
//#region src/input.js
function ue(e, t) {
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
		return t.length || (t = [e]), t.map((e) => G(e, r.rect, !0));
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
			}, t.start(G(n, r.rect, !0), n.pointerType);
			try {
				e.setPointerCapture(n.pointerId);
			} catch {}
		}
	}), o("pointermove", (e) => {
		r && r.id === e.pointerId && (d(e), t.move(f(e)), i ||= requestAnimationFrame(() => {
			i = 0, t.preview();
		}));
	}), o("pointerup", (e) => {
		r && r.id === e.pointerId && (d(e), t.move([G({
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
function de(e, t, n) {
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
		["highlighter", "Highlight"],
		["laser", "Laser"]
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
	function p(e, t = !0) {
		u.value = e;
		for (let n of f) n.setAttribute("aria-pressed", String(t && n.dataset.color === e.toLowerCase()));
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
			i.undo.disabled = !t.undo.length, i.redo.disabled = !t.redo.length, p(n.color, e !== "eraser"), h.value = n.width;
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
function fe() {
	let n, r, i, a, o, s, c, l, u, d, f = !1, p, m = "navigate", h = null, g = null, _ = null, v = !1, y = !1, b, x = [], S = !1, C = new $(), w = [], T = /* @__PURE__ */ new Map(), E = () => f && T.get(p) || 0, D = () => Math.min(90, N().reduce((e, t) => t.points.reduce((e, t) => Math.max(e, t[1] + 1), e), Math.max(3, E() + 2)));
	function O() {
		if (!u) return;
		let { width: e, height: t } = j();
		c.layout(u, e, t, r, n.getScale(), E()), s.scroll(E(), D());
	}
	function k(e) {
		f && !F() && (l?.finish(), T.set(p, Math.max(0, Math.min(90, e))), O());
	}
	let A = () => i[m === "laser" ? "laser" : m === "highlighter" ? "highlighter" : "pen"], j = () => n.getComputedSlideSize(), M = () => j().width / j().height, N = () => a.slides[d] || [], P = (e, t) => {
		n.on(e, t), w.push([e, t]);
	}, F = () => n.isOverview() || n.isPaused() || n.isScrollView?.();
	function I() {
		s.update(m, C.entry(d), A()), s.canvas(f), s.scroll(E(), D()), r.classList.toggle("ink-active", m !== "navigate" && !F()), s.hide(!!F());
	}
	function L() {
		u && (c.surface(u).classList.toggle("ink-extra-canvas", f), c.render(u, N(), M()));
	}
	function R() {
		return !y || !i.storage.autosave ? Promise.resolve() : b.enqueue({
			...a,
			slides: { ...a.slides }
		});
	}
	function ee(e) {
		e !== N() && (C.record(d, e, N()), R()), L(), I();
	}
	function z() {
		if (G(), !g) return;
		if (h?.tool === "laser") {
			c.preview(u, null), c.laser(u, h, i.laser.hold, i.laser.fade), g = null, h = null, _ = null;
			return;
		}
		h && (a.slides[d] = [...g, h]);
		let e = g;
		g = null, h = null, _ = null, ee(e);
	}
	function B() {
		l?.finish();
		let e = n.getCurrentSlide();
		(u !== e || F()) && c.clearLaser(), u !== e && (u && c.surface(u).classList.remove("ink-extra-canvas"), f = !1), u = e, u && (p = te(u, n.getIndices(u)), d = f ? `canvas:${p}` : p, O(), L(), I());
	}
	function V() {
		l?.finish(), u && (c.clearLaser(), f = !f, d = f ? `canvas:${p}` : p, O(), L(), I());
	}
	function H(e) {
		if (![
			"pen",
			"highlighter",
			"laser",
			"eraser",
			"navigate"
		].includes(e)) throw Error("Unknown ink tool");
		l?.finish(), m = e, u && I();
	}
	function U(e) {
		if (l?.finish(), !u) return;
		let t = C[e](d);
		t && (a.slides[d] = t, L(), I(), R());
	}
	function W(e) {
		let t = M(), n = N().filter((n) => !ne(n, _ || e, e, t, i.eraser.radius));
		n.length !== N().length && (a.slides[d] = n, S = !0), _ = e;
	}
	function G() {
		if (!x.length) return;
		let e = x;
		x = [];
		for (let t of e) W(t);
	}
	async function K(e) {
		let t = se(e, i.presentation);
		l?.finish(), a = t, C.clear(), L(), I(), R(), await b?.flush();
	}
	let q = {
		id: "ink",
		async init(p) {
			n = p;
			let C = n.getConfig().ink || {};
			if (C.enabled === !1) return;
			m = t(C.initialTool), i = {
				presentation: C.presentation || `${location.origin}${location.pathname}`,
				pen: {
					width: 3.5,
					color: "#ffffff",
					thinning: .2,
					smoothing: .35,
					streamline: .15,
					pressure: !0,
					...C.pen
				},
				highlighter: {
					width: 14,
					color: "#feffb3",
					thinning: 0,
					smoothing: .35,
					streamline: .15,
					pressure: !1,
					...C.highlighter
				},
				laser: {
					width: 5,
					color: "#ff3344",
					thinning: 0,
					smoothing: .35,
					streamline: .15,
					pressure: !1,
					hold: 800,
					fade: 500,
					...C.laser
				},
				eraser: {
					radius: 12,
					...C.eraser
				},
				storage: {
					type: "indexeddb",
					autosave: !0,
					...C.storage
				}
			};
			for (let e of ["hold", "fade"]) {
				let t = i.laser[e];
				i.laser[e] = Number.isFinite(t) ? Math.max(0, Math.min(6e4, t)) : e === "hold" ? 800 : 500;
			}
			r = n.getRevealElement(), c = new re(), a = oe(i.presentation), s = de(r, {
				tool: H,
				canvas: V,
				scrollTo: k,
				scrollBy: (e) => k(E() + e),
				filter(e, t) {
					l?.finish(), A()[e] = t;
				},
				undo: () => U("undo"),
				redo: () => U("redo"),
				color(e) {
					l?.finish(), m === "eraser" && (m = "pen"), A().color = e, I();
				},
				width(e) {
					l?.finish(), A().width = e;
				},
				clear() {
					if (l?.finish(), !u || !N().length) return;
					let e = N();
					a.slides[d] = [], ee(e);
				},
				export() {
					l?.finish(), le(a);
				},
				async import(e) {
					try {
						if (e.size > 52428800) throw Error("Annotation file is too large");
						await K(await e.text());
					} catch (e) {
						s.status(`Import failed: ${e.message}`, !0);
					}
				}
			}, i), s.hide(!0);
			try {
				o = ae(i.storage), await o.open(), b = new e((e) => o.save(i.presentation, e), (e) => {
					v || s.status("Save failed — export a backup", !0), console.error("Reveal Ink:", e);
				});
				let t = await o.load(i.presentation);
				t && (a = se(t, i.presentation)), y = !0, s.status(i.storage.autosave ? "" : "Autosave off — export to keep", !i.storage.autosave);
			} catch (e) {
				s.status("Storage unavailable — use Export", !0), console.error("Reveal Ink:", e);
			}
			if (v) {
				o?.close();
				return;
			}
			l = ue(r, {
				enabled: () => !!u && m !== "navigate" && !F(),
				surface: () => u && c.surface(u),
				canvas: () => f && !F(),
				scroll: (e) => k(E() + e / (j().height * n.getScale())),
				start(e, t) {
					if (s.collapse(), g = N(), _ = e, m === "eraser") {
						S = !1, W(e), S && L(), S = !1;
						return;
					}
					let n = A();
					h = {
						id: globalThis.crypto?.randomUUID?.() || `stroke-${Date.now()}-${Math.random().toString(36).slice(2)}`,
						tool: m,
						width: n.width,
						color: n.color,
						aspect: M(),
						options: {
							thinning: n.pressure ? n.thinning : 0,
							smoothing: n.smoothing,
							streamline: n.streamline,
							simulatePressure: n.pressure && t !== "pen"
						},
						points: [e]
					}, c.preview(u, h);
				},
				move(e) {
					for (let t of e) if (h) {
						let e = h.points.at(-1);
						(Math.hypot((t[0] - e[0]) * 960, (t[1] - e[1]) * 960 / M()) > .1 || t[2] !== e[2]) && h.points.push(t);
					} else x.push(t);
				},
				preview() {
					h ? c.preview(u, h) : (G(), S && L(), S = !1);
				},
				pressure: () => h?.points.at(-1)?.[2] || .5,
				finish: z
			});
			let w, T = (e = 0) => {
				let t = n.getCurrentSlide(), i = r.getBoundingClientRect(), a = t?.getBoundingClientRect();
				if (a && Math.abs(a.left + a.width / 2 - (i.left + i.width / 2)) < 2 || e >= 120) {
					B(), w = 0;
					return;
				}
				w = requestAnimationFrame(() => T(e + 1));
			};
			P("slidechanged", () => {
				B(), cancelAnimationFrame(w), w = requestAnimationFrame(() => T());
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
			]) P(e, B);
			let D = new MutationObserver((e) => {
				let t = n.getCurrentSlide();
				t && e.some((e) => e.target.contains(t)) && (cancelAnimationFrame(w), w = requestAnimationFrame(() => T()));
			});
			D.observe(n.getSlidesElement(), {
				subtree: !0,
				attributes: !0,
				attributeFilter: ["style"]
			});
			let O = () => {
				l?.finish(), c.clearLaser(), b?.flush();
			};
			window.addEventListener("pagehide", O);
			let R = () => {
				document.hidden && O();
			};
			document.addEventListener("visibilitychange", R), q.cleanup = () => {
				D.disconnect(), cancelAnimationFrame(w), window.removeEventListener("pagehide", O), document.removeEventListener("visibilitychange", R);
			}, n.isReady() && B();
		},
		setTool: H,
		toggleCanvas: V,
		scrollCanvas: k,
		undo: () => U("undo"),
		redo: () => U("redo"),
		clear() {
			if (l?.finish(), u && N().length) {
				let e = N();
				a.slides[d] = [], ee(e);
			}
		},
		exportJSON() {
			return l?.finish(), ce(a);
		},
		importJSON: K,
		flush() {
			return l?.finish(), b?.flush() || Promise.resolve();
		},
		async destroy() {
			l?.destroy(), v = !0;
			for (let [e, t] of w) n.off(e, t);
			q.cleanup?.(), s?.destroy(), c?.destroy(), r?.classList.remove("ink-active"), await b?.flush(), o?.close();
		}
	};
	return q;
}
//#endregion
export { fe as default };
