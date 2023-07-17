import { COLORS } from './common';

export default {
  label: 'Header',
  name: 'header',
  component: 'group',
  description: 'Menu, promobar',
  fields: [
    {
      label: 'Promobar',
      name: 'promobar',
      component: 'group',
      description: 'Enable, messages, colors, slider settings',
      fields: [
        {
          label: 'Enabled',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Autohide',
          name: 'autohide',
          component: 'toggle',
          description:
            'Hides promobar after scrolling away from top of the page',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Effect Between Transitions',
          name: 'effect',
          component: 'select',
          description: 'Refresh page to observe change',
          options: [
            { label: 'Fade', value: 'fade' },
            { label: 'Horizontal Slide', value: 'slide-horizontal' },
            { label: 'Vertical Slide', value: 'slide-vertical' },
          ],
          defaultValue: 'fade',
        },
        {
          label: 'Autoplay Delay',
          name: 'delay',
          component: 'number',
          description: 'Delay between transitions (in ms)',
          defaultValue: 5000,
        },
        {
          label: 'Speed',
          name: 'speed',
          component: 'number',
          description: 'Duration of transition between slides (in ms)',
          defaultValue: 500,
        },
        {
          label: 'Background Color',
          name: 'bgColor',
          component: 'select',
          options: COLORS,
          defaultValue: 'var(--primary)',
        },
        {
          label: 'Text Color',
          name: 'color',
          component: 'select',
          options: COLORS,
          defaultValue: 'var(--white)',
        },
        {
          label: 'Messages',
          name: 'messages',
          component: 'group-list',
          itemProps: {
            label: '{{item.message}}',
          },
          fields: [
            {
              label: 'Message',
              name: 'message',
              component: 'textarea',
            },
            {
              label: 'Link (optional)',
              name: 'link',
              component: 'link',
              description: 'Link wrapping entire message',
            },
          ],
          defaultItem: {
            message: 'Free shipping on orders over $100. Shop Now',
            link: { url: '/', text: '' },
          },
        },
      ],
    },
    {
      label: 'Menu',
      name: 'menu',
      component: 'group',
      description: 'Menu items, products slider, links',
      fields: [
        {
          label: 'Menu Items',
          name: 'menuItems',
          component: 'group-list',
          itemProps: {
            label: '{{item.menuItem.text}}',
          },
          fields: [
            {
              label: 'Menu Item',
              name: 'menuItem',
              component: 'link',
            },
            {
              label: 'Submenu Links',
              name: 'links',
              component: 'group-list',
              itemProps: {
                label: '{{item.link.text}}',
              },
              fields: [
                {
                  label: 'Link',
                  name: 'link',
                  component: 'link',
                },
              ],
              defaultItem: {},
            },
            {
              label: 'Submenu Button',
              name: 'mainLink',
              component: 'link',
            },
            {
              label: 'Submenu Images',
              name: 'imageLinks',
              component: 'group-list',
              itemProps: {
                label: '{{item.caption}}',
              },
              fields: [
                {
                  label: 'Image Alt',
                  name: 'alt',
                  component: 'text',
                  description: 'Brief description of image',
                },
                {
                  label: 'Image',
                  name: 'image',
                  component: 'image',
                },
                {
                  label: 'Caption',
                  name: 'caption',
                  component: 'text',
                },
                {
                  label: 'Link',
                  name: 'link',
                  component: 'link',
                },
              ],
              defaultItem: {},
            },
          ],
          defaultItem: {
            menuItem: { text: 'Shop', url: '/collections/all' },
          },
        },
        {
          label: 'Products Slider',
          name: 'productsSlider',
          description: 'Visible only in menu sidebar',
          component: 'group',
          fields: [
            {
              label: 'Heading',
              name: 'heading',
              component: 'text',
            },
            {
              label: 'Products',
              name: 'products',
              component: 'group-list',
              itemProps: {
                label: '{{item.product.handle}}',
              },
              fields: [
                {
                  label: 'Product',
                  name: 'product',
                  component: 'productSearch',
                },
              ],
            },
          ],
        },
        {
          label: 'Addtional Links',
          name: 'links',
          description: 'Visible only in menu sidebar',
          component: 'group-list',
          itemProps: {
            label: '{{item.link.text}}',
          },
          fields: [
            {
              label: 'Link',
              name: 'link',
              component: 'link',
            },
          ],
        },
      ],
    },
  ],
};
