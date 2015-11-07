Ext.define('GestorFinanceiro.controller.cadastro.Produto',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Produtos',
		'cadastro.ProdutosForm'
	],

	models: [
		'Produto'
	],

	stores:[
		'Produtos'
	],

	/*refs:[
		{

		}
	],*/

	init: function(application){
		this.control({
			"listarprodutos button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarprodutos button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarprodutos button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarprodutos button#importar": {
				click: this.onButtonClickImportar
			},
			"listarprodutos button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarprodutos textfield#searchField": {
				change: this.onSearch
			},
			"listarprodutos grid": {
				itemdblclick: this.onGridItemDblClickClientes,
				render: this.onGridRender
			},

			"formprodutos button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formprodutos button#cancelar":{
				click: this.onButtonClickFormCancelar
			}
		})		
	},

	onGridRender: function(grid, e, opts){
		var store = grid.getStore();
		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){
		var win = Ext.create('GestorFinanceiro.view.cadastro.ProdutosForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.ProdutosForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Produto');
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
				msg: 'Deseja realmente excluir este Produto?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/produtos.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									//Ext.Msg.show({title: 'Excluido!', msg: 'Cliente excluído com sucesso!', buttons: Ext.Msg.OK});
									GestorFinanceiro.util.Util.showToast('Produto excluído!');

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
		var win = Ext.create('GestorFinanceiro.view.cadastro.ProdutosForm');	
		win.show();
	},

	onButtonClickExportar: function(button, e, opts) {},

	onGridItemDblClickClientes: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.ProdutosForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Produto');
			win.show();
		}
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridprodutos')[0],
			formEl = form;


		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/produtos.php?module=salvar',
				success: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					var result = action;
					if(result.success){
						GestorFinanceiro.util.Util.showToast('Dados do produto foram salvos!');

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