<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="onSubmit()"
    @reset="onReset()"
  >
    <div class="col-12 row q-col-gutter-md">
      <!-- TODO 三個要下拉選單，要寫在 vuex 共用 -->
      <q-select
        v-model="query.SportTypeId"
        class="col-4"
        filled
        label="運動名稱"
        dense
        emit-value
        map-options
        :options="sportTypeOptions"
      />
      <q-input
        v-model.number="query.Sets"
        class="col-4"
        filled
        label="組數"
        dense
      />
      <q-select
        v-model="query.PeriodId"
        class="col-4"
        filled
        label="頻率"
        dense
        emit-value
        map-options
        :options="periodOptions"
      />
      <q-input
        v-model.number="query.Day"
        class="col-4"
        filled
        label="第幾天"
        dense
      />
      <q-input
        v-model.number="query.TargetWeight"
        class="col-4"
        filled
        label="目標重量"
        dense
      />
    </div>
    <SubmitButton />
  </q-form>
</template>

<script>
import SubmitButton from 'components/global/SubmitButton.vue';
import { mapGetters } from 'vuex';
import { periodOptions } from 'src/const/common.const';
import notifyLib from 'src/lib/notify.lib';
import curriculumService from 'src/services/curriculumSetting.service';

const defaultQuery = {
  CurriculumId: null,
  SportTypeId: null,
  Sets: 0,
  PeriodId: null,
  Day: 0,
  TargetWeight: 0
};

export default {
  name: 'CurriculumSettingEdit',
  components: {
    SubmitButton
  },
  // TODO 之後要用 API 抓取非 typeId 的所有資料、以確保隨時拿到DB最新的資料
  props: {
    curriculumId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      localSportName: this.sportName,
      query: { ...defaultQuery },
      periodOptions
    };
  },
  computed: {
    ...mapGetters('commonModule', ['sportTypeOptions'])
  },
  created() {
    if (this.curriculumId) {
      this.getCurriculumData();
    }
  },
  methods: {
    onSubmit(id = this.curriculumId) {
      if (id) {
        this.edit();
      } else {
        this.add();
      }
    },
    onReset() {
      this.query = { ...this.defaultQuery };
    },
    async add() {
      const { data } = await curriculumService.add(this.query);

      if (data.Success) {
        this.$q.notify(notifyLib.Success('新增成功'));
        this.$router.push({ name: 'CurriculumSettingTable' });
      } else {
        this.$q.notify(notifyLib.Error('新增失敗'));
      }
    },
    async edit() {
      const { data } = await curriculumService.edit(this.query);

      if (data.Success) {
        this.$q.notify(notifyLib.Success('更新成功'));
        this.$router.push({ name: 'CurriculumSettingTable' });
      } else {
        this.$q.notify(notifyLib.Error('更新失敗'));
      }
    },
    async getCurriculumData(id = this.curriculumId) {
      const postData = { CurriculumId: id };
      // TODO 載入中的動畫
      const { data } = await curriculumService.get(postData);

      this.defaultQuery = { ...data };
      this.query = { ...data };
    }
  }
};
</script>
