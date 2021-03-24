<template>
  <PageLayout>
    <div class="col-12">
      <q-card class="q-mb-lg">
        <q-card-section>
          <span class="text-h6 row items-center">
            <span class="inline">
              運動項目
              <!-- TODO: 載入效果 -->
              <!-- <SpinnerGlobal
              :loading="loading.Fetching || loading.Saving"
              :color="$color.Primary"
            /> -->
            </span>
          </span>
          <router-view />
        </q-card-section>
      </q-card>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from 'layouts/PageLayout.vue';

export default {
  name: 'SportItem',
  components: {
    PageLayout
  }
};
</script>
