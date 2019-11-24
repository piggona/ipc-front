import search from "../../api/search";
import { SEARCH } from "../mutation-types";

const state = {
  treeNodes: [],
  searchNodes: [],
  fund: {}
};

const getters = {};

const actions = {
  getTree({ commit }) {
    search.getTree(tree => {
      commit(SEARCH.GET_IPC_TREE, tree);
    });
  },
  getSearch({ commit }, search_data) {
    search.getSearch(
      result => {
        commit(SEARCH.GET_SEARCH_RESULT, result);
      },
      () => {
        commit("searchFail");
      },
      search_data
    );
  },
  getFund({ commit }, activeAmount) {
    search.getFund(fund => {
      commit(SEARCH.GET_FUND_RESULT, fund);
    }, activeAmount);
  }
};

const mutations = {
  [SEARCH.GET_IPC_TREE](state, tree) {
    state.treeNodes = tree;
  },
  [SEARCH.GET_SEARCH_RESULT](state, result) {
    state.searchNodes = result;
  },
  [SEARCH.GET_FUND_RESULT](state, fund) {
    state.fund = fund;
  },
  deleteResultFund(state) {
    state.fund = {};
  },
  searchFail(state) {
    state.searchNodes = "fail";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
