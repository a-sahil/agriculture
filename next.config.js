module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
  output: "standalone",
};
