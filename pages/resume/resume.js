const app = getApp()
var all_data_list = []
var success_data_list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    all_or_through: 'all',
    all_page: 0,
    success_page: 0,
    all_data: [],
    success_data: [],
    kong: "无",
    text: "HR正在为您审核...",
    kongNew: '',
    is_ord: "",
    lock: false,


    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null


  },
  // 监听tabBar是否点击了
  onTabItemTap(item) {
    console.log(item)
    if (this.data.is_all) {
      this.get_user_resume_all();
    } else {

      this.get_user_resume_success_all()
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {
    this.setData({
      jiazai: true
    })
    // 初始化页面，清零一些变量
    // this.init_data()
    this.get_user_resume_all()


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
    var that = this;
    console.log("刷新了？")
    this.setData({
      theme: app.globalData.theme,
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  back: function() {
    wx.navigateBack({

    })
  },
  // all(){
  //   console.log(1)
  //   if(this.data.all_or_through=='all'){
  //     this.setData({
  //       all_or_through: "through"
  //     })
  //   }else{
  //     this.setData({
  //       all_or_through: "all"
  //     })
  //   }

  // },

  liechang_resume_detail(e) {
    //检查锁
    if (this.data.lock) {
      return;
    }
    console.log("点击")
    console.log(e, "这是猎场数据")
    var id = e.currentTarget.dataset.resume_id
    var s_r_id = e.currentTarget.dataset.source_resume_id
    var status = e.currentTarget.dataset.status
    try {
      var is_ord = e.currentTarget.dataset.is_ord
    } catch (e) {
      var is_ord = 1
    }

    console.log(e.currentTarget.dataset, "这是id")
    console.log(is_ord, "这是sis_ord")
    
    // 猎场简历库详情而
    wx.navigateTo({
      url: '/pages/liechang/liechang?resume_id=' + id + "&source_resume_id=" + s_r_id + "&referer=1" + "&status=" + status + "&isOrd=" + is_ord,
    })


  },

  // 加载全部简历
  get_user_resume_all() {

    // 初始化页面，清零一些变量
    this.init_data()

    // 显示加载框,页面按钮状态变量修改
    this.setData({
      jiazai: true,
      is_all: true,
      success_shangla: false,
      all_shangla: true,
      all_or_through: "all"

    })

    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var page = this.data.all_page

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/user_resume_list',
      data: {

        user_id: phone,
        success_resume: 0,
        token: token,
        page: page

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求简历库信息成功')
          // that.setData({
          //   is_ord: e.data.data.is_ordinary
          // })

          // 清空旧数据列表，避免发生叠加
          all_data_list = []

          that.setData({
            all_num: e.data.data.length
          })

          for (var i = 0; i < e.data.data.length; i++) {
            all_data_list.push(e.data.data[i])
          }
          that.setData({
            all_data: all_data_list
          })


        } else {
          console.log("请求失败")
          wx.showModal({
            title: '提示',
            content: '网络异常，请求失败，是否刷新',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.init_data()
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }


      },
      fail() {

      },
      complete() {
        that.setData({
          jiazai: false
        })


      }
    })
  },

  // 加载成功的简历 
  get_user_resume_success_all(e) {
    // 初始化页面，清零一些变量
    this.init_data()

    // 显示 加载框，按钮状态变量修改
    this.setData({
      jiazai: true,
      is_all: false,
      success_shangla: true,
      all_shangla: false,
      all_or_through: "through"
    })

    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var success_page = this.data.success_page

    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/user_resume_list',
      data: {

        user_id: phone,
        success_resume: 1,
        token: token,
        page: success_page

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log(e, '请求简历库信息成功')

          // 清空旧数据列表 避免发生叠加
          success_data_list = []


          that.setData({
            success_num: e.data.data.length
          })

          for (var i = 0; i < e.data.data.length; i++) {
            success_data_list.push(e.data.data[i])
          }
          that.setData({
            success_data: success_data_list,
            success_num: e.data.data.length
          })


        } else {
          console.log("请求失败")
          wx.showModal({
            title: '提示',
            content: '网络异常，请求失败，是否刷新',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.init_data()
                that.onLoad()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }


      },
      fail() {

      },
      complete() {
        that.setData({
          jiazai: false
        })


      }
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
    // console.log(phone,time,e,r)

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

    console.log(data + e + r)
    var str = data + e + r

    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },

  init_data() {
    // 初始化页面数据
    var all_data_list = []
    var success_data_list = []
    this.setData({
      all_data: [],
      success_data: [],
      jiazia: true,
      all_page: 0,
      success_page: 0


    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    // 判断是加载全部简历
    if (this.data.all_or_through == 'all') {
      // 判断上次加载的简历 是否是15
      if (this.data.all_num == 15) {
        this.setData({
          all_shangla: true
        })

        // 对全部简历的page进行累加
        var a = this.data.all_page += 15

        this.setData({
          all_page: a
        })

        var that = this
        var token = this.encode()
        var phone = wx.getStorageSync('phone')
        var page = this.data.all_page

        wx.request({

          method: "POST",
          url: 'https://www.hr24.com.cn/hunting_ground/user_resume_list',
          data: {

            user_id: phone,
            success_resume: 0,
            token: token,
            page: page

          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(e) {
            if (e.data.message == 'ok') {
              console.log(e, '新添加全部简历列表信息成功')


              for (var i = 0; i < e.data.data.length; i++) {
                all_data_list.push(e.data.data[i])
              }
              that.setData({
                all_data: all_data_list,
                all_num: e.data.data.length
              })




            } else {
              console.log("请求失败")
              wx.showModal({
                title: '提示',
                content: '网络异常，请求失败，是否刷新',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.init_data()

                    that.onLoad()
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }


          }
        })


      } else {
        // 上一次加载的全部简历没15
        this.setData({
          all_shangla: false
        })

      }



    } else {
      // 加载成功的简历
      console.log("下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉下拉")
      if (this.data.success_num == 15) {
        var succ = this.data.success_page += 15

        this.setData({
          success_page: succ
        })

        var that = this
        var token = this.encode()
        var phone = wx.getStorageSync('phone')
        var success_page = this.data.success_page

        wx.request({

          method: "POST",
          url: 'https://www.hr24.com.cn/hunting_ground/user_resume_list',
          data: {

            user_id: phone,
            success_resume: 1,
            token: token,
            page: success_page

          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(e) {
            if (e.data.message == 'ok') {
              console.log(e, '新添加成功的简历信息成功')



              for (var i = 0; i < e.data.data.length; i++) {
                success_data_list.push(e.data.data[i])
              }
              that.setData({
                success_data: success_data_list,
                success_num: e.data.data.length
              })


            } else {
              console.log("请求失败")
              wx.showModal({
                title: '提示',
                content: '网络异常，请求失败，是否刷新',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.init_data()
                    that.onLoad()
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }


          }
        })
      } else {
        // 上一次加载成功的没有15条
        this.setData({
          success_shangla: false
        })
      }

    }


  },

  /// 按钮触摸开始触发的事件
  touchStart: function(e) {
    this.touchStartTime = e.timeStamp
  },

  /// 按钮触摸结束触发的事件
  touchEnd: function(e) {
    this.touchEndTime = e.timeStamp
  },

  /// 长按
  longTap: function(e) {
    this.setData({
      lock: true
    });
    console.log('长按', e)
    var that = this
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var resume_id = e.currentTarget.dataset.resume_id

    console.log("long tap")
    wx.showModal({
      title: '提示',
      content: '确定要删除这份简历吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({

            method: "POST",
            url: 'https://www.hr24.com.cn/hunting_ground/del_user_resume',
            data: {

              user_id: phone,
              resume_id: resume_id,
              token: token,


            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(e) {
              if (e.data.message == 'ok') {

                console.log(e)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
                that.onLoad()
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none',
                  duration: 1000
                })
              }

            },
            fail() {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1000
              })
            },complete(){
              that.setData({
                lock: false
              });
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // tap: function() {
  //   //检查锁
  //   if (this.data.lock) {
  //     return;
  //   }
  //   console.log('触发了 tap')
    
  // },
  // touchend: function() {
  //   if (this.data.lock) {
  //     //开锁
  //     setTimeout(() => {
  //       this.setData({
  //         lock: false
  //       });
  //     }, 100);
  //   }
  // },
  // longtap: function() {
  //   //锁住
  //   this.setData({
  //     lock: true
  //   });
  //   console.log('触发了 longtap')
    
  // }






})