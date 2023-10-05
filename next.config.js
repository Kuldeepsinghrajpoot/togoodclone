module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false, // If you are using fs in your project
        };
      }
  
      return config;
    },
  };
  