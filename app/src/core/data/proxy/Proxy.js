Ext.define('MyCrudApp.data.proxy.Proxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.baseurl',
    urlBase: 'http://localhost:3000/',
    idParam: null,
    appendId: false, 
    constructor: function(config) {//monta a url com base na urlBase
        var me = this;
        var urlBase = me.urlBase;
        var url = `${urlBase}${config.url}`

        Ext.apply(config,{url:url})

        this.callParent([config]);
    },
    actionMethods: {
        create: 'POST',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    },
    reader: {
        type: 'json',
        rootProperty: 'data'
    }
});