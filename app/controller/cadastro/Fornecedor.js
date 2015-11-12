Ext.define('AutoMecanica.controller.cadastro.Fornecedor',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Fornecedores',
		'cadastro.FornecedoresForm'
	],

	models: [
		'Fornecedor'
	],

	stores:[
		'Fornecedores'
	],

	init: function(application){
		this.control({
			"listarfornecedores button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarfornecedores button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarfornecedores button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarfornecedores button#importar": {
				click: this.onButtonClickImportar
			},
			"listarfornecedores button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarfornecedores textfield#searchField": {
				change: this.onSearch
			},
			"listarfornecedores grid": {
				itemdblclick: this.onGridItemDblClickFornecedores,
				render: this.onGridRender
			},

			"formfornecedores button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formfornecedores button#cancelar":{
				click: this.onButtonClickFormCancelar
			}
		})		
	},

	onGridRender: function(grid, e, opts){
		var store = grid.getStore();
		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){
		var win = Ext.create('AutoMecanica.view.cadastro.FornecedoresForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.FornecedoresForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Fornecedor');
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
				msg: 'Deseja realmente excluir este Fornecedor?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/fornecedores.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									//Ext.Msg.show({title: 'Excluido!', msg: 'Fornecedor excluído com sucesso!', buttons: Ext.Msg.OK});
									AutoMecanica.util.Util.showToast('Fornecedor excluído!');

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
		/*var win = Ext.create('AutoMecanica.view.cadastro.FornecedoresForm');	
		win.show();*/
	},

	onButtonClickExportar: function(button, e, opts){
	},

	onGridItemDblClickFornecedores: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.FornecedoresForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Fornecedor');
			win.show();
		}
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridfornecedores')[0],
			formEl = form;


		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/fornecedores.php?module=salvar',
				success: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					var result = action;
					if(result.success){

						AutoMecanica.util.Util.showToast('Dados do fornecedor foram salvos!');
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
					Ext.get(formEl.getEl()).unmask();
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
				if(pattern.test(record.get('nome'))){
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