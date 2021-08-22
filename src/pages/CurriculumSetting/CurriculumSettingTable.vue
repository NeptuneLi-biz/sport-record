<template>
  <div>
    <q-card-section class="q-pa-md q-mb-md bg-grey-2">
      <q-form
        class="row common-form q-col-gutter-md"
        @submit="search()"
        @reset="reset()"
      >
        <div class="col-12 q-pa-sm">
          <q-btn
            size="md"
            flat
            icon="exposure_plus_1"
            :to="{
              name: 'CurriculumSettingEdit',
              params: { sportTypeId: 0 }
            }"
            label="新增"
            :color="$color.Positive"
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
          <SubmitButton
            icon="search"
            label="搜尋"
            size="md"
          />
        </div>
      </q-form>
    </q-card-section>
    <q-table
      :data="tableData"
      :columns="tableColumns"
      :rows-per-page-options="$page"
      row-key="Id"
    >
      <template #body-cell-SportTypeId="props">
        <q-td :props="props">
          {{ findSportTypeName(props.row.SportTypeId) }}
        </q-td>
      </template>
      <template #body-cell-PeriodId="props">
        <q-td :props="props">
          {{ findPeriodName(props.row.PeriodId) }}
        </q-td>
      </template>
      <template #body-cell-Operating="props">
        <q-td :props="props">
          <q-item
            clickable
            :to="{
              name: 'CurriculumSettingEdit',
              params: { curriculumId: props.row.CurriculumId }
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
  </div>
</template>

<script>
import debounce from 'debounce-promise';
import notifyLib from 'src/lib/notify.lib';
import curriculumService from 'src/services/curriculumSetting.service';
import commonMixin from 'src/mixins/common.mixin';
import SubmitButton from '../../components/global/SubmitButton.vue';

const tableColumns = [
  {
    name: 'SportTypeId',
    field: 'SportTypeId',
    label: '運動名稱',
    align: 'center'
  },
  {
    name: 'Sets',
    field: 'Sets',
    label: '組數',
    align: 'center'
  },
  {
    name: 'PeriodId',
    field: 'PeriodId',
    label: '頻率',
    align: 'center'
  },
  {
    name: 'Day',
    field: 'Day',
    label: '第幾天',
    align: 'center'
  },
  {
    name: 'TargetWeight',
    field: 'TargetWeight',
    label: '目標重量',
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

const tableData = [];

const defaultQuery = {
  SportTypeId: null
};

export default {
  name: 'CurriculumSettingTable',
  components: {
    SubmitButton
  },
  mixins: [commonMixin],
  data() {
    return {
      tableData,
      tableColumns,
      query: { ...defaultQuery }
    };
  },
  created() {
    this.fetchData();
  },
  // TODO 儲存 or 修改的時候這邊還要在刷新一次
  methods: {
    debounceFetchData() {
      debounce(() => {
        this.fetchData();
      }, 500)();
    },
    search() {
      this.debounceFetchData();
    },
    async fetchData(query = this.query) {
      this.tableData = await (await curriculumService.getMany(query)).data;
    },
    findSportTypeName(id) {
      return this.$store.getters['commonModule/findSportTypeName'](id);
    },
    confirmDelete(item) {
      this.$q.notify(
        notifyLib.Error({
          message: `確定要刪除 ${this.findSportTypeName(item.SportTypeId)} 嗎 ？`,
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
      const postData = { CurriculumId: item.CurriculumId };
      const { data } = (await curriculumService.delete(postData));

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
