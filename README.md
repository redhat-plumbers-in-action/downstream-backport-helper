<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/70f67465cc46e02febb16aaa1cace2ceb82e6e5c/members/black-plumber.png" width="100" />
  <h1 align="center">Downstream Backport Helper</h1>
</p>

[![GitHub Marketplace][market-status]][market] [![Lint Code Base][linter-status]][linter] [![Unit Tests][test-status]][test] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist]

[![codecov][codecov-status]][codecov]

<!-- Status links -->

[market]: https://github.com/marketplace/actions/typescript-action
[market-status]: https://img.shields.io/badge/Marketplace-Typescript%20Action-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=

[linter]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/lint.yml
[linter-status]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/lint.yml/badge.svg

[test]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/unit-tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/unit-tests.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg

[check-dist]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/check-dist.yml
[check-dist-status]: https://github.com/redhat-plumbers-in-action/typescript-action/actions/workflows/check-dist.yml/badge.svg

[codecov]: https://codecov.io/gh/redhat-plumbers-in-action/typescript-action
[codecov-status]: https://codecov.io/gh/redhat-plumbers-in-action/typescript-action/branch/main/graph/badge.svg

<!-- -->

## Features

TBD

## Usage

This action is intended to be used in upstream repository to help maintainers and contributors with backporting changes to the downstream (stable) repositories or branches. It is designed to be run on a schedule, see the example below.

```yml
name: Stable Backport Helper

on:
  schedule:
    # every hour
    - cron: "0 * * * *"

permissions:
  contents: read

jobs:
  stable-backport-helper:
    runs-on: ubuntu-latest

    permissions:
      pull-requests: write

    steps:
      - uses: jamacku/downstream-backport-helper@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

We also need to create a configuration file `.github/downstream-backport-helper.yml`:

```yml
downstream:
  - owner: systemd
    repo: systemd-stable
    branches:
      - '*-stable'
  - owner: systemd
    repo: systemd
    branches:
      - '*-stable'
    status-title: 'systemd-stable'
lookup-interval: 7
```

## Configuration options

Action currently accepts the following options:

```yml
# ...

- uses: redhat-plumbers-in-action/downstream-backport-helper@v1
  with:
    config-path:  <path to config file>
    token:        <GitHub token or PAT>

# ...
```

### config-path

Path to configuration file. Configuration file format is described in: [Config section](#config).

* default value: `.github/downstream-backport-helper.yml`
* requirements: `optional`

### token

GitHub token or PAT is used for creating labels and comments on Pull Request.

```yml
# required permission
permissions:
  pull-requests: write
```

* default value: `undefined`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Config

Action is configured using special config file: `.github/downstream-backport-helper.yml`. The structure needs to be as follows:

```yml
downstream:
  - git-server: https://github.com
    owner: systemd
    repo: systemd-stable
    branches:
      - '*-stable'
  - owner: systemd
    repo: systemd
    branches:
      - '*-stable'
    status-title: 'systemd-stable'
lookup-interval: 7
```

### `downstream` keyword

The array of objects that describe downstream repositories that action will monitor for backports.

#### `git-server` keyword

The Git server URL. Where the downstream repository is located.

> [!NOTE]
> This is currently tested only with GitHub repositories.

* default value: `https://github.com`
* requirements: `optional`

#### `owner` keyword

The owner of the downstream repository.

* default value: `undefined`
* requirements: `required`

#### `repo` keyword

The name of the downstream repository.

* default value: `undefined`
* requirements: `required`

#### `branches` keyword

The array of branch names that are considered as stable branches or branches where the backports commits are applied.

* default value: `undefined`
* requirements: `required`

#### `status-title` keyword

The title of the status that will be created on the upstream PRs. It is used to mark the PRs that are already backported to the downstream repository.

* default value: `<owner>/<repo>`
* requirements: `optional`

### `lookup-interval` keyword

The number of days that the action will look back in the history of the downstream repository to find the backported commits.

* default value: `7`
* requirements: `optional`
