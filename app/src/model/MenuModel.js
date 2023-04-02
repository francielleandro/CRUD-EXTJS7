Ext.define('MyCrudApp.model.MenuModel',{
    extend : 'Ext.data.TreeModel',
    alias : ['menu.model'],
    fields: [
        { name: 'id', type: 'int' },
        { name: 'xtype', type: 'string'},
        { name: 'text', type: 'string' },
        { name: 'leaf', type: 'boolean'}
    ]
})