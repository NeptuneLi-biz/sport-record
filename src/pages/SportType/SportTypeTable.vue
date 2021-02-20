<template>
  <div class="q-pa-md">
    <q-table
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
              params: { TypeId: props.row.Id }
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
    Name: '引體向上'
  },
  {
    Id: 2,
    Name: '二頭彎舉'
  },
  {
    Id: 3,
    Name: '前胸臥推'
  },
  {
    Id: 4,
    Name: '雙臂划船'
  }
];

export default {
  name: 'SportTypeTable',
  data() {
    return {
      data,
      tableColumns
    };
  }
};
</script>
