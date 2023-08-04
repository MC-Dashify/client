# Contributing

<p align="center"><a href="https://github.com/MC-Dashify/client/blob/main/CONTRIBUTING.md">English</a> · <a href="https://github.com/MC-Dashify/client/blob/main/.github/documents/CONTRIBUTING.ko_KR.md">한국어</a></p>

## Contribution Guidelines

Thank you for choosing to contribute in Dashify. There are a ton of great open-source projects out there, so we appreciate your interest in contributing to Dashify.

## Open Issues

If you would like to help in working on open issues. Lookout for following tags: `good first issue`, `help wanted`, and `open for contribution`.

## Development setup

We use NodeJS@18.16.0.
We use yarn as our package manager.

Install the dependencies:

```shell
# if you don't have yarn installed
npm install -g yarn
```

```shell
# install dependencies
yarn install
```

Start the development server

```shell
yarn tauri dev
```

Building

```shell
yarn tauri build
```

## Code Formatting

We use [Prettier](https://prettier.io/) (latest version)
for code formatting. Using vscode will make this thing easier.
