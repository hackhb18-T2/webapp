$(function () {

    var collectionHeader = $('.collection-header');
    var collection = $('#price-offers');

    function setImage (product) {

        var imageUrl = product['image_url'];

        collectionHeader.empty();
        collectionHeader.append(`
            <img src="${imageUrl}" alt="">
        `);
    }

    function addPriceOffer (priceOffer) {

        var seller = priceOffer['seller'];
        var price = priceOffer['price'];
        
        collection.append(`
            <li class="collection-item avatar valign-wrapper">
                <span class="title">${seller}</span><br>
                <a href="#!" class="secondary-content">${price}&nbsp;€</a>
            </li>
        `);
    }

    JUSTIN.apiRequest('GET', '/devices/4/', function (device) {
        
        JUSTIN.apiRequest('GET', device['product'], function (product) {

            setImage(product);

            for (var key in product['prices']) {
                JUSTIN.apiRequest('GET', product['prices'][key], addPriceOffer);
            }

        }, function () {
            alert('Error getting prodcut');
        });

    }, function () {
        alert('Error getting device info');
    });

});
