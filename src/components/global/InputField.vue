<template>
  <q-input
    v-model="text"
    filled
    :label="label"
    :disable="disable"
    dense
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
};
</script>
