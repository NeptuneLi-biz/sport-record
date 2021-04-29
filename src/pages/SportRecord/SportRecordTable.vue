<template>
  <div class="q-pa-md">
    <div class="col-12 bg-grey-1">
      <q-form
        class="common-form"
        @submit="search()"
        @reset="clearQuery()"
      >
        <div class="row q-pad-md">
          <div class="col-12 col-sm-6 col-md-3 common-input">
            <q-input
              v-model="query.SportName"
              filled
              label="運動名稱"
              dense
            />
          </div>
        </div>
        <div
          class="col-12 col-md-6"
          style="max-width: 300px;"
        >
          <DataRangePicker
            v-model="dataRangeModel"
            dense
            filled
          />
        </div>
      </q-form>
    </div>
    <q-separator />
    <q-table
      :data="data"
      :columns="tableColumns"
      row-key="Index"
    >
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
import DataRangePicker from '../../components/global/DateRangePicker.vue';
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
    name: 'CreateDate',
    field: 'CreateDate',
    label: '建立日期',
    align: 'center',
    style: 'width: 10%;'
  }
];
const data = [];
const defaultQuery = {
  SportName: '',
  StartDate: null,
  EndDate: null
};

export default {
  name: 'SportRecordTable',
  components: {
    DataRangePicker
  },
  data() {
    return {
      data,
      tableColumns,
      query: defaultQuery
    };
  },
  computed: {
    dataRangeModel: {
      get: function() {
        return [
          this.query.CreateDateTimeStart
            ? this.query.CreateDateTimeStart.format(dateFormat)
            : null,
          this.query.CreateDateTimeEnd
            ? this.query.CreateDateTimeEnd.format(dateFormat)
            : null
        ]
      },
      set: function([start, end]) {
        this.query.CreateDateTimeStart = start ? dayjs(start) : null;
        this.query.CreateDateTimeEnd = end ? dayjs(end) : null;
      }
    }
  },
  created() {
    this.fetchData();
  },
  // TODO: 儲存 or 修改的時候這邊還要在刷新一次
  methods: {
    async fetchData() {
      this.data = await (await sportRecordService.getMany()).data;
    }
  }
};
</script>
