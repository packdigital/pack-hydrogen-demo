import {registerStorefrontSettingsSchema} from '@pack/react';

import footer from './footer';
import header from './header';

export function registerStorefrontSettings() {
  registerStorefrontSettingsSchema([header, footer]);
}
