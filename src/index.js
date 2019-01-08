import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const defaultOptions = {
  dsn: process.env.SENTRY_DSN,
  log: process.env.NODE_ENV === 'development' ? true : false,
}

export default function (api, opts = {}) {
  const joinSentryPath = path => join(api.paths.tmpDirPath, 'sentry', path);
  const joinSentryTemplatePath = path => join(__dirname, '../template/umi/sentry', path);

  api.onGenerateFiles(() => {
    const sentryPath = joinSentryPath('');
    if (!existsSync(sentryPath)) {
      mkdirSync(sentryPath);
    }

    const options = {
      ...defaultOptions,
      ...opts,
    };

    if(process.env.NODE_ENV === 'production' && !options.dsn) {
      api.log.error(`In production the 'sentry dsn' option is required.`);
    }

    const loadSentryOptions = JSON.stringify(options);
    const indexPath = joinSentryPath('index.js');
    const templatePath = joinSentryTemplatePath('index.js');

    const indexTemplate = readFileSync(templatePath, 'utf-8');
    const indexContent = indexTemplate
      .replace('// <% LoadSentryOptions %>', loadSentryOptions);

    writeFileSync(indexPath, indexContent);
  });

  api.addRendererWrapperWithComponent('./sentry/index');

  const dependencies = [
    '@sentry/browser',
  ];

  api.addVersionInfo(dependencies.map(pkgName => `${pkgName}@${require(`${pkgName}/package`).version}`));
};
