Ext.define('MyCrudApp.components.form.FormBase', {
    extend: 'Ext.form.Panel',
    xtype: 'formbase',
    alias: 'widget.formbase',
    width: 'auto',
    height: 'auto',
    buildItems: function(config) {
        if (!config) {
            return null;
        }
        var me = this,
            store = config.record.store,
            model = store.getModel(),
            fields = model.getFields(),
            items = [];
        
        Ext.Array.each(fields, function(field) {
            var fieldName = field.getName();
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
    buttons: [{
        text: 'Save',
        handler: function() {
            var me = this;
            var form = me.up('formpanel');
            form.validate();
            var isValid = form.isValid();
            if (isValid) {
                    var record = form.getRecord();
                    var store = record.store;
                    var fields = form.getFields();
                
                    Ext.Object.each(fields, function(name, field) {
                        var value = field.getValue();
                        var isValid = field.isValid();
                        record.set(name, value);
                    });
                
                    if (record.dirty) {
                        store.sync({
                            callback: function() {
                                Ext.Msg.alert('Sucesso', 'Registro modificado com sucesso');
                                form.close();
                            },
                            failure: function() {
                                Ext.Msg.alert('Falha', 'Falha ao realizar operação');
                                form.close();
                            }
                        });
                    } else {
                        Ext.Msg.alert('Não há alterações', 'Nenhuma modificação foi realizada');
                        form.close();
                    }
                } else {
                    Ext.Msg.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios para continuar');

                }
            
            }
        },{
            text: 'Cancel',
            handler: function() {
                var me = this;
                var form = me.up('formpanel');
                form.close();
            }
        }
    ]
});
