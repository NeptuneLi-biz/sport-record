<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-1">
        <InputField
          label="序號"
          :text="Id"
          :disable="true"
        />
      </div>
      <div class="col-11 col-md-6">
        <InputField
          label="運動名稱"
          :text="sportName"
        />
      </div>
      <SubmitButton />
    </div>
  </div>
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
  data() {
    return {
      Id: 0,
      sportName: ''
    };
  }
};
</script>
