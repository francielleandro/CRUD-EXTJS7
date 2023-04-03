Ext.define('MyCrudApp.view.home.HomeView',{
	xtype: 'homeview',
	cls: 'homeview',
	controller: {type: 'homeviewcontroller'},
	viewModel: {type: 'homeviewmodel'},
	requires: [],
	extend: 'Ext.Container',
  	scrollable: true,
	items : [
		{
			html : 'Dashboard'
		}
	]
});