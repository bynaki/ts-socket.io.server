# Typescript + Socket.IO, Web API Server Boilerplate

[Typescript](https://www.typescriptlang.org)를 개발 언어로 사용하여 [Socket.IO](https://socket.io)를 이용한 `Web API Server` 개발 `Boilerplate`이다. 또한 보편적인 app이나 module도 개발할 수 있다. `Development` 환경에서의 컴파일러는 `tsc`를 사용하며 `production` 환경에서 컴파일러는 [Parcel](https://parceljs.org)을 사용한다. 그러나 module을 개발하여 배포할 경우 `tsc`로 컴파일한다면 .d.ts 파일을 생성할 수 있어 여로모로 이득이 많다.`Test`는 [AVA](https://github.com/avajs/ava)를 사용한다.


## File Structure

- **bin:** build를 위해, 또는 다른 작업을 위해 사용할 util 실행 파일들
- **src:** 개발 코드들과 필요한 자원들
- **dist:** src/를 빌드하고 빌드물을 여기에 저장
- **test:** 테스트 코드들
- **dist.test:** test/를 빌드하고 빌드물을 여기에 저장
- **util:** util 코드들 & 빌드물
- **rpi-docker:** docker file on the Raspberry Pi


## Usage

### tsc로 build & start

tsc로 .d.ts와 디버그 맵 정보를 포함해 컴파일 한다. 디버깅이 가능한 development 버젼이다.

```bash
yarn clean  # 만약 release하거나 build.parcel하면 같이 공유하는 dist 디렉토리가 오염되므로 먼저 clean 하는게 좋다.
yarn build && yarn start
or
yarn dev
```


### Parcel로 build & start

`parcel`로 bundle하여 실행한다. `production` 버젼이다. `docker`안이나 `server platform`에서 사용될 것이다. 그러나 만약 `npm`으로 publish하거나 다른 프로젝트에 module로 사용할 것 이라면 parcel로 빌드해서는 안된다.

```bash
yarn clean
yarn build.parcel && yarn start
```

필요하면 production 으로 환경 설정하자.


### Release

`parcel`로 bundle하고 `.tar.gz`로 압축해 지정한 곳으로 release 한다. 어디로 release할 지는 `utils/index.ts`에 `release()` 함수를 따로 작성함으로 변경 가능하다.

```bash
yarn release
```


### Test

테스트는 `ava`를 사용한다. 물론 cli로 옵션을 적용할 수 있지만, `package.json`에서 `ava` 섹션에서도 가능하다.

```bash
yarn test
```


### 부분 Test

`--match` 옵션으로 match되는 title만 테스트할 수 있다.

```bash
yarn test --match='*foo'
# foo로 시작하는 title를 가진 테스트만 테스트
```

다른 방법으로 `package.json`의 `ava` 섹션에서 `match` 옵션을 작성하여 부분 테스트 할 수 있다.


## Dockerfile Build & Docker Usage - on the Raspberry Pi

**build:**

```bash
git clone https://github.com/bynaki/ts-socket.io.server.git
cd ts-socket.io.server/rpi-docker
docker build -t bynaki/ts-socket.io.server .
```

**run:**

```bash
# at project
npm run release
.
.
# in platform
# RELEASE_URL: 이 프로젝트의 release url
docker run -p 3000:3000 --restart=on-failure:10 --env PORT=3000 \
--env NODE_ENV=production --env RELEASE_URL=https://your.release.url \
--name ts-socket.io.server -d bynaki/ts-socket.io.server "npm start"

# 업데이트
# at project
npm run release
.
.
# in platform
docker restart ts-socket.io.server
```

**run dev:**

```bash
# at project
npm run release
.
.
# in platform
docker run -it -p 8001:8001 \
--env PORT=8001 --env RELEASE_URL=https://your.release.url \
--name ts-socket.io.server.dev bynaki/ts-socket.io.server "/bin/bash"
.
.
# in docker
npm start

# 업데이트
# at project
npm run release
.
.
# in docker
npm fetch
npm start
```


## License

Copyright (c) bynaki. All rights reserved.

Licensed under the MIT License.