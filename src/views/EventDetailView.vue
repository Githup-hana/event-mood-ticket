<template>

	<AsyncEventContent :event="events[props.id]" />
</template>

<script setup lang="ts">
import { computed, onMounted, watch, defineAsyncComponent } from 'vue'
import useEvent from '@/composables/useEvent'

const props = defineProps<{ id: string }>()

const { events, loading, error, loadEvent } = useEvent()

onMounted(() => {
	if (props.id) loadEvent(props.id)
})


watch(() => props.id, (newId) => {
	if (newId) loadEvent(newId)
})

const AsyncEventContent = defineAsyncComponent(() => import('@/components/event/EventContent.vue'))





</script>

<style scoped>

</style>

