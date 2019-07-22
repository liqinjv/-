//app.js
App({


  onLaunch: function(e) {


    var UpdateManager = wx.getUpdateManager()
    UpdateManager.onCheckForUpdate(function (e) {
      console.log('有无新版本', e.hasUpdate)
    })
    UpdateManager.onUpdateReady(function (e) {
      console.log('有新版本回调')

      UpdateManager.applyUpdate()
      wx.setStorageSync('employed', 0)



    })
    console.log('app_js',e)
    


    var is_login = wx.getStorageSync('is_login')
    var is_company = wx.getStorageSync('is_company')
    var phone = wx.getStorageSync('phone')

    this.globalData.is_login = wx.getStorageSync('is_login')
    this.globalData.is_company = wx.getStorageSync('is_company')
    this.globalData.phone = wx.getStorageSync('phone')


    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        this.globalData.StatusBar = e.statusBarHeight;
        

        let custom = wx.getMenuButtonBoundingClientRect();

        this.globalData.Custom = custom;

        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    


    //判断登录状态
    // if(is_login==true && is_company==1 && phone.length!=0){
    //   console.log("缓存判断通过，缓存登录", is_login, is_company, phone)
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })

    // }else{
    //   console.log("缓存判断未通过，没有登录", is_login, is_company, phone)
    // }

 
    
  },

  globalData: { 
    userInfo: null, 
    theme: "bg-gradual-orange",
     z :['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  decode_dict: { '\x65': '\x64\x65\x63\x6f\x64\x65\x5f\x31', '\x78': '\x64\x65\x63\x6f\x64\x65\x5f\x32', '\x67': '\x64\x65\x63\x6f\x64\x65\x5f\x33', '\x68': '\x64\x65\x63\x6f\x64\x65\x5f\x34', '\x66': '\x64\x65\x63\x6f\x64\x65\x5f\x35', '\x62': '\x64\x65\x63\x6f\x64\x65\x5f\x31', '\x79': '\x64\x65\x63\x6f\x64\x65\x5f\x32', '\x71': '\x64\x65\x63\x6f\x64\x65\x5f\x33', '\x63': '\x64\x65\x63\x6f\x64\x65\x5f\x34', '\x64': '\x64\x65\x63\x6f\x64\x65\x5f\x35', '\x76': '\x64\x65\x63\x6f\x64\x65\x5f\x31', '\x6b': '\x64\x65\x63\x6f\x64\x65\x5f\x32', '\x6d': '\x64\x65\x63\x6f\x64\x65\x5f\x33', '\x6f': '\x64\x65\x63\x6f\x64\x65\x5f\x34', '\x6c': '\x64\x65\x63\x6f\x64\x65\x5f\x35', '\x70': '\x64\x65\x63\x6f\x64\x65\x5f\x31', '\x74': '\x64\x65\x63\x6f\x64\x65\x5f\x32', '\x77': '\x64\x65\x63\x6f\x64\x65\x5f\x33', '\x75': '\x64\x65\x63\x6f\x64\x65\x5f\x34', '\x6e': '\x64\x65\x63\x6f\x64\x65\x5f\x35', '\x7a': '\x64\x65\x63\x6f\x64\x65\x5f\x31', '\x72': '\x64\x65\x63\x6f\x64\x65\x5f\x32', '\x61': '\x64\x65\x63\x6f\x64\x65\x5f\x33', '\x69': '\x64\x65\x63\x6f\x64\x65\x5f\x34', '\x6a': '\x64\x65\x63\x6f\x64\x65\x5f\x35', '\x73': '\x64\x65\x63\x6f\x64\x65\x5f\x31' }, decode_1: { 0: '\x73', 1: '\x66', 2: '\x6c', 3: '\x7a', 4: '\x67', 5: '\x69', 6: '\x70', 7: '\x74', 8: '\x68', 9: '\x64' }, decode_2: { 0: '\x79', 1: '\x6d', 2: '\x66', 3: '\x6a', 4: '\x69', 5: '\x65', 6: '\x6c', 7: '\x68', 8: '\x7a', 9: '\x75' }, decode_3: { 0: '\x70', 1: '\x72', 2: '\x75', 3: '\x6f', 4: '\x78', 5: '\x71', 6: '\x68', 7: '\x77', 8: '\x63', 9: '\x6c' }, decode_4: { 0: '\x61', 1: '\x72', 2: '\x63', 3: '\x62', 4: '\x6a', 5: '\x69', 6: '\x65', 7: '\x77', 8: '\x6b', 9: '\x67' }, decode_5: { 0: '\x62', 1: '\x66', 2: '\x6f', 3: '\x6e', 4: '\x6d', 5: '\x64', 6: '\x67', 7: '\x75', 8: '\x73', 9: '\x6b' }
   },
  onShow:function(e){
    console.log('app.js-onshow',e)
    


  },
  base64_encode:function(str) {
    //下面是64个基本的编码
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while(i <len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
  return out;
  }

 
})