<template>
  <q-page class="flex flex-center">
    222
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <CurriculumRecord />
  </q-page>
</template>

<script>
import CurriculumRecord from 'pages/CurriculumRecord.vue';

export default {
  name: 'PageIndex',
  components: {
    CurriculumRecord
  }
};
</script>
