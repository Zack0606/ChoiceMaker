// pages/addGroup/addGroup.js
var Bmob = require("../../utils/bmob.js");
var Common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    config: {
      theme: {
        placeholder: '请输入4位随机数字'
      },
      max: '',
      num: ''
    },
    addId: 0,
    add:["抓阄","选择","分组","排序","拼手速"],
    groupSize:0
  },

  onLoad:function(options){
      this.setData({
        addId:options.addId
      })
  },
  formSubmit: function(e) {
    var that = this;
    var input = e.detail.value;
    console.log(e)
    var activityNumber = parseInt(e.detail.value.randomNum)
    Common.joinActivity(activityNumber)
    
    wx.navigateTo({
      url: '../result/result?activityType='+this.data.addId+'&activityNumber='+activityNumber,
    })
  }
})