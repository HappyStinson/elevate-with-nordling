import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const anniversariesDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "anniversary-years");

export default function() {
	const years = fs.readdirSync(anniversariesDirectory)
		.filter(file => /^\d{4}\.json$/.test(file))
		.sort()
		.map(file => {
			const year = Number(file.slice(0, 4));
			const data = JSON.parse(fs.readFileSync(path.join(anniversariesDirectory, file), "utf8"));
			return {
				year,
				...data,
				celebratedCount: data.entries.filter(entry => entry.celebrated === true).length,
				celebrationGoal: year - 2000
			};
		})
		.sort((a, b) => b.year - a.year);

	return {
		currentYear: new Date().getFullYear(),
		years
	};
}
