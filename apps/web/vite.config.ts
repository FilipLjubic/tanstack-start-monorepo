import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    devtools(),
    tsConfigPaths(),
    tanstackStart(),
    nitro({}),
    viteReact({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              target: '19',
            },
          ],
        ],
      },
    }),
    tailwindcss(),
  ],
});
