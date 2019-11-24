<template>
  <div class="w">
    <h1 id="div-name">{{ FundTitle }}</h1>
    <Chart :ChartTitle="OrgTitle" :ChartStyle="OrgStyle" :option="richestOrgPie" />
    <Chart :ChartTitle="PersonTitle" :ChartStyle="PersonStyle" :option="richestPersonPie" />
  </div>
</template>

<script>
import Chart from "../../components/Analysis/Graph";
import { mapState } from "vuex";
export default {
  data() {
    return {
      OrgStyle: "width:100%;height:400px;align-content:center;",
      OrgTitle: "",
      PersonStyle: "width:100%;height:400px;align-content:center;",
      PersonTitle: ""
    };
  },
  computed: {
    ...mapState({
      richestOrgPie: state => state.fund.orgPie,
      richestPersonPie: state => state.fund.personPie
    }),
    FundTitle() {
      return this.$route.query.divName;
    }
  },
  mounted() {
    this.$store.dispatch("fund/getOrgPie", this.$route.query.divName);
    this.$store.dispatch("fund/getPersonPie", this.$route.query.divName);
  },
  components: {
    Chart
  }
};
</script>

<style>
</style>
