Ext.define('MyCrudApp.model.AnalystModel',{
    extend : 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name  : 'id', type : 'int', editable : false},
        {title : 'Nome', name : 'name', type : 'string'},
        {name : 'email', type : 'string'},
        {name : 'phone', type : 'string'}
    ],
})