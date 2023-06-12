export type Theme = 'light' | 'dark' | undefined;

export function getDefaultTheme(): Theme {
	const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
	return matches ? 'dark' : 'light';
}

export function isValidTheme(string: any): string is Theme {
	return ['light', 'dark', undefined].includes(string);
}
