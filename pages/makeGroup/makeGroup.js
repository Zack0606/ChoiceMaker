// pages/index/makeOrder/makeOrder.js
const app = getApp()
var Bmob = require("../../utils/bmob.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    config: {
      name: {
        title: '主题',
        placeholder: '请输入活动主题'
      },
      theme: {
        placeholder: '请输入4位随机数字'
      },
      peopleNum: {
        title: '参与人数',
        stepper: 1,
        min: 1,
        max: 100
      },
      groupNum: {
        title: '组数',
        stepper: 1,
        min: 1,
        max: 100
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
    var userInfo = app.getUserInfo();
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      });
      console.log(userInfo)
    });
    wx.getStorage({
      key: 'selectType',
      success: function(res) {
        that.setData({
          roomType: res.data,
          roomInfo: postRoomType.roomType[res.data],
        })
      }
    });
    wx.getStorage({
      key: 'checkInDate',
      success: function(res) {
        that.setData({
          checkInDate: res.data,
        })
      }
    });
    wx.getStorage({
      key: 'checkOutDate',
      success: function(res) {
        that.setData({
          checkOutDate: res.data,
        })
      }
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
    var inputs = e.detail.value;
    console.log(e);
    var groupNum = e.detail.value.groupNum;
    var peopleNum = e.detail.value.peopleNum;
    var randomNum = e.detail.value.randomNum;
    var each = peopleNum / groupNum + 1;
    var theme = e.detail.value.theme;
    var Group = Bmob.Object.extend('group');
    var group = new Group();
    group.set("randomNum", randomNum)
    group.set("each", each)
    group.set("groupNum", groupNum)
    group.set("peopleNum", peopleNum)
    group.set("theme", theme)
    group.save()

  }
})