Ext.define('MyCrudApp.components.grid.GridPanel',{
    extend : 'Ext.grid.Grid',
    xtype : 'mc.gridpanel',
    grouped: false,
    editInFormPanel : true,
    constructor: function(config) {
        var me = this;
        me.callParent(config)
        me.columns = me.getColumnsByModel();
        me.setColumns(me.columns);
        me.setPlugins(me.getPluginConfig());
    },
    getColumnsByModel: function(){
        var me = this;
        var model = me.store.model;
        var fields = model.fields;
        var columns = [];
        columns = fields.map(function(f){
            var c = null;
            if(f.name && f.type){
                c = {
                    xtype: 'gridcolumn',
                    text: f.title ? f.title : f.name,
                    dataIndex: f.name,
                    editable: f.editable === false ? false : true
                }

                if(me.config.columns && me.config.columns.length > 0){
                    me.config.columns.forEach(function(column){
                        if(column.dataIndex === f.name){
                            Ext.apply(c,column)
                        }
                    })

                }
            } 
            if(c){
                return c
            }
        })
        return columns;
    },
    getPluginConfig : function() {
        var me  = this;
        var config = {};

        if(me.editInFormPanel){

            config.grideditable = {
                triggerEvent: 'childdoubletap',
                enableDeleteButton: false,
                formConfig: null,
                defaultFormConfig: {
                    xtype: 'formpanel',
                    scrollable: true,
                    items: [{
                        xtype: 'fieldset'
                    }]
                },
                toolbarConfig: {
                    xtype: 'titlebar',
                    docked: 'bottom',
                    items: [{
                        xtype: 'button',
                        text: 'Cancel',
                        align: 'left',
                        action: 'cancel'
                    }, {
                        xtype: 'button',
                        text: 'Submit',
                        align: 'right',
                        action: 'submit'
                    }]
                },
            }
            if(me.config.plugins && me.config.plugins['grideditable']){
                Ext.apply(config.grideditable,me.config.plugins['grideditable'])
            }
        }

        return config
    }
})