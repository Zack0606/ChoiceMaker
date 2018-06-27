// pages/drawLots/index.js
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
    var inputs = e.detail.value;
    console.log(e);
  }



})