#!/usr/bin/env node
/*
 * Prepares a release commit: bumps the version in package.json and adds the
 * matching entry to CHANGELOG.md, linking the pull requests squash-merged
 * since the previous release commit. Prints the new version on stdout.
 *
 *   node scripts/prepare-release.js --bump patch --description "Add foo"
 *   node scripts/prepare-release.js --version 1.2.3 --description "Add foo"
 */
const { execFileSync } = require('child_process');
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

/*
 * Pull request numbers from the squash-merge subjects ("Something (#71)")
 * between HEAD and the previous "Release ..." commit, oldest first.
 */
const extractPullRequests = (subjects) => {
  const pullRequests = [];

  for (const subject of subjects) {
    if (/^Release\b/.test(subject)) {
      break;
    }

    const match = subject.match(/\(#(\d+)\)\s*$/);

    if (match) {
      pullRequests.unshift(match[1]);
    }
  }

  return pullRequests;
};

const pullRequestsSinceLastRelease = (root) => {
  const log = execFileSync('git', ['log', '--format=%s', 'HEAD'], { cwd: root, encoding: 'utf8' });

  return extractPullRequests(log.split('\n'));
};

const changelogEntry = (version, description, pullRequests) => {
  const date = new Date().toISOString().slice(0, 10);
  const lines = [`## [${version}] - ${date}`, '', `- ${description}`];

  pullRequests.forEach((pullRequest) => {
    lines.push(`  [#${pullRequest}](${REPOSITORY_URL}/pull/${pullRequest})`);
  });

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

  const pullRequests = pullRequestsSinceLastRelease(root);

  packageJson.version = version;

  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(
    changelogPath,
    changelog.replace(marker, `${marker}${changelogEntry(version, description, pullRequests)}`),
  );

  process.stdout.write(`${version}\n`);
};

module.exports = { bumpVersion, changelogEntry, extractPullRequests, resolveVersion };

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
