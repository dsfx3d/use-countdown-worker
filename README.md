# use-countdown-worker

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

This package provides a React hook (`useCountdown`) to create a countdown timer utilizing web workers for accurate timing, even when the main thread is busy.

## Usage

### Installation:

```sh
# npm
npm install use-countdown-worker

# yarn
yarn add use-countdown-worker

# pnpm
pnpm install use-countdown-worker
```

### Importing:

```js
// ESM
import { useCountdown } from "use-countdown-worker";

// CommonJS
const { useCountdown } = require("use-countdown-worker");
```

### Example:

```jsx
import React from 'react';
import { useCountdown } from 'use-countdown-worker';

function CountdownComponent() {
  const { eta, start, stop } = useCountdown({
    onTick: (remainingTime) => {
      console.log(`Time remaining: ${remainingTime}ms`);
    },
    onStopped: () => {
      console.log("Countdown stopped!");
    },
  });

  return (
    <div>
      <p>Time remaining: {eta}ms</p>
      <button onClick={() => start(10000, { tickMs: 500 })}>Start 10 seconds Countdown with 500ms tick</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default CountdownComponent;
```

## API References

- `useCountdown(options?: TOptions)`

  Returns an object with:
  - `eta`: Current estimated time remaining in milliseconds.
  - `start`: Function to start the countdown.
  - `stop`: Function to stop the countdown.

  Available options:
  - `onTick`: A callback that gets called on every tick with the remaining time in milliseconds.
  - `onStopped`: A callback that gets called once the countdown stops.
  - `onDone`: A callback that gets called once the countdown reaches 0 eta.

- `start(etaMs: number, startOptions?: TStartOptions)`:

  Starts the countdown.
  - `etaMs`: Total countdown time in milliseconds.
  - `startOptions`: Optional configurations for the countdown.
    - `tickMs`: Interval in milliseconds for the countdown to update. Default is `1000ms` (1 second).

- `stop()`: Stops the countdown immediately.

## Dependencies

This package relies on the following dependencies:

### Direct Dependencies

- [`worker-timers`](https://www.npmjs.com/package/worker-timers): `^7.0.76`

### Peer Dependencies

- [`react`](https://www.npmjs.com/package/react): `>=16.18.0`

When using this package, ensure you meet the peer dependency requirements. If you're starting a new project, it's recommended to install both this package and its peer dependencies to avoid potential compatibility issues.

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/use-countdown-worker?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/use-countdown-worker
[npm-downloads-src]: https://img.shields.io/npm/dm/use-countdown-worker?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/use-countdown-worker
[codecov-src]: https://img.shields.io/codecov/c/gh/dsfx3d/use-countdown-worker/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/dsfx3d/use-countdown-worker
[bundle-src]: https://img.shields.io/bundlephobia/minzip/use-countdown-worker?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=use-countdown-worker

---
