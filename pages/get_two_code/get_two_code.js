const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    code_img_url:'',
    swiper_num:0,

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
      var that = this
      var token = this.encode()
     var phone = wx.getStorageSync('phone')
    this.get_haibao_url()

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/get_two_code',
      data: {

        company_id: phone,
        is_online:0,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('二维码请求成功了', e)
          that.setData({
            code_img_url:e.data.data
          })

        

        } else {
          console.log("请求失败")
        }

        
      }
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
  back:function(){
    console.log('点击返回')
    wx.navigateBack({
      
    })
  },

  sao:function(){
    // wx.scanCode({
    //   success(res) {
    //     console.log(res)
    //   }
    // })

    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  encode: function () {
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
  // 获取海报页面列表与二维码图片
  get_haibao_url() {
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/promotion_and_digital/poster_list',
      data: {

        user_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求海报列表信息成功')
          that.setData({
            url_list: e.data.data.post_list,
            two_code_url: e.data.data.two_code_url

          })


        } else {
          console.log("请求失败")

        }


      }
    })
  },
  look_img(e){
    console.log(e)
    var list = []
    var url = e.currentTarget.dataset.url
    list.push(url)
    
    wx.previewImage({
      current: url,
      urls: list,
    });

  },

  qiehuan(e){
    console.log(e)
    if (this.data.swiper_num==0){
      this.setData({
        swiper_num: 1
      })
    }else{
      this.setData({
        swiper_num: 0
      })
    }
    

  }
})