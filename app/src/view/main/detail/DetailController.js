Ext.define('MyCrudApp.view.main.detail.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail',
  
    onSearch: function() {
      var searchTerm = this.lookupReference('searchForm').getForm().getFieldValues().searchTerm;
      var analystStore = this.getViewModel().getStore('analyst');
  
      analystStore.clearFilter();
      analystStore.filter('name', searchTerm);
    }
  });
  