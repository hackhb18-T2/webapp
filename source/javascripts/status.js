$(function () {

    function pollWeight() {

        var success = function (res) {
            var weight = res['last_weight'];
            $('#units').text(weight);

            if (weight < 2) {
                var $toastContent = $('<span>Der Vorrat geht zur Neige!</span>')
                    .add($('<a href="/order">Bestellung</a>'));
                
                var toastElement = $('.toast').first()[0];
                if (!toastElement) {
                    Materialize.toast($toastContent);
                }
            } else {
                $('.toast').remove();
            }
        }

        var error = function (res) {
            alert('Error');
        }

        JUSTIN.apiRequest('GET', '/devices/4/', success, error);
    }

    window.setInterval(pollWeight, 3000);
});
