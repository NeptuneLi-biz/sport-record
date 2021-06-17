<template>
  <div>
    <div class="bg-grey-1 q-pa-md">
      <q-form
        class="row common-form q-col-gutter-md"
        @submit="search()"
        @reset="reset()"
      >
        <div class="col-12 col-md-6 col-lg-3">
          <q-input
            v-model="query.SportName"
            filled
            label="運動名稱"
            dense
          />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <DataRangePicker
            v-model="dataRangeModel"
            dense
            filled
          />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <SubmitButton
            icon="search"
            label="搜尋"
            size="md"
          />
        </div>
      </q-form>
    </div>
    <q-separator />
    <q-table
      :data="data"
      :columns="tableColumns"
      :rows-per-page-options="$page"
      row-key="Index"
    >
      <template #body-cell-CreateDateTime="props">
        <q-td :props="props">
          {{ props.row.CreateDateTime | dateTime }}
        </q-td>
      </template>
      <template #body-cell-Operating="props">
        <q-td :props="props">
          <q-item
            clickable
            :to="{
              name: 'SportTypeEdit',
              params: { typeId: props.row.Id, sportName: props.row.Name }
            }"
          >
            <q-item-section side>
              <q-icon
                name="edit"
                size="xs"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>編輯</q-item-label>
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import debounce from 'debounce-promise';
import { extend } from 'quasar';
import DataRangePicker from '../../components/global/DateRangePicker.vue';
import SubmitButton from '../../components/global/SubmitButton.vue';
import { dateFormat } from '../../const/common.const';
import sportRecordService from '../../services/sportRecord.service';

const tableColumns = [
  {
    name: 'Date',
    field: 'Date',
    label: '日期',
    align: 'center'
  },
  {
    name: 'SportName',
    field: 'SportName',
    label: '運動名稱',
    align: 'center'
  },
  {
    name: 'TargetWeight',
    field: 'TargetWeight',
    label: '目標重量',
    align: 'center'
  },
  {
    name: 'Set',
    field: 'Set',
    label: '第幾組',
    align: 'center'
  },
  {
    name: 'Weight',
    field: 'Weight',
    label: '重量',
    align: 'center'
  },
  {
    name: 'Reps',
    field: 'Reps',
    label: '次數',
    align: 'center'
  },
  {
    name: 'Note',
    field: 'Note',
    label: '備註',
    align: 'center'
  },
  {
    name: 'CreateDateTime',
    field: 'CreateDateTime',
    label: '建立日期',
    align: 'center',
    style: 'width: 10%;'
  }
];
const data = [];
const today = dayjs();
const defaultQuery = {
  SportName: '',
  // 預設顯示本週資料
  StartDate: today.startOf('week').add(1, 'day').format(dateFormat),
  EndDate: today.endOf('day').format(dateFormat)
};

export default {
  name: 'SportRecordTable',
  components: {
    DataRangePicker,
    SubmitButton
  },
  data() {
    return {
      data,
      tableColumns,
      query: extend(true, {}, defaultQuery)
    };
  },
  computed: {
    dataRangeModel: {
      get() {
        return [
          this.query.StartDate
            ? this.query.StartDate
            : null,
          this.query.EndDate
            ? this.query.EndDate
            : null
        ];
      },
      set([start, end]) {
        this.query.StartDate = start ? dayjs(start).format(dateFormat) : null;
        this.query.EndDate = end ? dayjs(end).format(dateFormat) : null;
      }
    }
  },
  created() {
    this.fetchData();
  },
  // TODO: 儲存 or 修改的時候這邊還要在刷新一次
  methods: {
    debounceFetchData() {
      debounce(() => {
        this.fetchData();
      }, 500)();
    },
    async search() {
      await this.debounceFetchData();
    },
    async fetchData(query = this.query) {
      this.data = await (await sportRecordService.getMany(query)).data;
    },
    reset() {
      this.query = extend(true, {}, defaultQuery);
    }
  }
};
</script>
