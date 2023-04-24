# karabiner.ts

[![Coverage Status](https://coveralls.io/repos/github/evan-liu/karabiner.ts/badge.svg?branch=try-coveralls)](https://coveralls.io/github/evan-liu/karabiner.ts?branch=try-coveralls)

Write [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) configuration in TypeScript.

## Why karabiner.ts

`karabiner.ts` is heavily inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo). Compared to the edn format, it allows for:

- Easier-to-understand TypeScript/JavaScript syntax
- Strong-typed abstractions and key aliases with IDE support
- Structured config files instead of one big file

<img src="https://user-images.githubusercontent.com/126383/233834365-17bb6acc-e0e4-462e-936a-d52be7b24435.png" width="640">

See [more examples](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts) and [evan-liu/karabiner-config](https://github.com/evan-liu/karabiner-config/blob/main/src/index.ts).

## Usage

1. [Download](https://github.com/evan-liu/karabiner-config-examples/archive/refs/heads/main.zip) (or clone | [fork](https://github.com/evan-liu/karabiner-config-examples/fork)) the [examples/starter repo](https://github.com/evan-liu/karabiner-config-examples).
2. Run `npm install`.
3. Update to your own [configs](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts).
4. Set the profile name. Create a new Karabiner-Elements profile if needed.
5. Run `npm run build`.

Alternatively, you can install the `karabiner-config` npm package (`karabiner-ts` is taken) and call `writeToProfile()` in a Node.js script in your preferred way.
