<template>
  <q-page class="flex flex-center">
    222
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <Record />
  </q-page>
</template>

<script>
import Record from 'pages/Record.vue';

export default {
  name: 'PageIndex',
  components: {
    Record
  }
};
</script>
