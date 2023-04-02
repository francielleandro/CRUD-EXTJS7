Ext.define('MyCrudApp.view.AnalystView',{
    extend : 'MyCrudApp.components.grid.GridPanel',
    xtype : 'analystview',
    cls: 'personnelview',
    requires: [
        'Ext.grid.rowedit.Plugin',
        'MyCrudApp.store.AnalystStore'
    ],
    controller: {type: 'analystviewcontroller'},
    viewModel: {type: 'analystviewmodel'},
    store: {type :'analyststore'},
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