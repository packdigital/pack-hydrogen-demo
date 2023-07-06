import {COLORS, FLEX_POSITIONS, OBJECT_POSITIONS} from '~/settings/common';

const image = {
  label: 'Image Settings',
  name: 'image',
  description: 'Image, image position',
  component: 'group',
  fields: [
    {
      label: 'Image Alt',
      name: 'alt',
      component: 'text',
      description: 'Brief description of image',
    },
    {
      label: 'Image (tablet/desktop)',
      name: 'imageDesktop',
      component: 'image',
    },
    {
      label: 'Image Position (tablet/desktop)',
      name: 'positionDesktop',
      component: 'select',
      options: OBJECT_POSITIONS.desktop,
    },
    {
      label: 'Image (mobile)',
      name: 'imageMobile',
      component: 'image',
    },
    {
      label: 'Image Position (mobile)',
      name: 'positionMobile',
      component: 'select',
      options: OBJECT_POSITIONS.mobile,
    },
  ],
};

const video = {
  label: 'Video Settings',
  name: 'video',
  description: 'Video link, poster image',
  component: 'group',
  fields: [
    {
      label: 'Video URL (tablet/desktop)',
      name: 'srcDesktop',
      component: 'text',
      description: 'Overrides tablet/desktop image option',
    },
    {
      label: 'Poster Image (tablet/desktop)',
      name: 'posterDesktop',
      component: 'image',
      description: 'First frame of video while video loads',
    },
    {
      label: 'Video URL (mobile)',
      name: 'srcMobile',
      component: 'text',
      description: 'Overrides mobile image option',
    },
    {
      label: 'Poster Image (mobile)',
      name: 'posterMobile',
      component: 'image',
      description: 'First frame of video while video loads',
    },
  ],
};

const text = {
  label: 'Text Settings',
  name: 'text',
  description: 'Heading, superheading, subheading, color',
  component: 'group',
  fields: [
    {
      label: 'Heading',
      name: 'heading',
      component: 'textarea',
    },
    {
      label: 'Superheading',
      name: 'superheading',
      component: 'text',
    },
    {
      label: 'Subheading',
      name: 'subheading',
      component: 'text',
    },
    {
      label: 'Text Color',
      name: 'color',
      component: 'select',
      options: COLORS,
    },
  ],
};

const buttons = {
  label: 'Button Settings',
  name: 'button',
  description: 'Clickable slide, button links, button styles',
  component: 'group',
  fields: [
    {
      label: 'Entire Slide Clickable',
      name: 'clickableSlide',
      component: 'toggle',
      description: 'Makes entire slide clickable using the first link below',
      toggleLabels: {
        true: 'On',
        false: 'Off',
      },
    },
    {
      label: 'Buttons',
      name: 'buttons',
      component: 'group-list',
      description: 'Max of two buttons',
      itemProps: {
        label: '{{item.link.text}}',
      },
      validate: {
        maxItems: 2,
      },
      fields: [
        {
          label: 'Link',
          name: 'link',
          component: 'link',
        },
        {
          label: 'Button Style',
          name: 'style',
          component: 'select',
          options: [
            {label: 'Primary', value: 'btn-primary'},
            {label: 'Secondary', value: 'btn-secondary'},
            {label: 'Inverse Light', value: 'btn-inverse-light'},
            {label: 'Inverse Dark', value: 'btn-inverse-dark'},
          ],
        },
      ],
      defaultItem: {
        link: {text: 'Shop All', url: ''},
        style: 'btn-primary',
      },
    },
  ],
};

const content = {
  label: 'Content Settings',
  name: 'content',
  description: 'Dark overlay, content position, content alignment',
  component: 'group',
  fields: [
    {
      label: 'Dark Overlay',
      name: 'darkOverlay',
      component: 'toggle',
      description: 'Adds 20% opacity black overlay over media',
      toggleLabels: {
        true: 'On',
        false: 'Off',
      },
    },
    {
      label: 'Content Position (tablet/desktop)',
      name: 'positionDesktop',
      component: 'select',
      options: FLEX_POSITIONS.desktop,
    },
    {
      label: 'Content Alignment (tablet/desktop)',
      name: 'alignmentDesktop',
      component: 'radio-group',
      direction: 'horizontal',
      variant: 'radio',
      options: [
        {label: 'Left', value: 'md:text-left md:items-start'},
        {label: 'Center', value: 'md:text-center md:items-center'},
        {label: 'Right', value: 'md:text-right md:items-end'},
      ],
    },
    {
      label: 'Max Content Width (tablet/desktop)',
      name: 'maxWidthDesktop',
      component: 'select',
      options: [
        {label: 'Narrow', value: 'md:max-w-[22rem] lg:max-w-[28rem]'},
        {label: 'Medium', value: 'md:max-w-[30rem] lg:max-w-[38rem]'},
        {label: 'Wide', value: 'md:max-w-[38rem] lg:max-w-[48rem]'},
        {label: 'Full', value: 'md:max-w-full'},
      ],
    },
    {
      label: 'Content Position (mobile)',
      name: 'positionMobile',
      component: 'select',
      options: FLEX_POSITIONS.mobile,
    },
    {
      label: 'Content Alignment (mobile)',
      name: 'alignmentMobile',
      component: 'radio-group',
      direction: 'horizontal',
      variant: 'radio',
      options: [
        {label: 'Left', value: 'text-left items-start'},
        {label: 'Center', value: 'text-center items-center'},
        {label: 'Right', value: 'text-right items-end'},
      ],
    },
    {
      label: 'Max Content Width (mobile)',
      name: 'maxWidthMobile',
      component: 'select',
      options: [
        {label: 'Narrow', value: 'max-w-[16.5rem]'},
        {label: 'Medium', value: 'max-w-[22.5rem]'},
        {label: 'Wide', value: 'max-w-[28.5rem]'},
        {label: 'Full', value: 'max-w-full'},
      ],
    },
  ],
};

