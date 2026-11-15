export default {
	title: "Elevate with Nordling",
	url: "https://nordling.xyz/",
	language: "en",
	description: "I am writing about my journey and insights on achieving goals and personal growth.",
	author: {
		name: "Rasmus Nordling",
		email: "youremailaddress@example.com",
		url: "https://nordling.xyz/about/"
	},
	// One nickname, one role per context. Two names would read as two collaborators
	// when it is the same model wearing a different hat, and this site's whole
	// transparency note exists so as not to overstate what the AI did.
	//
	// `model` is the honest provenance and belongs here too, so the nickname can never
	// be mistaken for a person. Each post also records the model that reviewed *it* in
	// `aiFeedback.model`, which is what matters once this one changes.
	collaborator: {
		name: "Penny Red",
		model: "Claude Opus 5",
		roles: {
			copy: "AI copyeditor",
			code: "AI pair programmer"
		}
	}
}
