<template>
  <div>
    <q-input
      ref="inputRef"
      v-model="localValue"
      class="daterange"
      :clearable="clearable"
      clear-icon="mdi-close"
      :bottom-slots="bottomSlots"
      :dense="dense"
      :filled="filled"
      :label="label"
      :stack-label="stackLabel"
      :placeholder="placeholder"
      :mask="localMask"
      :disable="disable"
      :rules="rules"
      :hint="hint"
      @clear="clear()"
      @input="onTypeInput"
    >
      <template
        v-if="$slots.before"
        #before
      >
        <slot name="before" />
      </template>
      <template #append>
        <div class="inline">
          <q-btn
            flat
            dense
            icon="mdi-calendar"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="datePopupProxyRef"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="localValue"
                :mask="localDateMask"
                :options="filterPickDate"
                today-btn
                @input="onDateInput"
              />
            </q-popup-proxy>
          </q-btn>
        </div>
        <div class="inline">
          <q-btn
            flat
            dense
            icon="mdi-clock"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="timePopupProxyRef"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="localValue"
                :mask="localDateMask"
                :options="filterPickTime"
                :format24h="format24h"
                :with-seconds="withSeconds"
                @input="onTimeInput"
              />
            </q-popup-proxy>
          </q-btn>
        </div>
      </template>
      <template
        v-if="$slots.after"
        #after
      >
        <slot name="after" />
      </template>
      <template
        v-if="$slots.hint"
        #hint
      >
        <slot name="hint" />
      </template>
    </q-input>
  </div>
</template>

<script>
import dayjs from 'dayjs';

const defaultMask = '####-##-## ##:##:##';
const defaultDateMask = 'YYYY-MM-DD HH:mm:ss';
const noSecondsDefaultMask = '####-##-## ##:##';
const noSecondsDefaultDateMask = 'YYYY-MM-DD HH:mm';

export default {
  name: 'DatetimePicker',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    mask: {
      type: String,
      default: ''
    },
    datemask: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    bottomSlots: {
      type: Boolean,
      default: false
    },
    max: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    withSeconds: {
      type: Boolean,
      default: false
    },
    format24h: {
      type: Boolean,
      default: true
    },
    stackLabel: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localMask: this.mask || (this.withSeconds ? defaultMask : noSecondsDefaultMask),
      localDateMask: this.datemask || (this.withSeconds
        ? defaultDateMask
        : noSecondsDefaultDateMask),
      localValue: null
    };
  },
  computed: {
    datePopupProxyRef() {
      return this.$refs.datePopupProxyRef;
    },
    inputRef() {
      return this.$refs.inputRef;
    },
    timePopupProxyRef() {
      return this.$refs.timePopupProxyRef;
    },
    maxTime() {
      return this.max && dayjs(this.max);
    },
    minTime() {
      return this.min && dayjs(this.min);
    }
  },
  watch: {
    value: {
      deep: false,
      immediate: true,
      handler() {
        this.localValue = this.value;
      }
    }
  },
  methods: {
    clear() {
      this.localValue = null;
      this.emitInput();
    },
    /** qinput reset */
    resetValidation() {
      this.inputRef.resetValidation();
    },
    inRange(d, unit = 'd') {
      const max = this.maxTime;
      const min = this.minTime;

      return (
        (max ? d.isBefore(max, unit) || d.isSame(max, unit) : true)
        && (min ? d.isAfter(min, unit) || d.isSame(min, unit) : true)
      );
    },
    /** 過濾出可以選擇的日期 */
    filterPickDate(date) {
      return this.inRange(dayjs(date));
    },
    /** 過濾出可以選擇的時間 */
    filterPickTime(hr, min, sec) {
      let unit = 's';

      switch (true) {
        case this.isNumber(hr) && this.isNullOrUndefined(min) && this.isNullOrUndefined(sec):
          unit = 'h';
          break;
        case this.isNumber(hr) && this.isNumber(min) && this.isNullOrUndefined(sec):
          unit = 'm';
          break;
        default:
          break;
      }

      return this.inRange(
        dayjs(this.value)
          .hour(hr)
          .minute(min)
          .second(sec),
        unit
      );
    },
    /** 打字方式輸入 */
    onTypeInput() {
      this.emitInput();
    },
    /** 日期pick */
    onDateInput() {
      this.datePopupProxyRef.hide();
      this.emitInput();
    },
    /** 時間pick */
    onTimeInput() {
      this.timePopupProxyRef.hide();
      this.emitInput();
    },
    emitInput() {
      return this.$emit('input', [...this.localValue]);
    },
    isNumber(val) {
      return (typeof val === 'number');
    },
    isNullOrUndefined(val) {
      return (val === null || val === 'undefined');
    }
  }
};
</script>
