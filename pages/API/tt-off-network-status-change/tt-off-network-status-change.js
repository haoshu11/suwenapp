Component({
  data: {
    isConnected: false
  },

  lifetimes: {
    attached() {
      this.listenChangeStatus();
      this.showNetWorkStatus();
    }
  },

  methods: {
    handleStatusChange(res) {
      this.setData({
        isConnected: res.isConnected,
        networkType: res.networkType
      });
    },

    listenChangeStatus() {
      tt.onNetworkStatusChange(this.handleStatusChange);
    },

    showNetWorkStatus() {
      tt.getNetworkType({
        success: res => {
          this.setData({
            isConnected: res.networkType !== 'none',
            networkType: res.networkType
          });
        }
      });
    },

    offChange() {
      tt.offNetworkStatusChange(this.handleStatusChange);
    }
  }
});