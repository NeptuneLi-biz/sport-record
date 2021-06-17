<template>
  <div>
    <q-input
      ref="input"
      class="daterange"
      :label="label"
      :stack-label="stackLabel"
      :value="rangeValue"
      :bottom-slots="bottomSlots"
      :dense="dense"
      :filled="filled"
      :hint="hint"
      readonly
    >
      <template
        v-if="$slots.before"
        #before
      >
        <slot name="before" />
      </template>
      <template #append>
        <q-btn
          flat
          dense
          icon="mdi-calendar-multiple"
        >
          <!-- <q-tooltip>{{ startText }}</q-tooltip> -->
          <q-popup-proxy
            ref="popupRef"
            transition-show="scale"
            transition-hide="scale"
          >
            <div class="flex items-center">
              <q-date
                v-model="localRangeDate[0]"
                :title="startText"
                class="no-box-shadow"
                :mask="dateFormat"
                :options="validateStartDateTime"
                today-btn
                square
                @input="onStartInput"
              />
              <q-separator vertical />
              <q-date
                v-model="localRangeDate[1]"
                :title="endText"
                class="no-box-shadow"
                :mask="dateFormat"
                :options="validateEndDateTime"
                today-btn
                square
                @input="onEndInput"
              />
            </div>
          </q-popup-proxy>
        </q-btn>
        <!-- clear button -->
        <q-btn
          v-if="clearable && rangeValue"
          flat
          dense
          :icon="clearIcon"
          @click="onClear"
        />
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
import { dateFormat } from '../../const/common.const';

export default {
  name: 'DateRangePicker',
  model: {
    prop: 'range',
    event: 'input'
  },
  props: {
    range: {
      type: Array,
      default: null
    },
    mask: {
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
    stackLabel: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '日期區間'
    },
    minDate: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: ''
    },
    startText: {
      type: String,
      default: '開始日期'
    },
    endText: {
      type: String,
      default: '結束日期'
    },
    bottomSlots: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: true
    },
    clearIcon: {
      type: String,
      default: 'mdi-close-circle'
    },
    joiner: {
      type: String,
      default: '~'
    },
    hint: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localRangeDate: [...this.range],
      rangeValue: '',
      dateFormat
    };
  },
  computed: {
    popupRef() {
      return this.$refs.popupRef;
    },
    inputRef() {
      return this.$refs.input;
    },
    endPopupRef() {
      return this.$refs.endPopupRef;
    }
  },
  watch: {
    range: {
      deep: true,
      immediate: true,
      handler() {
        this.localRangeDate = [...this.range];
        this.asyncRangeValue();
      }
    }
  },
  methods: {
    filterProps(...ignoreKey) {
      const localProps = {};

      return Object.keys(this.$props)
        .filter((propName) => !ignoreKey.includes(propName))
        .reduce((acc, propName) => {
          acc[propName] = this.$props[propName];
          return acc;
        }, localProps);
    },

    /** 將 localRangeDate 的數值實際渲染到 input 裡 */
    asyncRangeValue() {
      const start = this.localRangeDate[0];
      const end = this.localRangeDate[1];
      const joiner = start && end ? this.joiner : '';

      this.rangeValue = `${start || ''} ${joiner} ${end || ''}`.trim();

      this.$forceUpdate();
    },

    emitInput() {
      return this.$emit('input', [...this.localRangeDate]);
    },

    /** 過濾日期區間 Start - 不能大於今天 & 不能大於結束時間 */
    validateStartDateTime(date, end = this.range[1]) {
      const unit = 'd';
      const now = dayjs();
      const d = dayjs(date);
      const { minDate } = this;

      return (
        !now.isBefore(d, unit)
        && (end ? !d.isAfter(end, unit) : true)
        && (minDate ? !d.isBefore(minDate) : true)
      );
    },

    /** 過濾日期區間 End - 不能大於今天 & 不能小於開始時間 */
    validateEndDateTime(date, start = this.range[0]) {
      const unit = 'd';
      const now = dayjs();
      const d = dayjs(date);
      const { maxDate } = this;

      return (
        !now.isBefore(d, unit)
        && (start ? !d.isBefore(start, unit) : true)
        && (maxDate ? !d.isAfter(maxDate) : true)
      );
    },

    /** 當日期輸入 */
    onStartInput() {
      // this.popupRef.hide();
      this.emitInput();
      this.asyncRangeValue();
    },

    onEndInput() {
      // this.popupRef.hide();
      this.emitInput();
      this.asyncRangeValue();
    },

    onClear() {
      this.localRangeDate = [null, null];
      this.emitInput();
      this.asyncRangeValue();
    }
  }
};
</script>
