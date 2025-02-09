<script setup lang="ts">
import { compact } from 'es-toolkit'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isHomePage = computed(() => route.path === '/')
const isListPage = computed(() => /.+\/list/.test(route.path))
const canBack = computed(() => !/.+\/list$/.test(route.path))
const menuIcon = computed(() => route.meta.menuIcon as string)
const title = computed(() => compact(route.matched.map(e => e.meta.title)).join(' / '))
const subTitle = computed(() => {
  const routeSubTitle = route.meta.subTitle as string
  if (routeSubTitle && isListPage.value) {
    return routeSubTitle
  }
  else {
    return ''
  }
})

function back() {
  if (canBack.value) {
    router.back()
  }
}
</script>

<template>
  <div v-if="!isHomePage" class="h-[32px] flex items-center justify-center">
    <span v-if="canBack" class="w-[32px] flex cursor-pointer select-none items-center self-stretch justify-center rounded text-xl hover:bg-light-100 hover:text-light-900">
      <Icon name="icon-park-outline:left" @click="() => back()" />
    </span>
    <span v-else class="w-[32px] flex cursor-pointer select-none items-center self-stretch justify-center rounded text-xl">
      <Icon :name="menuIcon" />
    </span>
    <span v-if="title" class="ml-2 text-lg font-medium">{{ title }}</span>
    <span v-if="subTitle" class="ml-2 text-gray-500">{{ subTitle }}</span>
  </div>
</template>
