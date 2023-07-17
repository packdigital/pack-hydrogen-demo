import { COLORS } from './common';

const label = {
  label: 'Label',
  name: 'label',
  component: 'text',
};

const isColor = {
  label: 'Uses Color Swatches',
  name: 'isColor',
  component: 'toggle',
  description:
    'Matches option value with color value set in:\nStorefront Settings > Product > Colors',
  toggleLabels: {
    true: 'On',
    false: 'Off',
  },
};

const defaultOpenDesktop = {
  label: 'Default Open (tablet/desktop)',
  name: 'defaultOpenDesktop',
  component: 'toggle',
  toggleLabels: {
    true: 'On',
    false: 'Off',
  },
};

const defaultOpenMobile = {
  label: 'Default Open (mobile)',
  name: 'defaultOpenMobile',
  component: 'toggle',
  toggleLabels: {
    true: 'On',
    false: 'Off',
  },
};

const orderValuesBy = {
  label: 'Order Options By',
  name: 'orderValuesBy',
  component: 'radio-group',
  direction: 'horizontal',
  variant: 'radio',
  options: [
    { label: 'Alphabet', value: 'alphabet' },
    { label: 'Number', value: 'number' },
    { label: 'Option Count (most to least)', value: 'count' },
    { label: 'Custom', value: 'custom' },
  ],
};

const customOrder = {
  label: 'Custom Order',
  name: 'customOrder',
  component: 'list',
  field: {
    component: 'text',
  },
};

