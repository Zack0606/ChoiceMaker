// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnId: 0,
    rows: [{
      id: 0,
      title: "我要发起",
      img: "../../static/images/more/TITLE.png"
    }, {
      id: 1,
      title: "我要加入",
      img: ""
    }, {
      id: 2,
      title: "返回主页",
      img: ""
    }]
  },
  onLoad: function (options) {
    this.setData({
      columnId: options.columnId
    })
  },
  selectRole: function(e) {
    var a = e.currentTarget.id
    var b = this.data.columnId
    if (a == 2)
      wx.navigateTo({
        url: '../index/index',
      })
    else if (a == 0) {
      if (this.data.columnId == 2) {
        wx.navigateTo({
          url: '../makeGroup/makeGroup'
        })
      }
      else if (this.data.columnId == 0) {
        wx.navigateTo({
          url: '../drawLots/index'
        })
      }
    } else if (a == 1) {
      if (b == 2||b==0)
      {
      wx.navigateTo({
        url: '../addGroup/addGroup'
      })
      }
    }
  }


})