Page({
    data: {
        hidden: true,
    },
    showMask() {
        this.setData({
            hidden: false
        });

        setTimeout(() => {
            this.setData({
                hidden: true
            });
        }, 3000);
    },
});
