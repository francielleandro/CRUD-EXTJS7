Ext.define('MyCrudApp.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',

	routes: { 
		':xtype': {action: 'mainRoute'}
	},

	mainRoute:function(xtype) {
		var navview = this.lookup('navview');
		var menuview = navview.items.items[0]
		
		var centerview = this.lookup('centerview');

		var headerview = this.lookup('headerview');

		var exists = Ext.ClassManager.getByAlias('widget.' + xtype);

		if (exists === undefined) {
			console.warn(xtype + ' does not exist');
			return;
		}
		var node = menuview.getStore().findNode('xtype', xtype);

		if (node == null) {
			console.warn('unmatchedRoute: ' + xtype);
			return;
		}
		//cria o componente conforme o xtype passado
		if(!centerview.getComponent(xtype)){
			centerview.add(
				{ 
					xtype: xtype,  
					itemId: xtype, 
					heading: node.get('text') 
				}
			);
		}
		// console.log(centerview);
		centerview.setActiveItem(xtype);
		menuview.setSelection(node);
		if(centerview){
			var details = this.lookup('detailview');
			var activateCenterView = centerview.getActiveItem();
			var grid = activateCenterView;
			if(grid.isXType('grid')){
				var store = grid.store;
				var model = store.getModel();
				var fields = model.getFields();
				var formItems = [];
				Ext.each(fields, function(field) {
					if(field.getName() && field.getName() !=='selected') {
						var formItem = {
							xtype: 'textfield',
							name: field.getName(),
							label: field.title ? field.title :field.getName(),
							margin: '10 0 0 0'
						};
	
						formItems.push(formItem);
					}
				});
				formItems.push({
					xtype: 'button',
					text: 'Pesquisar',
					iconCls: 'x-fa fa-search',
					margin: '10 0 0 0',
					handler: function(btn) {
						console.log(this);
						var form = btn.up('#searchForm');
						var params = form.getValues();
			
						store.getProxy().setExtraParams(params);
						store.load({
						  callback: function(records, operation, success) {
							// manipular a resposta aqui
						  }
						});
					}
				});
				details.removeAll();
				
				details.add({
					xtype : 'formpanel',
					items :formItems,
					itemId: 'searchForm'
				})
				details.show();
			}else{
				details.hide();
				details.removeAll();
			}
		}

		var vm = this.getViewModel(); 

		vm.set('heading', node.get('text'));
	},

	onMenuViewSelectionChange: function (tree, node) {
		if (node == null) { return }
		var vm = this.getViewModel();
		if (node.get('xtype') != undefined) {
			this.redirectTo( node.get('xtype') );
		}
	},

	onTopViewNavToggle: function () {
		var vm = this.getViewModel();
		vm.set('navCollapsed', !vm.get('navCollapsed'));
	},

	onHeaderViewDetailToggle: function (button) {
		console.log(button);
		var vm = this.getViewModel();
		vm.set('detailCollapsed', !vm.get('detailCollapsed'));
		if(vm.get('detailCollapsed')===true) {
			button.setIconCls('x-fa fa-search');
		}
		else {
			button.setIconCls('x-fa fa-arrow-right');
		}
	},

	onBottomViewlogout: function () {
		localStorage.setItem("LoggedIn", false);
		this.getView().destroy();
		Ext.Viewport.add([{ xtype: 'loginview'}]);
	}

//	onActionsViewLogoutTap: function( ) {
//		var vm = this.getViewModel();
//		vm.set('firstname', '');
//		vm.set('lastname', '');
//
//		Session.logout(this.getView());
//		this.redirectTo(AppCamp.getApplication().getDefaultToken().toString(), true);
//	}

});
