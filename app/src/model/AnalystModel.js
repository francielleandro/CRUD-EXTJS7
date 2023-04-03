Ext.define('MyCrudApp.model.AnalystModel',{
    extend : 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name  : 'selected', type: 'bool' , defaultValue: false },
        {title : 'Código'  , name  : 'id'      , type : 'int' , disabled : true},
        {title : 'Nome'    , name : 'name', type : 'string', required :true},
        {title : 'E-mail'  , name  : 'email'   , type : 'string' , required :true},
        {title : 'Telefone', name  : 'phone'   , type : 'string'}
    ]
})