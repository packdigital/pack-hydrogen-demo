const COLORS = [
  {label: 'Background', value: 'var(--background)'},
  {label: 'Text', value: 'var(--text)'},
  {label: 'Border', value: 'var(--border)'},
  {label: 'Primary', value: 'var(--primary)'},
  {label: 'Secondary', value: 'var(--secondary)'},
  {label: 'Accent 1', value: 'var(--accent1)'},
  {label: 'Accent 2', value: 'var(--accent2)'},
  {label: 'Black', value: 'var(--black)'},
  {label: 'Off Black', value: 'var(--off-black)'},
  {label: 'Dark Gray', value: 'var(--dark-gray)'},
  {label: 'Medium Dark Gray', value: 'var(--medium-dark-gray)'},
  {label: 'Medium Gray', value: 'var(--medium-gray)'},
  {label: 'Gray', value: 'var(--gray)'},
  {label: 'Light Gray', value: 'var(--light-gray)'},
  {label: 'Off White', value: 'var(--off-white)'},
  {label: 'White', value: 'var(--white)'},
  {label: 'Transparent', value: 'transparent'},
];

const FLEX_POSITIONS = {
  mobile: [
    {
      value: 'justify-start items-start',
      label: 'Left Top',
    },
    {
      value: 'justify-start items-center',
      label: 'Left Center',
    },
    {
      value: 'justify-start items-end',
      label: 'Left Bottom',
    },
    {
      value: 'justify-center items-start',
      label: 'Center Top',
    },
    {
      value: 'justify-center items-center',
      label: 'Center Center',
    },
    {
      value: 'justify-center items-end',
      label: 'Center Bottom',
    },
    {
      value: 'justify-end items-start',
      label: 'Right Top',
    },
    {
      value: 'justify-end items-center',
      label: 'Right Center',
    },
    {
      value: 'justify-end items-end',
      label: 'Right Bottom',
    },
  ],
  desktop: [
    {
      value: 'md:justify-start md:items-start',
      label: 'Left Top',
    },
    {
      value: 'md:justify-start md:items-center',
      label: 'Left Center',
    },
    {
      value: 'md:justify-start md:items-end',
      label: 'Left Bottom',
    },
    {
      value: 'md:justify-center md:items-start',
      label: 'Center Top',
    },
    {
      value: 'md:justify-center md:items-center',
      label: 'Center Center',
    },
    {
      value: 'md:justify-center md:items-end',
      label: 'Center Bottom',
    },
    {
      value: 'md:justify-end md:items-start',
      label: 'Right Top',
    },
    {
      value: 'md:justify-end md:items-center',
      label: 'Right Center',
    },
    {
      value: 'md:justify-end md:items-end',
      label: 'Right Bottom',
    },
  ],
};

const OBJECT_POSITIONS = {
  mobile: [
    {
      value: 'object-left-top',
      label: 'Left Top',
    },
    {
      value: 'object-left',
      label: 'Left Center',
    },
    {
      value: 'object-left-bottom',
      label: 'Left Bottom',
    },
    {
      value: 'object-top',
      label: 'Center Top',
    },
    {
      value: 'object-center',
      label: 'Center Center',
    },
    {
      value: 'object-bottom',
      label: 'Center Bottom',
    },
    {
      value: 'object-right-top',
      label: 'Right Top',
    },
    {
      value: 'object-right',
      label: 'Right Center',
    },
    {
      value: 'object-right-bottom',
      label: 'Right Bottom',
    },
  ],
  desktop: [
    {
      value: 'md:object-left-top',
      label: 'Left Top',
    },
    {
      value: 'md:object-left',
      label: 'Left Center',
    },
    {
      value: 'md:object-left-bottom',
      label: 'Left Bottom',
    },
    {
      value: 'md:object-top',
      label: 'Center Top',
    },
    {
      value: 'md:object-center',
      label: 'Center Center',
    },
    {
      value: 'md:object-bottom',
      label: 'Center Bottom',
    },
    {
      value: 'md:object-right-top',
      label: 'Right Top',
    },
    {
      value: 'md:object-right',
      label: 'Right Center',
    },
    {
      value: 'md:object-right-bottom',
      label: 'Right Bottom',
    },
  ],
};

const TEXT_ALIGN = {
  mobile: [
    {label: 'Left', value: 'text-left'},
    {label: 'Center', value: 'text-center'},
    {label: 'Right', value: 'text-right'},
  ],
  desktop: [
    {label: 'Left', value: 'md:text-left'},
    {label: 'Center', value: 'md:text-center'},
    {label: 'Right', value: 'md:text-right'},
  ],
};

export {COLORS, FLEX_POSITIONS, OBJECT_POSITIONS, TEXT_ALIGN};
