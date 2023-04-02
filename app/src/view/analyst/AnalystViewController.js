Ext.define('MyCrudApp.view.AnalystViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.analystviewcontroller',

    init(){
        var me = this;
        console.log(me)
        me.callParent(arguments)
    },
    onEditCancelled: function (editor, value, startValue, eOpts) {
        var user = Ext._find(value.record.store.config.data.items, { name: value.record.data.name });
        Ext.Msg.confirm('Confirm', value.record.data.name + ': ' + user.phone + ' is phone number', 'onConfirm', this);
    },
    onClick: function(event){
        console.log(event)
    }
});
