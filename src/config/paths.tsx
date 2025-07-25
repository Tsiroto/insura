// src/config/paths.ts
// Vite: import.meta.env.BASE_URL is '/' by default, or '/something/' if you deploy under a subfolder.
const rawBase = import.meta.env.BASE_URL ?? '/';

/**
 * Normalize:
 * - if BASE_URL is '/'        -> BASE_PATH = ''        (no basename)
 * - if BASE_URL is '/insura/' -> BASE_PATH = '/insura' (leading slash, no trailing slash)
 */
export const BASE_PATH =
    rawBase === '/' ? '' : `/${rawBase.replace(/^\/|\/$/g, '')}`;

/** Helper to safely prepend the base to any path */
const withBase = (p = '') =>
    BASE_PATH ? `${BASE_PATH}${p.startsWith('/') ? p : `/${p}`}` : (p || '/');

export const ROUTES = {
    root: withBase('/'),
    wizard: withBase('/'), // same as root
    wizardForm: (type = ':type') => withBase(`/${type}`),
    thankYou: withBase('/thank-you'),
    readme: withBase('/readme'),
} as const;
