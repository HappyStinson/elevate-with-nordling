import { DateTime } from "luxon";

// Characters that can be shown on their own. If the only difference between two
// phrases is one of these, highlighting just that character beats striking out the
// whole phrase — which is what made the first version of the copy note hard to read.
const PUNCTUATION_ONLY = /^[\s.,;:!?"'\u2018\u2019\u201c\u201d()\[\]{}\-\u2013\u2014/\\]*$/;

function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function tokenize(text) {
	return text.match(/\s+|\S+/g) || [];
}

function mergeRuns(ops) {
	const merged = [];

	for(const [type, value] of ops) {
		const last = merged[merged.length - 1];

		if(last && last[0] === type) {
			last[1] += value;
		} else {
			merged.push([type, value]);
		}
	}

	return merged;
}

// Word-level longest common subsequence. Words rather than characters, because a
// character diff of two sentences finds shared letters everywhere and produces
// confetti.
function diffWords(before, after) {
	const a = tokenize(before);
	const b = tokenize(after);
	const table = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));

	for(let i = a.length - 1; i >= 0; i--) {
		for(let j = b.length - 1; j >= 0; j--) {
			table[i][j] = a[i] === b[j]
				? table[i + 1][j + 1] + 1
				: Math.max(table[i + 1][j], table[i][j + 1]);
		}
	}

	const ops = [];
	let i = 0;
	let j = 0;

	while(i < a.length && j < b.length) {
		if(a[i] === b[j]) {
			ops.push(["eq", a[i]]);
			i++;
			j++;
		} else if(table[i + 1][j] >= table[i][j + 1]) {
			ops.push(["del", a[i++]]);
		} else {
			ops.push(["ins", b[j++]]);
		}
	}

	while(i < a.length) ops.push(["del", a[i++]]);
	while(j < b.length) ops.push(["ins", b[j++]]);

	return mergeRuns(ops);
}

// Narrow a replaced run down to the characters that actually differ, but only when
// what differs is punctuation or spacing. For a real word swap, marking the whole
// word reads better than slicing it into shared letters ("some"/"any" + "thing").
function narrowToPunctuation(ops) {
	const out = [];

	for(let k = 0; k < ops.length; k++) {
		const [type, removed] = ops[k];
		const next = ops[k + 1];

		if(type !== "del" || !next || next[0] !== "ins") {
			out.push(ops[k]);
			continue;
		}

		const added = next[1];
		let prefix = 0;
		let suffix = 0;

		while(prefix < removed.length && prefix < added.length && removed[prefix] === added[prefix]) {
			prefix++;
		}

		while(suffix < removed.length - prefix && suffix < added.length - prefix &&
			removed[removed.length - 1 - suffix] === added[added.length - 1 - suffix]) {
			suffix++;
		}

		const middleRemoved = removed.slice(prefix, removed.length - suffix);
		const middleAdded = added.slice(prefix, added.length - suffix);

		if((prefix || suffix) && PUNCTUATION_ONLY.test(middleRemoved) && PUNCTUATION_ONLY.test(middleAdded)) {
			if(prefix) out.push(["eq", removed.slice(0, prefix)]);
			if(middleRemoved) out.push(["del", middleRemoved]);
			if(middleAdded) out.push(["ins", middleAdded]);
			if(suffix) out.push(["eq", removed.slice(removed.length - suffix)]);
		} else {
			out.push(["del", removed], ["ins", added]);
		}

		k++;
	}

	return out;
}


export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	// Render two phrases as one line that marks only what changed between them.
	// Showing the whole before-phrase struck through and the whole after-phrase next
	// to it makes the reader do the comparison themselves.
	eleventyConfig.addFilter("inlineDiff", (before, after) => {
		return narrowToPunctuation(diffWords(before || "", after || ""))
			.map(([type, value]) => {
				const text = escapeHtml(value);

				if(type === "eq") {
					return text;
				}

				// A changed space has no ink at all, so show it as an open box.
				// Without it, "TV-show" to "TV show" looks like a deletion and nothing else.
				const shown = /^\s+$/.test(value) ? "\u2423" : text;
				const tag = type === "del" ? "del" : "ins";

				return `<${tag}>${shown}</${tag}>`;
			})
			.join("");
	});

	// Curly quotes for the strings markdown-it never sees. `typographer` handles every
	// markdown body, but front matter and the aiFeedback fields arrive as plain strings, so
	// without this the transparency note renders "don't" straight directly underneath a post
	// that renders it curly.
	//
	// Deliberately narrow: quote characters and the ellipsis, nothing else. It does not
	// parse markdown and does not emit HTML, so the value stays escaped by Nunjucks. Don't
	// reach for it on `before`/`after` — those quote the post's literal text, and some of
	// the corrections are *about* a quote mark, which this would silently rewrite.
	eleventyConfig.addFilter("smartquotes", value => {
		if(value === undefined || value === null) {
			return value;
		}

		return String(value)
			.replace(/\.\.\./g, "\u2026")
			// An apostrophe sits inside a word ("don't") or after one ("Garner's", "'90s").
			.replace(/([\p{L}\p{N}])'/gu, "$1\u2019")
			// What's left opens or closes depending on whether text precedes it.
			.replace(/'/g, m => "\u2018")
			.replace(/"([^"]*)"/g, "\u201C$1\u201D")
			.replace(/"/g, "\u201D");
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);
};
