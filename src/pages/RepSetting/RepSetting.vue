<template>
  <PageLayout>
    <div class="col-12">
      <router-view />
      <router-view name="RepSettingEdit" />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'RepSetting',
  components: {
    PageLayout
  }
};
</script>
