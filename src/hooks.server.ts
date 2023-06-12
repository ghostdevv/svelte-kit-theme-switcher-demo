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
