import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import rehypePretty from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePretty,
            {
              keepBackground: false,
              theme: { dark: "github-dark-dimmed", light: "github-light" },
            },
          ],
        ],
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
      }),
    },
    tanstackStart({
      prerender: {
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        enabled: true,
      },
      sitemap: {
        enabled: true,
        host: "https://www.atrtde.com",
      },
      srcDirectory: "src",
    }),
    viteReact({ include: /\.(?:jsx|tsx|mdx)$/u }),
    nitro({ preset: "vercel" }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
