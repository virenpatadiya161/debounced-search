import { useCallback, useEffect, useState } from 'react';
import { products, type Product } from './data';
import { useDebounce } from './hooks/useDebounce';

const SEARCH_DELAY = 500;
const DISPLAY_LIMIT = 50;

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const debouncedQuery = useDebounce(query, SEARCH_DELAY);
  const isWaiting = query !== debouncedQuery;

  // useCallback keeps this function stable between renders.
  const searchProducts = useCallback((searchText: string) => {
    const term = searchText.trim().toLowerCase();
    return term ? products.filter(product => product.name.toLowerCase().includes(term)) : [];
  }, []);

  // Filtering runs after the user pauses, not on every keystroke.
  useEffect(() => {
    setResults(searchProducts(debouncedQuery));
  }, [debouncedQuery, searchProducts]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">React practice</p>
        <h1 className="mt-2 text-3xl font-bold">Debounced search</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Search {products.length.toLocaleString()} mock products. Results update after you stop typing for {SEARCH_DELAY} ms.
        </p>

        <label htmlFor="search" className="mt-6 block text-sm font-medium">Search products</label>
        <div className="mt-2 flex gap-2">
          <input
            id="search"
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Try laptop, phone, or camera"
            autoComplete="off"
            aria-describedby="search-status"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button type="button" onClick={() => setQuery('')} disabled={!query}
            className="rounded-lg bg-slate-100 px-4 text-sm font-medium hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-40">
            Clear
          </button>
        </div>

        <p id="search-status" role="status" className="mt-4 text-sm text-slate-500">
          {isWaiting ? 'Waiting for you to finish typing…'
            : !debouncedQuery.trim() ? 'Type a product name to begin.'
            : results.length === 0 ? 'No products found.'
            : `${results.length} matches · showing ${Math.min(results.length, DISPLAY_LIMIT)}`}
        </p>

        {!isWaiting && results.length > 0 && (
          <ul className="mt-4 max-h-80 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
            {results.slice(0, DISPLAY_LIMIT).map(product => (
              <li key={product.id} className="px-4 py-3 text-sm">{product.name}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
