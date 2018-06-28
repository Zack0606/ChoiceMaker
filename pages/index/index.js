//index.js
const app = getApp()
var Common=require('../../utils/common.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    columns: [{
      id: 0,
      title: "来抓阄",
      img: "../../static/images/more/title.png"
    }, {
      id: 1,
      title: "做选择",
      img: ""
    }, {
      id: 2,
      title: "来分组",
      img: ""
    }, {
      id: 3,
      title: "排顺序",
      img: ""
    }, {
      id: 4,
      title: "拼手速",
      img: ""
    }, {
      id: 5,
      title: "来签到",
      img: ""
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    Common.getResult();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getStart: function(e) {
    console.log(e.currentTarget.id)
    if (e.currentTarget.id == 1) {
      wx.navigateTo({
        url: '../makeChoice/index',
      })
    } else {
      wx.navigateTo({
        url: '../select/select?columnId=' + e.currentTarget.id,
      })
    }
  }
})