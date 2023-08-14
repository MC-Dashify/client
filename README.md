# 이 리포지토리는 [MC-Dashify/client](https://github.com/MC-Dashify/client)의 리와이트 버전입니다.

README.md와 CONTRIBUTING.md, CODE_OF_CONDUCT.md는 일부러 가져오지 않았습니다.
<!-- XXX README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md -->

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