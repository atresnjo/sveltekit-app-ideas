import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

const extensions = ['.svelte'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	extensions: extensions,
	kit: {
		adapter: node()
	}
};

export default config;
