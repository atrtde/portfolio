import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Header } from "~/components/header";
import { SITE } from "~/lib/site";

import globalsCss from "~/styles/app.css?url";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  description: SITE.description,
  jobTitle: "Entrepreneur & Open Source Developer",
  name: "atrtde",
  sameAs: [SITE.github, SITE.twitter],
  url: SITE.baseUrl,
};

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body className="antialiased">
      <div className="min-h-screen bg-background px-6">
        <Header />
        <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-152 pb-12 md:pb-18">
          {children}
        </main>
      </div>
      <Scripts />
    </body>
  </html>
);

const notFoundLinkClass =
  "font-medium text-link decoration-link/40 decoration-[0.06em] underline underline-offset-[0.18em] hover:decoration-link active:opacity-70";

const NotFound = () => (
  <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
    <div className="space-y-3.5 text-base leading-relaxed text-foreground">
      <h1 className="text-xl font-medium">You are lost.</h1>
      <p>
        This page doesn&apos;t exist, you can go{" "}
        <Link className={notFoundLinkClass} to="/">
          home
        </Link>{" "}
        instead.
      </p>
    </div>
  </section>
);

export const Route = createRootRoute({
  component: () => <Outlet />,
  head: () => ({
    links: [
      { href: globalsCss, rel: "stylesheet" },
      { href: "/logo.png", rel: "icon", type: "image/png" },
      { href: "/sitemap.xml", rel: "sitemap", type: "application/xml" },
    ],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: SITE.title },
      { content: SITE.description, name: "description" },
      { content: "website", property: "og:type" },
      { content: "en_US", property: "og:locale" },
      { content: "atrtde", property: "og:site_name" },
      { content: SITE.title, property: "og:title" },
      { content: SITE.description, property: "og:description" },
      { content: SITE.ogImage, property: "og:image" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: "@atrtde", name: "twitter:creator" },
      { content: SITE.title, name: "twitter:title" },
      { content: SITE.description, name: "twitter:description" },
      { content: SITE.ogImage, name: "twitter:image" },
    ],
    scripts: [
      {
        children: JSON.stringify(personSchema),
        type: "application/ld+json",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
