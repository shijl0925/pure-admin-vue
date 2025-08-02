<script setup lang="ts">
import type { FormInstance } from "ant-design-vue";

import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { getLogListApi } from "@/apis/log";
import {
    ResetButton,
    SearchButton,
} from "@/components/button";
import {
    SearchCol,
    SearchContainer,
    SearchRow,
    SearchTableContainer,
} from "@/components/container";
import { useSearchTableContainer } from "@/hooks/useSearchTableContainer";
import { useTable } from "@/hooks/useTable";

const { t } = useI18n();

const { listContainerProps, tableScrollY } = useSearchTableContainer();

const {
    formRef,
    formState,
    tableProps,
    isLoading,
    handleSearch,
    handleReset,
} = useTable({
    key: "log", // 表格唯一标识，不要与其他模块重名
    cacheEnabled: false, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
    pagination: true, // 是否开启分页
    selectable: true, // 是否开启选择
    listApiFn: getLogListApi, // 获取列表数据
    deleteApiFn: undefined,
    batchDeleteApiFn: undefined,
    scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
    form: {
        name: null,
        code: null,
    },
    columns: computed(() => [
        { title: t("page.operationLog.id"), dataIndex: "id" },
        { title: t("page.operationLog.status_code"), dataIndex: "status_code" },
        { title: t("page.operationLog.method"), dataIndex: "method" },
        { title: t("page.operationLog.path"), dataIndex: "path" },
        { title: t("page.operationLog.user_agent"), dataIndex: "user_agent" },
        { title: t("page.operationLog.ip"), dataIndex: "ip" },
        { title: t("page.operationLog.latency"), dataIndex: "latency" },
        { title: t("page.operationLog.user_name"), dataIndex: "user_name" },
        { title: t("page.operationLog.message"), dataIndex: "message" },
        { title: t("page.operationLog.createTime"), dataIndex: "createTime" },
        {
            title: t("common.actions"),
            key: "actions",
            fixed: "right",
            width: 100,
        },
    ]),
});
</script>

<template>
    <SearchTableContainer v-bind="listContainerProps">
        <template #searchForm>
            <a-form
                :ref="(el: FormInstance) => (formRef = el)"
                :model="formState"
                :colon="false"
                autocomplete="off"
                @finish="handleSearch"
            >
                <SearchContainer>
                    <SearchRow>
                        <SearchCol
                            name="status_code"
                            :label="t('page.operationLog.status_code')"
                        >
                            <a-input v-model:value="formState.status_code" />
                        </SearchCol>
                        <SearchCol
                            name="method"
                            :label="t('page.operationLog.method')"
                        >
                            <a-input v-model:value="formState.method" />
                        </SearchCol>
                        <SearchCol
                            name="path"
                            :label="t('page.operationLog.path')"
                        >
                            <a-input v-model:value="formState.path" />
                        </SearchCol>
                        <SearchCol
                            name="user_agent"
                            :label="t('page.operationLog.user_agent')"
                        >
                            <a-input v-model:value="formState.user_agent" />
                        </SearchCol>
                        <SearchCol name="ip" :label="t('page.operationLog.ip')">
                            <a-input v-model:value="formState.ip" />
                        </SearchCol>
                        <SearchCol
                            name="message"
                            :label="t('page.operationLog.message')"
                        >
                            <a-input v-model:value="formState.message" />
                        </SearchCol>
                        <SearchCol
                            name="user_name"
                            :label="t('page.operationLog.user_name')"
                        >
                            <a-input v-model:value="formState.user_name" />
                        </SearchCol>
                    </SearchRow>
                    <template #actions>
                        <a-space>
                            <SearchButton :loading="isLoading" />
                            <ResetButton @click="handleReset" />
                        </a-space>
                    </template>
                </SearchContainer>
            </a-form>
        </template>
        <a-table v-bind="tableProps">
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'actions'">
                </template>
            </template>
        </a-table>
    </SearchTableContainer>
</template>
