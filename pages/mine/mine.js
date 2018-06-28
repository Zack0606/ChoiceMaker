// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      myAct:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      wx.getStorage({
        key: 'my_activities',
        success: function(res) {
          console.log(res.data)
          for(var i=0;i<res.data.length;i++){
            if (res.data[i].type==2)
            {
              res.data[i].my_id=Math.ceil(res.data[i].my_id / (res.data[i].size / res.data[i].groupNumber))
            }
          }
          that.setData({
            myAct:res.data
          })
        },
      })
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
  
  }
})