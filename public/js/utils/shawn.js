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
