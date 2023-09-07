export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Menu, social, legal, email marketing',
  fields: [
    {
      label: 'Menu',
      name: 'menu',
      component: 'group',
      description: 'Footer menu links',
      fields: [
        {
          label: 'Menu Title',
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
    {
      label: 'Legal',
      name: 'legal',
      component: 'group',
      description: 'Legal links',
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
      ],
    },
  ],
};
