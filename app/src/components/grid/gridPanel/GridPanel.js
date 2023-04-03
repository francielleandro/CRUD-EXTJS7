Ext.define('MyCrudApp.components.grid.GridPanel',{
    extend : 'Ext.grid.Grid',
    xtype : 'mc.gridpanel',
    grouped: false,
    editInFormPanel : false,
    pagingtoolbar : true,
    formConfig : null,
    checkboxSelect : true,
    selectedRecords : [],
    title :' ',
    titleBar: {
        xtype: 'titlebar',
        docked: 'top',
        titleAlign: 'right',
        items: [{
                text: 'Novo',
                handler: function(cmp) {
                    var grid = this.up().up().up();
                    var store = grid.store;
                    var record = store.createModel({});
                    store.add(record);
                    grid.openForm(record);
                }
            },{
                xtype: 'spacer',
                width: 10
            },{
                text: 'Editar',
                handler: function() {
                    var grid = this.up().up().up();
                    var record = grid.getSelectedRecord();
                    if(record.length === 1){
                        grid.openForm(record[0])
                    }else if(record.length === 0){
                        console.warn('Não há registro selecionado')
                        return
                    }else{
                        console.warn('Só é possível editar um registro por vez')
                        return
                    }

                }
            },{
                xtype: 'spacer',
                width: 10 
            },{
                text: 'Remover',
                handler: function() {
                    var grid = this.up().up().up();
                    var store = grid.store;
                    var records = grid.getSelectedRecord();
                    Ext.Msg.confirm("Confirmação", "Tem certeza que deseja remover o(s) registro(s) selecionado(s)?", (buttonId,value)=>{
                        if(buttonId === 'no'){
                            return
                        }
                        store.remove(records);
                        store.sync({
                            callback: function() {
                                grid.selectRows(records);
                            },
                            failure: function() {
                                console.warn('error')
                            }
                        });
                    });
                }
            },
        ]
    },
    constructor: function(config) {
        var me = this;
        me.callParent(config)
        me.columns = me.getColumnsByModel();
        me.setColumns(me.columns);
        me.setPlugins(me.getPluginConfig());
    },
    disselectRecords: function(){
        var me = this;
        var store = me.store;
        var records = store.data.items;
        Ext.Array.each(records, function(record) {
            record.set('selected', false);
        });

        me.selectedRecords = [];
    },
    openForm: function(record){
        const isNew = record.crudState === 'C' ? true : false;
        var me = this;
        if(me.editInFormPanel){//se True, não exibe o form
            return;
        }
        if(isNew){
            record.set('id',null);
        }
        let title = isNew ? 'Novo registro' : `Editando registro : ${record.id}`
        var form = Ext.create({
            xtype: 'formbase',
            border:true,
            selectedRecords:me.selectedRecords,
            store: me.store,
            newRecord:isNew,
            record: record // passa o registro selecionado para o formulário,
          });
        var formWindow = Ext.create({
            xtype: 'window',
            title: title,
            modal: true,
            items: [form]
          });

          form.on({close:function(){
            formWindow.close();
          }});

          formWindow.show();
    },
    listeners : {
        childdoubletap : function(event, location, eOpts ){//abre o formBase para edição do registro
            var me = this;
            var record = location.record;
            me.openForm(record);
        },
        select: function(grid, record,) {
            grid.selectRows(record);
        }
    },

    selectRows: function(record){
        var me = this;
        var selectedRecords = me.selectedRecords;
        var rec = record[0];

        var index = selectedRecords.findIndex(function(selectedRec) {
            return selectedRec.getId() === rec.getId();
        });
        
        //remove items com selected = false
        Ext.Array.each(selectedRecords, function(f,fIndex) {
            if(f.get('selected') === false && index !== -1){
                selectedRecords.splice(fIndex, 1);
            }
        });
        

        if(index === -1){
            rec.set('selected',true)
        }else{
            rec.set('selected',false)
        }
        //remove ou adiciona o record no selecteRecords
        if (rec.get('selected') === true) {
            if (index === -1) {
                selectedRecords.push(rec);
            }
        } else {
            if (index !== -1) {
                selectedRecords.splice(index, 1);
            }
        }
    },

    getSelectedRecord: function(){
        var me = this;
        return me.selectedRecords;
    },
    //constroi as colunas do grid baseado no model da store
    getColumnsByModel: function(){
        var me = this;
        var model = me.store.model;
        var fields = model.fields;
        var columns = [];
        columns = fields.map(function(f){
            let c = null;
            if(f.name && f.type){
                let xtype = 'gridcolumn';
                let text = f.title ? f.title : f.name;
                let width = null;
                let editable = f.editable === false ? false : true;

                if(f.type === 'bool'){
                    xtype = 'checkcolumn'
                    text = '';
                    width = 25;
                    editable = false;
                }

                c = {
                    xtype: xtype,
                    text: text,
                    width:width,
                    dataIndex: f.name,
                    disabled: !editable
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
    //configura os plugins do grid
    getPluginConfig : function() {
        var me  = this;
        var config = {};

        if(me.editInFormPanel){//há um problema de sincronia ao salvar o registro com os valores do form

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
                        action: 'cancel',
                    }, {
                        xtype: 'button',
                        text: 'Submit',
                        align: 'right',
                        action: 'submit',
                        handler: function() {
                            var store = me.getStore();
                            store.sync({
                                callback: function(batch, options, success) {
                                    if (success) {
                                        // console.log('Dados salvos com sucesso!');
                                    } else {
                                        // console.log('Erro ao salvar dados!');
                                    }
                                }
                            });
                        }
                    }]
                },
            }
        }

        if(me.pagingtoolbar){
            config.pagingtoolbar = true;
        }
        Ext.apply(config, me.config.plugins);

        return config
    }
})