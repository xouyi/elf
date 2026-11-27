<script setup lang="ts">
import { createDataTableColumnHelper, ElfDataTable } from '@xouyi/elfui'
import { ref } from 'vue'

interface Part {
  id: string
  name: string
  subsystem: string
  weight: number
}

const parts: Part[] = [
  { id: 'p1', name: 'Swerve module', subsystem: 'Drive', weight: 4.2 },
  { id: 'p2', name: 'Elevator carriage', subsystem: 'Lift', weight: 3.1 },
  { id: 'p3', name: 'Intake roller', subsystem: 'Intake', weight: 0.8 },
  { id: 'p4', name: 'Climber hook', subsystem: 'Climber', weight: 1.4 },
  { id: 'p5', name: 'Wrist gearbox', subsystem: 'Arm', weight: 2.6 },
  { id: 'p6', name: 'Battery mount', subsystem: 'Frame', weight: 0.5 },
  { id: 'p7', name: 'Bumper bracket', subsystem: 'Frame', weight: 0.3 },
  { id: 'p8', name: 'Camera mast', subsystem: 'Vision', weight: 0.9 },
  { id: 'p9', name: 'Shooter flywheel', subsystem: 'Shooter', weight: 1.7 },
  { id: 'p10', name: 'Hood actuator', subsystem: 'Shooter', weight: 0.6 },
  { id: 'p11', name: 'Wheel hub', subsystem: 'Drive', weight: 0.7 },
  { id: 'p12', name: 'Cable chain', subsystem: 'Frame', weight: 0.4 },
]

const col = createDataTableColumnHelper<Part>()
const columns = [
  col.accessor('name', { header: 'Part' }),
  col.accessor('subsystem', { header: 'Subsystem' }),
  col.accessor('weight', { header: 'Weight (kg)' }),
]

const sorting = ref([{ id: 'weight', desc: true }])
</script>

<template>
  <ElfDataTable
    v-model:sorting="sorting"
    caption="Robot parts"
    :columns="columns"
    :data="parts"
    row-key="id"
    :page-size="5"
    class="w-full"
  />
</template>
