# Contributing

<p align="center"><a href="https://github.com/MC-Dashify/launcher/blob/main/CONTRIBUTING.md">English</a> · <a href="https://github.com/MC-Dashify/launcher/blob/main/.github/documents/CONTRIBUTING.ko_KR.md">한국어</a></p>

## 기여 가이드라인

Dashify에 기여하기로 결정하셨군요. 수많은 훌륭한 오픈소스 프로젝트가 있음에도 Dashify에 기여하는데 관심을 가져주셔서 감사합니다.

## Issue 해결하기

해결되지 않은 Issue를 해결하는 데 도움이 되고 싶다면. `good first issue`, `help wanted`, `open for contribution` 등의 태그를 찾아보세요.

## 개발 환경 설정

우리는 NodeJS@18.16.0 버전을 사용합니다.
패키지 매니저는 yarn을 사용합니다.

의존성은 다음 명령어로 설치할 수 있습니다:

```shell
# yarn이 설치되어있지 않다면
npm install -g yarn
```

```shell
# 의존성 설치
yarn install
```

개발 서버 시작

```shell
yarn dev
```

빌드

```shell
yarn build
```

## 코드 포매팅

우리는 [Prettier](https://prettier.io/) (최신 버전) 을(를)
코드 포매팅에 사용합니다. vscode를 사용한다면 코드 포매팅이 더 쉬울 것입니다.
