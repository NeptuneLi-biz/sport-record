<template>
  <PageLayout>
    <div class="col-12">
      <router-view />
      <router-view name="SportTypeEdit" />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'SportType',
  components: {
    PageLayout
  }
};
</script>
