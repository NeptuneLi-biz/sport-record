<template>
  <q-input
    v-model="text"
    filled
    :label="label"
  />
</template>

<script>
export default {
  name: 'InputField',
  props: {
    text: {
      type: String,
      default: '這裡是預設值'
    },
    label: {
      type: String,
      default: '欄位'
    }
  }
};
</script>
