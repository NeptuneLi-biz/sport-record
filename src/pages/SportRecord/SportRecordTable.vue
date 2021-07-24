<template>
  <div>
    <div class="bg-grey-1 q-pa-md">
      <q-form
        class="row common-form q-col-gutter-md"
        @submit="search()"
        @reset="reset()"
      >
        <div class="col-12">
          <q-btn
            size="md"
            flat
            icon="exposure_plus_1"
            :label="dialogStatus.title"
            :color="$color.Positive"
            @click="openDialog()"
          />
        </div>
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
      :data="tableData"
      :columns="tableColumns"
      :rows-per-page-options="$page"
      row-key="Index"
    >
      <template #body-cell-CreateDateTime="props">
        <q-td :props="props">
          {{ props.row.CreateDateTime | dateTime }}
        </q-td>
      </template>
      <template #body-cell-ModifyDateTime="props">
        <q-td :props="props">
          {{ props.row.ModifyDateTime | dateTime }}
        </q-td>
      </template>
      <template #body-cell-Operating="props">
        <q-td :props="props">
          <q-item
            clickable
            @click="openDialog(props.row)"
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
          <q-item
            clickable
            @click="confirmDelete(props.row)"
          >
            <q-item-section side>
              <q-icon
                name="mdi-delete"
                size="xs"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>刪除</q-item-label>
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>

    <!-- 新增 -->
    <ContentDialog
      :is-opening="dialogStatus.isOpenDialog"
      :title="'新增一筆'"
      :width="'40vw'"
      :height="'60vh'"
      @cancel="dialogStatus.isOpenDialog = false"
      @confirm="onSubmit()"
    >
      <template slot="body">
        <q-form
          ref="postDataRef"
          class="common-form row"
        >
          <div class="col-12">
            <!-- TODO: 全部要增加 rule required -->

            <!-- TODO: v-model 的值還沒有搞好 -->
            <!-- <DateTimePicker
              v-model="postData.Date"
              stack-label
              dense
              filled
              :label="'日期'"
            /> -->
            <q-input
              v-model.number="postData.Date"
              required
              :label="'日期'"
            />
          </div>
          <div class="col-12">
            <q-select
              v-model="postData.SportTypeId"
              map-options
              emit-value
              :label="'運動類型'"
              :options="sportTypeOptions"
              :option-value="(item) => item.SportTypeId"
              :option-label="(item) => item.SportName"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="postData.TargetWeight"
              required
              :label="'目標重量'"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="postData.Set"
              :label="'第幾組'"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="postData.Weight"
              :label="'重量'"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="postData.Reps"
              :label="'次數'"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="postData.Note"
              type="textarea"
              :label="'備註'"
            />
          </div>
        </q-form>
      </template>
    </ContentDialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import debounce from 'debounce-promise';
import { extend } from 'quasar';
import {
  dateFormat,
  dateNoDashFormat
} from 'src/const/common.const';
import DataRangePicker from '../../components/global/DateRangePicker.vue';
// import DateTimePicker from '../../components/global/DatetimePicker.vue';
import SubmitButton from '../../components/global/SubmitButton.vue';
import ContentDialog from '../../components/dialog/Content.dialog.vue';
import notifyLib from '../../lib/notify.lib';
import sportRecordService from '../../services/sportRecord.service';
import sportItemService from '../../services/sportItem.service';

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
  },
  {
    name: 'ModifyDateTime',
    field: 'ModifyDateTime',
    label: '修改日期',
    align: 'center',
    style: 'width: 10%;'
  },
  {
    name: 'Operating',
    field: 'Operating',
    label: '操作',
    align: 'center'
  }
];
const tableData = [];
const today = dayjs();
const defaultQuery = {
  SportName: '',
  // 預設顯示本週資料
  StartDate: today.startOf('week').add(1, 'day').format(dateFormat),
  EndDate: today.endOf('day').format(dateFormat)
};
const defaultPostData = {
  Date: today.clone().startOf('day').format(dateNoDashFormat),
  SportTypeId: 0,
  TargetWeight: null,
  Set: null,
  Weight: null,
  Reps: null,
  Note: ''
};

export default {
  name: 'SportRecordTable',
  components: {
    DataRangePicker,
    // DateTimePicker,
    SubmitButton,
    ContentDialog
  },
  data() {
    return {
      tableData,
      tableColumns,
      query: extend(true, {}, defaultQuery),
      postData: extend(true, {}, defaultPostData),
      sportTypeOptions: [],
      dialogStatus: {
        title: '新增',
        isOpenDialog: false,
        isEdit: false
      }
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
  watch: {
    'dialogStatus.isOpenDialog': {
      deep: false,
      immediate: true,
      handler(isOpen) {
        if (isOpen) {
          return;
        }
        this.postData = extend(true, {}, defaultPostData);
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
      this.tableData = await (await sportRecordService.getMany(query)).data;
    },
    reset() {
      this.query = extend(true, {}, defaultQuery);
    },
    async openDialog(item) {
      // TODO: 這裡要改寫到 Vuex 來共用 sportType
      this.sportTypeOptions = await (await sportItemService.getMany()).data;

      if (item) {
        this.postData = extend(true, {}, item);
        this.dialogStatus.isEdit = true;
        this.dialogStatus.title = '修改';
      } else {
        this.dialogStatus.isEdit = false;
        this.dialogStatus.title = '新增';
      }
      this.dialogStatus.isOpenDialog = true;
    },
    onSubmit() {
      this.$refs.postDataRef.validate().then(async (success) => {
        if (!success) {
          return;
        }
        if (this.dialogStatus.isEdit) {
          const data = await (await sportRecordService.edit(this.postData)).data;

          if (data.Success) {
            this.$q.notify(notifyLib.Success('修改成功'));
            this.postData = extend(true, {}, defaultPostData);
            this.dialogStatus.isOpenDialog = false;
            this.debounceFetchData();
          } else {
            this.$q.notify(notifyLib.Error('修改失敗'));
            this.$q.notify(notifyLib.Error(data.Data));
          }
        } else {
          const data = await (await sportRecordService.add([this.postData])).data;

          if (data.Success) {
            this.$q.notify(notifyLib.Success('新增成功'));
            this.postData = extend(true, {}, defaultPostData);
            this.dialogStatus.isOpenDialog = false;
            this.debounceFetchData();
          } else {
            this.$q.notify(notifyLib.Error('新增失敗'));
            this.$q.notify(notifyLib.Error(data.Data));
          }
        }
      });
    },
    confirmDelete(item) {
      this.$q.notify(
        notifyLib.Error({
          message: `確定要刪除 ${item.SportName} 的組數 ${item.Reps} 嗎 ？`,
          html: true,
          timeout: 3000,
          position: 'bottom',
          actions: [
            {
              label: '刪除',
              color: 'white',
              handler: () => {
                this.deleteRecord(item);
              }
            }
          ]
        })
      );
    },
    async deleteRecord(item) {
      const postData = { Id: item.Id };
      const data = await (await sportRecordService.delete(postData)).data;

      if (data.Success) {
        this.$q.notify(notifyLib.Success('刪除成功'));
        this.debounceFetchData();
      } else {
        this.$q.notify(notifyLib.Error('刪除失敗'));
        this.$q.notify(notifyLib.Error(data.Data));
      }
    }
  }
};
</script>
