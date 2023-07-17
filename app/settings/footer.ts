import { COLORS } from './common';

export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Menu, social, legal, email marketing',
  fields: [
    {
      label: 'Background Color',
      name: 'bgColor',
      component: 'select',
      options: COLORS,
      defaultValue: 'var(--black)',
    },
    {
      label: 'Text Color',
      name: 'textColor',
      component: 'select',
      options: COLORS,
      defaultValue: 'var(--white)',
    },
    {
      label: 'Email Marketing',
      name: 'marketing',
      component: 'group',
      description: 'Enable, heading, text',
      fields: [
        {
          label: 'Enabled',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Heading',
          name: 'heading',
          component: 'text',
        },
        {
          label: 'Subtext',
          name: 'subtext',
          component: 'textarea',
        },
        {
          label: 'Placholder Text',
          name: 'placeholder',
          component: 'text',
        },
        {
          label: 'Button Text',
          name: 'buttonText',
          component: 'text',
        },
      ],
      defaultValue: {
        enabled: true,
        heading: 'Stay In Touch',
        subtext: 'Get the latest news and updates sent straight to your inbox.',
        placeholder: 'Enter your email...',
        buttonText: 'Sign Up',
      },
    },
    {
      label: 'Legal',
      name: 'legal',
      component: 'group',
      description: 'Legal links, copyright notice',
      fields: [
        {
          label: 'Legal Links',
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
          defaultValue: [
            {
              link: {
                text: 'Privacy Policy',
                url: '/pages/privacy-policy',
              },
            },
            {
              link: {
                text: 'Terms & Conditions',
                url: '/pages/terms-conditions',
              },
            },
          ],
        },
        {
          label: 'Site Copyright Notice',
          name: 'copyrightNotice',
          component: 'text',
          defaultValue: 'All Rights Reserved',
        },
      ],
    },
    {
      label: 'Menu',
      name: 'menu',
      component: 'group',
      description: 'Menu items',
      fields: [
        {
          label: 'Menu Items',
          name: 'menuItems',
          component: 'group-list',
          itemProps: {
            label: '{{item.title}}',
          },
          fields: [
            {
              label: 'Menu Item Title',
              name: 'title',
              component: 'text',
            },
            {
              label: 'Menu Item Links',
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
            },
          ],
        },
      ],
    },
    {
      label: 'Social',
      name: 'social',
      component: 'group',
      description: 'Social links, heading',
      fields: [
        {
          label: 'Heading',
          name: 'heading',
          component: 'text',
          defaultValue: 'Stay Connected',
        },
        {
          label: 'Social Links',
          name: 'links',
          component: 'group-list',
          itemProps: {
            label: '{{item.platform}}',
          },
          fields: [
            {
              label: 'Platform',
              name: 'platform',
              component: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Vimeo', value: 'vimeo' },
                { label: 'YouTube', value: 'youtube' },
              ],
            },
            {
              label: 'Url',
              name: 'url',
              component: 'text',
            },
          ],
          defaultItem: {
            platform: 'facebook',
            url: '',
          },
        },
      ],
    },
  ],
};
