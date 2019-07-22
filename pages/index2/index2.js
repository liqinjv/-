var resume_list_data = []
var search_data = []
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    theme: "bg-gradual-orange",
    cardjd: '180deg',
    tcardsh: '1',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalName: 'DialogModal',
    index: 0,
    page: 0,
    search_page: 0,
    shouye_shangla: false,
    g_num: 15,
    search_g_num:15,
    search_str: '',
    search_page: 0,
    jiazai: true,
    list_null: false,
    search_data_list: ''



  },

  onLoad: function() {
    wx.hideShareMenu()

    this.setData({
      page: 0,
      g_num: 15
    })

    // 获取缓存中的人才模型
    try {

      var place_id = wx.getStorageSync('plc_id')
      var place_parent_id = wx.getStorageSync('plc_parent_id')
      var industry_id = wx.getStorageSync('industry')
      var position_class = wx.getStorageSync('industry_class')
      var edu_id = wx.getStorageSync('edu')
      var sex_id = wx.getStorageSync('sex')
      var age = wx.getStorageSync('age')

      console.log(place_id)
      console.log(place_parent_id)
      console.log(industry_id)
      console.log(position_class)
      console.log(edu_id)
      console.log(sex_id)
      console.log(age)

      // 判断 缓存中的是否全部是int类型
      if (String(place_id).length != 0 && String(place_parent_id).length != 0 && String(industry_id).length != 0 && String(position_class).length != 0 && String(edu_id).length != 0 && String(sex_id).length != 0 && String(age).length != 0) {
        console.log('判断人才模型缓存成功')
        this.setData({

          place_id: wx.getStorageSync('plc_id'),
          place_parent_id: wx.getStorageSync('plc_parent_id'),
          industry_id: wx.getStorageSync('industry'),
          position_class: wx.getStorageSync('industry_class'),
          edu_id: wx.getStorageSync('edu'),
          sex_id: wx.getStorageSync('sex'),
          age: wx.getStorageSync('age'),

        })
        // 获取猎场列表页面的数据
        this.get_resume_list(this.data.page)


      } else {
        console.log("读写人才模型失败，没有设置人才模型")
        console.log(place_id)
        console.log(place_parent_id)
        console.log(industry_id)
        console.log(position_class)
        console.log(edu_id)
        console.log(sex_id)
        console.log(age)

        wx.navigateTo({
          url: '/pages/init2/init2',
        })

      }
      console.log(typeof place_id)
    } catch (e) {
      console.log("读写人才模型失败，没有设置人才模型")
      wx.navigateTo({
        url: '/pages/init2/init2',
      })
    }

 

    // wx.setBackgroundColor({
    //   backgroundColorTop: '#ff8ff00', // 顶部窗口的背景色为白色
    //   backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
    // })


    // 判断搜索框
    // this.if_input_str()


  },


  onShow: function() {
    var is_init_index = wx.getStorageSync('is_init_index')
    if(is_init_index==0){
      wx.setStorageSync('is_init_index', 1)

      this.onLoad()
    }
    // 设置顶背景色
    this.setData({
      theme: app.globalData.theme,
    })


  },


  my_reusme: function(e) {
    wx.navigateTo({


      url: "/pages/basics/basics",
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

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },


  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


  // 获取微信用户的帐号
  getPhoneNumber(e) {
    wx.login({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  hide: function() {
    wx.hideTabBar({
      animation: true
    })
  },

  details: function(e) {
    console.log("点击简历列表", e)
    var id = e.currentTarget.dataset.resume_id
    var s_r_id = e.currentTarget.dataset.source_resume_id
    var status = e.currentTarget.dataset.status
    var token = this.encode()

    // 判断简历是否是核实过的，核实过跳过校验
    if(status==2){
      console.log('校验请求成功了', status)
      wx.navigateTo({
        url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0",
      })
    
    }else{
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
              url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=0" + "&status=0",
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


  liechang(e) {

    wx.navigateTo({
      url: '/pages/resume/resume',
    })
  },

  get_resume_list(e) {
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
          console.log('猎场简历列表', e)
          resume_list_data = e.data.data

          that.setData({
            resume_list: resume_list_data,
            shouye_shangla: false,
            jiazai: false

          })

          if (resume_list_data.length == 0) {
            that.setData({
              list_null: true
            })
          }else{
            that.setData({
              list_null: false
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

      }
    })
  }, 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉触底")
    // 判断是否是搜索的上拉触底
    if (this.data.is_search) {
      // 是搜索的数据

        //判断 搜索的列表数据有没有15条
      if(this.data.search_g_num<15){
        this.setData({
          search_shangla:false,
          shouye_shangla:false
        })
      }else{
        // 搜索的数据有15条

        // 累加搜索列表的page
        var s = this.data.search_page + 15
        this.setData({
          search_shangla: true,
          shouye_shangla: false,
          search_page: s
        })
        // 搜索简历。
        var token = this.encode()
        var that = this

        var place_id = this.data.place_id
        var place_parent_id = this.data.place_parent_id
        var industry_id = this.data.industry_id
        var position_class = this.data.position_class
        var edu_id = this.data.edu_id
        var sex_id = this.data.sex_id
        var age = this.data.age
        var search_page = this.data.search_page




        var key = this.data.search_str
        // 搜索简历

        console.log("加载下拉简历 page")
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
            page: this.data.search_page,
            key: key,
            token: token



          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(e) {
            if (e.data.message == 'ok') {
              console.log('搜索新的简历成功', e)
              for (var i = 0; i < e.data.data.length; i++) {
                search_data.push(e.data.data[i])
              }
              console.log("search_g_num",e.data.data.length)
              that.setData({
                search_data_list: search_data,
                search_g_num: e.data.data.length
              })

              if (e.data.data.length < 15) {
                that.setData({
                  addpage_null: true
                })
              } else {
                that.setData({
                  addpage_null: false
                })
              }


            } else {
              console.log("搜索简历 失败")

            }

          },
          fail(e) {

          },
          complete() {
            that.setData({
              jiazai: false
            })
          }
        })

      }

    } else {
      // 是首页加载的数据

      if (this.data.g_num < 15) {
        this.setData({
          shouye_shangla: false,
          search_shangla: false,
        })
        // 如果上次的返回的简历小于15条
        console.log("上次返回的简历没有15条")
      } else {
        var n = this.data.page + 15
        this.setData({
          shouye_shangla: true,
          search_shangla: false,
          page: n
        })


        var place_id = this.data.place_id
        var place_parent_id = this.data.place_parent_id
        var industry_id = this.data.industry_id
        var position_class = this.data.position_class
        var edu_id = this.data.edu_id
        var sex_id = this.data.sex_id
        var age = this.data.age
        var page = this.data.page

        var that = this
        var token = this.encode()
        wx.request({

          method: "POST",
          url: 'https://www.hr24.com.cn/hunting_ground/resume_list',
          data: {
            place_id: place_id,
            place_parent_id: place_parent_id,
            industry_id: industry_id,
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
              console.log('加载的新猎场简历列表', e)

              for (var i = 0; i < e.data.data.length; i++) {
                resume_list_data.push(e.data.data[i])
              }

              that.setData({
                resume_list: resume_list_data,
                shouye_shangla: false,
                g_num: e.data.data.length
              })

              console.log("判断 加载到的数据长度",e.data.data.length)
              if (e.data.data.length < 15) {
                that.setData({
                  addpage_null: true
                })
              } else {
                that.setData({
                  addpage_null: false
                })
              }




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

          }
        })
      }
    }

  },
  search() {
    console.log("点击搜索")
    search_data = []

    this.setData({
      is_search: true,
      jiazai: true,
      search_data_list: [],
      search_page: 0,
      addpage_null:false

    })
    this.search_resume()



  },

  search_input(e) {
    console.log(e)

    this.setData({
      search_str: e.detail.value

    })
    this.if_input_str()


  },
  search_input2(e) {
    console.log('点击搜索', e)

    this.setData({
      search_str: e.detail.value

    })
    this.if_input_str()


  },


  // 判断输入框中是否有字
  if_input_str() {
    // 如果有字
    if (this.data.search_str.length > 0) {
      console.log("显示搜索到的内容")


    } else {
      // 没有字
      console.log("没有字")
      // this.onLoad()
      // 清空之前的变量列表,data中的数据
      search_data = []
      this.setData({
        is_search: false,
        search_data_list: []
      })



    }

  },

  // 清空搜索并且返回
  repeal() {
    this.setData({
      repeal: '',
      is_search: false,
      search_str: ''
    })
  },




  // 顶部下拉刷新
  onPullDownRefresh() {
    this.onShow()
  },


  // 搜索简历。
  search_resume() {

    var token = this.encode()
    var that = this

    var place_id = this.data.place_id
    var place_parent_id = this.data.place_parent_id
    var industry_id = this.data.industry_id
    var position_class = this.data.position_class
    var edu_id = this.data.edu_id
    var sex_id = this.data.sex_id
    var age = this.data.age
    var page = 0




    var key = this.data.search_str
    // 搜索简历
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/search_resume',
      data: {
        place_id: place_id,
        place_parent_id:place_parent_id,
        industry_id: industry_id,
        position_class: position_class,
        edu_id: edu_id,
        sex_id: sex_id,
        age: age,
        page: this.data.search_page,
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
            search_data.push(e.data.data[i])
          }
          that.setData({
            search_data_list: search_data,
            search_g_num:e.data.data.length
          })



        } else {
          console.log("搜索简历 失败")

        }

      },
      fail(e) {

      },
      complete() {
        that.setData({
          jiazai: false
        })
      }
    })


  },

  refresh(){
    // 刷新页面
    this.onLoad()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 600
    })
  },
  cardfz: function (e) {
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    var that = this;
    if (id == '1') {
      this.setData({
        if_: 1
      })

      setTimeout(function () {
        that.setData({ tcardzta: 'none' });
      }, 800);
      setTimeout(function () {
        that.setData({ tcardztb: 'block', tcardsh: '2' });
      }, 1000);
      that.setData({ cardjd: '0deg' });
    } else {
      this.setData({
        if_: 2
      })

      setTimeout(function () {
        that.setData({ tcardztb: 'none' });
      }, 600);
      setTimeout(function () {
        that.setData({ tcardzta: 'block', tcardsh: '1' });
      }, 1000);
      that.setData({
        cardjd: '180deg',
      });
    }

  }


})