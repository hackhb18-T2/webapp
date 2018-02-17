//= require jquery
//= require materialize

(function (exports) {

    const API_URL = 'https://hackhb18-t2-api.herokuapp.com';

    exports.JUSTIN = {

        API_URL: API_URL,
        MY_DEVICE: '/devices/4/',

        apiRequest: function (method, route, success, error, payload) {
            var headers;

            payload = payload || null;

            headers = {
                'Authorization': 'JWT ' + localStorage.getItem('jwt')
            };

            $.ajax({
                url: API_URL + route,
                data: payload,
                type: method,
                headers: headers,
                success: success,
                error: error
            });
        }
    };

}(window));
