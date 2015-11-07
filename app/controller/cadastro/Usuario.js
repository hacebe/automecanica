Ext.define('GestorFinanceiro.controller.cadastro.Usuario',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Usuarios',
		'cadastro.UsuariosForm'
	],

	models: [
		'Usuario'
	],

	stores:[
		'Usuarios'
	],

	/*refs:[
		{

		}
	],*/

	init: function(application){		
		this.control({
			"listarusuarios button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarusuarios button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarusuarios button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarusuarios button#importar": {
				click: this.onButtonClickImportar
			},
			"listarusuarios button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarusuarios textfield#searchField": {
				change: this.onSearch
			},
			"listarusuarios grid": {
				itemdblclick: this.onGridItemDblClickUsuarios,
				render: this.onGridRender
			},

			"formusuarios button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formusuarios button#cancelar":{
				click: this.onButtonClickFormCancelar
			}
		})		
	},

	onGridRender: function(grid, e, opts){
		var store = grid.getStore();
		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){				
		var win = Ext.create('GestorFinanceiro.view.cadastro.UsuariosForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){						
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.UsuariosForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Usuário');
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
				msg: 'Deseja realmente excluir este Usuário?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/usuario.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									GestorFinanceiro.util.Util.showToast('Usuário excluído!');
									
									/*
										Send update socket
									*/

									var socket = GestorFinanceiro.singleton.Socket.connection.instance;

									socket.emit("updateStore", {
										name: grid.getStore().storeId
									});

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
		/*var win = Ext.create('GestorFinanceiro.view.cadastro.UsuariosForm');	
		win.show();*/
	},

	onButtonClickExportar: function(button, e, opts){				
		
	},

	onGridItemDblClickUsuarios: function(grid, e, opts){						
		var record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('GestorFinanceiro.view.cadastro.UsuariosForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Usuario');
			win.show();
		}
	},
	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridusuarios')[0],
			formEl = form;


		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/usuario.php?module=salvar',
				success: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					var result = action;
					if(result.success){
						GestorFinanceiro.util.Util.showToast('Usuário salvo!');

						/*
							Send update socket
						*/

						var socket = GestorFinanceiro.singleton.Socket.connection.instance;

						socket.emit("updateStore", {
							name: grid.getStore().storeId
						});
						
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
				if(pattern.test(record.get('nome')) | pattern.test(record.get('usuario')) | pattern.test(record.get('email')) ){
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