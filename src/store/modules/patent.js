import patent from "../../api/patent";
import { PATENT } from "../mutation-types";

const state = {
  keyword: "",
  techSource: {},
  techStatic: {},
  barOption: {},
  trendOption: {},
  assigneeScatterOption: {},
  assigneeScatterOptionMost: {},
  assigneeScatterOptionNewer: {},
  inventorScatterOption: {},
  inventorScatterOptionMost: {},
  inventorScatterOptionNewer: {},
  lifeOption: {}
};

const getters = {};

const actions = {
  getKeyword({ commit }, { tech, isWord }) {
    patent.getKeyword(
      key => {
        commit(PATENT.GET_KEYWORD, key);
      },
      tech,
      isWord
    );
  },
  getTechSource({ commit }, { tech, isWord }) {
    console.log(tech);
    patent.getTech(
      tech => {
        commit(PATENT.GET_TECH_SOURCE, tech);
      },
      tech,
      isWord
    );
  },
  getTechStatic({ commit }, { tech, isWord }) {
    patent.getStatic(
      tech => {
        commit(PATENT.GET_TECH_STATIC, tech);
      },
      tech,
      isWord
    );
  },
  getBar({ commit }, { tech, isWord }) {
    patent.getBarOption(
      tech => {
        commit(PATENT.GET_BAR, tech);
      },
      tech,
      isWord
    );
  },
  getTrend({ commit }, { tech, isWord }) {
    patent.getTrendOption(
      tech => {
        commit(PATENT.GET_TREND, tech);
      },
      tech,
      isWord
    );
  },
  getAssignee({ commit }, { tech, isWord }) {
    patent.getAssigneeScatterOption(
      (tech, most, newer) => {
        console.log("getAssignee", tech);
        commit(PATENT.GET_ASSIGNEE, tech);
        commit(PATENT.GET_ASSIGNEE_MOST, most);
        commit(PATENT.GET_ASSIGNEE_NEWER, newer);
      },
      tech,
      isWord
    );
  },
  getInventor({ commit }, { tech, isWord }) {
    patent.getInventorScatterOption(
      (tech, most, newer) => {
        commit(PATENT.GET_INVENTOR, tech);
        commit(PATENT.GET_INVENTOR_MOST, most);
        commit(PATENT.GET_INVENTOR_NEWER, newer);
      },
      tech,
      isWord
    );
  },
  getLife({ commit }, { tech, isWord }) {
    patent.getLifeOption(
      tech => {
        commit(PATENT.GET_LIFE, tech);
      },
      tech,
      isWord
    );
  }
};

const mutations = {
  [PATENT.GET_KEYWORD](state, key) {
    state.keyword = key;
  },
  [PATENT.GET_TECH_SOURCE](state, tech) {
    state.techSource = tech;
  },
  [PATENT.GET_TECH_STATIC](state, tech) {
    state.techStatic = tech;
  },
  [PATENT.GET_BAR](state, tech) {
    state.barOption = tech;
  },
  [PATENT.GET_TREND](state, tech) {
    state.trendOption = tech;
  },
  [PATENT.GET_ASSIGNEE](state, tech) {
    state.assigneeScatterOption = tech;
  },
  [PATENT.GET_ASSIGNEE_MOST](state, most) {
    state.assigneeScatterOptionMost = most;
  },
  [PATENT.GET_ASSIGNEE_NEWER](state, newer) {
    state.assigneeScatterOptionNewer = newer;
  },
  [PATENT.GET_INVENTOR](state, tech) {
    state.inventorScatterOption = tech;
  },
  [PATENT.GET_INVENTOR_MOST](state, most) {
    state.inventorScatterOptionMost = most;
  },
  [PATENT.GET_INVENTOR_NEWER](state, newer) {
    state.inventorScatterOptionNewer = newer;
  },
  [PATENT.GET_LIFE](state, tech) {
    state.lifeOption = tech;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
