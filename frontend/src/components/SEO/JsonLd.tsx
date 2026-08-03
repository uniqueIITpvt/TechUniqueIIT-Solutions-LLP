type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

const serializeJsonLd = (data: JsonLdProps['data']) => {
  return JSON.stringify(data).replace(/</g, '\\u003c');
};

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
};

export const buildBreadcrumbJsonLd = (
  items: Array<{
    name: string;
    path: string;
  }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, 'https://www.techuniqueiit.com').toString(),
  })),
});