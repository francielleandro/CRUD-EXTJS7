Ext.define('MyCrudApp.store.AnalystStore', {
    extend: 'Ext.data.Store',
    alias: 'store.analyststore',
    requires: [
        'MyCrudApp.model.AnalystModel',
    ],
    model: 'MyCrudApp.model.AnalystModel', 
    autoLoad: true,
    proxy: {
        type: 'baseurl',
        url: 'analyst'
    }
});
