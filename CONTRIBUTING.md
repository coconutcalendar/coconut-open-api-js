# Contributing

Contributions are **welcome** and will be fully **credited**.

We accept contributions via Pull Requests on [Github](https://github.com/coconutcalendar/coconut-open-api-js).

## Pull Requests

- **Check the code style** with ``$ npm run lint`` and fix it with ``$ npm run format``.

- **Add tests!** - Your patch won't be accepted if it doesn't have tests.

- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.

- **Consider our release cycle** - We try to follow [SemVer v2.0.0](http://semver.org/). Randomly breaking public APIs is not an option.

- **Create feature branches** - Don't ask us to pull from your master branch.

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.

- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.


## Running Tests

``` bash
$ yarn run test
```


## Releasing

Releases are cut from `master` with the **Release** workflow under the GitHub *Actions* tab (`Run workflow`):

- **description** - what was released. It becomes the `Release <description>` commit message and the `CHANGELOG.md` entry.
- **bump** - which semver part to bump (`patch` by default, see [SemVer](http://semver.org/)).
- **version** - an exact version to use instead of bumping, when you need control over the number.
- **pull_request** - the pull request number to link from the changelog entry.
- **create_release** - also create the `vX.Y.Z` tag and GitHub release (on by default).

The workflow runs the lint and tests, commits the version bump and changelog entry to `master`, publishes the package to npm, and tags it. Nothing is left to do by hand; confirm the new version on [npm](https://www.npmjs.com/package/coconut-open-api-js) when it finishes.

It relies on two repository secrets:

- `NPM_TOKEN` - an npm automation token with publish rights on the package (required).
- `RELEASE_TOKEN` - a personal access token with write access, only needed if pushes to `master` are protected against the default `GITHUB_TOKEN`.

**Happy coding**!
