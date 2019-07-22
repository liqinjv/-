const app = getApp()
var resume_list_data = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    search_value:'',
    search_page:0,
    search_list_length: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    resume_list_data = []
    
    // 获取缓存中的人才模型
    var place_id = wx.getStorageSync('plc_id')
    var place_parent_id = wx.getStorageSync('plc_parent_id')
    var industry_id = wx.getStorageSync('industry')
    var position_class = wx.getStorageSync('industry_class')
    var edu_id = wx.getStorageSync('edu')
    var sex_id = wx.getStorageSync('sex')
    var age = wx.getStorageSync('age')

    this.setData({
      place_id: place_id,
      place_parent_id: place_parent_id,
      industry_id: industry_id,
      position_class: position_class,
      edu_id: edu_id,
      sex_id: sex_id,
      age: age
    })
    // this.get_new_resume_list(0)
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

    this.setData({
      search_page:this.data.search_page+15,
      search_jiazai:true
    })
    this.search_resume(this.data.search_page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  get_new_resume_list(e) {
    // 获取猎场的简历列表

    var place_id = Number(this.data.place_id)
    var place_parent_id = Number(this.data.place_parent_id)
    var industry_id = Number(this.data.industry_id)
    var position_class = Number(this.data.position_class)
    var edu_id = Number(this.data.edu_id)
    var sex_id = Number(this.data.sex_id)
    var age = Number(this.data.age)
    var page = e

    console.log(1111, place_id)
    console.log(1111111111, place_parent_id)
    console.log(11111111111, industry_id)
    console.log(1111111, position_class)
    console.log(1111111, edu_id)
    console.log(1111111, sex_id)
    console.log(1111111, age)
    if (page == 0) {
      wx.showLoading({
        title: '玩命加载中..',
      })
    }

    var that = this
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/resume_list',
      data: {
        place_id: place_id,
        industry_id: industry_id,
        place_parent_id: place_parent_id,
        position_class: position_class,
        edu_id: edu_id,
        sex_id: sex_id,
        age: age,
        page: page,
        token: token



      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('猎场尊享简历列表', e)
          // resume_list_data = e.data.data
          for (var i = 0; i < e.data.data.length; i++) {
            resume_list_data.push(e.data.data[i])
          }

          that.setData({
            resume_list: resume_list_data,
            shouye_shangla: false,
            new_jiazai: false

          })

          if (resume_list_data.length == 0) {
            that.setData({
              list_null: true,
              jiazai: false

            })
          } else {
            that.setData({
              list_null: false,
              jiazai: false

            })
          }


          wx.stopPullDownRefresh();


        } else {
          console.log("猎场简历列表请求失败", e)

          wx.showModal({
            title: '提示',
            content: '网络异常，确定重新加载',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      }, complete() {
        that.setData({
          new_jiazai: false
        })
        wx.hideLoading()

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
  details: function (e) {
    console.log("点击简历列表", e)
    var id = e.currentTarget.dataset.resume_id
    var s_r_id = e.currentTarget.dataset.source_resume_id
    var status = e.currentTarget.dataset.status
    var token = this.encode()

    // 判断简历是否是核实过的，核实过跳过校验
    if (status == 2) {
      console.log('校验请求成功了', status)
      wx.navigateTo({
        url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0" + "&new_or_old_resume=0",
      })

    } else {
      //校验简历状态
      wx.request({

        method: "POST",
        url: 'https://www.hr24.com.cn/hunting_ground/post_check',
        data: {

          source_resume_id: s_r_id,
          token: token

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(e) {
          if (e.data.message == 'ok') {
            console.log('校验请求成功了', e)
            wx.navigateTo({
              url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0" + "&new_or_old_resume=0",
            })
          } else {
            console.log("58校验请求失败")
            wx.showToast({
              title: '手慢了,简历已下架',
              icon: 'none',
              duration: 500
            })

          }

          // 登录成功并且有手机号,把手机号写入缓存
        }
      })
    }


  },
  search_resume(e) {

    var token = this.encode()
    var that = this

    var place_id = this.data.place_id
    var place_parent_id = this.data.place_parent_id
    var industry_id = this.data.industry_id
    var position_class = this.data.position_class
    var edu_id = this.data.edu_id
    var sex_id = this.data.sex_id
    var age = this.data.age
    var page = e
    if(page==0){
      this.setData({
        search_jiazai:true
      })
    }



    var key = this.data.search_value
    // 搜索简历
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/search_resume',
      data: {
        place_id: place_id,
        place_parent_id: place_parent_id,
        industry_id: industry_id,
        position_class: position_class,
        edu_id: edu_id,
        sex_id: sex_id,
        age: age,
        page: page,
        key: key,
        token: token



      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('搜索简历成功', e)
          for (var i = 0; i < e.data.data.length; i++) {
            resume_list_data.push(e.data.data[i])
          }

          that.setData({
            resume_list: resume_list_data,
            

          })

          if(e.data.data.length==0){
            if (that.data.resume_list.length==0){
              that.setData({
                search_list_length: true
              })

            }
          
          }


        } else {
          console.log("搜索简历 失败")

        }

      },
      fail(e) {

      },
      complete() {
        that.setData({
          search_jiazai: false
        })
      }
    })


  },

  input(e){
    console.log(e)
    this.setData({
      search_value:e.detail.value
    })
  },
  search(){
    resume_list_data=[]
    this.setData({
      resume_list:[],
      search_list_length:false
    })

    this.search_resume(0)
  },
  back(){
    wx.navigateBack({
      
    })
  }
})