<script setup lang="ts">
import pkg from '../../../../../package.json'

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
    <a-card title="关于">
      <p>
        Pure Admin 是一款功能强大且专注于用户体验的后台管理系统，拥有完全使用 Typescript 开发的前后端服务。前端 React 版本使用了React 19、Vite、Ant Design、@tanstack/react-query、Unocss 等技术栈，Vue 版本使用了 Vue 3、Vite、Ant Design Vue、@tanstack/vue-query 等技术栈，后端使用了 NestJS 11、Prisma 6、PostgreSQL、Redis 等技术栈。
      </p>
    </a-card>
    <a-card title="项目信息">
      <a-descriptions size="small" bordered>
        <a-descriptions-item label="版本">
          {{ version }}
        </a-descriptions-item>
        <a-descriptions-item label="项目地址">
          <a :href="`https://github.com/sunhaoxiang/${name}`" target="_blank">
            {{ name }}
          </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="生产依赖">
      <a-descriptions size="small" bordered>
        <a-descriptions-item v-for="item in pkgJson.dependencies" :key="item.name" :label="item.name">
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="开发依赖">
      <a-descriptions size="small" bordered>
        <a-descriptions-item v-for="item in pkgJson.devDependencies" :key="item.name" :label="item.name">
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
