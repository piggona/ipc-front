<template>
  <div class="w">
    <div class="content with-nav">
      <TContent :title="title" :color="TitleColor" :desc="desc"></TContent>
      <Chart :ChartTitle="BarTitle" :ChartStyle="BarStyle" :option="BarOption" />
      <br />
      <a-card>
        <div class="static-block" id="tech-static-block" style="width: 100%">
          <TechStatic
            :inventors="techStatic.inventors"
            :assignees="techStatic.assignees"
            :patents="techStatic.patents"
          />
        </div>
        <div class="static-block" id="tech-source-block" style="width: 100%">
          <TechSource
            :inventors="techSource.inventors"
            :assignees="techSource.assignees"
            :patent="techSource.patent"
          />
        </div>
      </a-card>

      <br />
      <br />
      <Chart :ChartTitle="LifeTitle" :ChartStyle="LifeStyle" :option="LifeOption" />
      <Chart :ChartTitle="TrendTitle" :ChartStyle="TrendStyle" :option="TrendOption" />
      <DetailChart
        :ChartTitle="AssigneeScatterTitle"
        :ChartStyle="AssigneeScatterStyle"
        :option="AssigneeScatterOption"
        :opName="'企业'"
        :link="baseUrl+'documents/static/#/analysis/assignee?assignee='"
      />
      <!-- :most="AssigneeScatterOptionMost" -->
      <!-- :newer="AssigneeScatterOptionNewer" -->
      <DetailChart
        :ChartTitle="InventorScatterTitle"
        :ChartStyle="InventorScatterStyle"
        :option="InventorScatterOption"
        :opName="'发明人'"
        :link="baseUrl+'documents/static/#/analysis/patent?patent_uuid='"
      />
      <!-- :most="InventorScatterOptionMost"
      :newer="InventorScatterOptionNewer"-->
    </div>
  </div>
</template>

<script>
import TContent from "../../components/Analysis/Title";
import Chart from "../../components/Analysis/Graph";
import DetailChart from "../../components/Analysis/DetailChart";
import TechSource from "../../components/Analysis/TechSource";
import TechStatic from "../../components/Analysis/TechStatic";
import { mapState } from "vuex";
export default {
  data() {
    return {
      BarTitle: "专利趋势图",
      BarStyle: "width:100%;height:400px;align-content:center;",
      TrendStyle: "width:100%;height:400px;align-content:center;",
      TrendTitle: "TOP 1-5 机构趋势图",

      AssigneeScatterTitle: "机构实力分析",
      AssigneeScatterStyle: "width:100%;height:400px;align-content:center;",
      baseUrl: process.env.VUE_APP_BASE_JUMP,

      InventorScatterTitle: "发明人实力分析",
      InventorScatterStyle: "width:100%;height:400px;align-content:center;",

      LifeTitle: "技术生命周期",
      LifeStyle: "width:100%;height:400px;align-content:center;"
    };
  },
  components: {
    TContent,
    Chart,
    DetailChart,
    TechSource,
    TechStatic
  },
  computed: {
    ...mapState({
      desc: state => state.patent.keyword,
      techSource: state => state.patent.techSource,
      techStatic: state => state.patent.techStatic,
      BarOption: state => state.patent.barOption,
      TrendOption: state => state.patent.trendOption,
      AssigneeScatterOption: state => state.patent.assigneeScatterOption,
      AssigneeScatterOptionMost: state => state.patent.assigneeScatterMost,
      AssigneeScatterOptionNewer: state => state.patent.assigneeScatterNewer,
      InventorScatterOption: state => state.patent.inventorScatterOption,
      InventorScatterOptionMost: state =>
        state.patent.inventorScatterOptionMost,
      InventorScatterOptionNewer: state =>
        state.patent.inventorScatterOptionNewer,
      LifeOption: state => state.patent.lifeOption
    }),
    title() {
      return this.$route.query.tech;
    },
    TitleColor() {
      let hot = this.$route.query.hot;
      let color = "opacity: 0.0";
      if (hot) {
        if (hot === "dead") {
          color = "color: #4E4E4E; size: 5rem;";
        }
        if (hot === "cold") {
          color = "color: #42A5F5; size: 5rem;";
        }
        if (hot === "hot") {
          color = "color: #FF0033; size: 5rem;";
        }
        if (hot === "normal") {
          color = "color: #66BB6A; size: 5rem;";
        }
      } else {
        color = "opacity: 0.0";
      }
      return color;
    }
  },
  mounted() {
    let tech = this.$route.query.tech;
    let isWord = this.$route.query.isWord;
    this.$store.dispatch("patent/getKeyword", { tech, isWord });
    this.$store.dispatch("patent/getTechSource", { tech, isWord });
    this.$store.dispatch("patent/getTechStatic", { tech, isWord });
    this.$store.dispatch("patent/getBar", { tech, isWord });
    this.$store.dispatch("patent/getTrend", { tech, isWord });
    this.$store.dispatch("patent/getAssignee", { tech, isWord });
    this.$store.dispatch("patent/getInventor", { tech, isWord });
    this.$store.dispatch("patent/getLife", { tech, isWord });
    console.log("位置：Patent mounted");
    console.log(tech);
    console.log(isWord);
  }
};
</script>

<style>
.most-cited-patents {
  margin-top: 2rem;
}
.sub-title {
  font-weight: bold;
  border-bottom: 2px;
  border-color: #515a5a;
}
.relationship-graph {
}
#cited-title {
  color: #5d6d7e;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration-line: underline;
}
#cited-title:hover {
  color: #1f618d;
}
#cited-num {
  color: #b2babb;
}
#graph-text {
  color: #283747;
  font-size: 1.5rem;
}
.static-block {
  position: relative;
  display: flex;
  margin-top: 4rem;
}
#wrap {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
}
.most-cited-patents {
  margin-top: 2rem;
}
.sub-title {
  font-weight: bold;
  border-bottom: 2px;
  border-color: #515a5a;
}
.relationship-graph {
}
#cited-title {
  color: #5d6d7e;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration-line: underline;
}
#cited-title:hover {
  color: #1f618d;
}
#cited-num {
  color: #b2babb;
}
#graph-text {
  color: #283747;
  font-size: 1.5rem;
}
.static-block {
  position: relative;
  display: flex;
  margin-top: 4rem;
}
</style>
