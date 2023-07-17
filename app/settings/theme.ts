const BUTTON_COLOR_FIELDS = [
  {
    label: 'Background Color',
    name: 'bgColor',
    component: 'color',
  },
  {
    label: 'Border Color',
    name: 'borderColor',
    component: 'color',
  },
  {
    label: 'Text Color',
    name: 'textColor',
    component: 'color',
  },
  {
    label: 'Hover Background Color',
    name: 'hoverBgColor',
    component: 'color',
  },
  {
    label: 'Hover Border Color',
    name: 'hoverBorderColor',
    component: 'color',
  },
  {
    label: 'Hover Text Color',
    name: 'hoverTextColor',
    component: 'color',
  },
];

export default {
  label: 'Theme',
  name: 'theme',
  component: 'group',
  description: 'Theme colors, button colors',
  fields: [
    {
      label: 'Buttons',
      name: 'buttons',
      component: 'group',
      fields: [
        {
          label: 'Primary',
          name: 'primary',
          component: 'group',
          fields: BUTTON_COLOR_FIELDS,
          defaultValue: {
            bgColor: '#008464',
            borderColor: '#008464',
            textColor: '#FFFFFF',
            hoverBgColor: '#008C6B',
            hoverBorderColor: '#008C6B',
            hoverTextColor: '#FFFFFF',
          },
        },
        {
          label: 'Secondary',
          name: 'secondary',
          component: 'group',
          fields: BUTTON_COLOR_FIELDS,
          defaultValue: {
            bgColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            textColor: '#008464',
            hoverBgColor: '#008464',
            hoverBorderColor: '#008464',
            hoverTextColor: '#FFFFFF',
          },
        },
        {
          label: 'Inverse Light',
          name: 'inverseLight',
          component: 'group',
          fields: BUTTON_COLOR_FIELDS,
          defaultValue: {
            bgColor: 'transparent',
            borderColor: '#FFFFFF',
            textColor: '#FFFFFF',
            hoverBgColor: '#FFFFFF',
            hoverBorderColor: '#FFFFFF',
            hoverTextColor: '#000000',
          },
        },
        {
          label: 'Inverse Dark',
          name: 'inverseDark',
          component: 'group',
          fields: BUTTON_COLOR_FIELDS,
          defaultValue: {
            bgColor: 'transparent',
            borderColor: '#000000',
            textColor: '#000000',
            hoverBgColor: '#000000',
            hoverBorderColor: '#000000',
            hoverTextColor: '#FFFFFF',
          },
        },
      ],
    },
    {
      label: 'Colors',
      name: 'colors',
      component: 'group',
      fields: [
        {
          label: 'Background',
          name: 'background',
          component: 'color',
        },
        {
          label: 'Text',
          name: 'text',
          component: 'color',
        },
        {
          label: 'Border',
          name: 'border',
          component: 'color',
        },
        {
          label: 'Primary',
          name: 'primary',
          component: 'color',
        },
        {
          label: 'Secondary',
          name: 'secondary',
          component: 'color',
        },
        {
          label: 'Accent 1',
          name: 'accent1',
          component: 'color',
        },
        {
          label: 'Accent 2',
          name: 'accent2',
          component: 'color',
        },
        {
          label: 'Black',
          name: 'black',
          component: 'color',
        },
        {
          label: 'Off Black',
          name: 'offBlack',
          component: 'color',
        },
        {
          label: 'Dark Gray',
          name: 'darkGray',
          component: 'color',
        },
        {
          label: 'Medium Dark Gray',
          name: 'mediumDarkGray',
          component: 'color',
        },
        {
          label: 'Medium Gray',
          name: 'mediumGray',
          component: 'color',
        },
        {
          label: 'Gray',
          name: 'gray',
          component: 'color',
        },
        {
          label: 'Light Gray',
          name: 'lightGray',
          component: 'color',
        },
        {
          label: 'Off White',
          name: 'offWhite',
          component: 'color',
        },
        {
          label: 'White',
          name: 'white',
          component: 'color',
        },
      ],
      defaultValue: {
        background: '#FFFFFF',
        text: '#000000',
        border: '#E8E8E8',
        primary: '#008464',
        secondary: '#8164BF',
        accent1: '#189CC5',
        accent2: '#4A69D4',
        black: '#000000',
        offBlack: '#101010',
        darkGray: '#484848',
        mediumDarkGray: '#707070',
        mediumGray: '#989898',
        gray: '#C0C0C0',
        lightGray: '#E8E8E8',
        offWhite: '#F9F9F9',
        white: '#FFFFFF',
      },
    },
  ],
};
