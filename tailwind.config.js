/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			gray: {
				DEFAULT: "#F8F9FA",
				50: "#DFDFDF",
				100: "#C8C8C8",
				200: "#6C757D",
			},
			blue: {
				DEFAULT: "#2B7EFB",
				button: "#007BFF",
			},
			red: {
				button: "#DC2626",
			},
			white: "#fff",
			current: "currentColor",
		},
		fontFamily: {
			sans: ["Helvetica Neue", "Helvetica", "Arial", "sans"], // Add 'Helvetica Neue' as the first choice
		},
		extend: {
			fontSize: {
				h1: ["2.5rem", { lineHeight: "3rem", fontWeight: "500" }],
				h3: ["1.75rem", { lineHeight: "2rem", fontWeight: "500" }],
				h4: ["1.5rem", { lineHeight: "1.75rem", fontWeight: "500" }],
			},
			textColor: {
				DEFAULT: "#212529",
				white: "#FFFFFF",
				black: "#000000",
				red: "#DC2626",
			},
			boxShadow: {
				level1: "0px 16px 48px 0px rgba(0, 0, 0, 0.17);",
			},
		},
	},
	plugins: [typography],
	extend: {},
};
