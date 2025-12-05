<template>
<!-- 	<div class="event-detail min-h-screen bg-yellow-200 mt-4 w-full px-0">
		<div v-if="loading" class="text-center">Loading event…</div>
		<div v-else-if="error" class="text-center text-red-600">Fehler: {{ error }}</div>
		<div v-else-if="!events[props.id]" class="text-center">Event nicht gefunden.</div>

		
						
				
		
	</div> -->
	<AsyncEventContent :event="events[props.id]" />
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import useEvent from '@/composables/useEvent'

const props = defineProps<{ id: string }>()

const { events, loading, error, loadEvent } = useEvent()

onMounted(() => {
	if (props.id) loadEvent(props.id)
})


const AsyncEventContent = defineAsyncComponent(() => import('@/components/event/EventContent.vue'))





</script>

<style scoped>

</style>

