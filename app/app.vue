<template>
  <div class="page-container">
    <NuxtRouteAnnouncer />
    <AppLayoutShell />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
const AppLayoutShell = resolveComponent('AppLayoutShell')
</script>
