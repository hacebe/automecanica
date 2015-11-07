Ext.define('GestorFinanceiro.controller.cadastro.Cliente',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Clientes',
		'cadastro.ClientesForm'
	],

	models: [
		'Cliente'
	],

	stores:[
		'Clientes'
	],

	/*refs:[
		{

		}
	],*/

	init: function(application){
		this.control({
			"listarclientes button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarclientes button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarclientes button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarclientes button#importar": {
				click: this.onButtonClickImportar
			},
			"listarclientes button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarclientes textfield#searchField": {
				change: this.onSearch
			},
			"listarclientes grid": {
				itemdblclick: this.onGridItemDblClickClientes,
				render: this.onGridRender
			},

			"formclientes button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formclientes button#cancelar":{
				click: this.onButtonClickFormCancelar
			}
		})		
	},

	onGridRender: function(grid, e, opts){
		var store = grid.getStore();
		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){
		var win = Ext.create('GestorFinanceiro.view.cadastro.ClientesForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.ClientesForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Cliente');
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
				msg: 'Deseja realmente excluir este Cliente?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/clientes.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									//Ext.Msg.show({title: 'Excluido!', msg: 'Cliente excluído com sucesso!', buttons: Ext.Msg.OK});
									GestorFinanceiro.util.Util.showToast('Cliente excluído!');

									store.load();
									
								}else{
									GestorFinanceiro.util.Util.showErrorMsg(conn.responseText);
								}
							},
							failure: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								GestorFinanceiro.util.Util.showErrorMsg(conn.responseText);
							}
						})
					}
				}
			})
		}
	},

	onButtonClickImportar: function(button, e, opts){
		var win = Ext.create('GestorFinanceiro.view.cadastro.ClientesForm');	
		win.show();
	},

	onButtonClickExportar: function(button, e, opts) {},

	onGridItemDblClickClientes: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.ClientesForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Cliente');
			win.show();
		}
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridclientes')[0],
			formEl = form;


		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/clientes.php?module=salvar',
				success: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					var result = action;
					if(result.success){
						GestorFinanceiro.util.Util.showToast('Dados do cliente foram salvos!');

						grid.getStore().load();
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