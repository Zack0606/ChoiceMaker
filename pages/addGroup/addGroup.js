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
    }
  },

  formSubmit: function(e) {
    var that = this;
    var input = e.detail.value;
    console.log(e)
    var activityNumber=parseInt(e.detail.value.randomNum)
    Common.joinActivity(activityNumber)
  }
})