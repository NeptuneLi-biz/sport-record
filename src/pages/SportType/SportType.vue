<template>
  <PageLayout>
    <div class="col-12">
      SportType
      <router-view />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'SportType',
  components: {
    PageLayout
  },
  data() {
    return {
      sportName: ''
    };
  }
};
</script>
