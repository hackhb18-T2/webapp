globalSetStep = null;

$(function () {

    const username = $('#username');
    const password = $('#password');

    var token;

    var currentStep;
    var wizard = $('.wizard-step');

    function setStep(step) {
        wizard.hide();

        var currentPane = $(wizard[step - 1]);

        currentPane.show();

        if (step == 3) {
            loadProducts();
        }

        if (step == 4) {
            window.setTimeout(function () {
                $('.circle-loader', currentPane).addClass('load-complete');
                $('.checkmark', currentPane).show();
                window.setTimeout(function () {
                    window.location.href = '/status';
                }, 2000);
            }, 2000);
        }
    }

    globalSetStep = setStep;

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function login() {

        var successHandler = function (res) {
            token = res['token'];
            localStorage.setItem('jwt', token);

            var redirect_uri = getParameterByName('redirect_uri', window.location.href);

            if (redirect_uri) {
                // TODO: Do sanity check
                window.location.href = redirect_uri;
                return;
            }

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
            url: JUSTIN.API_URL + '/api-token-auth/',
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

        var res = JUSTIN.apiRequest('GET', '/products/', function (res) {
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

    function setProduct(url) {

        var successHandler = function (res) {
            setStep(4);
        }

        var errorHandler = function (res) {
            alert('Product update error');
        }

        JUSTIN.apiRequest('PATCH', JUSTIN.MY_DEVICE, successHandler, errorHandler, {
            product: url
        });
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
        setProduct($('#products').val());
    });

});
