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
    <!-- <q-table
      :data="data"
      :columns="tableColumns"
      row-key="Id"
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
    </q-table> -->
  </div>
</template>

<script>
import dayjs from 'dayjs';
import DataRangePicker from '../../components/global/DateRangePicker.vue';
import { dateFormat } from '../../const/common.const';

const tableColumns = [
  {
    name: 'Id',
    field: 'Id',
    label: '序號',
    align: 'center',
    classes: 'bg-grey-2 ellipsis',
    style: 'width: 15%;'
  },
  {
    name: 'Name',
    field: 'Name',
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
    name: 'TargetSet',
    field: 'TargetSet',
    label: '目標組數',
    align: 'center'
  },
  {
    name: 'Note',
    field: 'Note',
    label: '備註',
    align: 'center'
  },
  {
    name: 'Operating',
    field: 'Operating',
    label: '操作',
    align: 'center',
    style: 'width: 5%;'
  }
];
const data = [
  {
    Id: 1,
    Name: '引體向上',
    TargetWeight: 12,
    TargetSet: 3,
    Note: ''
  },
  {
    Id: 2,
    Name: '二頭彎舉',
    TargetWeight: 10,
    TargetSet: 3,
    Note: ''
  },
  {
    Id: 3,
    Name: '前胸臥推',
    TargetWeight: 12,
    TargetSet: 3,
    Note: ''
  },
  {
    Id: 4,
    Name: '雙臂划船',
    TargetWeight: 8,
    TargetSet: 3,
    Note: '這裡是備註ㄏㄏ'
  }
];
const defaultQuery = {
  SportName: 'test',
  CreateDateTimeStart: null,
  CreateDateTimeEnd: null
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
  }
};
</script>
