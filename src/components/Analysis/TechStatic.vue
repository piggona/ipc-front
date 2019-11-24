<template>
  <div id="wrap">
    <a-row>
      <a-col :span="8">
        <RowSimple
          :option="'INVENTORS IN MOST CITED PATENTS'"
          :data="inventors"
          :endpoint="baseUrl+'documents/static/#/analysis/person?inventor='"
        />
      </a-col>
      <a-col :span="8">
        <RowSimple
          :option="'ASSIGNEES IN MOST CITED PATENTS'"
          :data="assignees"
          :endpoint="baseUrl+'documents/static/#/analysis/assignee?assignee='"
        />
      </a-col>
      <a-col :span="8">
        <Row
          :option="'MOST CITED PATENTS'"
          :data="renderPatent"
          :endpoint="baseUrl+'documents/static/#/analysis/patent?patent_uuid='"
          :word="'Patents'"
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
  props: ["inventors", "assignees", "patents"],
  computed: {
    renderPatent() {
      let result = this.patents;
      result.map(x => {
        x.patent_num = x.n_citation;
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
.top-assignees {
  /* width: 354px; */
  padding-left: 2.5rem;
}
</style>
