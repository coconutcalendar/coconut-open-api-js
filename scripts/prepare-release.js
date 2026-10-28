#!/usr/bin/env node
/*
 * Prepares a release commit: bumps the version in package.json and adds the
 * matching entry to CHANGELOG.md. Prints the new version on stdout.
 *
 *   node scripts/prepare-release.js --bump patch --description "Add foo"
 *   node scripts/prepare-release.js --version 1.2.3 --description "Add foo" --pull-request 71
 */
const fs = require('fs');
const path = require('path');

const REPOSITORY_URL = 'https://github.com/coconutcalendar/coconut-open-api-js';
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

const parseArguments = (argv) => {
  const options = {};

  for (let i = 0; i < argv.length; i += 1) {
    const argument = argv[i];

    if (!argument.startsWith('--')) {
      throw new Error(`Unexpected argument "${argument}"`);
    }

    options[argument.slice(2)] = argv[i + 1];
    i += 1;
  }

  return options;
};

const bumpVersion = (current, bump) => {
  const match = current.match(SEMVER);

  if (!match) {
    throw new Error(`Current version "${current}" is not a plain semver version`);
  }

  const [major, minor, patch] = match.slice(1).map(Number);

  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Unknown bump "${bump}", expected major, minor or patch`);
  }
};

const resolveVersion = (current, options) => {
  const version = (options.version || '').trim();

  if (version) {
    if (!SEMVER.test(version)) {
      throw new Error(`Version "${version}" is not a plain semver version (X.Y.Z)`);
    }

    if (version === current) {
      throw new Error(`Version "${version}" is already the current version`);
    }

    return version;
  }

  return bumpVersion(current, options.bump || 'patch');
};

const changelogEntry = (version, description, pullRequest) => {
  const date = new Date().toISOString().slice(0, 10);
  const lines = [`## [${version}] - ${date}`, '', `- ${description}`];

  if (pullRequest) {
    lines.push(`  [#${pullRequest}](${REPOSITORY_URL}/pull/${pullRequest})`);
  }

  return `${lines.join('\n')}\n\n`;
};

const main = () => {
  const options = parseArguments(process.argv.slice(2));
  const description = (options.description || '').trim();

  if (!description) {
    throw new Error('A --description is required');
  }

  const root = path.resolve(__dirname, '..');
  const packagePath = path.join(root, 'package.json');
  const changelogPath = path.join(root, 'CHANGELOG.md');

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const version = resolveVersion(packageJson.version, options);

  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const marker = '## [Unreleased]\n\n';

  if (!changelog.includes(marker)) {
    throw new Error('CHANGELOG.md has no "## [Unreleased]" section to insert after');
  }

  if (changelog.includes(`## [${version}]`)) {
    throw new Error(`CHANGELOG.md already has an entry for ${version}`);
  }

  const pullRequest = (options['pull-request'] || '').trim().replace(/^#/, '');

  packageJson.version = version;

  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(
    changelogPath,
    changelog.replace(marker, `${marker}${changelogEntry(version, description, pullRequest)}`),
  );

  process.stdout.write(`${version}\n`);
};

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
