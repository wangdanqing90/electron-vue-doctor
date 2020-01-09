1
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
    }
}