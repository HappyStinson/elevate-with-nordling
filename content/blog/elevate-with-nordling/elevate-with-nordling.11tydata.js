export default {
	permalink: function ({ page }) {
		return `/blog/${page.fileSlug}/`;
	}
};
