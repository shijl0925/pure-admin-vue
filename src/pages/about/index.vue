<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import pkg from '../../../package.json'

const { t } = useI18n()

interface PkgJson {
  name: string
  version: string
  dependencies: PkgVersionInfo[]
  devDependencies: PkgVersionInfo[]
}

interface PkgVersionInfo {
  name: string
  version: string
}

const { name, version, dependencies, devDependencies } = pkg

const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map(item => transformVersionData(item)),
  devDependencies: Object.entries(devDependencies).map(item => transformVersionData(item)),
}

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple
  return {
    name: $name,
    version: $version,
  }
}
</script>

<template>
  <div class="m-2 flex flex-col gap-2">
    <a-card :title="t('page.about.title')" :bordered="false">
      {{ t('page.about.content') }}
    </a-card>
    <a-card :title="t('page.about.projectInfo')" :bordered="false">
      <a-descriptions size="small" bordered>
        <a-descriptions-item :label="t('page.about.version')">
          {{ version }}
        </a-descriptions-item>
        <a-descriptions-item :label="t('page.about.projectAddress')">
          <a :href="`https://github.com/sunhaoxiang/${name}`" target="_blank">
            {{ name }}
          </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card :title="t('page.about.dependencies')" :bordered="false">
      <a-descriptions size="small" bordered>
        <a-descriptions-item v-for="item in pkgJson.dependencies" :key="item.name" :label="item.name">
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card :title="t('page.about.devDependencies')" :bordered="false">
      <a-descriptions size="small" bordered>
        <a-descriptions-item v-for="item in pkgJson.devDependencies" :key="item.name" :label="item.name">
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
