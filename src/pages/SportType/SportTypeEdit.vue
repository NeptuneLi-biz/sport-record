<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="onSubmit()"
    @reset="onReset()"
  >
    <div class="col-1">
      <InputField
        label="序號"
        :text="typeId.toString()"
        :disable="true"
      />
    </div>
    <div class="col-11 col-md-6">
      <InputField
        label="運動名稱"
        :text.sync="localSportName"
      />
    </div>
    <SubmitButton />
  </q-form>
</template>

<script>
import InputField from 'components/global/InputField.vue';
import SubmitButton from 'components/global/SubmitButton.vue';

export default {
  name: 'SportTypeEdit',
  components: {
    InputField,
    SubmitButton
  },
  // TODO: 之後要用 API 抓取非 typeId 的所有資料、以確保隨時拿到DB最新的資料
  props: {
    typeId: {
      type: Number,
      default: 0
    },
    sportName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localSportName: this.sportName
    };
  },
  methods: {
    onSubmit(id = this.typeId) {
      // TODO: 修改送出
      console.log(id);
    },
    onReset() {
      this.localSportName = this.sportName;
    }
  }
};
</script>
