import 'server-only';

interface Dictionary {
  wedding;
  privacy;
  press;
  home;
  common;
  footer;
  albumCard;
  downloadPreview;
  general;
  '404';
}

const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  de: () => import('../locales/de.json').then((module) => module.default),
  fr: () => import('../locales/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]() as Dictionary;
