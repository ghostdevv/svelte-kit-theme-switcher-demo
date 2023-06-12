<script lang="ts">
	import { getDefaultTheme, type Theme } from '$lib/themes';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import cookies from 'js-cookie';

	let theme: Theme = $page.data.theme;

	$: if (browser) {
		if (theme) {
			cookies.set('theme', theme, { path: '/' });
			document.documentElement.dataset.theme = theme;
		} else {
			cookies.remove('theme', { path: '/' });
			document.documentElement.dataset.theme = getDefaultTheme();
		}
	}
</script>

<select bind:value={theme}>
	<option selected={theme == undefined} value={undefined}>Auto</option>
	<option selected={theme == 'light'} value="light">Light</option>
	<option selected={theme == 'dark'} value="dark">Dark</option>
</select>
