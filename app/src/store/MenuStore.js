Ext.define('MyCrudApp.store.MenuStore',{
    extend:'Ext.data.TreeStore',
    alias :'store.menustore',
    requires: [
        'MyCrudApp.model.MenuModel',
    ],
    model: 'MyCrudApp.model.MenuModel', 
    root: {
        id: 1,
        text: 'Root',
        expanded: true,
        children: [
            { 
                "text": "Home", 
                "iconCls": "x-fa fa-home",
                "xtype": "homeview", 
                "leaf": true 
            },{ 
                "text": "Analista",
                "iconCls": "x-fa fa-table", 
                "xtype": "analystview",
                "leaf": true 
            }
        ]
    }
})