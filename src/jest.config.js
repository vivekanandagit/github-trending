module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"],
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest",
  },
};
