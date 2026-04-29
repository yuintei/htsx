export type Doc = {
  id: string;
  url: string;
  title: string;
  description?: string;
  published: string;
  updated?: string;
};

export function getSortedDocs(): Doc[] {
  const docs = import.meta.glob<{
    title: string;
    description?: string;
    published: string;
    updated?: string;
  }>("/docs/**/*.{md,mdx}", {
    eager: true,
  });

  return Object.entries(docs)
    .map(([id, module]) => ({
      id,
      url: id.replace(/\.(md|mdx)$/, ""),
      title: module.title,
      description: module.description,
      published: module.published,
      updated: module.updated,
    }))
    .toSorted((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
