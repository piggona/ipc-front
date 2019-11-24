<template>
  <div class="w">
    <a-card
      style="width:100%"
      :tabList="tabListNoTitle"
      :activeTabKey="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
      <div v-if="noTitleKey === 'patent'" class="patent">
        <div class="search-con">
          <input
            v-model="searchInput"
            class="instruction-input"
            id="search-input"
            placeholder="请输入您感兴趣的技术词汇"
          />
          <button class="btn" id="search-btn" @click="getSearch()">搜索</button>
          <div id="search-result"></div>
        </div>
        <p v-if="searching" style="font-size: 0.5rem">努力搜索中......</p>
        <p v-if="noResult" class="main-class-phrase">后台正在生成分析报告，请10-20分钟后再次搜索</p>
        <div v-if="!noResult" class="list-body" id="list-body-parent">
          <div v-for="node in searchNodes" :key="node.depth">
            <SearchTree :ipc_id="node.ipc_id" :ipc="node.ipc" :depth="node.depth" :des="node.des" />
          </div>
        </div>
      </div>
      <div v-if="noTitleKey === 'fund'" class="fund">
        <div class="search-side row col-md-2" style="padding-top:3rem;">
          <a-layout style="padding: 24px 0; background: #fff">
            <a-layout-sider width="200" style="background: #fff">
              <a-list itemLayout="horizontal" :dataSource="data">
                <a-list-item style="padding-bottom:2rem">
                  <button
                    id="amount-row"
                    :class="activeAmount ? 'btn-mini fund-choose active' : 'btn-mini fund-choose'"
                    data-toggle="tab"
                    @click="fundSort()"
                  >金额排序</button>
                </a-list-item>
                <a-list-item style="padding-bottom:2rem">
                  <button
                    id="increase-row"
                    :class="!activeAmount ? 'btn-mini fund-choose active' : 'btn-mini fund-choose'"
                    data-toggle="tab"
                    @click="fundSort()"
                  >增长率排序</button>
                </a-list-item>
              </a-list>
            </a-layout-sider>
            <a-layout-content>
              <p v-if="searchingFund" style="font-size: 0.5rem">努力搜索中......</p>
              <div class="search-result row col-md-10" id="fund-result">
                <FundResult :isAmount="activeAmount" :fund="fund" />
              </div>
            </a-layout-content>
          </a-layout>
        </div>
      </div>
      <div v-if="noTitleKey === 'hotspot'" class="hot-list" id="hot-list">
        <div class="hot-list" id="hot-list">
          <p v-if="searchingTree" style="font-size: 0.5rem">努力搜索中......</p>
          <div class="hot-tree">
            <div v-for="node in treeNodes.data" :key="node.depth">
              <HotTree
                :key="node.depth"
                :depth="node.depth"
                :title="node.title"
                :parent_ele="node.parent_ele"
                :phrase="node.phrase"
                :content="node.content"
                :color="node.color"
                :top3="node.top3"
                :next="node.next"
              ></HotTree>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import HotTree from "./RecursiveTree";
import SearchTree from "./SearchTree";
import FundResult from "./FundResult";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeAmount: true,
      searchInput: "",
      tabListNoTitle: [
        {
          key: "hotspot",
          tab: "ipc分析"
        },
        {
          key: "patent",
          tab: "搜索分析"
        },
        {
          key: "fund",
          tab: "基金分析"
        }
      ],
      noTitleKey: "hotspot",
      searching: false,
      searchingFund: false,
      searchingTree: false,
      noResult: false,
      noResultFund: false
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
      // if (key === "hotspot") {
      //   this.searchingTree = true;
      //   this.$store.dispatch("search/getTree");
      // }
      // if (key === "fund") {
      //   this.searchingFund = true;
      //   this.$store.dispatch("search/getFund", this.activeAmount);
      // }
    },
    fundSort() {
      this.activeAmount = !this.activeAmount;
      // this.$store.commit("deleteResultFund");
      this.searchingFund = true;
      this.$store.dispatch("search/getFund", this.activeAmount);
    },
    getSearch() {
      this.searching = true;
      this.$store.dispatch("search/getSearch", this.searchInput);
    }
  },
  computed: {
    ...mapState({
      treeNodes: state => state.search.treeNodes,
      searchNodes: state => state.search.searchNodes,
      fund: state => state.search.fund
    })
  },
  watch: {
    treeNodes: {
      handler(val) {
        console.log(val);
        this.treeNodes = val;
        this.searchingTree = false;
      },
      deep: true
    },
    searchNodes: {
      handler(val) {
        console.log(val);
        this.searching = false;
        if (val === "fail") {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      },
      deep: true
    },
    fund: {
      handler(val) {
        console.log(val);
        this.searchingFund = false;
      },
      deep: true
    }
  },
  mounted() {
    this.searchingFund = true;
    this.searchingTree = true;
    this.$store.dispatch("search/getTree");
    this.$store.dispatch("search/getFund", this.activeAmount);
  },
  components: {
    HotTree,
    SearchTree,
    FundResult
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
