//= require jquery
//= require materialize

(function (exports) {

    const API_URL = 'https://hackhb18-t2-api.herokuapp.com';

    exports.JUSTIN = {

        API_URL: API_URL,
        MY_DEVICE: '/devices/4/',

        apiRequest: function (method, route, success, error, payload) {
            var headers, url;

            payload = payload || null;

            headers = {
                'Authorization': 'JWT ' + localStorage.getItem('jwt')
            };

            if (route.startsWith(API_URL)) {
                url = route;
            } else {
                url = API_URL + route;
            }

            $.ajax({
                url: url,
                data: payload,
                type: method,
                headers: headers,
                success: success,
                error: function (res) {
                    if (res.status === 401) {
                        window.location.href = '/?redirect_uri=' + encodeURIComponent(window.location.href);
                    } else {
                        error(res);
                    }
                }
            });
        }
    };

}(window));
