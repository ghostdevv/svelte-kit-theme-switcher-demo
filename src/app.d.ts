import type { Theme } from '$lib/themes';

declare global {
	namespace App {
		interface Locals {
			theme: Theme;
		}
	}
}

export {};
