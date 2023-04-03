Ext.define('MyCrudApp.view.main.footer.FooterView', {
    extend: 'Ext.Toolbar',
    xtype: 'footerview',
    cls: 'footerview',
    viewModel: {},
    items: [
        {
            xtype: 'container',
            cls: 'footerviewtext',
            html: `CRUD - FRANCIEL`
            //bind: { html: '{name} footer' }
        }
    ]
});
