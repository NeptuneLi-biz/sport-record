<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="onSubmit()"
    @reset="onReset()"
  >
    <div class="col-12 row q-col-gutter-md">
      <div class="col-1">
        <InputField
          label="序號"
          :text="sportTypeId.toString()"
          :disable="true"
        />
      </div>
      <div class="col-11 col-md-6">
        <!-- TODO: rules 必填 -->
        <InputField
          label="運動名稱"
          :text.sync="query.SportName"
        />
      </div>
    </div>
    <SubmitButton />
  </q-form>
</template>

<script>
import InputField from 'components/global/InputField.vue';
import SubmitButton from 'components/global/SubmitButton.vue';
// TODO: ../.. 要有 @ webpack 的設定
import sportItemService from '../../services/sportItem.service';
import notifyLib from '../../lib/notify.lib';

const defaultQuery = {
  SportTypeId: 0,
  SportName: ''
};

export default {
  name: 'SportItemEdit',
  components: {
    InputField,
    SubmitButton
  },
  props: {
    sportTypeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localSportName: '',
      query: defaultQuery,
      defaultQuery
    };
  },
  created() {
    this.onReset();
    this.fetchData();
  },
  methods: {
    async fetchData(id = this.sportTypeId) {
      const data = await (await sportItemService.get(id)).data;

      this.query = { ...data };
      this.defaultQuery = { ...data };
    },
    onSubmit() {
      // TODO: 用 notifyLib 來包裝確定是否修改
      if (this.query.SportTypeId === 0) {
        this.add();
      } else {
        this.edit();
      }
    },
    onReset() {
      this.query = { ...this.defaultQuery };
    },
    async add() {
      const data = await (await sportItemService.add(this.query)).data;

      if (data.Success) {
        this.$q.notify(notifyLib.Success('新增成功'));
        this.$router.push({ name: 'SportItemTable' });
      } else {
        this.$q.notify(notifyLib.Error('新增失敗'));
      }
    },
    async edit() {
      const data = await (await sportItemService.edit(this.query)).data;

      if (data.Success) {
        this.$q.notify(notifyLib.Success('更新成功'));
        this.$router.push({ name: 'SportItemTable' });
      } else {
        this.$q.notify(notifyLib.Error('更新失敗'));
      }
    }
  }
};
</script>
