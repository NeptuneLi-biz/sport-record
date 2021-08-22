import sportItemService from 'src/services/sportItem.service';

export default {
  namespaced: true,
  state: {
    sportTypeOptions: []
  },
  getters: {
    sportTypeOptions(state) {
      return state.sportTypeOptions;
    },
    findSportTypeName(state) {
      return (id) => state.sportTypeOptions.find((option) => option.value === id)?.label ?? id;
    }
  },
  actions: {
    async fetchSportType(context) {
      const { data } = await sportItemService.getMany();
      const payload = data.map((item) => ({
        value: item.SportTypeId,
        label: item.SportName
      }));

      context.commit('SET_SPORT_TYPE', payload);
    }
  },
  mutations: {
    SET_SPORT_TYPE(state, payload) {
      state.sportTypeOptions = payload;
    }
  }
};
