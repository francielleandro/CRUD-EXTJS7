Ext.define('MyCrudApp.components.form.FormBase', {
    extend: 'Ext.form.Panel',
    xtype: 'formbase',
    alias: 'widget.formbase',
    width: 400,
    height: 300,
    items: [{
        xtype: 'textfield',
        name: 'name',
        label: 'Name',
        allowBlank: false
    }, {
        xtype: 'textfield',
        name: 'email',
        label: 'Email',
        allowBlank: false
    }, {
        xtype: 'textfield',
        name: 'phone',
        label: 'Phone',
        allowBlank: false
    }],
    buttons: [{
        text: 'Save',
        handler: function() {
            var form = this.up('formpanel');
            var values = form.getValues();
            var record = form.config.record;
            var store = record.store;
            record.set(values);
            store.sync({
                callback: function(batch) {
                    if (batch.complete === true && batch.exception === false) {
                        console.log('Dados salvos com sucesso!');
                        form.close();
                    } else {
                        console.log('Erro ao realizar operação');
                        form.close();
                    }
                }
            });
        }
    }, {
        text: 'Cancel',
        handler: function() {
            var me = this;
            var form = me.up('formpanel');
            form.close();
        }
    }]
});
