import { createFileRoute, notFound, useParams } from "@tanstack/react-router";

import { getEssay } from "~/lib/essays";
import { SITE } from "~/lib/site";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const RouteComponent = () => {
  const { slug } = useParams({ from: "/essays/$slug" });
  const essay = getEssay(slug);

  if (!essay) {
    return null;
  }

  const Content = essay.default;
  const { title, date } = essay.frontmatter;

  return (
    <article className="mx-auto flex w-full max-w-152 flex-col pt-[15vh]">
      <header className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-foreground">{title}</h1>
        <time className="text-sm text-muted-foreground" dateTime={date}>
          {dateFormat.format(new Date(date))}
        </time>
      </header>
      <div className="prose">
        <Content />
      </div>
    </article>
  );
};

export const Route = createFileRoute("/essays/$slug")({
  component: RouteComponent,
  head: ({ params }) => {
    const essay = getEssay(params.slug);
    if (!essay) {
      return {};
    }
    const fm = essay.frontmatter;
    return {
      links: [
        { href: `${SITE.baseUrl}/essays/${params.slug}`, rel: "canonical" },
      ],
      meta: [
        { title: `${fm.title} | Alexandre Trotel` },
        { content: fm.description, name: "description" },
        { content: fm.title, property: "og:title" },
        { content: fm.description, property: "og:description" },
        { content: "article", property: "og:type" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!getEssay(params.slug)) {
      // oxlint-disable-next-line typescript/only-throw-error
      throw notFound();
    }
  },
});
