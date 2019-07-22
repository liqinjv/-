const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    modalName: '',
    toggleDelay: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()

    var token = this.encode()
    var that = this

    // 请求jd列表页
    this.setData({
      loadModal: true
    })
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/company_jd_list_display',
      data: {

        company_id: wx.getStorageSync('phone'),
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {

        if (e.data.message == 'ok') {
          console.log('jd详情请求成功', e)
          that.setData({
            jd_data: e.data.data.jd_list
          })



        } else {
          console.log("请求失败", e)
        }


      },
      fail(e) {

      },
      complete() {
        that.setData({
          loadModal: false
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  back: function() {
    wx.navigateBack({

    })
  },

  add_jd: function() {
    console.log('点击添加新的简历')
  },

  //删除jd
  toggle(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否要删除该JD',
      success(res) {
        if (res.confirm) {
          
          console.log('点击删除', e);
          var l = []

          var anmiaton = e.currentTarget.dataset.class
          var jd_id = e.currentTarget.dataset.jd_id

          console.log("点击错号", anmiaton)

          // for (var i = 0; i < this.data.jd_data.length;i++)   {
          //   if (i!=anmiaton){
          //      l.push(this.data.bg_list[i])
          //     console.log(this.data.bg_list[i])
          //   }



          // }


          console.log(anmiaton)

          that.setData({
            animation: 'animation' + String( anmiaton ),

          })

          // setTimeout(function () {

          //   that.onLoad()
          //   that.setData({
          //     animation:'',
          //     bg_list:l
          //   })
          // }, 500)

          that.jd_remove(jd_id)

          that.onLoad()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })






  },


  // 隐藏jd
  jd_hides(e) {
    
    var that = this
    console.log(e)
    // var is_ = e.currentTarget.dataset.is_jdhide
    var id = e.currentTarget.dataset.jd_id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '是否上架/下架该JD',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '玩命加载中..',
          })
          that.jd_hide(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  jd_detail: function(e) {
    var jd_id = e.currentTarget.dataset.jd_id
    wx.navigateTo({
      url: '/pages/jd_detail/jd_detail?jd_id=' + jd_id,
    })
  },

  add_jd: function() {
    wx.navigateTo({
      url: '/pages/jd_detail/jd_detail?jd_id=-1',
    })
  },
  encode: function() {
    var time = new Date().getTime()
    var phone = wx.getStorageSync('phone')
    var rand = parseInt(Math.random() * (25 + 1), 10)
    var rand2 = parseInt(Math.random() * (25 + 1), 10)
    var z = app.globalData.z
    var e = z[rand]
    var r = z[rand2]
    var data = ''
    var decode_ = app.globalData.decode_dict[z[rand]]
    var phone_time = phone + time

    if (decode_ == 'decode_1') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_1[phone_time[i]]
      }

    }
    if (decode_ == 'decode_2') {
      for (var i = 0; i < (phone + time).length; i++) {
        data += app.globalData.decode_2[phone_time[i]]
      }
    }
    if (decode_ == 'decode_3') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_3[phone_time[i]]
      }
    }
    if (decode_ == 'decode_4') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_4[phone_time[i]]
      }
    }
    if (decode_ == 'decode_5') {
      for (var i = 0; i < (phone + time).length; i++) {

        data += app.globalData.decode_5[phone_time[i]]
      }
    }

    var str = data + e + r
    // var base = '../../utils/base64.js';
    // var result = base.encode(str);
    var base64_str = app.base64_encode(str)
    return base64_str



  },

  jd_remove: function(e) {
    console.log(e)
    var that = this
    var id = e
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/company_jd_remove',
      data: {

        id: id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {

        if (e.data.message == 'ok') {
          console.log('jd删除成功', e)
          that.chongxin()

        } else {
          console.log("jd删除失败", e)
        }


      },
      fail(e) {

      },
      complete() {

      }
    })



  },


  jd_hide: function(e) {
    console.log(e)
    var that = this
    var id = e
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/company_jd_hide',
      data: {

        id: id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {

        if (e.data.message == 'ok') {
          console.log('jd隐藏成功', e)
          that.chongxin()

        } else {
          console.log("jd隐藏失败", e)
        }


      },
      fail(e) {

      },
      complete() {
        wx.hideLoading()

      }
    })



  },

  chongxin: function() {
    var token = this.encode()
    var that = this
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/company_jd_list_display',
      data: {

        company_id: wx.getStorageSync('phone'),
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {

        if (e.data.message == 'ok') {
          console.log('jd详情请求成功', e)
          that.setData({
            jd_data: e.data.data.jd_list
          })



        } else {
          console.log("请求失败", e)

        }


      },
      fail(e) {
        that.chongxin()

      },
      complete() {
        that.setData({
          loadModal: false
        })
      }
    })
  }
})