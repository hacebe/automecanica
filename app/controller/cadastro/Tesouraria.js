Ext.define('AutoMecanica.controller.cadastro.Tesouraria',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Tesouraria',
		'cadastro.TesourariaForm'
	],

	models: [
		'Tesouraria'
	],

	stores:[
		'Tesourarias'
	],

	init: function(application){
		this.control({
			"listartesouraria button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listartesouraria button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listartesouraria button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listartesouraria button#importar": {
				click: this.onButtonClickImportar
			},
			"listartesouraria button#exportar": {
				click: this.onButtonClickExportar
			},
			"listartesouraria textfield#searchField": {
				change: this.onSearch
			},
			"listartesouraria grid": {
				itemdblclick: this.onGridItemDblClickTesouraria,
				render: this.onGridRender
			},

			"formtesouraria button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formtesouraria button#cancelar":{
				click: this.onButtonClickFormCancelar
			}
		})		
	},

	onGridRender: function(grid, e, opts){
		var store = grid.getStore();
		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){
		var win = Ext.create('AutoMecanica.view.cadastro.TesourariaForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.TesourariaForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Registro');
			win.show();
		}
	},

	onButtonClickExcluir: function(button, e, opts){
		var grid = button.up('window').down('grid'),
			record = grid.getSelectionModel().getSelection(),
			store = grid.getStore();

		if(record[0]){
			Ext.Msg.show({
				title: 'Excluir?',
				msg: 'Deseja realmente excluir este Registro?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/tesouraria.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									/*Ext.Msg.show({title: 'Excluido!', msg: 'Registro excluído com sucesso!', buttons: Ext.Msg.OK});*/
									AutoMecanica.util.Util.showToast('Conta excluida!');

									/*
										Send update socket
									*/

									var socket = AutoMecanica.singleton.Socket.connection.instance;

									socket.emit("updateStore", {
										name: grid.getStore().storeId
									});
									
									store.load();
									
								}else{
									AutoMecanica.util.Util.showErrorMsg(conn.responseText);
								}
							},
							failure: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								AutoMecanica.util.Util.showErrorMsg(conn.responseText);
							}
						})
					}
				}
			})
		}
	},

	onButtonClickImportar: function(button, e, opts){
		/*var win = Ext.create('AutoMecanica.view.cadastro.TesourariaForm');	
		win.show();*/
	},

	onButtonClickExportar: function(button, e, opts){
	},

	onGridItemDblClickTesouraria: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.TesourariaForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Contas');
			win.show();
		}
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridtesouraria')[0];


		if(form.getForm().isValid()){
			Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/tesouraria.php?module=salvar',
				success: function(form, action){
					var result = action;
					Ext.get(button.up('window').getEl()).unmask();
					if(result.success){

						AutoMecanica.util.Util.showToast('Conta salva!');
						grid.getStore().load();

						/*
							Send update socket
						*/

						var socket = AutoMecanica.singleton.Socket.connection.instance;

						socket.emit("updateStore", {
							name: grid.getStore().storeId
						});
						
						win.close();
					}
				},
				failure: function(form, action){
					Ext.get(button.up('window').getEl()).unmask();
					Ext.Msg.alert(
						'Erro!',
						'Ocorreu um erro ao tentar salvar.<br>Tente novamente!'
					)
				}
			})
			
		}
	},

	onButtonClickFormCancelar: function(button, e, opts){
		button.up('window').close();
	},

	onSearch: function(field, e){
		var val = field.getValue(),
			store = field.up('window').down('grid').getStore();

			store.clearFilter();

			var pattern = new RegExp(val, 'ig');

			store.filterBy(function(record){												
				if(pattern.test(record.get('descricao')) | pattern.test(record.get('conta'))){
					return record;	
				}				
			}, this);
	},

	onTextfieldSpecialKey : function(field, e , options){
		if(e.getKey() == e.ENTER){
			var submitBtn = field.up('window').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},
});