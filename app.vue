<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <SharedAppToast />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>
