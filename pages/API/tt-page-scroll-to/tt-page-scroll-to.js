Component({
  methods: {
    scrollToBottom() {
      tt.pageScrollTo({
        scrollTop: 3000,
        duration: 300
      });
    },

    scrollToTop() {
      tt.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    scrollToBlue() {
      tt.pageScrollTo({
        duration: 200,
        selector: '.one',
        offsetTop: 100,
        success(res) {
            console.log(`pageScrollTo调用成功`, res);
        },
        fail(err) {
            console.log(`pageScrollTo调用失败`, err);
        },
    });
    },
    scrollToRed() {
      tt.pageScrollTo({
        duration: 200,
        selector: '.two',
        offsetTop: 100,
        success(res) {
            console.log(`pageScrollTo调用成功`, res);
        },
        fail(err) {
            console.log(`pageScrollTo调用失败`, err);
        },
    });
    }
  }
});  