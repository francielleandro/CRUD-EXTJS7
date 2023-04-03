Ext.define('MyCrudApp.components.form.FormBase', {
    extend: 'Ext.form.Panel',
    xtype: 'formbase',
    alias: 'widget.formbase',
    scrollable: true,
    layout: {
        type :'form',
        labelWidth :80,
        itemSpacing:25
    },
    maxWidth: '600',
    maxHeight: '400',
    constructor: function(config) {
        var me = this;
        config = config || {};
        if(me.config.items && me.config.items.length > 0){
            config.items = me.config.items;
        }

        var items = me.buildItems(config);
        
        if(items){
            config.items = items;
        }
        
        me.callParent([config]);
    },
    //monta o form baseado no model da store do grid
    buildItems: function(config) {
        if (!config || !config.record) {
            return null;
        }

        var store = config.store || config.record.store;
        var model = store ? store.getModel() : config.record ;
        var fields = model.getFields();
        var items = [];
        
        Ext.Array.each(fields, function(field) {
            var fieldName = field.getName();
            if(fieldName === "selected"){
                return
            }
            var fieldConfig = {
                name: fieldName,
                label: field.title ? field.title : (fieldName.charAt(0).toUpperCase() + fieldName.slice(1)),
                required: !Ext.isEmpty(field.required) ? field.required : false,
                readOnly: !Ext.isEmpty(field.disabled) ? field.disabled : false
                };
            var existingItem = config.items? Ext.Array.findBy(config.items, function(item) {
                return item.name === fieldName;
                }):false;

            if (existingItem){
                Ext.apply(fieldConfig, existingItem);
            } 
            switch (field.type) {
                case 'string':
                fieldConfig.xtype = 'textfield';
                if (field.maxLength) {
                    fieldConfig.maxLength = field.maxLength;
                }
                if (field.minLength) {
                    fieldConfig.minLength = field.minLength;
                }
                if (field.validations && field.validations.length > 0) {
                    fieldConfig.validators = field.validations;
                }
                if (field.mask) {
                    fieldConfig.mask = field.mask;
                }
                break;
                case 'int':
                fieldConfig.xtype = 'numberfield';
                if (field.minValue !== undefined) {
                    fieldConfig.minValue = field.minValue;
                }
                if (field.maxValue !== undefined) {
                    fieldConfig.maxValue = field.maxValue;
                }
                break;
                case 'float':
                fieldConfig.xtype = 'numberfield';
                fieldConfig.decimalPrecision = field.precision || 2;
                if (field.minValue !== undefined) {
                    fieldConfig.minValue = field.minValue;
                }
                if (field.maxValue !== undefined) {
                    fieldConfig.maxValue = field.maxValue;
                }
                break;
                case 'bool':
                fieldConfig.xtype = 'checkboxfield';
                break;
                case 'date':
                fieldConfig.xtype = 'datepickerfield';
                if (field.dateFormat) {
                    fieldConfig.dateFormat = field.dateFormat;
                }
                if (field.minValue !== undefined) {
                    fieldConfig.minValue = field.minValue;
                }
                if (field.maxValue !== undefined) {
                    fieldConfig.maxValue = field.maxValue;
                }
                break;
                default:
                fieldConfig.xtype = 'textfield';
            }
            
            items.push(fieldConfig);
                
        });
    
        return items;
    },
    updateStore : function(store){
        return new Promise(function(resolve, reject) {
            store.sync({
                callback: function() {
                    resolve(true);
                },
                failure: function() {
                    reject(false);
                }
            });
        });
    },
    //salva o record selecionado com os novos valores do form, tambem realiza algumas validaçoes
    saveRecord: async function(){
        var me = this;
        me.validate();
        var isValid = me.isValid();
        if (isValid) {
            var record = me.getRecord();
            delete record.data.selected;//o atributo selected é utilizado para o checkcolumn e não deve ser enviado
            var store = me.config.store || record.store;
            var fields = me.getFields();
            record.dirty = false; //após remover o atributo selected do record o dirty fica igual a true, por isso é preciso forçar para false novamente
            Ext.Object.each(fields, function(name, field) {
                if(name !== 'selected'){
                    var value = field.getValue();
                    record.set(name, value);
                }
                else {
                    me.remove(field);//o atributo selected é utilizado para o checkcolumn e não deve ser enviado
                }
            });
        
            if (record.dirty) {
                var success = await me.updateStore(store);
                if(success){
                    me.close();
                    Ext.Msg.alert('Registro alterado', 'Registro alterado com sucesso');
                    store.reload();
                }else{
                    me.reset();
                    me.close();
                    Ext.Msg.alert('Falha', 'Falha ao alterar o registro');
                    store.reload();
                }
            } else {
                me.reset();
                me.close();
                Ext.Msg.alert('Não há alterações', 'Nenhuma modificação foi realizada');
            }
        } else {
            Ext.Msg.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios para continuar');
        }
    },
    buttons: [{
        text: 'Save',
        scope: this,
        handler:function(button) {
            var me = this;
            var form = button.up('formpanel');
            form.saveRecord();
        }
    },{
        text: 'Cancel',
        handler: function() {
            var me = this;
            var form = me.up('formpanel');
            if(form.newRecord){//se for um novo registro, reload na store para nao alterar o grid
                form.store.reload();
            }
            form.close();
        }}
    ]
    
});
