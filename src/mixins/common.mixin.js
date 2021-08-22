import { periodOptions } from 'src/const/common.const';

const mixin = {
  methods: {
    findPeriodName(id) {
      return periodOptions.find((option) => option.value === id)?.label ?? id;
    }
  }
};

export default mixin;
