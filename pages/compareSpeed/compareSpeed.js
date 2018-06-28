// pages/index/makeOrder/makeOrder.js
const app = getApp()
var Bmob = require("../../utils/bmob.js");
var Common = require('../../utils/common.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    config: {
      theme:"",
      peopleNum: {
        title: '参与人数',
        stepper: 20,
        min: 1,
        max: 100
      }
    },
    columnId:0,
    userInfo: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
    columnId:options.b
    })
  },
  // 计数器
  handleZanStepperChange({
    detail: stepper,
    target: {
      dataset: {
        componentId
      }
    }
  }) {
    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  },
  formSubmit: function (e) {
    // 数据初始化
    console.log(e)
    var activityInfo = {
      activityNumber: parseInt(e.detail.value.randomNum),
      activityType: parseInt(this.data.columnId),
      activitySize: e.detail.value.peopleNum,
      title: e.detail.value.theme,
      lots: [],
      flag: 'new',
      randomArray: [],
      addition: ''
    }
    Common.newActivity(activityInfo);
  }
})