import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, FALLBACK_LOCALE, LOCALES } from '@/constants/app'
import enUS from '@/locales/en-US'
import zhCN from '@/locales/zh-CN'
import { projectSign } from '@/utils/string'

const locale = localStorage.getItem(projectSign('locale')) || DEFAULT_LOCALE

export const i18n = createI18n<I18n, keyof typeof LOCALES>({
  locale,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  legacy: false,
})
