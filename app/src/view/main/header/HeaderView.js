Ext.define('MyCrudApp.view.main.header.HeaderView', {
    extend: 'Ext.Toolbar',
    xtype: 'headerview',
    cls: 'headerview',
    viewModel: {},
    items: [
        { 
            xtype: 'container',
            cls: 'headerviewtext',
            bind: { html: '{heading}' }
        },
        '->',
        {
            xtype: 'button',
            ui: 'headerbutton',
            reference: 'detailtoggle',
            itemId : 'idDetailtoggle',
            handler: 'onHeaderViewDetailToggle',
            iconCls: 'x-fa fa-search'
        }
    ]
});