const defaultSlide = {
  image: {
    alt: 'Three men outside wearing outerwear',
    imageDesktop: {
      src: 'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/tanya-pro-J2Cr4cBnN-0-unsplash_20_281_29.jpg?v=1672724643',
    },
    positionDesktop: 'md:object-center',
    imageMobile: {
      src: 'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/tanya-pro-J2Cr4cBnN-0-unsplash_20_281_29.jpg?v=1672724643',
    },
    positionMobile: 'object-center',
  },
  text: {
    heading: 'All new products\nthis season',
    superheading: '',
    subheading: 'New styles and new fits',
    color: 'var(--white)',
  },
  button: {
    clickableSlide: false,
    buttons: [
      {
        link: {
          text: 'Shop Now',
          url: '',
        },
        style: 'btn-primary',
      },
    ],
  },
  content: {
    darkOverlay: false,
    alignmentDesktop: 'md:text-left md:items-start',
    positionDesktop: 'md:justify-start items-center',
    maxWidthDesktop: 'md:max-w-[30rem] lg:max-w-[38rem]',
    alignmentMobile: 'text-left items-start',
    positionMobile: 'justify-start items-center',
    maxWidthMobile: 'max-w-[22.5rem]',
  },
};

export const Schema = () => {
  return {
    category: 'Hero',
    label: 'Hero',
    key: 'hero',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/hero-preview_2cd7154c-7ec6-4846-84ca-85aaef836165.jpg?v=1675795229',
    fields: [
      {
        name: 'slides',
        label: 'Slides',
        component: 'group-list',
        itemProps: {
          label: '{{item.text.heading}}',
        },
        fields: [image, video, text, buttons, content],
        defaultValue: [defaultSlide],
        defaultItem: defaultSlide,
      },
      {
        label: 'Slider Settings',
        name: 'slider',
        description: 'Autoplay, delay, transition effect, bullet color',
        component: 'group',
        fields: [
          {
            label: 'Enable Autoplay',
            name: 'autoplay',
            component: 'toggle',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Enable Pagination Bullets',
            name: 'pagination',
            component: 'toggle',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Delay Between Transitions (ms)',
            name: 'delay',
            component: 'number',
          },
          {
            label: 'Effect Between Transitions',
            name: 'effect',
            component: 'radio-group',
            direction: 'horizontal',
            variant: 'radio',
            options: [
              {label: 'Slide', value: 'slide'},
              {label: 'Fade', value: 'fade'},
            ],
          },
          {
            label: 'Active Bullet Color',
            name: 'activeBulletColor',
            component: 'select',
            options: COLORS,
          },
        ],
        defaultValue: {
          autoplay: true,
          pagination: true,
          delay: 8000,
          effect: 'fade',
          activeBulletColor: 'var(--white)',
        },
      },
      {
        label: 'Section Settings',
        name: 'section',
        component: 'group',
        description: 'Above the fold, full width, full bleed, height',
        fields: [
          {
            label: 'Above The Fold',
            name: 'aboveTheFold',
            component: 'toggle',
            description: `Sets the first slide's heading as H1 and preloads the image`,
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Full Width',
            name: 'fullWidth',
            component: 'toggle',
            description: 'Removes max width of this section',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Full Bleed',
            name: 'fullBleed',
            component: 'toggle',
            description: 'Removes padding of this section',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Height (desktop)',
            name: 'heightDesktop',
            component: 'select',
            description: 'Sets desktop height of this section',
            options: [
              {label: '200px', value: 'lg:h-[12.5rem]'},
              {label: '300px', value: 'lg:h-[18.75rem]'},
              {label: '400px', value: 'lg:h-[25rem]'},
              {label: '500px', value: 'lg:h-[31.25rem]'},
              {label: '600px', value: 'lg:h-[37.5rem]'},
              {label: '700px', value: 'lg:h-[43.75rem]'},
              {label: '800px', value: 'lg:h-[50rem]'},
            ],
          },
          {
            label: 'Height (tablet)',
            name: 'heightTablet',
            component: 'select',
            description: 'Sets tablet height of this section',
            options: [
              {label: '200px', value: 'md:h-[12.5rem]'},
              {label: '300px', value: 'md:h-[18.75rem]'},
              {label: '400px', value: 'md:h-[25rem]'},
              {label: '500px', value: 'md:h-[31.25rem]'},
              {label: '600px', value: 'md:h-[37.5rem]'},
              {label: '700px', value: 'md:h-[43.75rem]'},
              {label: '800px', value: 'md:h-[50rem]'},
            ],
          },
          {
            label: 'Height (mobile)',
            name: 'heightMobile',
            component: 'select',
            description: 'Sets mobile height of this section',
            options: [
              {label: '200px', value: 'h-[12.5rem]'},
              {label: '300px', value: 'h-[18.75rem]'},
              {label: '400px', value: 'h-[25rem]'},
              {label: '500px', value: 'h-[31.25rem]'},
              {label: '600px', value: 'h-[37.5rem]'},
              {label: '700px', value: 'h-[43.75rem]'},
              {label: '800px', value: 'h-[50rem]'},
            ],
          },
        ],
        defaultValue: {
          aboveTheFold: true,
          fullWidth: true,
          fullBleed: true,
          heightDesktop: 'lg:h-[43.75rem]',
          heightTablet: 'md:h-[37.5rem]',
          heightMobile: 'h-[25rem]',
        },
      },
    ],
  };
};
