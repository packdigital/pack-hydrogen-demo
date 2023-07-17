import { COLORS } from './common';

export default {
  label: 'Cart',
  name: 'cart',
  component: 'group',
  description: 'Cart upsell, free shipping meter, empty cart, totals',
  fields: [
    {
      label: 'Heading',
      name: 'heading',
      component: 'text',
      defaultValue: 'My Cart',
    },
    {
      label: 'Empty Cart',
      name: 'emptyCart',
      component: 'group',
      description: 'Message, links',
      fields: [
        {
          label: 'Empty Cart Message',
          name: 'message',
          component: 'text',
          defaultValue: 'Your cart is empty',
        },
        {
          label: 'Links',
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
          defaultItem: {
            link: { url: '/collections/all', text: 'Continue Shopping' },
          },
          defaultValue: [
            { link: { url: '/collections/all', text: 'Continue Shopping' } },
          ],
        },
      ],
    },
    {
      label: 'Free Shipping Meter',
      name: 'freeShipping',
      component: 'group',
      description: 'Enable, minimum cart spend, messages',
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
          label: 'Minimum Cart Spend',
          name: 'minCartSpend',
          component: 'number',
          description: 'Minimum cart spend to qualify for free shipping',
        },
        {
          label: 'Progress Message',
          name: 'progressMessage',
          component: 'text',
          description:
            'Message when cart has not yet reached minimum spend. Use {{amount}} to display the remaining amount',
        },
        {
          label: 'Qualified Message',
          name: 'qualifiedMessage',
          component: 'text',
          description: 'Message when cart has qualified',
        },
        {
          label: 'Progress Bar Color',
          name: 'progressBarColor',
          component: 'select',
          options: COLORS,
        },
      ],
      defaultValue: {
        enabled: false,
        minCartSpend: 100,
        progressMessage: `You're only {{amount}} away from free shipping!`,
        qualifiedMessage: `You've qualified for free shipping!`,
        progressBarColor: 'var(--primary)',
      },
    },
    {
      label: 'Totals',
      name: 'totals',
      component: 'group',
      description: 'Subtotal text, subtext, checkout text',
      fields: [
        {
          label: 'Subtotal Text',
          name: 'subtotalText',
          component: 'text',
        },
        {
          label: 'Subtext',
          name: 'subtext',
          component: 'text',
        },
        {
          label: 'Checkout Text',
          name: 'checkoutText',
          component: 'text',
        },
      ],
      defaultValue: {
        subtotalText: 'Subtotal',
        subtext: '',
        checkoutText: 'Checkout',
      },
    },
    {
      label: 'Upsell',
      name: 'upsell',
      component: 'group',
      description: 'Enable, message, product',
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
          label: 'Message',
          name: 'message',
          component: 'text',
        },
        {
          label: 'Product',
          name: 'product',
          component: 'productSearch',
        },
      ],
      defaultValue: {
        enabled: false,
        message: `Don't miss out on this item!`,
      },
    },
  ],
};
