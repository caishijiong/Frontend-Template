/**
 * 分页混入
 * 
 * @property {number} page - 当前页码 默认值为 1
 * @property {number} limit - 每页条数 默认值为 10
 * @property {number} total - 总条数 默认值为 0
 */
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000, 5000],
      total: 0,
      layout: "total, sizes, prev, pager, next, jumper"
    };
  },
  methods: {
    // Element Pagination 的回调：切换每页条数
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 改变每页条数通常回第一页
      this.fetchList();
      this.$emit("size-change", size);
    },

    // Element Pagination 的回调：切换页码
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchList();
      this.$emit("current-change", page);
    },

    // 在 fetchList 请求成功后用来设置 total
    setTotal(total) {
      this.total = total;
    },

    // 搜索/检索触发：把分页重置到第一页并拉取数据
    onSearch() {
      this.currentPage = 1;
      this.fetchList();
    },

    // 组件必须实现此方法：根据 currentPage/pageSize/其它条件拉取数据
    fetchList() {
      // 占位：在组件中覆盖/实现该方法
      // 示例实现：
      // const params = { page: this.currentPage, size: this.pageSize, ...this.searchForm }
      // axios.get('/api/list', { params }).then(res => {
      //   this.list = res.data.items
      //   this.setTotal(res.data.total)
      // })
      throw new Error("请在组件中实现 fetchList() 方法来拉取数据。");
    }
  }
};