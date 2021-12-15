- [TKS Exercise Tracker](#tks-exercise-tracker)
  - [`./tsconfig.json`](#tsconfigjson)
  - [`./tsconfig.base.json`](#tsconfigbasejson)
  - [`./package.json`](#packagejson)
  - [`./config/aliasPaths.js`](#configaliaspathsjs)
  - [`./config-overrides.js`](#config-overridesjs)

# TKS Exercise Tracker

Initialized with:

```bash
yarn create react-app tks-exercise-tracker-client --template typescript
```

## `./tsconfig.json`

```json
{
  "allowSyntheticDefaultImports": true,
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "extends": "./tsconfig.base.json",
  "include": ["src"]
}
```

- Most of the options here are default, generated by `create-react-app`, except for `"extends": "./tsconfig.base.json"`.
- This option is to enable IntelliSense for importing modules and TypeScript (probably).
  <!-- TODO: Maybe try and make that script TypeScript also? -->
  - The changes to webpack's `alias` is handled by `react-app-rewired` via a `./config/aliasPaths.js` script.
    - Maybe try to convert that script to TypeScript also?

## `./tsconfig.base.json`

<!-- TODO: Maybe add ["./components/*"] -->
<!-- Not sure if that's the right syntax, will need to check later. -->

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components": ["./components"],
      "@hooks": ["./hooks"],
      "@store": ["./store"],
      "@theme": ["./theme"],
      "@utility": ["./utility"]
    }
  }
}
```

## `./package.json`

```json
  "scripts": {
    "prestart": "node ./config/aliasPaths.js",
    "start": "REACT_APP_ENVIRONMENT=development react-app-rewired start",
    "build": "react-app-rewired build",
    "build:run": "yarn build && yarn serve -n -s dist",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

- `"prestart":"node ./config/aliasPaths.js"` - figures out all of the paths to alias for webpack and extend for `tsconfig.json`, creating `tsconfig.base.json`.
  - Just like there is a `pre_` option prefix, there is also a `post_` prefix. Read this for more information about [scripts in `package.json`](https://docs.npmjs.com/cli/v8/using-npm/scripts).
  <!-- TODO: Convert to TypeScript. -->
  - Will try to convert to TypeScript.
  <!-- TODO: Rename environmental variable to REACT_APP_NODE_ENV? -->
- `"start":"REACT_APP_ENVIRONMENT=development react-app-rewired start"`
- `"build:run":"yarn build & yarn serve -n -s dist"` -
  - `-s` -
  - `-n` -

## `./config/aliasPaths.js`

## `./config-overrides.js`