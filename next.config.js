module.exports = {
	 target: "serverless",
	future: {
		webpack5: true,
	},
	unstableNetlifyFunctionsSupport: {
		'pages/[...slug].tsx': {
			includeDirs: ['.next/cache/agility']
		},

		'pages/index.tsx': {
			includeDirs: ['.next/cache/agility']
		}
	}
}