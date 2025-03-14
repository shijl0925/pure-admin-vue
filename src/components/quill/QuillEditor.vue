<script setup lang="ts">
import Quill from 'quill'
import { nextTick, onMounted, ref, watch } from 'vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export interface ChangeEvent {
  html: string
  text: string
  quill: Quill
}

interface QuillEditorProps {
  options?: Record<string, any>
  placeholder?: string
  readOnly?: boolean
}

const {
  options = {},
  placeholder = '',
  readOnly = false,
} = defineProps<QuillEditorProps>()

const emit = defineEmits<{
  (e: 'change', value: ChangeEvent): void
  (e: 'blur', value: Quill): void
  (e: 'focus', value: Quill): void
  (e: 'ready', value: Quill): void
}>()

const value = defineModel<string | null>('value')

const editorElement = ref<HTMLElement | null>(null)
let quill: Quill | null = null
let isInternalChange = false

onMounted(() => {
  init()
})

watch(() => value.value, (newValue) => {
  if (quill && newValue !== quill.root.innerHTML) {
    isInternalChange = true
    quill.root.innerHTML = newValue || ''
    isInternalChange = false
  }
})

watch(() => readOnly, (newValue) => {
  if (quill) {
    quill.enable(!newValue)
  }
})

function init() {
  const defaultOptions = {
    theme: 'snow',
    placeholder,
    readOnly,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // 格式按钮
        ['blockquote', 'code-block'], // 块级元素

        [{ header: 1 }, { header: 2 }], // 自定义按钮值
        [{ list: 'ordered' }, { list: 'bullet' }], // 列表
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
        [{ indent: '-1' }, { indent: '+1' }], // 缩进

        [{ size: ['small', false, 'large', 'huge'] }], // 字号
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题

        [{ color: [] }, { background: [] }], // 颜色
        [{ font: [] }], // 字体
        [{ align: [] }], // 对齐

        ['clean'], // 清除格式
        ['link', 'image', 'video'], // 链接、图片、视频
      ],
    },
  }

  const allOptions = {
    ...defaultOptions,
    ...options,
  }

  nextTick(() => {
    if (editorElement.value) {
      quill = new Quill(editorElement.value, allOptions)

      if (value.value) {
        isInternalChange = true
        quill.root.innerHTML = value.value
        isInternalChange = false
      }

      quill.on('text-change', () => {
        if (!isInternalChange && quill) {
          const html = quill.root.innerHTML
          value.value = html
          emit('change', { html, text: quill.getText(), quill })
        }
      })

      quill.root.addEventListener('blur', () => {
        if (quill)
          emit('blur', quill)
      }, { once: true })

      quill.root.addEventListener('focus', () => {
        if (quill)
          emit('focus', quill)
      }, { once: true })

      emit('ready', quill)
    }
  })
}

defineExpose({
  getQuill: () => quill,
})
</script>

<template>
  <div class="mb-5 w-full">
    <div ref="editorElement" class="[&_.ql-editor]:min-h-[200px]" />
  </div>
</template>
