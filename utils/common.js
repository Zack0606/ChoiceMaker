var Bmob = require('./bmob.js')

function showTip(sms, icon, fun, t) {
  if (!t) {
    t = 1000;
  }
  wx.showToast({
    title: sms,
    icon: icon,
    duration: t,
    success: fun
  })
}

function showModal(c, t, fun) {
  if (!t)
    t = '提示'
  wx.showModal({
    title: t,
    content: c,
    showCancel: false,
    success: fun
  })
}

function getRandomArray(size) {
  var arr = [];
  for (var i = 1; i <= size; i++) {
    arr[i - 1] = i
  }
  var result = [];
  var ranNum = size;
  for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * arr.length);
    result.push(arr[ran]);
    var center = arr[ran];
    arr[ran] = arr[arr.length - 1];
    arr[arr.length - 1] = center;
    arr = arr.slice(0, arr.length - 1);
  }
  return result
}

// var activityinfo = new Object()
var activityinfo = {
  activityNumber: 1,
  activityType: 0,
  activitySize: 20,
  groupNumber: 0,
  groupSize: 0,
  title: '',
  lots: [],
  flag: 'new',
  randomArray: [],
  addition: ''
}

// 新建
function newActivity(activityInfo = activityinfo, userInfo, success = null, error = null) {
  console.log(activityInfo);
  var Activity = Bmob.Object.extend('activities');
  // 检查当前数字是否已经被使用
  var check = new Bmob.Query(Activity);
  check.equalTo("activityNumber", activityInfo.activityNumber);
  check.equalTo("flag", activityInfo.flag);
  check.find({
    success: function(results) {
      if (results.length > 0) {
        console.log("数字已存在，请重新选择数字");
      } else {
        // 数字不存在，添加数据
        // var Activity = Bmob.Object.extend('activities');
        activityInfo.randomArray = getRandomArray(activityInfo.activitySize)
        var activity = new Activity();
        activity.set("activityNumber", activityInfo.activityNumber);
        activity.set("activityType", activityInfo.activityType);
        activity.set("activitySize", activityInfo.activitySize);
        activity.set("groupSize", activityInfo.groupSize);
        activity.set("groupNumber", activityInfo.groupNumber);
        activity.set("title", activityInfo.title);
        activity.set("randomArray", activityInfo.randomArray);
        activity.set("lots", activityInfo.lots);
        activity.set("flag", activityInfo.flag);
        activity.set("addition", activityInfo.addition);
        activity.save(null, {
          success: function(result) {
            console.log("创建成功")
            console.log(result)
          },
          error: function(result, error) {
            console.log("创建失败")
            console.log(result)
            console.log(error)
          }
        })
      }
    },
    error: function(error) {
      console.log("数字不存在，继续");
    }
  })
};
var tmp = wx.getStorageSync('user_id')
var userinfo = {
  userName: '',
  userId: tmp,
};

function joinActivity(activityInfo = activityinfo, userInfo = userinfo, success, error) {
  var Activity = Bmob.Object.extend('activities');
  // 检查
  var check = new Bmob.Query(Activity);
  check.equalTo("activityNumber", activityInfo.activityNumber);
  check.equalTo("flag", activityInfo.flag);
  check.find({
    success: function(results) {
      if (results.length == 0) {
        console.log("数字不存在，请重新输入");
      } else {
        // 检查是否已加入
        var user = new Bmob.User()
        user.id = userInfo.userId;
        var Main = Bmob.Object.extend("main");
        var query = new Bmob.Query(Main);
        query.equalTo('activityId', results[0].id);
        query.equalTo('userId', user);
        query.find({
          success: function(res) {
            if (res.length == 0) {
              console.log('准备加入')
              var main = new Main();
              main.set('activityNumber', activityInfo.activityNumber);
              // var activity=new Bmob.Object.extend('activities')
              // activity.id = results[0].id
              main.set('activityId', results[0].id);
              main.set('userId', user);
              console.log(userInfo.userId)
              var myId = results[0].attributes.randomArray.shift()
              main.set('mainId', myId);
              main.save(null, {
                success: function(result) {
                  console.log("加入成功, objectId:" + result.id);
                  console.log(result)
                  // 本地数据同步
                  var my_activity={
                    title:activityInfo.title,
                    type: activityInfo.activityType,
                    groupNumber: activityInfo.groupNumber,
                    size:activityInfo.activitySize,
                    my_id:myId,
                    my_lot:activityInfo.lots[myId-1],
                  };
                  var my_activities=wx.getStorageSync("my_activities");
                  if (!my_activities ){
                    var my_activities=new Array()
                  }
                  my_activities.unshift(my_activity)
                  wx.setStorageSync("my_activities", my_activities)
                  // 更新活动的随机数组
                  var update = new Bmob.Query(Activity);
                  console.log("Id:" + results[0].id)
                  update.get(results[0].id, {
                    success: function (result) {
                      result.set('randomArray', results[0].attributes.randomArray);
                      result.save();
                    },
                    error: function (result, error) {
                      console.log("更新失败: " + error.code + " " + error.message);
                    }
                  })
                },
                error: function(result, error) {
                  console.log("加入失败: " + error.code + " " + error.message);
                  console.log(result)
                }
              });
            } else {
              console.log("您已加入")
            }
          }
        })
      }
    },
    error: function(error) {
      console.log("数字不存在，请继续");
    }
  })
};

function getResult(activityInfo=activityinfo,userInfo=userinfo,success,error){
  console.log("function:getResult");
  // 待开发
}

module.exports.showTip = showTip;
module.exports.showModal = showModal;
module.exports.newActivity = newActivity;
module.exports.joinActivity = joinActivity;
module.exports.getResult=getResult;