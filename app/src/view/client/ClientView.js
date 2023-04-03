Ext.define('MyCrudApp.view.ClientView',{
    extend : 'MyCrudApp.components.grid.GridPanel',
    xtype : 'clientview',
    requires: [
        'Ext.grid.rowedit.Plugin',
        'MyCrudApp.store.ClientStore'
    ],
    controller: {type: 'clientviewcontroller'},
    viewModel: {type: 'clientviewmodel'},
    store: {type :'clientstore'},
    grouped: false,
    groupFooter: {
        xtype: 'gridsummaryrow'
    },
    columns: [
        {
            text: 'Nome',
            dataIndex: 'name',
            width: 100,
            cell: {userCls: 'bold'}
        },{
            text: 'E-mail',
            dataIndex: 'email',
            width: 230
        }
    ]
})