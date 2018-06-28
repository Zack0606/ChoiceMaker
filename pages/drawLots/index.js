// pages/drawLots/index.js
// const app = getApp()
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
      },

    },
    result: [""],
    sum: 1,
    userInfo: null,
    lots: [{
      id: 1
    }]
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
    console.log(this.data.lots)
    this.data.lots.push({
      id: this.data.lots.length + 1
    })
    this.setData({
      lots: this.data.lots
    })
  },
  formSubmit: function(e) {
    var inputs = e.detail.value;
    console.log(e);
    var activityNumber = parseInt(e.detail.value.randomNum)
    var activityInfo = {
      activityNumber: parseInt(e.detail.value.randomNum),
      activityType: 0,
      activitySize: e.detail.value.peopleNum,
      groupNumber: 1,
      groupSize: e.detail.value.peopleNum,
      title: '',
      lots: [],
      flag: 'new',
      randomArray: [],
      addition: ''
    };
    var tmp=new Array;
    for(var i=0;i<this.data.lots.length;i++){
      tmp[i] = e.detail.value[i]
    }
    activityInfo.lots=tmp;
    console.log(activityInfo)
    Common.newActivity(activityInfo)
  }
})