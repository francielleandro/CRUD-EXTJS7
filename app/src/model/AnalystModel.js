Ext.define('MyCrudApp.model.AnalystModel',{
    extend : 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'selected', type: 'bool', defaultValue: false },
        {name  : 'id', type : 'int', disabled : true},
        {title : 'Nome', name : 'name', type : 'string', required :true},
        {name : 'email', type : 'string', required :true},
        {name : 'phone', type : 'string'}
    ],
    validations: [
        {field: 'name', type: 'presence', message: 'O campo nome é obrigatório'},
        {field: 'name', type: 'length', min: 3, message: 'O campo nome deve ter pelo menos 3 caracteres'}
    ]
})