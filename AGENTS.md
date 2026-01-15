# AGENTS.md

## Purpose
This repository is a TypeScript SDK for interacting with the Rainbow Swap API on TON. The public API is exposed from `src/index.ts` and compiled into `dist/` for npm publishing.

## Quick start
- Install deps: `yarn install`
- Build: `yarn build`
- Lint: `yarn lint`

## Project structure
- `src/index.ts`: public exports for the SDK.
- `src/utils/`: API calls and helper utilities.
- `src/types/` and `src/interfaces/`: shared type definitions.
- `src/enums/`: enum constants for API values.
- `dist/`: build output (published).

## Development guidelines
- Keep the public API surface in `src/index.ts` stable and well-typed.
- Add/adjust types in `src/types/` and `src/interfaces/` before updating API calls.
- Prefer small, pure utilities; keep network code in `src/utils/api.utils.ts`.
- Avoid breaking changes unless a major version bump is intended.

## API conventions
- All network calls use `axios` from `src/globals.ts` with `baseURL` set to `https://api.rainbow.ag/api`.
- `getAssetsList` and `getBestRoute` cancel prior in-flight requests to avoid stale responses.
- When adding new endpoints, follow the existing pattern: type the response and return `response.data`.

## Testing
No automated tests are currently configured. If you add tests, document the command(s) here and keep them fast and deterministic.

## Release
- `yarn release` uses `release-it` to bump and publish. Ensure `dist/` is up-to-date (`yarn build`) before releasing.
