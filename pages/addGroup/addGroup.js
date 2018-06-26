// pages/addGroup/addGroup.js
var Bmob = require("../../utils/bmob.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: {
      theme: {
        placeholder: '请输入4位随机数字'
      },
      max:'',
      num:''
    }
  },
  formSubmit: function(e) {
    var inputs = e.detail.value;
    console.log(e);
    var randomNum = e.detail.value.randomNum;
    var Group = Bmob.Object.extend("group");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(Group);
    query.equalTo("randomNum", randomNum);
    // 查询所有数据
    var results = query.find(
      {
      success: function(results) {
        var max = results[0].get('each')
        var num = results[0].get('groupNum')
        var people= results[0].get('peopleNum')
        var ID = Math.round(Math.random()*people)
        var groupId = ID / num
        var queryItem = groupId*each  
        return results   
      },
      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    }
    );
      console.log(results);
    // var Member = Bmob.Object.extend('member');
    // // 创建一个表记录对象
    // var member = new Member();
    // member.set("randomNum", randomNum)
    // // for (var i=1;i<=each;i++)
    // //     member.set(i,array);
    // member.set("group", group)
    // member.save()
  }
})