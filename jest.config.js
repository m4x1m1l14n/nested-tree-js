/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ["./src/*/**"],
	testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
	testPathIgnorePatterns: [
		"/dist/",
		"/node_modules/"
	]
};
