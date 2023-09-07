export const Image = ({ cms }: any) => {
  return (
    <div className="container">
      <img
        src={cms?.image?.src}
        alt={cms?.sectionName}
        className="mx-auto max-w-3xl"
      />
    </div>
  );
};

Image.Schema = () => {
  return {
    category: 'Images',
    label: 'Image Block',
    key: 'image-block',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/text-block-preview.jpg?v=1675730349',
    fields: [
      {
        label: 'Image',
        name: 'image',
        component: 'image',
      },
    ],
  };
};
