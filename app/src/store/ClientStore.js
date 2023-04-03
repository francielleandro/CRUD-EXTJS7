Ext.define('MyCrudApp.store.ClientStore', {
    extend: 'Ext.data.Store',
    alias: 'store.clientstore',
    model: 'MyCrudApp.model.ClientModel', 
    autoLoad: true,
    proxy: {
        type: 'baseurl',
        url: 'client'
    }
});
