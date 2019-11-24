<template>
  <div id="wrap">
    <a-row>
      <a-col :span="8">
        <RowSimple
          :option="'INVENTORS IN TECHNOLOGY SOURCE PATENTS'"
          :data="inventors"
          :endpoint="baseUrl+'documents/static/#/analysis/person?inventor='"
        />
      </a-col>
      <a-col :span="8">
        <RowSimple
          :option="'ASSIGNEES IN TECHNOLOGY SOURCE PATENTS'"
          :data="assignees"
          :endpoint="baseUrl+'documents/static/#/analysis/assignee?assignee='"
        />
      </a-col>
      <a-col :span="8">
        <Row
          :option="'TECHNOLOGY SOURCE PATENTS'"
          :data="renderPatent"
          :endpoint="baseUrl+'documents/static/#/analysis/patent?patent_uuid='"
          :word="''"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import RowSimple from "./RowSimple";
import Row from "./Row";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_JUMP
    };
  },
  props: ["inventors", "assignees", "patent"],
  computed: {
    renderPatent() {
      let result = this.patent;
      result.map(x => {
        x.patent_num = x.applicationDate;
      });
      return result;
    }
  },
  components: {
    RowSimple,
    Row
  }
};
</script>

<style>
.ant-row {
  width: 100%;
}
.subtitle {
  height: 42px;
}
/* #wrap {
  display: flex;
  justify-content: space-around;
} */
/* .most-cited-patents {
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
} */
</style>
