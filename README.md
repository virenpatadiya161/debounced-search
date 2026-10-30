# Debounced Search

A small React + TypeScript + Tailwind CSS example using generated mock data. No API key or backend needed.

## Run

Use Node.js 22.12+ (or a supported newer version).

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite.

```sh
npm test
npm run build
```

## Read the logic in this order

1. `src/hooks/useDebounce.ts`: a timer updates the debounced value after 500 ms. The effect cleanup cancels the previous timer when the input changes or the component unmounts.
2. `src/data.ts`: generates 5,000 mock products.
3. `src/App.tsx`: the input updates immediately. `useCallback` keeps the search function stable. `useEffect` filters only when the debounced value changes.

Example: type `lap`, then `laptop` before 500 ms passes. The old timer is cancelled. After a full 500 ms pause, the list is searched for `laptop`.

Search is case-insensitive and ignores surrounding spaces. Blank input shows no results. All 5,000 items are searched, but only the first 50 matches are rendered to keep the UI simple and responsive. Change `SEARCH_DELAY` and `DISPLAY_LIMIT` in App.tsx to adjust these choices.

This is the mock-data version: there are no network requests. If you later replace filtering with an API request, call it from the debounced effect and add AbortController cleanup to cancel old requests. useCallback stabilizes a function; it does not debounce it by itself.

References: https://react.dev/reference/react/useEffect and https://tailwindcss.com/docs/installation/using-vite
