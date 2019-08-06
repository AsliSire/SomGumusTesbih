// Changed:
// .cd-cart-container --> .cd-cart
// .body --> .cd-cart-items
// checkout --> checkout-btn
// change cartTotal = cartWrapper.find('.cd-cart-total')
// cartTrigger variable is the same.
// delete-item --> cd-item-remove cd img-replace 
// quantity --> cd-qty 
// price --> cd-price

// Do:
// Compare both css file (addtocart and sidecart)
// Add .cd-cart .ul to sidecart.css
// Add delete item and it's properties to sidecart.css and js
// Apply delete-item css codes to sidecart.css
// Move Cart title to a css code like in the addtocart.css

// Optional:
// Change the best name of properties. For example, not quantity --> cd-qty but cd-qty --> quantity
// Let quantity section be the same in sidecart but add a dropdown menu

jQuery(document).ready(function ($) {
    var cartWrapper = $('#cd-cart');
    //product id - you don't need a counter in your real project but you can use your real product id
    var productId = 0;

    if (cartWrapper.length > 0) {
        //store jQuery objects

        // cart window
        // var cartBody = cartWrapper.find('.cd-cart-items')
        // product list section
        var cartList = cartWrapper.find('.cd-cart-items').eq(0);
        // total price section
        var cartTotal = cartWrapper.find('.cd-cart-total').find('span');
        // cart button which is responsible for opening and closing cart window
        var cartTrigger = $('#cd-cart-trigger');
        // count windows which is currently not available in sidecart.css
        var cartCount = $('#cd-cart-trigger').find('.count');
        // add to cart button which is currently not available in sidecart.css
        var addToCartBtn = $('.add-to-cart-button');

        // if item is deleted, undo button will appear on the top-right side of cd-cart window 
        var undo = cartWrapper.find('.undo');
        // time for disappearing undo button
        var undoTimeoutId;

        //add product to cart
        addToCartBtn.on('click', function (event) {
            event.preventDefault();
            addToCart($(this));
        });

        //open/close cart
        	cartTrigger.on('click', function(event){
        		event.preventDefault();
        		toggleCart();
        	});

        // this is already done in sidecart.css so commented
        //close cart when clicking on the .cd-cart-container::before (bg layer)

       
		cartWrapper.on('click', function(event){
			if( $(event.target).is($(this)) ) toggleCart(true);
		});
		

        // .delete-item properties will be added in sidecart.css, this code stay for now, it is currently not available in sidecart.css
        //delete an item from the cart
        cartList.on('click', '.cd-item-remove', function (event) {
            event.preventDefault();
            removeProduct($(event.target).parents('.product'));
        });


        //update item quantity
        //update price when user changes the quantity from quantity dropdown menu
        cartList.on('change', 'select', function (event) {
            quickUpdateCart();
        });

        // events when undo button is clicked
        //reinsert item deleted from the cart
        undo.on('click', 'a', function (event) {
            clearInterval(undoTimeoutId);
            event.preventDefault();
            cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                quickUpdateCart();
            });
            undo.removeClass('visible');
        });
    }

    function toggleCart(bool) {
    	var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
    	
    	if( cartIsOpen ) {
    		cartWrapper.removeClass('cart-open');
    		//reset undo
    		clearInterval(undoTimeoutId);
    		undo.removeClass('visible');
    		cartList.find('.deleted').remove();
    
    		setTimeout(function(){
    			cartBody.scrollTop(0);
    			//check if cart empty to hide it
    			if( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
    		}, 500);
    	} else {
    		cartWrapper.addClass('cart-open');
    	}
    }

    // button events after clicking
    function addToCart(trigger) {
        console.log(cartTotal.text());
        var cartIsEmpty = cartWrapper.hasClass('empty');
        //update number of items 
        updateCartCount(cartIsEmpty);
        //update total price
        updateCartTotal(trigger.data('price'), true);
        //update cart product list
        addProduct();
        //show cart
        cartWrapper.removeClass('empty');
        console.log(cartTotal.text());
    }

    // add product to cart with html codes
    function addProduct() {
        //this is just a product placeholder
        //you should insert an item with the selected product info
        //replace productId, productName, price and url with your real product info
        productId = productId + 1;
        var productAdded = $('<li class="product"><span class="cd-qty"><label for="cd-product-' + productId + '"></label><span class="select"><select id="cd-product-' + productId + '" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></span><span> x </span>Product Name<div class="cd-price">$9.99</div><a href="#0" class="cd-item-remove cd-img-replace">Remove</a></li>');
        cartList.prepend(productAdded);

    }

    // keep product until timeout and delete
    function removeProduct(product) {
        clearInterval(undoTimeoutId);
        cartList.find('.deleted').remove();

        var topPosition = product.offset().top - cartList.offset().top,

			// Original: productQuantity = Number(product.find('.cd-qty').find('select').val()),
			productQuantity = Number(product.find('.cd-qty').find('select').val()),
			productTotPrice = Number(product.find('.cd-price').text().replace('$', '')) * productQuantity;

        product.css('top', topPosition + 'px').addClass('deleted');

        //update items count + total price
        updateCartTotal(productTotPrice, false);
        updateCartCount(true, -productQuantity);
        undo.addClass('visible');

        //wait 8sec before completely remove the item
        undoTimeoutId = setTimeout(function () {
            undo.removeClass('visible');
            cartList.find('.deleted').remove();
        }, 5000);
    }

    function quickUpdateCart() {
        var quantity = 0;
        var price = 0;

        cartList.children('li:not(.deleted)').each(function () {
            var singleQuantity = Number($(this).find('select').val());
            quantity = quantity + singleQuantity;
            price = price + singleQuantity * Number($(this).find('.cd-price').text().replace('$', ''));
        });

        cartTotal.text(price.toFixed(2));
        cartCount.find('li').eq(0).text(quantity);
        cartCount.find('li').eq(1).text(quantity + 1);
    }


    function updateCartCount(emptyCart, quantity) {
        if (typeof quantity === 'undefined') {
            var actual = Number(cartCount.find('li').eq(0).text()) + 1;
            var next = actual + 1;

            if (emptyCart) {
                cartCount.find('li').eq(0).text(actual);
                cartCount.find('li').eq(1).text(next);
            } else {
                cartCount.addClass('update-count');

                setTimeout(function () {
                    cartCount.find('li').eq(0).text(actual);
                }, 150);

                setTimeout(function () {
                    cartCount.removeClass('update-count');
                }, 200);

                setTimeout(function () {
                    cartCount.find('li').eq(1).text(next);
                }, 230);
            }
        } else {
            var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
            var next = actual + 1;

            cartCount.find('li').eq(0).text(actual);
            cartCount.find('li').eq(1).text(next);
        }
    }


    // calculate total price
    // bool parameter determines whether if remove or add
    // bool: true means add
    // bool: false means remove
    function updateCartTotal(price, bool) {
        bool ? cartTotal.text((Number(cartTotal.text()) + Number(price)).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - Number(price)).toFixed(2));
    }
});