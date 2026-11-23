import { Poem } from '../types';
import { MAKARAH_POEMS } from './makarahPoems';
import { GHAZAL_POEMS } from './ghazalPoems';
import { LIMATHA_POEMS } from './limathaPoems';
import { HABR_POEMS } from './habrPoems';
import { HEYAM_POEMS } from './heyamPoems';
import { INKISAR_POEMS } from './inkisarPoems';
import { SULTAN_POEMS } from './sultanPoems';
import { SALIM_POEMS } from './salimPoems';
import { YAQEEN_POEMS } from './yaqeenPoems';
import { SAAD_POEMS } from './saadPoems';

export const POEMS: Poem[] = [
  ...MAKARAH_POEMS,
  ...GHAZAL_POEMS,
  ...LIMATHA_POEMS,
  ...HABR_POEMS,
  ...INKISAR_POEMS,
  ...HEYAM_POEMS,
  ...SULTAN_POEMS,
  ...SALIM_POEMS,
  ...YAQEEN_POEMS,
  ...SAAD_POEMS,
];
