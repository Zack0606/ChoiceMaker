// pages/drawLots/index.js
var Bmob = require("../../utils/bmob.js");
var Common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    config: {
      theme: {
        placeholder: '请输入4位随机数字'
      },
      peopleNum: {
        title: '参与人数',
        stepper: 20,
        min: 1,
        max: 100
      }
    },
    result: [""],
    lots:[],
    sum: 1,
    userInfo: null
  },
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
  addResult: function(e) {
    console.log(e)
    this.setData({
      sum: this.data.sum + 1,
    })

  },
  formSubmit: function(e) {
    var activityInfo = {
      activityNumber: parseInt(e.detail.value.randomNum),
      activityType: 0,
      activitySize: e.detail.value.peopleNum,
      lots: [],
      flag: 'new'
    }

    for (var i=0;i<this.data.sum;i++)
    {
      
      activityInfo.lots[i] =e.detail.value[i+2]
    }
    var inputs = e.detail.value;
    console.log(e.detail.value)
    console.log(activityInfo.lots);
    
    //Common.newActivity(activityInfo)
  }



})