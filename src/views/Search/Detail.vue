<template>
  <div class="w">
    <a-card title="搜索结果">
      <!-- <p v-if="noResult" class="main-class-phrase">努力搜索中......</p> -->
      <div v-if="!noResult" class="list-body" id="list-body-parent">
        <!-- {{searchTree}} -->
        <div v-for="node in searchTree" :key="node.depth">
          <SearchTree :ipc_id="node.ipc_id" :ipc="node.ipc" :depth="node.depth" :des="node.des" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import SearchTree from "../../components/Search/SearchTree";
import { mapState } from "vuex";
export default {
  data() {
    return {
      noResult: false,
      data: [1]
    };
  },
  computed: {
    ...mapState({
      searchTree: state => state.search.searchTree
    }),
    tree() {
      let uuid = this.$route.query.uuid;
      let data = this.$store.state.search.searchTree;
      console.log("this.searchTree", data);
      console.log("uuid:", uuid);
      return data[uuid];
    }
  },
  watch: {
    searchTree: {
      handler(val) {
        console.log("handler:", val);
        // this.searching = false;
        // if (val === "fail") {
        //   this.noResult = true;
        // } else {
        //   this.noResult = false;
        // }
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("search/getSearchTree", this.$route.query.uuid);
    console.log("mounted:", this.searchTree);
    let uuid = this.$route.query.uuid;
    this.data = this.searchTree[uuid];
    console.log("data:", this.data);
  },
  components: {
    SearchTree
  }
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0%;
}
.search-con {
  padding-top: 2rem;
  padding-bottom: 3rem;
}
input {
  width: 800px;
  height: 40px;
}
.fund-choose.active {
  background-color: #007bff;
  color: #ffffff;
}
.search-con {
  padding: 30px 0 30px 0px;
}
.search-con #search-input {
  width: 70%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-size: 15px;
  border: 2px solid #616161;
}
.search-con .search-btn {
  position: absolute;
  height: 40px;
}

.search-con .search-btn:hover {
  color: #fff;
  background: #1565c0;
}

.search-con select {
  margin-bottom: 1rem;
}
.second-class {
  padding-left: 1.5rem;
}
.third-class {
  padding-left: 1.5rem;
}
.main-class-title {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 1rem;
}
.second-class-title {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 1rem;
}
.third-class-title {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 0.75rem;
}
.second-class-word {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 1rem;
}
.third-class-word {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 1rem;
}
.fourth-class-word {
  padding-left: 0.5rem;
  padding-right: 1rem;
  font-size: 1rem;
}
.main-class-phrase {
  color: #b03a2e;
  font-size: 0.75rem;
  font-weight: bold;
}
.second-class-phrase {
  color: #b9770e;
  font-size: 0.75rem;
  font-weight: bold;
}
.third-class-phrase {
  color: #21618c;
  font-size: 0.75rem;
  font-weight: bold;
}
.fourth-class-phrase {
  color: #cb4335;
  font-size: 0.75rem;
  font-weight: bold;
}
.main-class-btn {
  width: 3rem;
  background-color: #21618c;
  color: #f5f5f5;
}
.second-class-btn {
  width: 3rem;
  background-color: #b03a2e;
  color: #f5f5f5;
}
.third-class-btn {
  width: 3rem;
  background-color: #eb984e;
  color: #f5f5f5;
}
.fourth-class-btn {
  width: 3rem;
  background-color: #5dade2;
  color: #f5f5f5;
}
</style>