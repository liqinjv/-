const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    jiazai: true,
    add_resume: false,
    new_or_old_resume:"",
    isOrd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      status: options.status,
      referer: options.referer,
      resume_id: options.resume_id,
      source_resume_id: options.source_resume_id,
      new_or_old_resume: Number( options.new_or_old_resume),
      isOrd:Number(options.isOrd)
    })
    console.log(this.data.referer)
    console.log(this.data.isOrd,"判断是否显示申诉")


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
    if (this.data.referer == 1) {
      this.get_user_resume_info()
    } else {
      this.get_resume_info()
    }


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

  back: function () {
    console.log('点击返回')
    wx.navigateBack({
      
    })
  },
  // 进入猎场简历 库
  resume() {
    wx.navigateTo({
      url: '/pages/resume/resume',
    })
  },

  // 申诉简历
  The_complaint() {

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
  get_user_resume_info() {
    // 获取简历库中简历详情

    var that = this
    var phone = wx.getStorageSync('phone')
    var source_resume_id = this.data.source_resume_id
    var resume_id = this.data.resume_id
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/user_resume_info',
      data: {
        user_id: phone,
        resume_id: resume_id,
        source_resume_id: source_resume_id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('简历详情', e)      
          var strs = ''
          var strr = ''

          try { strs = e.data.data.resume_info.position_content.split("、"); } catch (es) {
            strs = e.data.data.resume_info.position_content
            console.log("职位字符串切割失败")
          }

          try { strr = e.data.data.resume_info.place_content.split("、"); } catch (es) {
            strr = e.data.data.resume_info.place_content
            console.log("职位字符串切割失败")
          }

          if (e.data.data.user_had > 0) {
            that.setData({
              no_get_phone: true
            })
          } else {
            that.setData({
              no_get_phone: false
            })
          }

          that.setData({
            resume: e.data.data.resume_info,
            resume_work_exp: e.data.data.resume_work_exp,
            jiazai: false,
            position_list: strs,
            place_list: strr,
            work_exp_list: e.data.data.resume_work_exp,

          })


        } else {
          console.log("猎场简历列表请求失败", e)
          that.setData({
            jiazai: false
          })
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


  get_resume_info() {
    // 获取简历详情

    var that = this
    var phone = wx.getStorageSync('phone')
    var source_resume_id = this.data.source_resume_id
    var resume_id = this.data.resume_id
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/resume_info',
      data: {
        user_id: phone,
        resume_id: resume_id,
        source_resume_id: source_resume_id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log('简历详情', e)
          var strs = ''
          var strr = ''

          try { strs = e.data.data.resume_info.position_content.split("、"); } catch (es) {
            strs = e.data.data.resume_info.position_content
            console.log("职位字符串切割失败")
          }

          try { strr = e.data.data.resume_info.place_content.split("、"); } catch (es) {
            strr = e.data.data.resume_info.place_content
            console.log("职位字符串切割失败")
          }

          if (e.data.data.user_had > 0) {
            that.setData({
              no_get_phone: true
            })
          } else {
            that.setData({
              no_get_phone: false
            })
          }

          that.setData({
            resume: e.data.data.resume_info,
            resume_work_exp: e.data.data.resume_work_exp,
            jiazai: false,
            position_list: strs,
            place_list: strr,
            work_exp_list: e.data.data.resume_work_exp,

          })


        } else {
          console.log("猎场简历列表请求失败", e)
          that.setData({
            jiazai: false
          })
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

  add_resume(e) {
    var that = this
    // 最新简历获取联系方式
    if (that.data.new_or_old_resume==0){
    wx.showModal({
      title: '温馨提示',
      content: '将简历交给专业HR为您审核，在简历库中可查看审核进度',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
          // that.setData({
          //   add_resume: true
          // })
          // 判断 是从哪个页面进入的，最新简历还是普通简历 0最新 1普通
          if(that.data.new_or_old_resume==0){
            console.log(e)
            // 添加简历 到简历库
            
            var token = that.encode()
            var phone = wx.getStorageSync('phone')
            var resume_id = that.data.resume_id

            wx.request({

              method: "POST",
              url: 'https://www.hr24.com.cn/hunting_ground/user_post_resume',
              data: {
                user_id: phone,
                resume_id: resume_id,
                token: token,
                from_id: that.data.formid

              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(e) {
                if (e.data.message == 'ok') {
                  console.log('添加到用户简历库', e)
                  if (e.data.message == 'ok') {
                    wx.showToast({
                      title: '添加简历库成功',
                      icon: 'success',
                      duration: 2000
                    })

                    that.setData({
                      no_get_phone: true
                    })

                  } else {
                    if (e.data.message == -2) {
                      that.setData({
                        no_get_phone: true
                      })
                      wx.showToast({
                        title: '简历库已经存在该简历',
                        icon: 'none',
                        duration: 2000
                      })
                      // 短暂振动
                      wx.vibrateShort()
                    }  else {
                      that.setData({
                        no_get_phone: true
                      })
                      wx.showToast({
                        title: '添加失败',
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  }
                } else if (e.data.message == -4) {
                  console.log("进来了吗")
                  wx.showModal({
                    title: '提示',
                    content: '用户尊享简历点不够',
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        that.onLoad()
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  console.log("添加到用户简历库失败", e)
                  that.setData({
                    jiazai: false,
                    no_get_phone: false

                  })
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

              }, fail() {

              }, complete() {
                that.setData({
                  add_resume: false
                })
              }
            })
          }else{
            console.log(e)
            // 添加已经审核过的简历 到简历库
            
            var token = that.encode()
            var phone = wx.getStorageSync('phone')
            var resume_id = that.data.resume_id

            wx.request({

              method: "POST",
              url: 'https://www.hr24.com.cn/hunting_ground/post_ordinary_resume',
              data: {
                user_id: phone,
                resume_id: resume_id,
                token: token

              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(e) {
                if (e.data.message == 'ok') {
                  console.log('添加旧的简历到到用户简历库', e)
                  if (e.data.message == 'ok') {
                    wx.showToast({
                      title: '添加简历库成功',
                      icon: 'success',
                      duration: 2000
                    })

                    that.setData({
                      no_get_phone: true
                    })

                  } else {
                    if (e.data.message == -2) {
                      that.setData({
                        no_get_phone: true
                      })
                      wx.showToast({
                        title: '简历库已经存在该简历',
                        icon: 'none',
                        duration: 2000
                      })
                      // 短暂振动
                      wx.vibrateShort()
                    } else {
                      that.setData({
                        no_get_phone: true
                      })
                      wx.showToast({
                        title: '添加失败',
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  }


                } else {
                  console.log("添加到用户简历库失败", e)
                  that.setData({
                    jiazai: false,
                    no_get_phone: false

                  })
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

              }, fail() {

              }, complete() {
                that.setData({
                  add_resume: false
                })
              }
            })
          }
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }else if(that.data.new_or_old_resume==1){
    // 普通简历获取联系方式
      wx.showModal({
        title: '温馨提示',
        content: '在简历库中可查看简历',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定', res)

            // that.setData({
            //   add_resume: true
            // })
            // 判断 是从哪个页面进入的，最新简历还是普通简历 0最新 1普通
            if (that.data.new_or_old_resume == 0) {
              console.log(e)
              // 添加简历 到简历库

              var token = that.encode()
              var phone = wx.getStorageSync('phone')
              var resume_id = that.data.resume_id

              wx.request({

                method: "POST",
                url: 'https://www.hr24.com.cn/hunting_ground/user_post_resume',
                data: {
                  user_id: phone,
                  resume_id: resume_id,
                  token: token

                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success(e) {
                  if (e.data.message == 'ok') {
                    console.log('添加到用户简历库', e)
                    if (e.data.message == 'ok') {
                      wx.showToast({
                        title: '添加简历库成功',
                        icon: 'success',
                        duration: 2000
                      })

                      that.setData({
                        no_get_phone: true
                      })

                    } else {
                      if (e.data.message == -2) {
                        that.setData({
                          no_get_phone: true
                        })
                        wx.showToast({
                          title: '简历库已经存在该简历',
                          icon: 'none',
                          duration: 2000
                        })
                        // 短暂振动
                        wx.vibrateShort()
                      } else {
                        that.setData({
                          no_get_phone: true
                        })
                        wx.showToast({
                          title: '添加失败',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }


                  } else {
                    console.log("添加到用户简历库失败", e)
                    that.setData({
                      jiazai: false,
                      no_get_phone: false

                    })
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

                }, fail() {

                }, complete() {
                  that.setData({
                    add_resume: false
                  })
                }
              })
            } else {
              console.log(e)
              // 添加已经审核过的简历 到简历库

              var token = that.encode()
              var phone = wx.getStorageSync('phone')
              var resume_id = that.data.resume_id

              wx.request({

                method: "POST",
                url: 'https://www.hr24.com.cn/hunting_ground/post_ordinary_resume',
                data: {
                  user_id: phone,
                  resume_id: resume_id,
                  token: token

                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success(e) {
                  if (e.data.message == 'ok') {
                    console.log('添加旧的简历到到用户简历库', e)
                    if (e.data.message == 'ok') {
                      wx.showToast({
                        title: '添加简历库成功',
                        icon: 'success',
                        duration: 2000
                      })

                      that.setData({
                        no_get_phone: true
                      })

                    } else {
                      if (e.data.message == -2) {
                        that.setData({
                          no_get_phone: true
                        })
                        wx.showToast({
                          title: '简历库已经存在该简历',
                          icon: 'none',
                          duration: 2000
                        })
                        // 短暂振动
                        wx.vibrateShort()
                      } else {
                        that.setData({
                          no_get_phone: true
                        })
                        wx.showToast({
                          title: '添加失败',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  }else if (e.data.message == -4) {
                    console.log("进来了吗")
                    wx.showModal({
                      title: '提示',
                      content: '用户普通简历点不够',
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          that.onLoad()
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else {
                    console.log("添加到用户简历库失败", e)
                    that.setData({
                      jiazai: false,
                      no_get_phone: false

                    })
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

                }, fail() {

                }, complete() {
                  that.setData({
                    add_resume: false
                  })
                }
              })
            }

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  }},

  The_complaint(e) {
    // 点击审诉

    console.log('点击审诉', e)

    wx.navigateTo({
      url: '/pages/shensu/shensu?resume_id=' + this.data.resume_id,
    })
  },

  call_phone(e) {
    // 拨打电话
    console.log("拨打电话111", e)
    wx.makePhoneCall({
      phoneNumber: this.data.resume.user_phone  // 仅为示例，并非真实的电话号码
    })

    var phone = wx.getStorageSync('phone')
    var that = this
    var token = this.encode()
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/hunting_ground/user_call',
      data: {

        user_id: phone,
        resume_id: that.data.resume_id,
        token: token

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        if (e.data.message == 'ok') {
          console.log("添加已拨请求成功", e)


        } else {
          console.log("添加已拨请求不成功", e)
          wx.showToast({
            title: '添加已拨不成功',
            icon: 'none',
            duration: 2000
          })
        }


      }
    })

  },

  submit(e) {
    console.log('提交表单', e)
    this.setData({
      formid: e.detail.formId
    })
  }




})
