<script setup lang="ts">
import type { DataTablePagination, DataTableSorting } from '@xouyi/elfui'
import { createDataTableColumnHelper, ElfDataTable } from '@xouyi/elfui'
import { ref, watch } from 'vue'

interface Sponsor {
  id: number
  name: string
  amount: number
}

// A stand-in for an HTTP call: the "server" filters, sorts and slices 47 rows.
const database: Sponsor[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `Sponsor ${String.fromCharCode(65 + (i * 7) % 26)}${i + 1}`,
  amount: ((i * 37) % 50) * 100 + 500,
}))

async function fetchSponsors(query: { search: string, sorting: DataTableSorting, pageIndex: number, pageSize: number }) {
  await new Promise(resolve => setTimeout(resolve, 250))
  let rows = database.filter(r => r.name.toLowerCase().includes(query.search.toLowerCase()))
  const sort = query.sorting[0]
  if (sort) {
    const key = sort.id as keyof Sponsor
    rows = [...rows].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * (sort.desc ? -1 : 1))
  }
  const start = query.pageIndex * query.pageSize
  return { rows: rows.slice(start, start + query.pageSize), total: rows.length }
}

const col = createDataTableColumnHelper<Sponsor>()
const columns = [
  col.accessor('name', { header: 'Sponsor' }),
  col.accessor('amount', { header: 'Amount (TRY)' }),
]

const rows = ref<Sponsor[]>([])
const total = ref(0)
const loading = ref(false)
const sorting = ref<DataTableSorting>([])
const search = ref('')
const pagination = ref<DataTablePagination>({ pageIndex: 0, pageSize: 8 })

// Every change of the query state loads the matching page. A stale response is ignored.
let request = 0
watch([sorting, search, pagination], async () => {
  const id = ++request
  loading.value = true
  const result = await fetchSponsors({ search: search.value, sorting: sorting.value, ...pagination.value })
  if (id !== request) return
  rows.value = result.rows
  total.value = result.total
  loading.value = false
}, { immediate: true, deep: true })
</script>

<template>
  <ElfDataTable
    v-model:sorting="sorting"
    v-model:global-filter="search"
    v-model:pagination="pagination"
    caption="Sponsors"
    :columns="columns"
    :data="rows"
    row-key="id"
    :loading="loading"
    :loading-rows="pagination.pageSize"
    :row-count="total"
    manual-sorting
    manual-filtering
    manual-pagination
    searchable
  />
</template>
