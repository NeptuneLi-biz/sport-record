<template>
  <q-dialog
    v-model="isOpening"
    persistent
  >
    <q-card :style="{'width': width, 'max-width': width }">
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        :style="{'max-height': height }"
        class="scroll"
      >
        <slot name="body" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          v-if="showCancelBtn"
          flat
          :label="cancelText"
          @click="onCancel"
        />
        <q-btn
          flat
          :label="confirmText"
          :color="$color.Primary"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { Color } from '../../const/common.const';

export default {
  name: 'ContentDialog',
  props: {
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    isOpening: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '確認'
    },
    cancelText: {
      type: String,
      default: '關閉'
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '40vh'
    },
    width: {
      type: String,
      default: '20vw'
    },
    iconColor: {
      type: String,
      default: Color.Primary
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSubmit() {
      this.$emit('confirm');
    }
  }
};
</script>
