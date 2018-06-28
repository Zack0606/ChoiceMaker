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
      name: {
        title: '主题'
      },
      theme: {
      },
      peopleNum: {
        title: '参与人数',
        stepper: 20,
        min: 1,
        max: 100
      },
      groupNum: {
        title: '组数',
        stepper: 4,
        min: 1,
        max: 20
      },
      remarks: {
        title: '备注',
        placeholder: '如有无特殊要求偏好'
      }
    },
    userInfo: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      });
      console.log(userInfo)
    });
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
  formSubmit: function(e) {
    // 数据初始化
    console.log(e)
    var activityInfo = {
      activityNumber: parseInt(e.detail.value.randomNum),
      activityType: 2 ,
      activitySize: e.detail.value.peopleNum,
      groupNumber: e.detail.value.groupNum,
      groupSize: Math.ceil(e.detail.value.peopleNum / e.detail.value.groupNum ),
      title: e.detail.value.theme,
      lots: [],
      flag: 'new',
      randomArray: [],
      addition: ''
    }
    console.log(activityInfo);
    Common.newActivity(activityInfo);
    wx.navigateTo({
      url: '../groupResult/index?groupResult='+e.detail.value.randomNum
    })
  }
})