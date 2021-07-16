import vue from 'vue';
import dayjs from 'dayjs';
import * as rule from 'src/makers/rule.maker';
import {
  Color,
  timeFormat,
  dateFormat,
  dateTimeFormat
} from '../const/common.const';

function dateFilter(value, format) {
  const d = dayjs(value);

  return d.isValid() ? d.format(format) : value;
}

vue.filter('dateTime', (value, format = dateTimeFormat) => dateFilter(value, format));
vue.filter('date', (value, format = dateFormat) => dateFilter(value, format));
vue.filter('time', (value, format = timeFormat) => dateFilter(value, format));

vue.prototype.$color = Color;
vue.prototype.$page = [25, 50, 100, 200, 0];
// vue.prototype.$dateTime = (value) => dateFilter(value);
vue.prototype.$dateTime = 1;
vue.prototype.$rule = rule;
