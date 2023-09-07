import { Markdown } from '~/components/Markdown';

export const TextBlock = ({ cms }: any) => {
  return (
    <Markdown className="mx-auto max-w-3xl py-6 px-4 lg:px-6">
      {cms?.text}
    </Markdown>
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
