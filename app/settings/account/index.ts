import activate from './activate';
import forgot from './forgot';
import login from './login';
import menu from './menu';
import orders from './orders';
import register from './register';
import reset from './reset';

export default {
  label: 'Account',
  name: 'account',
  component: 'group',
  description:
    'Menu, orders, login, register, forgot password, password reset, activate',
  fields: [menu, orders, login, register, forgot, reset, activate],
};
