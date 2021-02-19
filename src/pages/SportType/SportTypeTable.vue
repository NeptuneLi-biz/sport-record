<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
export default {
  name: 'SportTypeTable',
  data() {
    return {
      data: [],
      columns: []
    };
  }
};
</script>
