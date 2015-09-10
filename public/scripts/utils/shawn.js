module.exports = {
    get: function (url, succCallback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (succCallback) {
                        succCallback.call(this, JSON.parse(xhr.responseText));
                    }
                }
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }
};
/*
 *
 *        var xhr = new XMLHttpRequest();
 *        var url = "/api/token/weixin/jssignature?" + "timestamp=" + wxConfig.timestamp + "&nonce=" + wxConfig.nonceStr + "&signurl=" + location.href;
 *        xhr.onreadystatechange = function (e) {
 *            if (xhr.readyState === 4) {
 *                if (xhr.status === 200) {
 *                    var signature = JSON.parse(xhr.responseText).signature;
 *                    console.log("signature:", signature)
 *                    wxConfig.signature =  signature
 *                    wx.config(wxConfig);
 *                }
 *            }
 *        }
 *
 *        xhr.open("GET", url);
 *        xhr.send();
 *
 */
