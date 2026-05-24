import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tanstackStart(),
    nitro({}),
    viteReact(),
    babel({
      presets: [
        reactCompilerPreset({
          target: '19',
        }),
      ],
    }),
    tailwindcss(),
  ],
});
