const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    theme:"bg-gradual-orange",
    elements: [{
      title: '生成二维码',
      name: 'get_two_code',
      color: 'blue',
      icon: 'qrcode'
    },
    {
      title: '简历管理',
      name: 'manage_resume',
      color: 'orange',
      icon: 'circle'
    },
    {
      title: 'JD设置',
      name: 'jd_setting',
      color: 'purple',
      icon: 'newsfill'
    },
    {
      title: '人才评测',
      name: 'test',
      color: 'red',
      icon: 'profile'
    },
    {
      title: '职场宝典',
      name: 'bible',
      color: 'grey',
      icon: 'creative'
    },
    {
      title: '数据汇总',
      name: 'list',
      color: 'green',
      icon: 'rankfill'
    }
     
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 判断是否登录状态
    this.setData({
      theme: app.globalData.theme,
    })

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  getQrcode:function() {
    wx.request({
      url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit",
        data: {
        page: "pages/index",
        scene: "1234&123",
        width: 300
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
       console.log('成功',res)
      },
      fail: function (e) { 
      console.log('不成功', e)
      }
    })
  }
 
})