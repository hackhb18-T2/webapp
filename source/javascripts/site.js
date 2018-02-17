//= require jquery
//= require materialize

jq2 = jQuery.noConflict();
jq2(function ($) {

    const API_URL = 'https://hackhb18-t2-api.herokuapp.com';

    const username = $('#username');
    const password = $('#password');

    var token;

    var currentStep;
    var wizard = $('.wizard-step');

    function setStep(step) {
        wizard.hide();
        $(wizard[step-1]).show();

        if (step == 3) {
            loadProducts();
        }
    }

    function apiRequest(method, route, success, error) {
        var headers;

        headers = {
            'Authorization': 'JWT ' + token
        };

        $.ajax({
            url: API_URL + route,
            type: method,
            headers: headers,
            success: success,
            error: error
        });
    }

    function login() {

        var successHandler = function (res) {
            token = res['token'];
            setStep(2);
        }

        var errorHandler = function (res) {
            alert('Login error');
        }

        var payload = {
            username: username.val(),
            password: password.val()
        }

        $.ajax({
            url: API_URL + '/api-token-auth/',
            type: 'POST',
            data: payload,
            success: successHandler,
            error: errorHandler
        });
    }

    function registerDevice() {
     
        // FIXME: Device is currently hard-coded
        window.setTimeout(function () {
            setStep(3);
        }, 1000);
    }

    function loadProducts() {

        var select = $('#products');

        select.material_select();

        var res = apiRequest('GET', '/products/', function (res) {
            res.forEach((product) => {
                select.append($('<option>', {
                    value: product['url'],
                    text: `${product['name']} — ${product['ean']}`
                }));
            });
            select.material_select();
        }, function () {
            alert('Failed to get products');
        });
    }

    function setProduct() {
        // apiRequest('PATCH', '/device/4/', 
    }

    $(".button-collapse").sideNav();

    $("#login").click(function (e) {
        e.preventDefault();
        login();
    });

    $("#register-device").click(function (e) {
        e.preventDefault();
        registerDevice();
    });

    $("#set-product").click(function (e) {
        e.preventDefault();
        setProduct();
    });
});
