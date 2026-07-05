export const i18n = {
  defaultLocale: 'uk',
  locales: ['uk', 'ru'],
  localeNames: {
    ru: 'EN',
    uk: 'UA',
  }
} as const;


export type Locale = (typeof i18n)['locales'][number];
