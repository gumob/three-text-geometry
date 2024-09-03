/**
 * @type {import('semantic-release').GlobalConfig}
 */

const config = {
  branches: [
    { name: "main", prerelease: false },                  // Main branch is the production branch
    { name: "alpha", prerelease: true },                  // Alpha branch is a pre-release branch
    { name: "beta", prerelease: true },                   // Beta branch is a pre-release branch
    { name: "rc", prerelease: true },                     // RC branch is a pre-release branch
  ],
  tagFormat: "${version}",
  plugins: [
    "@semantic-release/commit-analyzer",                  // Analyze commit messages to determine release type
    "@semantic-release/release-notes-generator",          // Generate release notes from commit messages
    "@semantic-release/changelog",                        // Update CHANGELOG.md with new release notes
    "@semantic-release/github",                           // Publish release notes to GitHub
    "@semantic-release/npm",                              // Publish to npm
    "@semantic-release/git"                               // Commit and push changes
  ],
  commitlint: {
    extends: [
      "@commitlint/config-conventional"                   // Use conventional commit messages
    ]
  },
};

export default config;