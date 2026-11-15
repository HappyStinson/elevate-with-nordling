import { z } from "zod";

// One applied copy correction. `source` is required on purpose: a correction the
// author cannot verify is worth less than none, so the build refuses to publish an
// uncited one. See .claude/skills/copy-review/SKILL.md
const copyChange = z.object({
	// Identity of the *kind* of error, reused across posts. /copy-feedback/ groups on
	// this and shows one example per rule, so a slug invented per instance would turn
	// the lesson index back into a log.
	rule: z.string().min(1),
	category: z.enum(["spelling", "punctuation", "grammar", "style", "voice"]),
	before: z.string().min(1),
	after: z.string().min(1),
	why: z.string().min(1),
	source: z.string().min(1)
});

const aiFeedback = z.object({
	// Write this unquoted in YAML so it arrives as a Date, which is what the
	// readableDate/htmlDateString filters need. A quoted string fails here rather
	// than rendering "Invalid DateTime" on the page.
	reviewed: z.date(),
	model: z.string().min(1),
	changes: z.array(copyChange).min(1)
});

// Draft content, validate `draft` front matter
export default function() {
	return function(data) {
		// Drafts may be skipped in a preprocessor during a standard build.
		let result = z.object({
			draft: z.optional(z.boolean()),
			aiFeedback: z.optional(aiFeedback)
		}).safeParse(data);

		if(result.error) {
			throw new Error(z.prettifyError(result.error));
		}
	}
}
