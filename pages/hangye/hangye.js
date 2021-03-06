const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hangye_key: ['计算机软件', 'IT服务(系统/数据/维护)', '电子技术/半导体/集成电路', '计算机硬件', '通信/电信/网络设备', '通信/电信运营、增值服务', '网络游戏', '基金/证券/期货/投资', '保险', 'IT|通信|电子|互联网', '银行', '金融业', '信托/担保/拍卖/典当', '房地产|建筑业', '房地产/建筑/建材/工程', '商业服务', '家居/室内设计/装饰装潢', '贸易|批发|零售|租赁业', '物业管理/商业中心', '文体教育|工艺美术', '专业服务(财会/法律/人力资源等)', '生产|加工|制造', '广告/会展/公关', '交通|运输|物流|仓储', '中介服务', '服务业', '检验/检测/认证', '文化|传媒|娱乐|体育', '外包服务', '能源|矿产|环保', '快速消费品（食品/饮料/烟酒/日化）', '政府|非盈利机构', '农|林|牧|渔|其他', '贸易/进出口', '零售/批发', '租赁服务', '教育/培训/院校', '礼品/玩具/工艺美术/收藏品/奢侈品', '汽车/摩托车', '大型设备/机电设备/重工业', '加工制造（原料加工/模具）', '仪器仪表及工业自动化', '印刷/包装/造纸', '办公用品及设备', '医药/生物工程', '医疗设备/器械', '航空/航天研究与制造', '交通/运输', '物流/仓储', '医疗/护理/美容/保健/卫生服务', '酒店/餐饮', '旅游/度假', '媒体/出版/影视/文化传播', '娱乐/体育/休闲', '能源/矿产/采掘/冶炼', '石油/石化/化工', '电气/电力/水利', '环保', '政府/公共事业/非盈利机构', '学术/科研', '农/林/牧/渔', '跨领域经营', '移动互联网/人力资源服务', '其他', '互联网/电子商务'],
    hangye_value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  bt(e){
    console.log(e)
    
    this.setData({
    s:  e.currentTarget.dataset.index
    })
    console.log(this.data.hangye_value[e.currentTarget.dataset.index])

    wx.setStorageSync('hangye_value', this.data.hangye_value[e.currentTarget.dataset.index])
    wx.setStorageSync('hangye_key', this.data.hangye_key[e.currentTarget.dataset.index])
    wx.navigateBack({
      
      
    })


    
  },
  back(){
    wx.navigateBack({
      
    })
  }
})