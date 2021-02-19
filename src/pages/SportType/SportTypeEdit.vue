<template>
  <div>
    <div class="col-12 col-md-6">
      <InputField
        label="運動名稱"
        :text="sportName"
      />
    </div>
    <SubmitButton />
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
      sportName: ''
    };
  }
};
</script>
