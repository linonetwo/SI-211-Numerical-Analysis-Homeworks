const { getBabelLoader, injectBabelPlugin } = require('react-app-rewired');
const math = require('remark-math');
const katex = require('remark-html-katex');

module.exports = (config, env) => {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin('@babel/plugin-proposal-do-expressions', config);
  config = injectBabelPlugin('@babel/plugin-proposal-optional-chaining', config);
  config = injectBabelPlugin('lodash', config);

  if (env === 'production') {
    console.log('⚡ Production build with optimization ⚡');
    config = injectBabelPlugin('closure-elimination', config);
    config = injectBabelPlugin('@babel/plugin-transform-react-inline-elements', config);
    config = injectBabelPlugin('@babel/plugin-transform-react-constant-elements', config);
  } else {
    config = injectBabelPlugin(
      [
        'flow-runtime',
        {
          assert: true,
          annotate: true,
        },
      ],
      config,
    );
  }

  // remove eslint in eslint, we only need it on VSCode
  config.module.rules.splice(1, 1);

  const babelLoader = getBabelLoader(config.module.rules);
  config.module.rules.map(rule => {
    if (typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
      return rule;
    }

    rule.oneOf.unshift({
      test: /\.mdx?$/,
      use: [
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
        {
          loader: '@mdx-js/loader',
          options: {
            mdPlugins: [math, katex],
          },
        },
      ],
    });

    return rule;
  });
  return config;
};
