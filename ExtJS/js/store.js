;(function(){
	Ext.define("User", {
        extend: 'Ext.data.Model',
        fields: [
        'id', 'name'
        ],

        hasMany: {model: 'Order', name: 'orders'},

        proxy: {
            type: 'rest',
            url : 'users.json',
            reader: {
                type: 'json',
                root: 'users'
            }
        }
    });

    Ext.define("Order", {
        extend: 'Ext.data.Model',
        fields: [
        'id', 'total'
        ],

        hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
        belongsTo: 'User'
    });

    Ext.define("OrderItem", {
        extend: 'Ext.data.Model',
        fields: [
        'id', 'price', 'quantity', 'order_id', 'product_id'
        ],

        belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
    });

    Ext.define("Product", {
        extend: 'Ext.data.Model',
        fields: [
        'id', 'name'
        ],

        hasMany: 'OrderItem'
    });

    var store = Ext.create('Ext.data.Store', {
        model: "User"
    });

    store.load({
        callback: function() {
        //the user that was loaded
        var user = store.first();

        console.log("Orders for " + user.get('name') + ":")

        //iterate over the Orders for each User
        user.orders().each(function(order) {
            console.log("Order ID: " + order.getId() + ", which contains items:");

            //iterate over the OrderItems for each Order
            order.orderItems().each(function(orderItem) {
                //we know that the Product data is already loaded, so we can use the synchronous getProduct
                //usually, we would use the asynchronous version (see Ext.data.association.BelongsTo)
                var product = orderItem.getProduct();

                console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
            });
        });
    }
    });
})();