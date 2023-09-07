import {Link} from '@remix-run/react';

export const FiftyFiftyHero = ({cms}: any) => {
  return (
    <div
      className={`container flex flex-col md:flex-row items-center gap-4 ${
        cms?.flipped ? 'md:flex-row-reverse' : ''
      }`}
      title={cms?.image?.alt || ''}
    >
      <div
        className="shrink-0 min-h-0 w-full basis-1/2 aspect-[4/5] md:aspect-video rounded-lg bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${cms?.image?.image?.src || ''}')`,
        }}
      />

      <div className="basis-1/2 p-4 lg:p-8 flex flex-col gap-6 items-start">
        <h2 className="font-bold italic text-2xl">{cms?.heading}</h2>

        <p className="max-w-[400px]">{cms?.subtext}</p>

        {cms?.ctaButtonLink?.text && (
          <Link to={cms.ctaButtonLink?.url} className="btn-primary">
            {cms.ctaButtonLink?.text}
          </Link>
        )}
      </div>
    </div>
  );
};

FiftyFiftyHero.Schema = () => {
  return {
    category: 'Heros',
    label: 'Fifty Fifty Hero',
    key: 'fifty-fifty-hero',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/text-block-preview.jpg?v=1675730349',
    fields: [
      {
        label: 'Flipped',
        name: 'flipped',
        component: 'toggle',
        description:
          'If you want to flip the side the text is on. Default is right side.',
        toggleLabels: {
          true: 'Left',
          false: 'Right',
        },
        defaultValue: false,
      },
      {
        label: 'Image Settings',
        name: 'image',
        description: 'Image, image position',
        component: 'group',
        fields: [
          {
            label: 'Image',
            name: 'image',
            component: 'image',
          },
          {
            label: 'Image Alt',
            name: 'alt',
            component: 'text',
            description: 'Brief description of image',
          },
        ],
        defaultValue: {
          image: {
            src: 'https://images.unsplash.com/photo-1518608774889-b04d2abe7702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
          },
          alt: 'Snowboarder walking in the snow',
        },
      },
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: 'Heading',
      },
      {
        label: 'Subtext',
        name: 'subtext',
        component: 'markdown',
        defaultValue:
          "Shaman helvetica freegan poke banh mi you probably haven't heard of them direct trade four loko four dollar toast farm-to-table ennui. Offal photo booth skateboard drinking vinegar. Crucifix butcher mumblecore truffaut prism.",
      },
      {
        label: 'CTA Button',
        name: 'ctaButtonLink',
        component: 'link',
      },
    ],
  };
};
