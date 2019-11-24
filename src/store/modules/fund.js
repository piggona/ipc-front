import fund from "../../api/fund";
import { FUND } from "../mutation-types";

const state = {
  orgPie: {},
  personPie: {}
};

const getters = {};

const actions = {
  getOrgPie({ commit }, divName) {
    fund.getOrg(org => {
      commit(FUND.GET_ORG, org);
    }, divName);
  },
  getPersonPie({ commit }, divName) {
    fund.getPerson(person => {
      commit(FUND.GET_PERSON, person);
    }, divName);
  }
};

const mutations = {
  [FUND.GET_ORG](state, org) {
    state.orgPie = org;
  },
  [FUND.GET_PERSON](state, person) {
    state.personPie = person;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
