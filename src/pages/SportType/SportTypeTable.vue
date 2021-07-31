<template>
  <div>
    <q-card-section class="q-pa-md q-mb-md bg-grey-2">
      <q-form class="common-form">
        <div class="row">
          <div class="col-12 q-pa-sm">
            <q-btn
              size="md"
              flat
              icon="exposure_plus_1"
              :to="{
                name: 'SportTypeEdit',
                params: { sportTypeId: 0 }
              }"
              label="新增"
              :color="$color.Positive"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-table
      :data="data"
      :columns="tableColumns"
      :rows-per-page-options="$page"
      row-key="Id"
    >
      <template #body-cell-Operating="props">
        <q-td :props="props">
          <q-item
            clickable
            :to="{
              name: 'SportTypeEdit',
              params: { sportTypeId: props.row.SportTypeId }
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
import sportItemService from '../../services/sportItem.service';

const tableColumns = [
  {
    name: 'SportTypeId',
    field: 'SportTypeId',
    label: '序號',
    align: 'center',
    classes: 'bg-grey-2 ellipsis',
    style: 'width: 15%;'
  },
  {
    name: 'SportName',
    field: 'SportName',
    label: '運動名稱',
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

const data = [];

export default {
  name: 'SportTypeTable',
  data() {
    return {
      data,
      tableColumns
    };
  },
  created() {
    this.fetchData();
  },
  // TODO: 儲存 or 修改的時候這邊還要在刷新一次
  methods: {
    async fetchData() {
      this.data = await (await sportItemService.getMany()).data;
    }
  }
};
</script>
