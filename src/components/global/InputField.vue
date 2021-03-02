<template>
  <q-input
    v-model="localText"
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
  },
  data() {
    return {
      localText: this.text
    };
  },
  // 第一種狀況
  // inputField 更新資料時，
  // localText 更新觸發 watch，
  // 去更新父層的資料，
  // 父層的資料 props 給 inputField 的 text，
  // 第二種狀況
  // 父層給 localText 的資料更新，
  // 觸發 text 的 watch
  watch: {
    localText: {
      deep: true,
      handler(val) {
        this.$emit('update:text', val);
      }
    },
    text(val) {
      this.localText = val;
    }
  }
};
</script>
