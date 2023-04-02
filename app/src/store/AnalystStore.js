Ext.define('MyCrudApp.store.AnalystStore', {
    extend: 'Ext.data.Store',
    alias: 'store.analyststore',
    requires: [
        'MyCrudApp.model.AnalystModel',
    ],
    model: 'MyCrudApp.model.AnalystModel', 
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:3000/analyst',
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
    }
});
