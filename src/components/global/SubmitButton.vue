<template>
  <div class="items-center">
    <q-btn
      type="submit"
      :color="color"
      :icon="icon"
      :label="label"
      :size="size"
      :disable="disable"
    />
    <q-btn
      type="reset"
      size="sm"
      flat
      outline
      dense
      icon="refresh"
      color="danger"
      :disable="disable"
      class="q-ml-md"
    >
      <q-tooltip>{{ undoTip }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    label: {
      type: String,
      default: '儲存'
    },
    undoTip: {
      type: String,
      default: '重新整理'
    },
    disable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'save'
    },
    size: {
      type: String,
      default: 'md'
    }
  }
};
</script>
