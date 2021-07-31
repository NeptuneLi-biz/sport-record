<template>
  <PageLayout>
    <div class="col-12">
      <router-view />
      <router-view name="CurriculumSettingEdit" />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'CurriculumSetting',
  components: {
    PageLayout
  }
};
</script>
