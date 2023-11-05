# 이 리포지토리는 [MC-Dashify/client](https://github.com/MC-Dashify/client)의 리와이트 버전입니다.

README.md와 CONTRIBUTING.md, CODE_OF_CONDUCT.md는 일부러 가져오지 않았습니다.
<!-- XXX README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md -->

## Tailwind CSS에 대해
리포지토리에 [NextUI](https://nextui.org/)를 사용하게 되면서 Tailwind CSS 환경을 구축했습니다. 본 코드에는 Tailwind CSS를 사용하지 않습니다.

## 코드 규칙
### import
import 구문 순서는 다음 기준을 따라 주세요. (주석은 참고용입니다)

```js
// 1. 리액트 관련 라이브러리
import React, { useState } from 'react';
import { ... } from '...';

// 2. 외부 라이브러리
import axios from 'axios';
import { ... } from '...';

// 3. 내부 파일(컴포넌트나 테마 등)
import { Button } from "@/components/Button";
import { ... } from '...';
```

각 import는 경로나 이름이 라이브러리끼리 나란히 배치합니다.
```js
import Button from "@/components/...";
import Chart from "@/components/...'";
import { State } from '@/contexts/...';
import Image from '@/assets/...';
import Image from '@/assets/...';
```


## 에셋 규칙
에셋 파일은 `@/assets` 폴더에 저장합니다.
### SVG 파일
svg 파일에서 `<svg>` 태그의 width와 height 어트리뷰트는 전부 current로 설정해야 합니다. 특별히 특정 색상으로 표현해야 하는 부분이 아니라면 모든 색상은 currentColor로 설정해야 해요.

# 폰트 라이선스
```
Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
https://github.com/orioncactus/pretendard
This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL
```