export default {
  label: 'Collection',
  name: 'collection',
  component: 'group',
  description: 'Filters, sort, pagination, product item, promotion',
  fields: [
    {
      label: 'Filters',
      name: 'filters',
      component: 'group',
      description: 'Enable, custom filters, show option count',
      fields: [
        {
          label: 'Enable',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Show Option Count',
          name: 'showCount',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Sticky To Top',
          name: 'sticky',
          component: 'toggle',
          description: 'Sticky to top of left column on tablet/desktop',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Options Max Count',
          name: 'optionsMaxCount',
          component: 'number',
          description:
            'Initial number of options to show per filter. Remaining options will be hidden behind a "more" button',
          defaultValue: 6,
        },
        {
          label: 'Filters',
          name: 'filters',
          component: 'blocks',
          description: `A filter's options are automatically determined by the products in the collection.\n\nNote: a filter will be hidden if there are no options, or only has one option, which has a count equal to the total number of products in the collection.`,
          templates: {
            price: {
              label: 'Price Range',
              key: 'price',
              itemProps: {
                label: 'Price Range',
              },
              defaultItem: {
                label: 'Price',
                ranges: [],
                defaultOpenDesktop: false,
                defaultOpenMobile: false,
              },
              fields: [
                label,
                {
                  label: 'Price Ranges',
                  name: 'ranges',
                  component: 'group-list',
                  itemProps: {
                    label: '{{item.label}}',
                  },
                  fields: [
                    {
                      label: 'Label',
                      name: 'label',
                      component: 'text',
                      description:
                        'e.g. "Under $50", "$50 to $100", "$100 and over"',
                    },
                    {
                      label: 'Minimum Price (inclusive)',
                      name: 'min',
                      component: 'number',
                      description: 'Leave blank or add 0 for no minimum price',
                    },
                    {
                      label: 'Maximum Price (exclusive)',
                      name: 'max',
                      component: 'number',
                      description: 'Leave blank for no maximum price',
                    },
                  ],
                },
                defaultOpenDesktop,
                defaultOpenMobile,
              ],
            },
            option: {
              label: 'Product Option',
              key: 'option',
              itemProps: {
                label: 'Option: {{item.label}}',
              },
              defaultItem: {
                label: 'Option Label',
                isColor: false,
                defaultOpenDesktop: false,
                defaultOpenMobile: false,
                orderValuesBy: 'alphabet',
              },
              fields: [
                {
                  label: 'Option Name',
                  name: 'name',
                  component: 'text',
                  description: `Letter casing must be same as name in Shopify, e.g. "Color", "Size"`,
                },
                label,
                isColor,
                defaultOpenDesktop,
                defaultOpenMobile,
                orderValuesBy,
                customOrder,
              ],
            },
            tag: {
              label: 'Product Tag',
              key: 'tag',
              itemProps: {
                label: 'Tag: {{item.label}}',
              },
              defaultItem: {
                label: 'Tag Label',
                isColor: false,
                defaultOpenDesktop: false,
                defaultOpenMobile: false,
                orderValuesBy: 'alphabet',
              },
              fields: [
                {
                  label: 'Tag Name',
                  name: 'name',
                  component: 'text',
                  description: `Letter casing must be same as name in Shopify, e.g. "colorfilter", "material"\n\nNote: Shopify tags must separate name and value with "::", e.g. "colorfilter::Red"`,
                },
                label,
                isColor,
                defaultOpenDesktop,
                defaultOpenMobile,
                orderValuesBy,
                customOrder,
              ],
            },
            productType: {
              label: 'Product Type',
              key: 'productType',
              itemProps: {
                label: 'Product Type',
              },
              defaultItem: {
                label: 'Product Type',
                defaultOpenDesktop: false,
                defaultOpenMobile: false,
                orderValuesBy: 'alphabet',
              },
              fields: [
                label,
                defaultOpenDesktop,
                defaultOpenMobile,
                {
                  label: 'Order Options By',
                  name: 'orderValuesBy',
                  component: 'radio-group',
                  direction: 'horizontal',
                  variant: 'radio',
                  options: [
                    { label: 'Alphabet', value: 'alphabet' },
                    {
                      label: 'Option Count (most to least)',
                      value: 'count',
                    },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                customOrder,
              ],
            },
          },
          defaultValue: [
            {
              _template: 'productType',
              name: '',
              label: 'Product Type',
              isColor: false,
              defaultOpenDesktop: false,
              defaultOpenMobile: false,
              orderValuesBy: 'alphabet',
            },
            {
              _template: 'option',
              name: 'Color',
              label: 'Color',
              isColor: true,
              defaultOpenDesktop: false,
              defaultOpenMobile: false,
              orderValuesBy: 'alphabet',
            },
            {
              _template: 'option',
              name: 'Size',
              label: 'Size',
              isColor: false,
              defaultOpenDesktop: false,
              defaultOpenMobile: false,
              orderValuesBy: 'custom',
              customOrder: [
                'One Size',
                'OS',
                'O S',
                'O/S',
                'XXS',
                'XX-Small',
                '2XS',
                'XS',
                'X-Small',
                'XS/S',
                'XS/SM',
                'S',
                'SM',
                'Small',
                'S/M',
                'SM/MD',
                'M',
                'MD',
                'Medium',
                'M/L',
                'MD/LG',
                'L',
                'Large',
                'LG',
                'L/XL',
                'LG/XL',
                'XL',
                'X-Large',
                'XXL',
                'XX-Large',
                '2XL',
                'XXXL',
                'XXX-Large',
                '3XL',
              ],
            },
            {
              _template: 'price',
              label: 'Price',
              ranges: [
                {
                  label: 'Under $50',
                  min: 0,
                  max: 50,
                },
                {
                  label: '$50 to $100',
                  min: 50,
                  max: 100,
                },
                {
                  label: '$100 and over',
                  min: 100,
                },
              ],
              defaultOpenDesktop: false,
              defaultOpenMobile: false,
            },
          ],
        },
      ],
    },
    {
      label: 'Pagination',
      name: 'pagination',
      component: 'group',
      description: 'Enable, products per load, load type, load text',
      fields: [
        {
          label: 'Enable',
          name: 'enabled',
          component: 'toggle',
          description: 'Loads products in segments',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Products Per Load',
          name: 'resultsPerPage',
          component: 'number',
          description:
            'Count includes any promo tiles that may be positioned within each load',
        },
        {
          label: 'Load Type',
          name: 'loadType',
          component: 'radio-group',
          direction: 'horizontal',
          variant: 'radio',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Infinite Scroll', value: 'infinite' },
          ],
        },
        {
          label: 'Load Text',
          name: 'loadText',
          component: 'text',
        },
        {
          label: 'Load Button Style',
          name: 'buttonStyle',
          component: 'select',
          options: [
            { label: 'Primary', value: 'btn-primary' },
            { label: 'Secondary', value: 'btn-secondary' },
            { label: 'Inverse Light', value: 'btn-inverse-light' },
            { label: 'Inverse Dark', value: 'btn-inverse-dark' },
          ],
        },
        {
          label: 'Progress Message',
          name: 'progressMessage',
          component: 'text',
          description:
            'Use {{loaded}} to display the loaded count.\nUse {{total}} to display the total count',
        },
      ],
      defaultValue: {
        enabled: true,
        resultsPerPage: 24,
        loadType: 'button',
        loadText: 'Load More',
        buttonStyle: 'btn-inverse-dark',
        progressMessage: 'Showing 1-{{loaded}} of {{total}} total',
      },
    },
    {
      label: 'Product Item',
      name: 'productItem',
      component: 'group',
      description: 'Star rating, color variant selector, quick shop',
      fields: [
        {
          label: 'Enable Star Rating',
          name: 'enabledStarRating',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Enable Color Variant Selector',
          name: 'enabledColorSelector',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Enable Color Name On Hover',
          name: 'enabledColorNameOnHover',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Enable Quick Shop',
          name: 'enabledQuickShop',
          component: 'toggle',
          description:
            'Note: Quick shop is hidden on mobile and will only show if the product item has only one variant or multiple variants through a single option, e.g. "Size"',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Quick Shop Text (Multi-variant)',
          name: 'quickShopMultiText',
          description: 'Use {{option}} to display the variant option name',
          component: 'text',
        },
        {
          label: 'Quick Shop Text (Single-variant)',
          name: 'quickShopSingleText',
          component: 'text',
        },
      ],
      defaultValue: {
        enabledStarRating: true,
        enabledColorSelector: true,
        enabledColorNameOnHover: false,
        enabledQuickShop: true,
        quickShopMultiText: '+ Quick Add {{option}}',
        quickShopSingleText: '+ Quick Add',
      },
    },
    {
      label: 'Promotion',
      name: 'promotion',
      component: 'group',
      description: 'Promo tile campaigns',
      fields: [
        {
          label: 'Promo Tile Campaigns',
          name: 'campaigns',
          component: 'group-list',
          itemProps: {
            label: '{{item.name}}',
          },
          fields: [
            {
              label: 'Enable',
              name: 'enabled',
              component: 'toggle',
              toggleLabels: {
                true: 'On',
                false: 'Off',
              },
            },
            {
              label: 'Name',
              name: 'name',
              component: 'text',
            },
            {
              label: 'Promo Tiles',
              name: 'promoTiles',
              component: 'group-list',
              itemProps: {
                label: '{{item.position}}: {{item.text.heading}}',
              },
              fields: [
                {
                  label: 'Grid Position',
                  name: 'position',
                  component: 'number',
                  description: 'Assigns grid order',
                },
                {
                  label: 'Aspect Ratio',
                  name: 'aspectRatio',
                  component: 'select',
                  options: [
                    { label: '1:1', value: 'aspect-[1/1]' },
                    { label: '4:5', value: 'aspect-[4/5]' },
                    { label: '3:4', value: 'aspect-[3/4]' },
                    { label: '2:3', value: 'aspect-[2/3]' },
                    { label: '9:16', value: 'aspect-[9/16]' },
                    { label: 'Fill', value: 'h-full' },
                  ],
                },
                {
                  label: 'Link',
                  name: 'link',
                  component: 'link',
                  description: 'Makes the entire tile a clickable link',
                },
                {
                  label: 'Background Settings',
                  name: 'background',
                  component: 'group',
                  description: 'Background color, image, video, dark overlay',
                  fields: [
                    {
                      label: 'Background Color',
                      name: 'bgColor',
                      component: 'select',
                      options: COLORS,
                    },
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
                      description: 'Overrides background color',
                    },
                    {
                      label: 'Video URL',
                      name: 'videoSrc',
                      component: 'text',
                      description: 'Overrides image. Autoplays once in view',
                    },
                    {
                      label: 'Video Poster Image',
                      name: 'videoPoster',
                      component: 'image',
                      description: 'First frame of video while video loads',
                    },
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
                  ],
                },
                {
                  label: 'Text Settings',
                  name: 'text',
                  component: 'group',
                  description: 'Heading, subtext, text color',
                  fields: [
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
                      label: 'Text Color',
                      name: 'textColor',
                      component: 'select',
                      options: COLORS,
                    },
                  ],
                },
              ],
              defaultItem: {
                position: 5,
                aspectRatio: 'aspect-[3/4]',
                background: { bgColor: 'var(--off-white)', darkOverlay: false },
                text: {
                  heading: 'Promo Tile Heading',
                  subtext:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  textColor: 'var(--text)',
                },
              },
            },
            {
              label: 'Collection Handles',
              name: 'collections',
              component: 'list',
              description:
                'Add all collection handles that will run this campaign, e.g. "all", "best-sellers".\n\nTo apply to search results page, add "search"',
              field: {
                component: 'text',
              },
            },
          ],
          defaultItem: {
            enabled: true,
            name: 'Campaign',
            promoTiles: [
              {
                position: 5,
                aspectRatio: 'aspect-[3/4]',
                background: { bgColor: 'var(--off-white)', darkOverlay: false },
                text: {
                  heading: 'Promo Tile Heading',
                  subtext:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  textColor: 'var(--text)',
                },
              },
            ],
            collections: ['all'],
          },
        },
      ],
    },
    {
      label: 'Sort',
      name: 'sort',
      component: 'group',
      description: 'Enable, sort labels',
      fields: [
        {
          label: 'Enable',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
          defaultValue: true,
        },
        {
          label: 'Default Label',
          name: 'defaultLabel',
          component: 'text',
        },
        {
          label: 'Price High to Low Label',
          name: 'highToLowLabel',
          component: 'text',
        },
        {
          label: 'Price Low to High Label',
          name: 'lowToHighLabel',
          component: 'text',
        },
        {
          label: 'A to Z Label',
          name: 'aToZLabel',
          component: 'text',
        },
        {
          label: 'Z to A Label',
          name: 'zToALabel',
          component: 'text',
        },
      ],
      defaultValue: {
        defaultLabel: 'Featured',
        highToLowLabel: 'High to Low',
        lowToHighLabel: 'Low to High',
        aToZLabel: 'A - Z',
        zToALabel: 'Z - A',
      },
    },
  ],
};
