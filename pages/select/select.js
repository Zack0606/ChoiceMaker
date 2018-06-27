// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnId: 0,
    title:''
  },
  goToMakeGroup: function () {
    wx.navigateTo({
      url: '../makeGroup/makeGroup'
    })
  },
  goToAddGroup: function () {
    wx.navigateTo({
      url: '../addGroup/addGroup'
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  goBack: function() {
    wx.navigateBack()
  },
  newEvent:function(){
    wx.navigateTo({
      url: '../makeGroup/makeGroup'
    })
  },
  joinEvent: function () {
    wx.navigateTo({
      url: '../addGroup/addGroup'
    })
  }
})