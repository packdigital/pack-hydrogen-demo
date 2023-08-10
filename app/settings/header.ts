export default {
  label: 'Header',
  name: 'header',
  component: 'group',
  description: 'Menu settings for header',
  fields: [
    {
      label: 'Header Links',
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
      defaultValue: [
        {
          link: {
            text: 'Shop All',
            url: '/collections/all',
          },
        },
        {
          link: {
            text: 'Story',
            url: '/pages/about-us',
          },
        },
        {
          link: {
            text: 'About this demo',
            url: '/pages/demo-info',
          },
        },
      ],
    },
  ],
};
