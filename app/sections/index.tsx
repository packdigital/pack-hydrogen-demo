import {registerSection} from '@pack/react';
import {Hero} from './Hero';
import {FiftyFiftyHero} from './FiftyFiftyHero';
import {TextBlock} from './TextBlock';

export {Hero, FiftyFiftyHero, TextBlock};

export function registerSections() {
  registerSection(Hero, {name: 'hero'});
  registerSection(FiftyFiftyHero, {name: 'fifty-fifty-hero'});
  registerSection(TextBlock, {name: 'text-block'});
}
