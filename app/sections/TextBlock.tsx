export const TextBlock = ({cms}: any) => {
  return (
    <div className="mx-auto max-w-3xl py-10 px-4 ld:px-6"> {cms?.text} </div>
  );
};

TextBlock.Schema = () => {
  return {
    category: 'Text',
    label: 'Text Block',
    key: 'text-block',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/text-block-preview.jpg?v=1675730349',
    fields: [
      {
        label: 'Text',
        name: 'text',
        component: 'markdown',
        defaultValue:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  };
};
