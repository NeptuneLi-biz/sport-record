<template>
  <PageLayout>
    <div class="col-12">
      <router-view />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'SportRecord',
  components: {
    PageLayout
  }
};
</script>
