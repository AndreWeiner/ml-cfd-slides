import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

// List all theme files in the css/theme directory
const themeFiles = fs
	.readdirSync(resolve(import.meta.dirname, 'css/theme'))
	.filter((file) => file.endsWith('.scss'));

const themeEntries = themeFiles.reduce((acc, file) => {
	acc[`theme/${file.replace('.scss', '')}`] = resolve(import.meta.dirname, `css/theme/${file}`);
	return acc;
}, {});

export default defineConfig({
	root: './',
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	build: {
		emptyOutDir: false,
		cssCodeSplit: true,
		lib: {
			formats: ['es'],
			entry: {
				reveal: resolve(import.meta.dirname, 'css/reveal.scss'),
				reset: resolve(import.meta.dirname, 'css/reset.css'),

				...themeEntries,
			},
		},
	},
	plugins: [],
});
