export default {
	permalink: function ({ page }) {
		return `/blog/${page.fileSlug}/`;
	},
	layout: "layouts/happy.njk"
};
