const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      data_value: options.data,
      num: options.data.length

    })
    wx.hideShareMenu();
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
  back:function(){
    wx.navigateBack({
      
    })
  },
  save:function(){
    // wx.navigateTo({
    //   url: '/pages/jd_detail/jd_detail',
    // })
    console.log(this.data.data_value)
    try {
      if (this.data.data_value.length >= 10) {
        console.log(">10个字", this.data.data_value.length)

        app.globalData.position_content = this.data.data_value

        wx.navigateBack({

        })

      } else {
        wx.showToast({
          title: '不能少于10个字',
          icon: 'none',
          duration: 1500
        })
      }
    }catch(e){
      wx.showToast({
        title: '请完善职位描述',
        icon: 'none',
        duration: 1500
      })
    }
    
 
  },

  text:function(e){
    console.log(e)

    this.setData({
      num:e.detail.cursor,
      data_value:e.detail.value
    })
  }

})