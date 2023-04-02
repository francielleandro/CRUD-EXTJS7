Ext.define('MyCrudApp.store.AnalystStore', {
    extend: 'Ext.data.Store',
    alias: 'store.analyststore',
    requires: [
        'MyCrudApp.model.AnalystModel',
    ],
    model: 'MyCrudApp.model.AnalystModel', 
    data: { items: [
        { id : 1, name: 'Jean Luc',   email: "jeanluc.picard@enterprise.com"},
        { id : 2, name: 'Jean2 Luc',   email: "jeanluc.picard@enterprise.com"},
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
