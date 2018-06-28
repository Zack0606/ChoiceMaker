// pages/groupResult/index.js
var Bmob = require("../../utils/bmob.js");
var Common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomNum: '',
    groupList: [
    ],
    showList: [],
    groupSize: 0,
  },
  queryResult: function (e) {
    var that = this
    Common.getResult(parseInt(this.data.randomNum));
    wx.getStorage({
      key: 'Result',
      success: function (res) {
        that.setData({
          groupList: res.data.details,
          groupSize: res.data.activityInfo.groupSize
        })
        console.log(that.data.groupList)
        var dest = new Array;
        for (var i = 0;i<that.data.groupSize;i++){
             dest[i] = new Array;
        }
        for (var i = 2; i < that.data.groupList.length; i++) {
          console.log(i)
          var ai = that.data.groupList[i];
          var groupId = parseInt(ai.id / that.data.groupSize);
          console.log("group="+groupId);
          console.log("group=" + dest[groupId].length);
          dest[groupId].push( ai.user.nickname)
          ;
        }
        that.setData({
          showList: dest
        })
      },
    })
    console.log(that.data.groupList)

    console.log(that.data.showList)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      randomNum: options.groupResult
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