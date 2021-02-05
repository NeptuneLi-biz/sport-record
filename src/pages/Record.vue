<template>
  <div class="q-pa-md row q-col-gutter-md">
    <div class="col-12">
      <q-list
        v-for="(item, listIndex) in items"
        :key="`list${listIndex}`"
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          icon="mdi-handball"
          :label="item.title"
          :default-opened="listIndex === 0"
          group="somegroup"
        >
          <q-table
            :data="item.data"
            :columns="columns"
            row-key="name"
            hide-bottom
          >
            <template #body="props">
              <q-tr
                :props="props"
                :class="{ 'bg-blue-2': props.row.Check }"
              >
                <q-td
                  key="Sets"
                  :props="props"
                >
                  {{ props.row.Sets }}
                </q-td>
                <q-td
                  key="Weight"
                  :props="props"
                >
                  {{ props.row.Weight }}
                  <q-popup-edit
                    v-model="props.row.Weight"
                    :disable="props.row.Check"
                    buttons
                  >
                    <q-input
                      v-model.number="props.row.Weight"
                      type="number"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
                <q-td
                  key="Reps"
                  :props="props"
                >
                  {{ props.row.Reps }}
                  <q-popup-edit
                    v-model="props.row.Reps"
                    :disable="props.row.Check"
                    buttons
                  >
                    <q-input
                      v-model="props.row.Reps"
                      type="number"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
                <q-td
                  key="Note"
                  :props="props"
                >
                  <div class="text-pre-wrap">
                    {{ props.row.Note }}
                  </div>
                  <q-popup-edit v-model="props.row.Note">
                    <q-input
                      v-model="props.row.Note"
                      :disable="props.row.Check"
                      type="textarea"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
                <q-td
                  key="Check"
                  :props="props"
                >
                  <q-btn
                    round
                    :color="props.row.Check ? 'primary' : 'grey-4'"
                    icon="mdi-check-circle"
                    @click="changeCheckColor(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="col-12">
      <SubmitButton />
    </div>
  </div>
</template>

<script>
import SubmitButton from 'components/global/SubmitButton.vue';

export default {
  name: 'Record',
  components: {
    SubmitButton
  },
  data() {
    return {
      // TODO: items 改寫成透過 API 抓取資料
      items: [
        {
          title: '啞鈴划船',
          rep: 3,
          data: [
            {
              Sets: 1,
              Weight: 10,
              Reps: 12,
              Checkte: '',
              Check: false
            },
            {
              Sets: 2,
              Weight: 9,
              Reps: 12,
              Checkte: '',
              Check: false
            },
            {
              Sets: 3,
              Weight: 9,
              Reps: 12,
              Checkte: '',
              Check: false
            }
          ]
        },
        {
          title: '槓鈴硬舉',
          rep: 3,
          data: [{ Weight: 10, Reps: 12, Note: '' }]
        },
        {
          title: '二頭彎舉',
          rep: 3,
          data: [{ Weight: 10, Reps: 12, Note: '' }]
        },
        { title: '單槓', rep: 3, data: [{ Weight: 10, Reps: 12, Note: '' }] }
      ],
      columns: [
        {
          name: 'Sets',
          field: 'Sets',
          label: '組數',
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
          label: 'Reps',
          align: 'center'
        },
        {
          name: 'Note',
          field: 'Note',
          label: '備註',
          align: 'center'
        },
        {
          name: 'Check',
          field: 'Check',
          label: '是否完成',
          align: 'center'
        }
      ]
    };
  },
  methods: {
    changeCheckColor(item) {
      item.Check = !item.Check;
    }
  }
};
</script>
