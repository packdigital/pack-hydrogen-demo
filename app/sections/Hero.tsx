import {Link} from '@remix-run/react';

export const Hero = ({cms}: any) => {
  return (
    <div className="container">
      <div
        className="overflow-hidden relative shrink-0 min-h-0 w-full basis-1/2 aspect-[2/3] md:aspect-video rounded-lg bg-cover bg-no-repeat bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('${cms?.image?.image?.src || ''}')`,
        }}
      >
        <div className="z-10 basis-1/2 p-4 lg:p-8 flex flex-col gap-2 items-center text-center">
          {cms?.superHeading && (
            <span className="uppercase underline font-bold text-xs text-cyan-400">
              {cms.superHeading}
            </span>
          )}

          {cms?.heading && (
            <h2 className="font-bold italic text-4xl text-white">
              {cms.heading}
            </h2>
          )}

          {cms?.subtext && <p className="text-white">{cms.subtext}</p>}

          {cms?.ctaButtonLink?.text && (
            <Link to={cms.ctaButtonLink?.url} className="btn-primary mt-4">
              {cms.ctaButtonLink?.text}
            </Link>
          )}
        </div>

        <div className="absolute inset-0 bg-gray-500 opacity-50" />
      </div>
    </div>
  );
};

Hero.Schema = () => {
  return {
    category: 'Heros',
    label: 'Hero',
    key: 'hero',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/text-block-preview.jpg?v=1675730349',
    fields: [
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
            src: 'https://images.unsplash.com/photo-1518085050105-3c33befa5442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80',
          },
          alt: 'Snowboarder going down mountain',
        },
      },
      {
        label: 'Super Heading',
        name: 'superHeading',
        component: 'text',
        defaultValue: 'Super Heading',
      },
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: 'Heading Text',
      },
      {
        label: 'Subtext',
        name: 'subtext',
        component: 'markdown',
        defaultValue:
          "Shaman helvetica freegan poke banh mi you probably haven't heard of.",
      },
      {
        label: 'CTA Button',
        name: 'ctaButtonLink',
        component: 'link',
        defaultValue: {
          text: 'Button Link',
        },
      },
    ],
  };
};
