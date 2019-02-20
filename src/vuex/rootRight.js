export default {
  state: {
    rootList:null,
    panelList:null
  },
  mutations: {
    rootList(state, val) {
      state.rootList = val;
    },
    panelList(state, val) {
      state.panelList = val;
    },
  },
  actions: {
    setRootList({ state, commit }, init) {
      commit("rootList", init);
    },
    setPanelList({ state, commit }, init) {
      commit("panelList", init);
    }
  }
};
