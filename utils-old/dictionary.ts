import 'server-only'

interface Dictionary {
  wedding: any
  privacy: any
  press: any
  home: any
  common: any
  footer: any
  albumCard: any
  downloadPreview: any
  general: any
  "404": any
}


const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  de: () => import('../locales/de.json').then((module) => module.default),
  fr: () => import('../locales/fr.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => dictionaries[locale]() as Dictionary;
