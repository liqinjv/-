//获取应用实例
const app = getApp()

var images_url_list = []

Page({
  data: {

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    select: 0,
    theme: "bg-gradual-orange",
    // user_shouquan:true,

    // hburl: ['https://www.hr24.com.cn/static/images/xcx/haibao/1.jpg', 'https://www.hr24.com.cn/static/images/xcx/haibao/2.jpg', 'https://www.hr24.com.cn/static/images/xcx/haibao/3.jpg', 'https://www.hr24.com.cn/static/images/xcx/haibao/4.jpg', 'https://www.hr24.com.cn/static/images/xcx/haibao/5.jpg', 'https://www.hr24.com.cn/static/images/xcx/haibao/0.jpg'],

    index: null,
    index2: null,
    picker: [],
    picker2: ['风格一 | 镜月蓝', '风格二 | 鎏金橙', '风格三 | 樱花粉'],

    savebtnText: "保存海报到手机",
    painting: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.shouquan()
    images_url_list = []

    wx.hideShareMenu()

    this.get_commpany_jd()
    this.setData({
      theme: app.globalData.theme,
    })

    if (this.data.data.jd_phone==null){
      this.setData({
        jd_phone:'暂无'
      })
    }
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
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  select: function(e) {
    // var data = e.currentTarget.dataset.num
    // this.setData({
    //   select:data
    // })

    wx.showToast({
      title: '暂未开通，敬请期待',
      icon: 'none',
      duration: 2000
    })

  },

  look_image: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url
    console.log('二维码url', this.data.two_code_url)

    wx.navigateTo({
      url: '/pages/generate _poster/generate _poster?url=' + url + "&two_code=" + this.data.two_code_url,
    })


    // wx.previewImage({
    //   current: e.currentTarget.dataset.url,
    //   urls: [e.currentTarget.dataset.url],     

    // })

    // wx.showToast({
    //   title: '暂未开通，敬请期待',
    //   icon: 'none',
    //   duration: 2000
    // })
  },

  // 获取海报页面列表
  get_haibao_url() {
    var that = this
    var phone = wx.getStorageSync('phone')
    var token = this.encode()
    console.log(that.data.jd_id_list[that.data.index], 11111111111111)
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/promotion_and_digital/poster_list',
      data: {

        user_id: phone,
        jd_id: that.data.jd_id_list[that.data.index],
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
    // var base = '../../utils/base64.js';
    // var result = base.encode(str);
    var base64_str = app.base64_encode(str)
    console.log(base64_str)
    return base64_str



  },
  PickerChange(e) {
    console.log(e, 111);
    this.setData({
      index: e.detail.value
    })
    this.get_haibao_url()

  },
  PickerChange2(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },

  get_commpany_jd() {
    var token = this.encode()
    var phone = wx.getStorageSync('phone')
    var that = this
    wx.request({

      method: "POST",
      url: 'https://www.hr24.com.cn/recruitmen_tools/get_company_jd',
      data: {
        company_id: phone,
        token: token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(e) {
        console.log(e);
        if (e.data.message == 'ok') {
          console.log('请求成功111', e)


          // 获取公司所在的城市id
          that.setData({
            xianju: e.data.data[0].company__city_id
          })

          var x = []
          var l = []
          var jd_id_list = []
          var gwId = []

          for (var i = 0; i < e.data.data.length; i++) {
            if (x.indexOf(e.data.data[i].jd_title) == -1 && l.indexOf(e.data.data[i].position_id) == -1) {
              x.push(e.data.data[i].jd_title)
              l.push(e.data.data[i].position_id)
              jd_id_list.push(e.data.data[i].id)
              gwId.push(e.data.data[i].id)
            }

          }
          console.log(x)
          that.setData({
            picker: x,
            jd_id_list: jd_id_list
          })

        } else {
          console.log("请求失败", e)
          wx.showToast({
            title: '网络异常，请求失败',
            icon: 'none',
            duration: 2000
          })

        }

      }
    })
  },

  // 点击生成分享图
  imgs_share() {


    var that = this

    console.log(that.data.jd_id_list[that.data.index], 'jdids')

    if (that.data.index) {
      var phone = wx.getStorageSync('phone')
      var token = this.encode()
      console.log(token)
      wx.request({

        method: "POST",
        url: 'https://www.hr24.com.cn/recruitmen_tools/jd_info_display',
        data: {
          company_id: phone,
          jobhunter_id: phone,

          jd_id: that.data.jd_id_list[that.data.index],

          token: token

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(e) {
          console.log(e)
          if (e.data.message == 'ok') {
            console.log("职位详情请求成功22", e)

            that.setData({
              toudi: e.data.data.is_post,
              data: e.data.data.jd_info,
              jiazai: false,



              latitude: e.data.data.jd_info.company__Latitude,
              longitude: e.data.data.jd_info.company__Longitude,
              company__company_name: e.data.data.jd_info.company__company_name,
              company__company_address: e.data.data.jd_info.company__company_address,




            })

            var position_content = e.data.data.jd_info.position_content.replace(/\\n/g, "\n")

            that.setData({
              position_content: position_content,
            })
            wx.setStorageSync('haibao_data', that.data.data)
            console.log(Number(that.data.index2) + 1, '%%%%%%%%%%%%%%%')
            // wx.navigateTo({
            //   url: '/pages/generate _poster/generate _poster?data=' + JSON.stringify(that.data.data) + "&two_url=" + that.data.two_code_url + "&fengge=" + (Number(that.data.index2) + 1),
            // })

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

                // 下载微信头像
                wx.downloadFile({
                  url: avatarUrl,
                  success: res => {
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    if (res.statusCode === 200) {


                      that.setData({
                        locolurl: res.tempFilePath //将下载下来的地址给data中的变量变量
                      });




                      var url1 = 'https://www.hr24.com.cn/static/images/xcx/haibao1.jpg'
                      var url2 = 'https://www.hr24.com.cn/static/images/xcx/haibao1.png'

                      that.setData({
                        painting: {
                          width: 650,
                          height: 1200,
                          clear: true,
                          views: [{
                              type: 'image',
                              url: url1,
                              top: 0,
                              left: 0,
                              width: 650,
                              height: 1200
                            },


                            {
                              type: 'image',
                              url: that.data.locolurl,
                              top: 128,
                              left: 90,
                              width: 120,
                              height: 120
                            },

                            {
                              type: 'image',
                              url: url2,
                              top: 125,
                              left: 88,
                              width: 125,
                              height: 125
                            },


                            {
                              type: 'text',
                              content: nickName,
                              fontSize: 30,
                              color: '#383549',
                              textAlign: 'left',
                              top: 200,
                              left: 250
                            },


                            {
                              type: 'image',
                              url: that.data.data.company__company_logo,
                              top: 500,
                              left: 88,
                              width: 135,
                              height: 135
                            },

                            {
                              type: 'text',
                              content: that.data.data.salary + '元',
                              fontSize: 26,
                              color: '#dd3e3e',
                              textAlign: 'left',
                              top: 515,
                              left: 250
                            },

                            {
                              type: 'text',
                              content: "联系方式：" + that.data.data.jd_phone,
                              fontSize: 22,
                              color: '#999999',
                              textAlign: 'left',
                              top: 880,
                              left: 108
                            },

                            {
                              type: 'text',
                              content: that.data.data.jd_title,
                              fontSize: 24,
                              color: '#333333',
                              textAlign: 'left',
                              top: 560,
                              left: 250
                            },

                            {
                              type: 'text',
                              content: that.data.data.company__company_name,
                              fontSize: 23,
                              color: '#999999',
                              textAlign: 'left',
                              top: 601,
                              left: 250
                            },

                            {
                              type: 'text',
                              content: that.data.data.exp,
                              fontSize: 23,
                              color: '#999999',
                              textAlign: 'left',
                              top: 686,
                              left: 217
                            },

                            {
                              type: 'text',
                              content: that.data.data.edu_background,
                              fontSize: 23,
                              color: '#999999',
                              textAlign: 'left',
                              top: 686,
                              left: 475
                            },

                            {
                              type: 'text',
                              content: that.data.data.jd_tag.length > 13 ? that.data.data.jd_tag.substring(0, 14) + '..' : that.data.data.jd_tag,
                              fontSize: 23,
                              color: '#999999',
                              textAlign: 'left',
                              top: 740,
                              left: 217
                            },
                            {
                              type: 'text',
                              content: that.data.data.company__city__name + that.data.data.company__company_address,
                              fontSize: 23,
                              color: '#999999',
                              textAlign: 'left',
                              top: 794,
                              left: 217,
                              width: 300,
                              MaxLineNumber: 2,
                              lineHeight: 40,
                              breakWord: true,

                            },
                            {
                              type: 'image',
                              url: that.data.two_code_url,
                              top: 940,
                              left: 160,
                              width: 125,
                              height: 125
                            },

                          ]
                        }



                      })


                    }
                  },
                  fail: res => {
                    console.log(res);
                  }
                });


              }
            })





          } else {
            console.log("职位详情请求出错了")
            that.setData({
              jiazai: false
            })
            wx.showModal({
              title: '提示',
              content: '加载失败，是否刷新',
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


    } else {
      console.log("没有选择职位")
      wx.showToast({
        title: '还没有选择职位',
        icon: 'none',
        duration: 1000
      })

    }


  },
  completed(e) {
    console.log("生成成功", e)
    this.setData({
      jiazai: false
    })
  },

  //保存海报成功
  saveImage(e) {
    console.log("保存海报成功", e)
  },

  shouquan() {
    var that = this


    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            user_shouquan: false
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({

            success(res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender // 性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              console.log(res)

              console.log('获取成功')
              that.setData({
                nickName: nickName,
                avatarUrl: avatarUrl,
                gender: gender

              })
            }
          })
        } else {
          console.log("没有授权")
          that.setData({
            user_shouquan: true
          })
        }
      }
    })

  },

  bindGetUserInfo(e) {
    var that = this;
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log('用户点击允许')
      that.shouquan()



    } else {
      console.log('用户点击拒绝')
      wx.showToast({
        title: '允许授权后才可使用',
        icon: 'none',
        duration: 2000
      })


    }

  },
  eventDraw() {
    var that = this
    wx.showLoading({
      title: '玩命生成中..',
      mask: true
    })
    if (images_url_list.length == 3) {
      images_url_list = []
      this.imgs_share()
    }

    if (images_url_list.length == 0) {
      this.imgs_share()
    }
    if (images_url_list.length == 1) {

      this.setData({
        painting: {
          width: 650,
          height: 1200,
          clear: true,
          views: [{
              type: 'image',
              url: 'https://www.hr24.com.cn/static/images/xcx/haibao2.jpg',
              top: 0,
              left: 0,
              width: 650,
              height: 1200
            },


            {
              type: 'image',
              url: that.data.locolurl,
              top: 128,
              left: 90,
              width: 120,
              height: 120
            },

            {
              type: 'image',
              url: 'https://www.hr24.com.cn/static/images/xcx/haibao2.png',
              top: 125,
              left: 88,
              width: 125,
              height: 125
            },


            {
              type: 'text',
              content: that.data.nickName,
              fontSize: 30,
              color: '#383549',
              textAlign: 'left',
              top: 200,
              left: 250
            },


            {
              type: 'image',
              url: that.data.data.company__company_logo,
              top: 500,
              left: 88,
              width: 135,
              height: 135
            },

            {
              type: 'text',
              content: that.data.data.salary + '元',
              fontSize: 26,
              color: '#dd3e3e',
              textAlign: 'left',
              top: 515,
              left: 250
            },

            {
              type: 'text',
              content: "联系方式：" + that.data.data.jd_phone,
              fontSize: 22,
              color: '#999999',
              textAlign: 'left',
              top: 880,
              left: 108
            },

            {
              type: 'text',
              content: that.data.data.jd_title,
              fontSize: 24,
              color: '#333333',
              textAlign: 'left',
              top: 560,
              left: 250
            },

            {
              type: 'text',
              content: that.data.data.company__company_name,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 601,
              left: 250
            },

            {
              type: 'text',
              content: that.data.data.exp,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 686,
              left: 217
            },

            {
              type: 'text',
              content: that.data.data.edu_background,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 686,
              left: 475
            },

            {
              type: 'text',
              content: that.data.data.jd_tag.length > 13 ? that.data.data.jd_tag.substring(0, 14) + '..' : that.data.data.jd_tag,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 740,
              left: 217
            },
            {
              type: 'text',
              content: that.data.data.company__city__name + that.data.data.company__company_address,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 794,
              left: 217,
              width: 300,
              MaxLineNumber: 2,
              lineHeight: 40,
              breakWord: true,

            },
            {
              type: 'image',
              url: that.data.two_code_url,
              top: 940,
              left: 160,
              width: 125,
              height: 125
            },

          ]
        }



      })
    }
    if (images_url_list.length == 2) {

      this.setData({
        painting: {
          width: 650,
          height: 1200,
          clear: true,
          views: [{
              type: 'image',
              url: 'https://www.hr24.com.cn/static/images/xcx/haibao3.jpg',
              top: 0,
              left: 0,
              width: 650,
              height: 1200
            },


            {
              type: 'image',
              url: that.data.locolurl,
              top: 128,
              left: 90,
              width: 120,
              height: 120
            },

            {
              type: 'image',
              url: 'https://www.hr24.com.cn/static/images/xcx/haibao3.png',
              top: 125,
              left: 88,
              width: 125,
              height: 125
            },


            {
              type: 'text',
              content: that.data.nickName,
              fontSize: 30,
              color: '#383549',
              textAlign: 'left',
              top: 200,
              left: 250
            },


            {
              type: 'image',
              url: that.data.data.company__company_logo,
              top: 500,
              left: 88,
              width: 135,
              height: 135
            },

            {
              type: 'text',
              content: that.data.data.salary + '元',
              fontSize: 26,
              color: '#dd3e3e',
              textAlign: 'left',
              top: 515,
              left: 250
            }, 
            {
              type: 'text',
              content: "联系方式：" + that.data.data.jd_phone,
              fontSize: 22,
              color: '#999999',
              textAlign: 'left',
              top: 880,
              left: 108
            },

            {
              type: 'text',
              content: that.data.data.jd_title,
              fontSize: 24,
              color: '#333333',
              textAlign: 'left',
              top: 560,
              left: 250
            },

            {
              type: 'text',
              content: that.data.data.company__company_name,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 601,
              left: 250
            },

            {
              type: 'text',
              content: that.data.data.exp,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 686,
              left: 217
            },

            {
              type: 'text',
              content: that.data.data.edu_background,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 686,
              left: 475
            },

            {
              type: 'text',
              content: that.data.data.jd_tag.length > 13 ? that.data.data.jd_tag.substring(0, 14) + '..' : that.data.data.jd_tag,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 740,
              left: 217
            },
            {
              type: 'text',
              content: that.data.data.company__city__name + that.data.data.company__company_address,
              fontSize: 23,
              color: '#999999',
              textAlign: 'left',
              top: 794,
              left: 217,
              width: 300,
              MaxLineNumber: 2,
              lineHeight: 40,
              breakWord: true,

            },
            {
              type: 'image',
              url: that.data.two_code_url,
              top: 940,
              left: 160,
              width: 125,
              height: 125
            },

          ]
        }



      })
    }






  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    var that = this
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath,
        painting: {}
      })

      images_url_list.push(tempFilePath)

      if (images_url_list.length != 3) {
        this.eventDraw()
      }

      // 如果url列表长度是3条，就打开图片
      if (images_url_list.length == 3) {
        wx.hideLoading()
        console.log()
        wx.previewImage({
          current: images_url_list[0],
          urls: images_url_list,
        });

      }

      console.log(images_url_list)
      console.log(that.data.two_code_url, 9999099999999999999999999999)


    }

  },

  // 打开图片查看
  previewImage() {
    wx.hideLoading()
    console.log()
    wx.previewImage({
      current: images_url_list[0],
      urls: images_url_list,
    });
  }




})