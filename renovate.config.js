module.exports = {
  extends: [
    "config:base",
    ":automergePatch",
    ":automergePr",
    ":disableDigestUpdates"
  ],
  commitMessagePrefix: "⬆️",
  platform: "github",
  onboarding: false,
  requireConfig: false,
  repositories: ["wikiwarsgg/webapp"]
};
