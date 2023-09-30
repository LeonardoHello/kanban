import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			gridTemplateRows: {
				table: "auto 1fr",
			},
			gridTemplateColumns: {
				table: "auto 1fr",
			},
			letterSpacing: {
				extreme: ".25em",
			},
			keyframes: {
				"slow-bounce": {
					"0%": {
						transform: "none",
						"animation-timing-function": "cubic-bezier(0,0,0.2,1)",
					},
					"45%, 55%": {
						transform: "translateY(-5%)",
						"animation-timing-function": "cubic-bezier(0.8,0,1,1)",
					},
				},
				"fade-in": {
					"0%": { opacity: "0" },
				},
				drop: {
					"0%": {
						transform: "translateY(-100%)",
					},
				},
			},
			animation: {
				"slow-bounce": "slow-bounce 0.8s ease-in-out infinite",
				"fade-in": "fade-in 0.4s",
				drop: "drop 0.4s",
			},
		},
	},
	plugins: [
		// ...
		require("@tailwindcss/forms"),
	],
};
export default config;
