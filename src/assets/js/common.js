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
    //在数组里面获取value对应的id
    getSelectID: function (value,arry) {
        var obj = {};
            obj = arry.find(item =>{
              return item.name === value 
            });
            return obj.id;
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