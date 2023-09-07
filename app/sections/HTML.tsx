export const HTML = ({ cms }: any) => {
  return (
    <div className="container">
      <div
        dangerouslySetInnerHTML={{ __html: cms?.html }}
        className="mx-auto max-w-3xl"
      />
    </div>
  );
};

HTML.Schema = () => {
  return {
    category: 'HTML',
    label: 'HTML Block',
    key: 'html-block',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/text-block-preview.jpg?v=1675730349',
    fields: [
      {
        label: 'HTML',
        name: 'html',
        component: 'html',
      },
    ],
  };
};
