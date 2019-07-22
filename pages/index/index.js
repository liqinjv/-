var resume_list_data = []
var old_resume_list_data = []
var search_data = []
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    theme: "bg-gradual-orange",
    tabs_index: 0,
    new_page: 0,
    new_jiazai: false,
    old_page: 0,
    old_jiazai: false,


  },

  onLoad: function() {
    resume_list_data=[]
    old_resume_list_data=[]
    // 获取缓存中的人才模型
    var place_id = wx.getStorageSync('plc_id')
    var place_parent_id = wx.getStorageSync('plc_parent_id')
    var industry_id = wx.getStorageSync('industry')
    var position_class = wx.getStorageSync('industry_class')
    var edu_id = wx.getStorageSync('edu')
    var sex_id = wx.getStorageSync('sex')
    var age = wx.getStorageSync('age')

    this.setData({
      place_id : place_id,
      place_parent_id: place_parent_id,
      industry_id: industry_id ,
      position_class: position_class ,
      edu_id: edu_id ,
      sex_id: sex_id ,
      age: age
    })

    // 判断是否有设置人才模型
    if (String(place_id).length != 0 && String(place_parent_id).length != 0 && String(industry_id).length != 0 && String(position_class).length != 0 && String(edu_id).length != 0 && String(sex_id).length != 0 && String(age).length != 0) {
      console.log("有设置人才模型")
      console.log(place_id)
      console.log(place_parent_id)
      console.log(industry_id)
      console.log(position_class)
      console.log(edu_id)
      console.log(sex_id)
      console.log(age)


      this.get_new_resume_list(0)
      this.get_old_resume_list(0)



    }else{
      wx.navigateTo({
        url: '/pages/init2/init2',
      })
      console.log("没有设置人才模型")
      console.log(place_id)
      console.log(place_parent_id)
      console.log(industry_id)
      console.log(position_class)
      console.log(edu_id)
      console.log(sex_id)
      console.log(age)
    }

    




  },


  onShow: function() {
    this.setData({
      theme: app.globalData.theme,
    })

    this.get_user_info()

    var is_init_index = wx.getStorageSync('is_init_index')
    if (is_init_index==0){
      console.log("重置过来")
      
      this.onLoad()
      wx.setStorageSync('is_init_index',1)    
    }

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


  details: function(e) {
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
  details2: function (e) {
    console.log("点击简历列表", e)
    var id = e.currentTarget.dataset.resume_id
    var s_r_id = e.currentTarget.dataset.source_resume_id
    var status = e.currentTarget.dataset.status
    var token = this.encode()

    // 判断简历是否是核实过的，核实过跳过校验
    if (false) {
      console.log('校验请求成功了', status)
      wx.navigateTo({
        url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0" + "&new_or_old_resume=1",
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
              url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0" + "&new_or_old_resume=1",
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
    if(page==0){
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
          for(var i =0;i<e.data.data.length;i++){
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

          
        }

      },complete(){
        that.setData({
          new_jiazai:false
        })
        wx.hideLoading()

      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉触底")
    // tabs_index 0 尊享 1普通
    var tabs_index = this.data.tabs_index
    if(tabs_index==0){
      this.setData({
        new_page:this.data.new_page+15,
        new_jiazai:true
      })
      
      this.get_new_resume_list(this.data.new_page)
    }else{
      this.setData({
        old_page: this.data.old_page + 15,
        old_jiazai: true
      })

      this.get_old_resume_list(this.data.old_page)
    }


  },

  

  // 顶部下拉刷新
  onPullDownRefresh() {
    console.log("顶部下拉刷新")
    this.onLoad()
  },


  // 获取用户的点数
  get_user_info() {
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/user_info/index',
      data: {

        user_id: phone,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求user信息成功')
          that.setData({
            user_info: e.data.data.user_info,
            jiazai: false
          })


        } else {
          console.log("请求失败")
         
        }


      }
    })
  },


  // 获取旧的简历数据
  get_old_resume_list(e) {
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


    var that = this
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/ordinary_resume_list',
      data: {
        place_id: place_id,
        place_parent_id: place_parent_id,

        page: page,
        token: token



      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('猎场普通简历列表', e)
          // old_resume_list_data = e.data.data
          for (var i = 0; i < e.data.data.length; i++) {
            old_resume_list_data.push(e.data.data[i])
          }
          that.setData({
            old_resume_list:old_resume_list_data
          })




          wx.stopPullDownRefresh();


        } else {
          console.log("猎场简历列表请求失败", e)

          
        }

      },complete(){
        that.setData({
          old_jiazai:false
        })
      }
    })
  },

  // '点击标签时触发'
  van_tabs(e) {
    console.log("点击时触发", e)
    this.setData({
      tabs_index: e.detail.index
    })
  },

  resume_ku(){
    wx.navigateTo({
      url: '/pages/resume/resume',
    })
  },

  search(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  

})