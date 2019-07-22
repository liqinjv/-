const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,

    savebtnText: "保存海报到手机",
    jiazai: true,
    drawing: [

    ],
    painting: {
      width: 375,
      height: 555,
      views: [{
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
          top: 0,
          left: 0,
          width: 375,
          height: 555
        },
        {
          type: 'image',
          url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
          top: 27.5,
          left: 29,
          width: 55,
          height: 55
        },
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
          top: 27.5,
          left: 29,
          width: 55,
          height: 55
        },
        {
          type: 'text',
          content: '您的好友【kuckboy】',
          fontSize: 16,
          color: '#402D16',
          textAlign: 'left',
          top: 33,
          left: 96,
          bolder: true
        },
        {
          type: 'text',
          content: '发现一件好货，邀请你一起0元免费拿！',
          fontSize: 15,
          color: '#563D20',
          textAlign: 'left',
          top: 59.5,
          left: 96
        },
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
          top: 136,
          left: 42.5,
          width: 290,
          height: 186
        },
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
          top: 443,
          left: 85,
          width: 68,
          height: 68
        },
        {
          type: 'text',
          content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
          fontSize: 16,
          lineHeight: 21,
          color: '#383549',
          textAlign: 'left',
          top: 336,
          left: 44,
          width: 287,
          MaxLineNumber: 2,
          breakWord: true,
          bolder: true
        },
        {
          type: 'text',
          content: '￥0.00',
          fontSize: 19,
          color: '#E62004',
          textAlign: 'left',
          top: 387,
          left: 44.5,
          bolder: true
        },
        {
          type: 'text',
          content: '原价:￥138.00',
          fontSize: 13,
          color: '#7E7E8B',
          textAlign: 'left',
          top: 391,
          left: 110,
          textDecoration: 'line-through'
        },
        {
          type: 'text',
          content: '长按识别图中二维码帮我砍个价呗~',
          fontSize: 14,
          color: '#383549',
          textAlign: 'left',
          top: 460,
          left: 165.5,
          lineHeight: 20,
          MaxLineNumber: 2,
          breakWord: true,
          width: 125
        }
      ]
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    wx.hideShareMenu()

    var that = this
    console.log(options)
    var haibao_data = wx.getStorageSync('haibao_data')
    var haibao_data = JSON.parse(options.data)
    var two_url = options.two_url
    var fengge = options.fengge
    if (fengge == 1) {
      var fengge_url = 'https://www.hr24.com.cn/static/images/xcx/haibao04.jpg'
    }
    if (fengge == 2) {
      var fengge_url = 'https://www.hr24.com.cn/static/images/xcx/haibao02.jpg'
    }
    if (fengge == 3) {
      var fengge_url = 'https://www.hr24.com.cn/static/images/xcx/haibao03.jpg'
    }
    console.log(haibao_data)

    var two_code = options.two_code
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })

        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          drawing: [{
              type: 'image',
              url: fengge_url,
              left: 0,
              top: 0,
              width: 650,
              height: 950,
              canvasbg: 'red'

            },
            {
              type: 'image',
              circle: true,
              url: res.userInfo.avatarUrl,
              left: 105,
              top: 80,
              width: 110,
              height: 110,
              canvasbg: 'red',


            },


            {
              type: 'image',
              circle: true,
              url: two_url,
              left: 155,
              top: 760,
              width: 130,
              height: 130,
              canvasbg: 'red',

            },

            {
              type: 'text',
              textType: 'CN',
              content: res.userInfo.nickName.substring(0, 8),
              fontSize: 28,
              color: 'black',
              textAlign: 'left',
              left: 300,
              top: 200,
              // bold:true,
              width: 650,
            },
            {
              type: 'image',
              circle: true,
              url: haibao_data.company__company_logo,
              left: 105,
              top: 400,
              width: 70,
              height: 70,
              canvasbg: 'red',


            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.jd_title,
              fontSize: 26,
              color: 'black',
              textAlign: 'left',
              left: 200,
              top: 400,

              width: 650,
            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.salary + "元",
              fontSize: 24,
              color: 'red',
              textAlign: 'left',
              left: 427,
              top: 400,

              width: 650,
            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.company__company_name,
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              left: 200,
              top: 450,

              width: 650,
            },

            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.exp,
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              left: 220,
              top: 562,

              width: 650,
            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.edu_background,
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              left: 478,
              top: 562,

              width: 650,
            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.jd_tag,
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              left: 220,
              top: 613,

              width: 650,
            },
            {
              type: 'text',
              textType: 'CN',
              content: haibao_data.company__city__name + haibao_data.company__company_address,
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              left: 220,
              top: 662,

              width: 600,
            },

          ],
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
  // 返回
  back() {
    wx.navigateBack({

    })
  },

  // 成功生成海报之后
  completed() {
    console.log("生成成功")
    this.setData({
      jiazai: false
    })
  },

  //保存海报成功
  saveImage() {
    console.log("保存海报成功")
  },




})