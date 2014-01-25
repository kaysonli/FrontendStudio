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
})();