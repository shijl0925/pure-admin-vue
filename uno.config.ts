import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  rules: [
    // login background
    ['login-bg', { background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)' }],
  ],
  shortcuts: {
    'icon-wrapper': 'inline-block leading-0 h-1em w-1em text-inherit normal-case text-center align-[-0.125em] antialiased [&_svg]:inline-block [&_svg]:align-baseline',

    // login background waves
    'login-bg-waves': 'relative w-full h-20vh mb-[-7px] min-h-100px',
    'login-bg-wave-1': 'animate-move-forever animate-delay-[-2s] animate-duration-[7s]',
    'login-bg-wave-2': 'animate-move-forever animate-delay-[-3s] animate-duration-[10s]',
    'login-bg-wave-3': 'animate-move-forever animate-delay-[-4s] animate-duration-[13s]',
    'login-bg-wave-4': 'animate-move-forever animate-delay-[-5s] animate-duration-[20s]',
  },
  theme: {
    animation: {
      keyframes: {
        'move-forever': '{ 0% {transform: translate3d(-90px, 0, 0); } 100% {transform: translate3d(85px, 0, 0); }}',
      },
      durations: {
        'move-forever': '25s',
      },
      timingFns: {
        'move-forever': 'cubic-bezier(0.55, 0.5, 0.45, 0.5)',
      },
      counts: {
        'move-forever': 'infinite',
      },
    },
  },
  presets: [
    presetUno(),
  ],
})
