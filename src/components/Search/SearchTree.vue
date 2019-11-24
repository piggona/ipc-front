<template>
  <div class="main-class">
    <div class style="display: inline">
      <div class style="display: inline">
        <button
          type="button"
          id="search-fa"
          class="btn-mini front-btn-tool main-class-btn"
          data-toggle="collapse"
          :data-target="'#main-class-body-'+ipc_id"
          data-parent="#list-body-parent"
          @click="tPlus = !tPlus"
        >
          <v-icon :name="tVal" scale="1.5" />
        </button>
        <div :class="depth+'-class-title'" style="display: inline">{{ipc}}</div>
        <div v-if="showChildren" class="panel-collapse collapse" :id="'main-class-body-'+ipc_id">
          <div v-for="de in des" :key="de.index">
            <router-link
              target="_blank"
              class="second-class-phrase"
              :to="'/analysis/patent?tech='+de.index+'&isWord=1'"
            >{{de.des}}</router-link>
            <br />
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tPlus: true
    };
  },
  props: ["ipc_id", "ipc", "depth", "des"],
  name: "search-tree",
  computed: {
    showChildren() {
      return !this.tPlus;
    },
    tVal() {
      if (this.tPlus) {
        return "plus";
      } else {
        return "minus";
      }
    }
  }
};
</script>

<style>
</style>
