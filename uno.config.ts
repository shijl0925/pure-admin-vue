import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  shortcuts: {
    'icon-wrapper': 'inline-block leading-0 h-1em w-1em text-inherit normal-case text-center align-[-0.125em] antialiased [&_svg]:inline-block [&_svg]:align-baseline',
  },
  rules: [
    ['login-bg', { background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)' }],
  ],
})
