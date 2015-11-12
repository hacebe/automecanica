Ext.define('AutoMecanica.controller.cadastro.Empresa',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Empresas',
		'cadastro.EmpresasForm'
	],

	models: [
		'Empresa',
		'Usuario',
		'TipoPlano'
	],

	stores:[
		'Empresas',
		'Usuarios',
		'Contatos',
		'Socios',
		'TiposPlanos'
	],

	init: function(application){		
		this.control({
			"formempresas": {
				afterrender: this.onFormAfterRender
			},
			"formempresas grid#sociosgrid": {
				render: this.onGridSociosRender,				
				itemdblclick: this.onGridItemDblClickSocios
			},
			"formempresas grid#contatosgrid": {
				render: this.onGridContatosRender,				
				itemdblclick: this.onGridItemDblClickContatos
			},
			"listarempresas button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarempresas button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarempresas button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarempresas button#importar": {
				click: this.onButtonClickImportar
			},
			"listarempresas button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarempresas textfield#searchField": {
				change: this.onSearch
			},
			
			"listarempresas": {				
				render: this.onFormRender
			},
			"listarempresas grid": {
				itemdblclick: this.onGridItemDblClickEmpresas,
				render: this.onGridRender
			},
			"formempresas button#removeAllUsuarios": {
				click: this.onButtonClickRemoveAllUsuarios,				
			},
			"formempresas button#removeSelUsuario": {
				click: this.onButtonClickRemoveSelUsuario,				
			},
			"formempresas button#addSelUsuario": {
				click: this.onButtonClickAddSelUsuario,				
			},
			"formempresas button#addAllUsuarios": {
				click: this.onButtonClickAddAllUsuarios,				
			},
			"formempresas textfield#searchUnig": {
				change: this.onSearchUsuarios
			},
			"formempresas textfield#searchUig": {
				change: this.onSearchUsuarios
			},

			"formempresas button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"formempresas button#cancelar":{
				click: this.onButtonClickFormCancelar
			},

			"formempresas form#sociosform button#novobtn":{
				click: this.onButtonClickNovoSocio
			},
			"formempresas form#sociosform button#salvarbtn":{
				click: this.onButtonClickSalvarSocio
			},
			"formempresas form#sociosform button#excluirbtn":{
				click: this.onButtonClickExcluirSocio
			},
			"formempresas form#sociosform button#cancelarbtn":{
				click: this.onButtonClickCancelarSocio
			},

			"formempresas form#contatosform button#novobtn":{
				click: this.onButtonClickNovoContato
			},
			"formempresas form#contatosform button#salvarbtn":{
				click: this.onButtonClickSalvarContato
			},
			"formempresas form#contatosform button#excluirbtn":{
				click: this.onButtonClickExcluirContato
			},
			"formempresas form#contatosform button#cancelarbtn":{
				click: this.onButtonClickCancelarContato
			}

		})		
	},

	onFormAfterRender: function(form, e, opts){
		var win = Ext.ComponentQuery.query('formempresas')[0];
			modo = win.modo;
		var empresaId = Ext.ComponentQuery.query('form#cadastroform hiddenfield')[0];
		var unigrid = Ext.ComponentQuery.query('grid#gridunig')[0].getStore(),
			uigrid = Ext.ComponentQuery.query('grid#griduig')[0].getStore();			

		var id = win.down('form#cadastroform').down('hiddenfield[name=id]').getValue();

		if(id){		
			win.down('#contatostab').setDisabled(false);
			win.down('#usuariostab').setDisabled(false);
			win.down('#sociostab').setDisabled(false);			

			unigrid.getProxy().extraParams = {'eid': empresaId.getValue()};
			uigrid.getProxy().extraParams = {'eid': empresaId.getValue()};

			unigrid.load();
			uigrid.load();			
		
		}else{
			win.down('#contatostab').setDisabled(true);
			win.down('#usuariostab').setDisabled(true);
			win.down('#sociostab').setDisabled(true);
		}
	},

	onGridRender: function(grid, e, opts){
		grid.up('window').down('button#excluir').setDisabled(true);
		var store = grid.getStore();
		store.load();
	},

	onFormRender: function(form, e, opts){
		Ext.StoreManager.lookup('TiposPlanos').load();
	},

	onGridSociosRender: function(grid, e, opts){
		var store = grid.getStore();
		var empresaId = grid.up('window').down('form#cadastroform hiddenfield');

		store.getProxy().setExtraParams({
			eid: empresaId.getValue()			
		})

		store.load();		
	},

	onGridContatosRender: function(grid, e, opts){
		var store = grid.getStore();
		var empresaId = grid.up('window').down('form#cadastroform hiddenfield');

		store.getProxy().setExtraParams({
			eid: empresaId.getValue()
		})

		store.load();
	},

	onButtonClickIncluir: function(button, e, opts){
		var win = Ext.create('AutoMecanica.view.cadastro.EmpresasForm');	
		win.show();
	},

	onButtonClickAlterar: function(button, e, opts){
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.EmpresasForm');
			win.down('form').loadRecord(record[0]);
			win.down('combobox[name=plano_id]').setDisabled(true);
			win.setTitle('Editar Empresa');
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
				msg: 'Deseja realmente excluir esta Empresa?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Excluindo...", 'loading');
						Ext.Ajax.request({
							url: 'data/empresa.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									//Ext.Msg.show({title: 'Excluida!', msg: 'Empresa excluída com sucesso!', buttons: Ext.Msg.OK});
									AutoMecanica.util.Util.showToast('Empresa excluída!');
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
	},

	onButtonClickExportar: function(button, e, opts){
	},

	onGridItemDblClickEmpresas: function(grid, e, opts){
		var btn = grid.up('window').down('button#alterar');
		btn.fireEvent('click', btn, e, opts);
		/*var record = grid.getSelectionModel().getSelection();
		console.log(record);
		if(record[0]){
			var win = Ext.create('AutoMecanica.view.cadastro.EmpresasForm');
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Empresa');
			win.show();
		}*/
	},

	onGridItemDblClickSocios: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection(),
			form = grid.up('window').down('form#sociosform');
		var	salvarbtn = form.down('button#salvarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			cancelarbtn = form.down('button#cancelarbtn');

			salvarbtn.setDisabled(false);
			excluirbtn.setDisabled(false);
			cancelarbtn.setDisabled(false);

		if(record[0]){			
			form.loadRecord(record[0]);
			this.setFormSociosEnabled(form, true);
		}
	},

	onGridItemDblClickContatos: function(grid, e, opts){
		var record = grid.getSelectionModel().getSelection(),
			form = grid.up('window').down('form#contatosform');
		var	salvarbtn = form.down('button#salvarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			cancelarbtn = form.down('button#cancelarbtn');

			salvarbtn.setDisabled(false);
			excluirbtn.setDisabled(false);
			cancelarbtn.setDisabled(false);

		if(record[0]){			
			form.loadRecord(record[0]);						
			this.setFormContatosEnabled(form, true);
		}
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var form = button.up('panel').down('form#cadastroform'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridempresas')[0],
			formEl = form;

		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/empresa.php?module=salvar',
				success: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					var result = action;
					if(result.success){
						AutoMecanica.util.Util.showToast('Os dados da empresa foram salvos!');

						/*
							Send update socket
						*/

						var socket = AutoMecanica.singleton.Socket.connection.instance;

						socket.emit("updateStore", {
							name: grid.getStore().storeId
						});
						
						grid.getStore().load();
						if(!win.down('hiddenfield[name=id]').getValue()) win.close();
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

	onButtonClickRemoveAllUsuarios: function(button, e, opts){
		var empresaId = Ext.ComponentQuery.query('form#cadastroform hiddenfield')[0];
		var panel = button.up('panel'),
			grid1 = button.up('panel').down('grid#griduig'),
			grid2 = button.up('panel').down('grid#gridunig'),
			store1 = grid1.getStore(),
			store2 = grid2.getStore();

			Ext.get(panel.getEl()).mask("Removendo usuários...", 'loading');
			Ext.Ajax.request({
				url: 'data/empresa.php?module=removeAllUsers',
				params:{
					eid: empresaId.getValue()
				},
				success: function(conn, response, options, eOpts){
					Ext.get(panel.getEl()).unmask();
					var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
					if(result.success){
						store1.load();
						store2.load();
					}else{
						AutoMecanica.util.Util.showErrorMsg(conn.responseText);
					}
				}
			})
	},

	onButtonClickAddAllUsuarios: function(button, e, opts){
		var empresaId = Ext.ComponentQuery.query('form#cadastroform hiddenfield')[0];
		var panel = button.up('panel'),
			grid1 = button.up('panel').down('grid#griduig'),
			grid2 = button.up('panel').down('grid#gridunig'),
			store1 = grid1.getStore(),
			store2 = grid2.getStore();

			Ext.get(panel.getEl()).mask("Adicionando usuários...", 'loading');
			Ext.Ajax.request({
				url: 'data/empresa.php?module=addAllUsers',
				params:{
					eid: empresaId.getValue()
				},
				success: function(conn, response, options, eOpts){
					Ext.get(panel.getEl()).unmask();
					var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
					if(result.success){
						store1.load();
						store2.load();
					}else{
						AutoMecanica.util.Util.showErrorMsg(conn.responseText);
					}
				}
			})	
	},

	onButtonClickAddSelUsuario: function(button, e, opts){
		var empresaId = Ext.ComponentQuery.query('form#cadastroform hiddenfield')[0];
		var panel = button.up('panel'),
			grid1 = panel.down('grid#gridunig'),
			grid2 = panel.down('grid#griduig'),
			store1 = grid1.getStore(),
			store2 = grid2.getStore(),
			selection = grid1.getSelectionModel().getSelection(),
			idsArr = [];

			if(selection.length){
				for(var i=0; i<selection.length; i++){					
					idsArr.push(selection[i].id);
				}
			}

			var ids = idsArr.join(',');
	
			if(idsArr.length){		

				Ext.get(panel.getEl()).mask("Adicionando usuários...", 'loading');
				Ext.Ajax.request({
					url: 'data/empresa.php?module=addSelUsers',				
					params:{
						ids: ids,
						eid: empresaId.getValue()
					},				
					success: function(conn, response, options, eOpts){
						Ext.get(panel.getEl()).unmask();
						var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
						if(result.success){
							store1.load();
							store2.load();
						}else{
							AutoMecanica.util.Util.showErrorMsg(conn.responseText);
						}
					}
				})
		
			}
	},

	onButtonClickRemoveSelUsuario: function(button, e, opts){
		var empresaId = Ext.ComponentQuery.query('form#cadastroform hiddenfield')[0];
		var panel = button.up('panel'),
			grid1 = panel.down('grid#griduig'),
			grid2 = panel.down('grid#gridunig'),
			store1 = grid1.getStore(),
			store2 = grid2.getStore(),
			selection = grid1.getSelectionModel().getSelection(),
			idsArr = [];

			if(selection.length){
				for(var i=0; i<selection.length; i++){					
					idsArr.push(selection[i].id);
				}
			}

			var ids = idsArr.join(',');
			
			if(idsArr.length){
				Ext.get(panel.getEl()).mask("Removendo usuários...", 'loading');
				Ext.Ajax.request({				
					url: 'data/empresa.php?module=removeSelUsers',
					params:{
						ids: ids,
						eid: empresaId.getValue()
					},				
					success: function(conn, response, options, eOpts){
						Ext.get(panel.getEl()).unmask();
						var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
						if(result.success){
							store1.load();
							store2.load();
						}else{
							AutoMecanica.util.Util.showErrorMsg(conn.responseText);
						}
					}
				})				
			}
	},

	onSearch: function(field, e){		
		var val = field.getValue(),
			store = field.up('window').down('grid').getStore();

			store.clearFilter();

			var pattern = new RegExp(val, 'ig');

			store.filterBy(function(record){												
				if(pattern.test(record.get('razao_social')) | pattern.test(record.get('nome_fantasia'))){
					return record;	
				}				
			}, this);
	},

	onSearchUsuarios: function(field, e){		
		var val = field.getValue(),
			store = field.up('grid').getStore();

			store.clearFilter();

			var pattern = new RegExp(val, 'ig');

			store.filterBy(function(record){												
				if(pattern.test(record.get('nome'))){
					return record;	
				}				
			}, this);
	},

	onButtonClickNovoSocio: function(button, e, opts){
		var form = button.up('form'),
			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');	
			
			this.setFormSociosEnabled(form, true);

			salvarbtn.setDisabled(false);
			excluirbtn.setDisabled(true);
			cancelarbtn.setDisabled(false);

		form.reset();
		form.down('textfield').focus();
	},

	onButtonClickSalvarSocio: function(button, e, opts){
		var form = button.up('window').down('form#sociosform'),
			grid = form.up('window').down('grid#sociosgrid'),

			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');	
			


			if(form.getForm().isValid()){
				Ext.get(form.getEl()).mask("Salvando...", 'loading');
				//console.log(form.getRecord(), form.getValues());
				var formEl = form,
					me = this;

				form.getForm().setValues(form.getValues());
				form.getForm().submit({					
					url: 'data/socios.php?module=salvar',
					params:{
						eid: grid.getStore().getProxy().getExtraParams().eid
					},			
					success: function(form, action){
						Ext.get(formEl.getEl()).unmask();
						var result = action;
						if(result.success){

							Ext.Msg.alert(
								'Dados Salvos!',
								'Os dados do sócio foram salvos'
							);

							AutoMecanica.util.Util.showToast('Os dados do sócio foram salvos!');
							grid.getStore().load();

							/*
								Send update socket
							*/

							var socket = AutoMecanica.singleton.Socket.connection.instance;

							socket.emit("updateStore", {
								name: grid.getStore().storeId
							});

							formEl.reset();
							me.setFormSociosEnabled(formEl, false);
							
							salvarbtn.setDisabled(true);
							excluirbtn.setDisabled(true);
							cancelarbtn.setDisabled(true);
						}
					},
					failure: function(form, action){
						Ext.get(formEl.getEl()).unmask();
						Ext.Msg.alert(
							'Erro!',
							'Ocorreu um erro ao tentar salvar.<br>Tente novamente!'
						)
					}
				});
				
			}



			//cancelarbtn.setDisabled(true);
	},

	onButtonClickExcluirSocio: function(button, e, opts){
		var grid = button.up('window').down('grid#sociosgrid'),
			store = grid.getStore(),
			form = button.up('window').down('form#sociosform'),
			record = grid.getSelectionModel().getSelection(),

			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn'),

			me = this;

		if(record[0]){
			Ext.Msg.show({
				title: 'Excluir?',
				msg: 'Deseja realmente excluir este Sócio?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/socios.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									//Ext.Msg.show({title: 'Excluido!', msg: 'Socio excluído com sucesso!', buttons: Ext.Msg.OK});
									AutoMecanica.util.Util.showToast('Sócio excluído!');
									store.load();
									form.reset();
									me.setFormSociosEnabled(form, false);
									salvarbtn.setDisabled(true);
									excluirbtn.setDisabled(true);
									cancelarbtn.setDisabled(true);

									
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

	onButtonClickCancelarSocio: function(button, e, opts){
		var form = button.up('form#sociosform'),
			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');

		form.reset();
		this.setFormSociosEnabled(form, false);
		salvarbtn.setDisabled(true);
		excluirbtn.setDisabled(true);
		cancelarbtn.setDisabled(true);
	},

	setFormSociosEnabled: function(form, val){
		if(val){
			form.down('textfield[name=cpf]').setDisabled(false);	
			form.down('textfield[name=rg]').setDisabled(false);	
			form.down('datefield[name=dt_nascimento]').setDisabled(false);	
			form.down('textfield[name=participacao]').setDisabled(false);	
			form.down('textfield[name=nome]').setDisabled(false);	
			form.down('textfield[name=apelido]').setDisabled(false);	
			form.down('textfield[name=contacontabil]').setDisabled(false);	
			
		
		}else{
			form.down('textfield[name=cpf]').setDisabled(true);	
			form.down('textfield[name=rg]').setDisabled(true);	
			form.down('datefield[name=dt_nascimento]').setDisabled(true);	
			form.down('textfield[name=participacao]').setDisabled(true);	
			form.down('textfield[name=nome]').setDisabled(true);	
			form.down('textfield[name=apelido]').setDisabled(true);	
			form.down('textfield[name=contacontabil]').setDisabled(true);	

		}
	},

	onButtonClickNovoContato: function(button, e, opts){
		var form = button.up('form'),
			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');	
			
			this.setFormContatosEnabled(form, true);

			salvarbtn.setDisabled(false);
			excluirbtn.setDisabled(true);
			cancelarbtn.setDisabled(false);

		form.reset();
		form.down('textfield').focus();
	},

	onButtonClickSalvarContato: function(button, e, opts){
		var form = button.up('window').down('form#contatosform'),
			grid = form.up('window').down('grid#contatosgrid'),

			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');	
			
			if(form.getForm().isValid()){
				Ext.get(form.getEl()).mask("Salvando...", 'loading');				
				var formEl = form,
					me = this;

				form.getForm().setValues(form.getValues());
				form.getForm().submit({					
					url: 'data/contatos.php?module=salvar',
					params:{
						eid: grid.getStore().getProxy().getExtraParams().eid
					},			
					success: function(form, action){
						Ext.get(formEl.getEl()).unmask();
						var result = action;
						if(result.success){

							AutoMecanica.util.Util.showToast('Contato salvo!');
							grid.getStore().load();

							/*
								Send update socket
							*/

							var socket = AutoMecanica.singleton.Socket.connection.instance;

							socket.emit("updateStore", {
								name: grid.getStore().storeId
							});

							formEl.reset();
							me.setFormContatosEnabled(formEl, false);
							
							salvarbtn.setDisabled(true);
							excluirbtn.setDisabled(true);
							cancelarbtn.setDisabled(true);
						}
					},
					failure: function(form, action){
						Ext.get(formEl.getEl()).unmask();
						Ext.Msg.alert(
							'Erro!',
							'Ocorreu um erro ao tentar salvar.<br>Tente novamente!'
						)
					}
				});
				
			}
	},

	onButtonClickExcluirContato: function(button, e, opts){
		var grid = button.up('window').down('grid#contatosgrid'),
			store = grid.getStore(),
			form = button.up('window').down('form#contatosform'),
			record = grid.getSelectionModel().getSelection(),

			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn'),

			me = this;

		if(record[0]){
			Ext.Msg.show({
				title: 'Excluir?',
				msg: 'Deseja realmente excluir este contato?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(buttonId){
					if(buttonId == 'yes'){
						Ext.get(button.up('window').getEl()).mask("Salvando...", 'loading');
						Ext.Ajax.request({
							url: 'data/contatos.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function(conn, response, options, eOpts){
								Ext.get(button.up('window').getEl()).unmask();
								var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);
								if(result.success){
									AutoMecanica.util.Util.showToast('Contato excluido!');
									
									/*
										Send update socket
									*/

									var socket = AutoMecanica.singleton.Socket.connection.instance;

									socket.emit("updateStore", {
										name: grid.getStore().storeId
									});

									store.load();
									form.reset();
									me.setFormContatosEnabled(form, false);
									salvarbtn.setDisabled(true);
									excluirbtn.setDisabled(true);
									cancelarbtn.setDisabled(true);

									
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

	onButtonClickCancelarContato: function(button, e, opts){
		var form = button.up('form#contatosform'),
			cancelarbtn = form.down('button#cancelarbtn'),
			excluirbtn = form.down('button#excluirbtn'),
			salvarbtn = form.down('button#salvarbtn');

		form.reset();
		this.setFormContatosEnabled(form, false);
		salvarbtn.setDisabled(true);
		excluirbtn.setDisabled(true);
		cancelarbtn.setDisabled(true);
	},

	setFormContatosEnabled: function(form, val){
		if(val){
			form.down('textfield[name=nome]').setDisabled(false);	
			form.down('textfield[name=email]').setDisabled(false);	
			form.down('textfield[name=telefone]').setDisabled(false);	
			form.down('textfield[name=ramal]').setDisabled(false);	
			form.down('textfield[name=cargo]').setDisabled(false);	
		}else{
			form.down('textfield[name=nome]').setDisabled(true);	
			form.down('textfield[name=email]').setDisabled(true);	
			form.down('textfield[name=telefone]').setDisabled(true);	
			form.down('textfield[name=ramal]').setDisabled(true);	
			form.down('textfield[name=cargo]').setDisabled(true);	
		}
	},

	onTextfieldSpecialKey : function(field, e , options){
		if(e.getKey() == e.ENTER){
			var submitBtn = field.up('window').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},			
});