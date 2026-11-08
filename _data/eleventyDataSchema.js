import { z } from "zod";

// Draft content, validate `draft` front matter
export default function() {
	return function(data) {
		// Drafts may be skipped in a preprocessor during a standard build.
		let result = z.object({
			draft: z.optional(z.boolean())
		}).safeParse(data);

		if(result.error) {
			throw new Error(z.prettifyError(result.error));
		}
	}
}
