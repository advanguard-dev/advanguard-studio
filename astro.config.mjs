import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), keystatic()],
})

