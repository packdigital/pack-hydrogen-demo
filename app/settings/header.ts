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
    },
  ],
};
