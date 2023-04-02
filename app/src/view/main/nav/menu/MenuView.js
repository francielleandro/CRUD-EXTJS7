Ext.define('MyCrudApp.view.nav.menu.MenuView', {
    extend: 'Ext.list.Tree',
    xtype: 'menuview',
    viewModel: {},
    ui: 'nav',
    requires: [
        'Ext.data.TreeStore',
        'MyCrudApp.model.MenuModel',
        'MyCrudApp.store.MenuStore'
    ],
    scrollable: true,
    store : Ext.create('MyCrudApp.store.MenuStore'),
    bind: { 
        micro: '{navCollapsed}' 
    },
    expanderFirst: false,
    expanderOnly: false
});
