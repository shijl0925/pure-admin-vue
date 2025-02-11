import type { App } from 'vue'

import { createI18n } from 'vue-i18n'

import type { LocaleKey } from '@/constants/app'

import { DEFAULT_LOCALE, FALLBACK_LOCALE, LOCALES } from '@/constants/app'
import { projectSign } from '@/utils/string'

const locale = localStorage.getItem(projectSign('locale')) || DEFAULT_LOCALE

const i18n = createI18n({
  locale,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {},
  legacy: false,
})

export async function setupI18n(app: App) {
  console.log('setupI18n')
  // 动态加载所有语言包
  const messages = await Promise.all(
    Object.keys(LOCALES).map(async (locale) => {
      const messages = await getLocaleMessages(locale as LocaleKey)
      return [locale, messages]
    }),
  )

  // 设置语言包
  messages.forEach(([locale, message]) => {
    i18n.global.setLocaleMessage(locale, message)
  })
  app.use(i18n)
}

function getLocaleMessages(locale: LocaleKey) {
  return import(`./langs/${locale}.ts`).then(module => module.default)
}
