export default {
    login: function () {
        console.log("1111");
    },

    // 判断是否为空
    isNullOrBlank: function (strJudge) {
        return strJudge === null || strJudge === undefined || strJudge === '';
    },

    // 计算两个日期时间差
    DateDiff: function (sDate1, sDate2) { // sDate1和sDate2是2002-12-18格式
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split('-')
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        aDate = sDate2.split('-')
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
        return iDays
    },

    //获取今天日期，格式YYYY-MM-DD
    getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },

    getUserInfo:function(){
        //ws start
        const WS =new WebSocket({
            url:'wss://www.irego.cn:8080',
            reconnectTimes:60
        })
        WS.onopen((event)=>{
            this.$store.commit('SET_WS',WS)
            
            var authMSG={
                type:'sigin',
                utype:'user',
                uid:"111",
                key:"key"
            }
            WS.send(authMSG)
            WS.onheartbeat()
        })

        WS.onmessage((data)=>{
           var timestamp=new Date().getTime();
           var msg={
               data:data,
               time:timestamp
           }
           this.$store.commit('SET_WS_MSG',msg)
        })

   
    }
}