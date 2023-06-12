# Svelte Kit Theme Switcher Demo

Simple theme switcher demo for svelte kit, supports SSR. Run this repo locally to play around with it, or setup using the files below.

## lib/themes.ts

```ts
export type Theme = 'light' | 'dark' | undefined;

export function getDefaultTheme(): Theme {
	const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
	return matches ? 'dark' : 'light';
}

export function isValidTheme(string: any): string is Theme {
	return ['light', 'dark', undefined].includes(string);
}
```

## lib/ThemeSwitcher.svelte

```html
<script lang="ts">
	import { getDefaultTheme } from '$lib/themes';
	import { page } from '$app/stores';
	import cookies from 'js-cookie';

	function changeTheme(event: { currentTarget: HTMLSelectElement }) {
		const theme = event.currentTarget.value;

		if (theme) {
			cookies.set('theme', theme, { path: '/' });
			document.documentElement.dataset.theme = theme;
		} else {
			cookies.remove('theme', { path: '/' });
			document.documentElement.dataset.theme = getDefaultTheme();
		}
	}
</script>

<select on:input={changeTheme}>
	<option selected={$page.data.theme == undefined} value={undefined}>Auto</option>
	<option selected={$page.data.theme == 'light'} value="light">Light</option>
	<option selected={$page.data.theme == 'dark'} value="dark">Dark</option>
</select>
```

## hooks.server.ts

```ts
import { isValidTheme } from '$lib/themes';

export async function handle({ event, resolve }) {
	const cookieTheme = event.cookies.get('theme');

	event.locals.theme = isValidTheme(cookieTheme) ? cookieTheme : undefined;

	return await resolve(event, {
		transformPageChunk({ html }) {
			if (event.locals.theme) {
				html = html.replace('%sveltekit.theme%', event.locals.theme);
			}

			return html;
		},
	});
}
```

## +layout.server.ts

```ts
export async function load({ locals }) {
	return {
		theme: locals.theme,
	};
}
```

## app.d.ts

```ts
import type { Theme } from '$lib/themes';

declare global {
	namespace App {
		interface Locals {
			theme: Theme;
		}
	}
}

export {};
```

## app.html

Add `data-theme="%sveltekit.theme%"` to your `<html>` tag.
