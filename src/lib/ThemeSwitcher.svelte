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
