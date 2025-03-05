<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'

interface Props {
  startValue?: number
  endValue?: number
  duration?: number
  autoplay?: boolean
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimal?: string
  useEasing?: boolean
  transition?: keyof typeof TransitionPresets
}

const {
  startValue = 0,
  endValue = 1000,
  duration = 1500,
  autoplay = true,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  decimal = '.',
  useEasing = true,
  transition = 'linear',
} = defineProps<Props>()

const source = ref(startValue)

const computedTransition = computed(() => (useEasing ? TransitionPresets[transition] : undefined))

const outputValue = useTransition(source, {
  disabled: false,
  duration,
  transition: computedTransition.value,
})

const value = computed(() => formatValue(outputValue.value))

function formatValue(num: number) {
  let number = num.toFixed(decimals)
  number = String(number)

  const x = number.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${separator}$2`)
    }
  }

  return prefix + x1 + x2 + suffix
}

async function start() {
  await nextTick()
  source.value = endValue
}

watch(
  [() => startValue, () => endValue],
  () => {
    if (autoplay) {
      start()
    }
  },
  { immediate: true },
)
</script>

<template>
  <span>{{ value }}</span>
</template>
