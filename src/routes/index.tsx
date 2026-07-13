import { Link, createFileRoute } from "@tanstack/react-router";

import { essays } from "~/lib/essays";
import { SITE } from "~/lib/site";

const linkClass =
  "font-medium text-link decoration-link/40 decoration-[0.06em] underline underline-offset-[0.18em] hover:decoration-link active:opacity-70";

const Home = () => (
  <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
    <div className="space-y-3.5 text-base leading-relaxed text-foreground">
      <p>
        Co-founded{" "}
        <a
          className={linkClass}
          href="https://www.radion.app"
          rel="noreferrer"
          target="_blank"
        >
          Radion
        </a>{" "}
        to help prediction market traders copy the best traders.
      </p>
      <p>
        Started{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev"
          rel="noreferrer"
          target="_blank"
        >
          Zap Studio
        </a>{" "}
        building type-safe, runtime-agnostic and lightweight libraries.
      </p>
      <p>Making open-source tools that developers use daily:</p>
      <ul className="list-disc pl-5">
        <li>
          <a
            className={linkClass}
            href="https://github.com/atrtde/todo-tree"
            rel="noreferrer"
            target="_blank"
          >
            todo-tree
          </a>{" "}
          for surfacing TODO comments
        </li>
        <li>
          <a
            className={linkClass}
            href="https://github.com/atrtde/mntn"
            rel="noreferrer"
            target="_blank"
          >
            mntn
          </a>{" "}
          for dotfile management
        </li>
        <li>
          <a
            className={linkClass}
            href="https://github.com/atrtde/feedyourai"
            rel="noreferrer"
            target="_blank"
          >
            fyai
          </a>{" "}
          for compressing code for LLMs
        </li>
      </ul>
      {essays.length > 0 && (
        <>
          <p>Read some of my essays below:</p>
          <ul className="list-disc pl-5">
            {essays.map((essay) => (
              <li key={essay.slug}>
                <Link
                  className={linkClass}
                  params={{ slug: essay.slug }}
                  to="/essays/$slug"
                >
                  {essay.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </section>
);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ href: SITE.baseUrl, rel: "canonical" }],
    meta: [
      { title: SITE.title },
      { content: SITE.description, name: "description" },
      { content: SITE.baseUrl, property: "og:url" },
      { content: SITE.title, property: "og:title" },
      { content: SITE.description, property: "og:description" },
      { content: SITE.title, name: "twitter:title" },
      { content: SITE.description, name: "twitter:description" },
    ],
  }),
});
