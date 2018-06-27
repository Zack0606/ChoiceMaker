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
  selectRole: function(e) {
    var a = e.currentTarget.id
    var b= this.data.columnId
    if (a==2)
      wx.navigateTo({
        url: '../index/index',
      })
    else if(a == 0)
      {
        if (b == 2)
          wx.navigateTo({
            url: '../makeGroup/makeGroup'
          })
      }
    else if (a == 1) {
      if (b == 2)
        wx.navigateTo({
          url: '../addGroup/addGroup'
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      columnId: options.columnId
    })
    console.log(this.data.columnId)
  },


})