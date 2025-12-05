<template>
  <img
    :src="BgImagePath"
    alt="eventlogo"
    class="block w-16 h-16 mt-2 mb-4 mx-auto rounded-full object-cover overflow-hidden border-[3px] border-white/20 shadow-2xl bg-white/5"
  />
</template>

<script setup>
import BgImagePath from '@/assets/eventBg.png'
</script>