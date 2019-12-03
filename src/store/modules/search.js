import search from "../../api/search";
import { SEARCH } from "../mutation-types";

const state = {
  treeNodes: [],
  searchNodes: [],
  searchTree: [],
  fund: {},
  status: [],
  status_temp: {
    rank: "",
    name: "",
    progress: "0%",
    status: [],
    operands: [
      { op: "detail", uuid: "" },
      { op: "delete", uuid: "" }
    ]
  }
};

const getters = {};

const actions = {
  getTree({ commit }) {
    search.getTree(tree => {
      commit(SEARCH.GET_IPC_TREE, tree);
    });
  },
  getSearch({ commit }, search_data) {
    commit(SEARCH.INIT_STATUS, search_data);
    // 此处应该返回注册的uuid,之后再进入查看详情的时候再更新searchTree中相应的状态。
    search.getSearch(
      result => {
        commit(SEARCH.GET_SEARCH_RESULT, { result, search_data });
      },
      () => {
        commit("searchFail", search_data);
      },
      search_data
    );
  },
  getFund({ commit }, activeAmount) {
    search.getFund(fund => {
      commit(SEARCH.GET_FUND_RESULT, fund);
    }, activeAmount);
  },
  refreshSearch({ commit }) {
    // 询问状态：循环status，将其中所有的status向上层函数中询问分析进度及状态，然后更新。
  },
  getSearchTree({ commit }, uuid) {
    // 获取当前的结果（更新searchTree中的数据）
    search.getSearchTree(
      result => {
        commit(SEARCH.GET_SEARCH_TREE, { result, uuid });
      },
      () => {
        commit("searchFail", uuid);
      },
      uuid
    );
  },
  deleteTask({ commit }, uuid) {
    commit(SEARCH.DELETE_TASK, uuid);
  }
};

const mutations = {
  [SEARCH.GET_IPC_TREE](state, tree) {
    state.treeNodes = tree;
  },
  [SEARCH.GET_SEARCH_RESULT](state, { result, search_data }) {
    state.searchNodes = result;
    state.searchTree[search_data] = false;
  },
  [SEARCH.GET_SEARCH_TREE](state, { result, uuid }) {
    console.log("result:", result, "uuid:", uuid);
    console.log("state.searchTree", state.searchTree);
    // let temp = state.searchTree;
    state.searchTree = result;
  },
  [SEARCH.GET_FUND_RESULT](state, fund) {
    state.fund = fund;
  },
  [SEARCH.INIT_STATUS](state, uuid) {
    let rank = String(state.status.length);
    let temp = {
      rank: "",
      name: "",
      progress: "0%",
      status: [],
      operands: [
        { op: "detail", uuid: "" },
        { op: "delete", uuid: "" }
      ]
    };
    temp.rank = rank;
    temp.name = uuid;
    temp.progress = "0%";
    temp.status.push("processing");
    temp.operands[0].uuid = uuid;
    temp.operands[1].uuid = uuid;
    state.status.push(temp);
  },
  [SEARCH.DELETE_TASK](state, uuid) {
    for (let i = 0; i < state.status.length; i++) {
      let temp = state.status[i].operands[1].uuid;
      if (temp === uuid) {
        state.status.splice(i, 1);
      }
    }
    for (let i = 0; i < state.status.length; i++) {
      state.status[i].rank = String(i);
    }
  },
  deleteResultFund(state) {
    state.fund = {};
  },
  searchFail(state, uuid) {
    state.searchTree[uuid] = "fail";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
