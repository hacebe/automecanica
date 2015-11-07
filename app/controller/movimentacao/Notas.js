Ext.define('GestorFinanceiro.controller.movimentacao.Notas',{
	extend: 'Ext.app.Controller',

	views: [
		'movimentacao.Notas',
		'movimentacao.NotasForm',
		'movimentacao.Anexos'
	],

	models: [
		'MapaNota'
	],

	stores:[
		'Notas',
		'MapaNotas'
	],

	init: function( application ) {
		this.control({

			"listar": {
				afterrender: this.onFormAfterRender
			},

			"listarnotas button#incluir": {
				click: this.onButtonClickIncluir
			},

			"listarnotas button#alterar": {
				click: this.onButtonClickAlterar
			},

			"listarnotas button#excluir": {
				click: this.onButtonClickExcluir
			},

			"listarnotas button#importar": {
				click: this.onButtonClickImportar
			},

			"listarnotas button#exportar": {
				click: this.onButtonClickExportar
			},

			"listarnotas button#refresh": {
				click: this.onButtonClickRefresh
			},

			"listarnotas textfield#searchField": {
				change: this.onSearch
			},
			
			"listarnotas": {				
				beforeshow: this.onBeforeFormShow
			},

			"listarnotas grid": {
				itemdblclick: this.onGridItemDblClickNotas,
				render: this.onGridRender
			},

			"listarnotas treepanel": {
				itemclick: this.onTreeItemClick,
				render: this.onGridRender
			},


			"formnotas": {
				beforeshow: this.onBeforeFormNotasShow
			},

			"formnotas textfield[name=dataemissao]": {
				blur: this.onBlurDate
			},

			"formnotas numericfield": {
				blur: this.onBlurValues
			},

			"anexospanel filefield": {
				change: this.onChangeFileField
			},

			"formnotas button#anexar": {
				click: this.onButtonClickFormAnexar
			},

			"formnotas button#salvar": {
				click: this.onButtonClickFormSalvar
			},

			"formnotas button#cancelar": {
				click: this.onButtonClickFormCancelar
			},
		});
	},

	onBlurDate: function( field, e, opts ) {
		var val = field.getValue(),
			parsed = GestorFinanceiro.util.Util.dac(val);

		if(parsed)
			field.setValue(parsed);
	},

	onBlurValues: function( field ) {

		var form = (field) ? field.up('window') : Ext.ComponentQuery.query('formnotas')[0],

			valornota = form.down('[name=valornota]'),
			pis = form.down('[name=pis]'),
			cofins = form.down('[name=cofins]'),
			inss = form.down('[name=inss]'),
			irrf = form.down('[name=ir]'),
			csll = form.down('[name=csll]'),
			iss = form.down('[name=iss]'),
			valorliquido = form.down('[name=valorliquido]'),

			descontos = form.down('[name=descontos]'),
			adiantamentos = form.down('[name=adiantamentos]'),
			juros = form.down('[name=juros]'),
			multas = form.down('[name=multas]'),
			total = form.down('[name=total]'),

			somatotal = form.down('[name=somatotal]');

		var calculoLiquido = 
			valornota.getValue()
			- pis.getValue()
			- cofins.getValue()
			- inss.getValue()
			- irrf.getValue()
			- csll.getValue()
			- iss.getValue();

		valorliquido.setValue(calculoLiquido);

		var calculoSaldo =
			calculoLiquido
			- descontos.getValue()
			- adiantamentos.getValue()
			+ juros.getValue()
			+ multas.getValue()
			- total.getValue();

		somatotal.setValue(calculoSaldo);
	},

	onChangeFileField: function( ff, value, eOpts ) {
		var form = ff.up('form'),
			grid = ff.up('window').down('grid');

		if( form.getForm().isValid() ) {

			form.getForm().submit({
				url: 'data/lancamento.php?module=attach',
				waitMsg: 'Anexando arquivo...',

				params: {
					lancID: grid.getStore().getProxy().extraParams.lancID
				},

				success: function( fp, o ) {

					GestorFinanceiro.util.Util.showToast('Arquivo anexado com sucesso!');
					grid.getStore().load();
				},

				failure: function( fp, o ) {

					GestorFinanceiro.util.Util.showErrorMsg(o.result.msg.join('<br>'));
				}
			})
		}
	},

	onGridRender: function( grid, e, opts ) {},

	onBeforeFormShow: function( form, e, opts ) {

		var grid = form.down('grid');

			grid.setStore(Ext.create('GestorFinanceiro.store.Notas', {
				storeId: (form.getTipo() == 'R') ? 'NotasCliente' : 'NotasFornecedor'
			}));

		var tree = form.down('treepanel');

			//var storeMapa = tree.getStore().setStoreId((form.getTipo() == 'R') ? 'MapaNotasCliente' : 'MapaNotasFornecedor');
			var storeMapa = Ext.create('GestorFinanceiro.store.MapaNotas', {storeId: (form.getTipo() == 'R') ? 'MapaNotasCliente' : 'MapaNotasFornecedor'});
			storeMapa.getProxy().setExtraParams({
				tipo: form.getTipo()
			});

			storeMapa.load();
			storeMapa.setRootNode(storeMapa.getRootNode());
			tree.reconfigure(storeMapa);
			
		var storeGrid = grid.getStore(),
			//storeTree = tree.getStore(),
			favorecidoColumn = grid.down('[dataIndex=favorecido_nome]'),
			totalColumn = grid.down('[dataIndex=total]');

		favorecidoColumn.setText((form.getTipo() == 'R') ? 'Cliente' : 'Fornecedor');
		totalColumn.setText((form.getTipo() == 'R') ? 'Recebimento' : 'Pagamento');

		

	},

	onBeforeFormNotasShow: function( form, e, opts ) {

		var oldVal = form.down('form').getForm().getValues().favorecido;
		var combo = form.down('combo'),
			valorField = form.down('[name=total]');

		combo.setFieldLabel((form.getTipo() == 'R') ? 'Cliente' : 'Fornecedor');
		valorField.setFieldLabel((form.getTipo() == 'R') ? 'Recebimento' : 'Pagamento');
		combo.setStore((form.getTipo() == 'R') ? 'Clientes' : 'Fornecedores');

		var store = combo.getStore();

		store.load({
			callback: function() {
				combo.setValue(oldVal);
			}
		});

		this.onBlurValues();
	},
	
	onButtonClickIncluir: function( button, e, opts ) {
		var win = Ext.create('GestorFinanceiro.view.movimentacao.NotasForm', {tipo: button.up('window').getTipo()});

		win.show();
		win.down('form').down("hiddenfield[name=tiponota]").setValue( button.up('window').getTipo() );
	},

	onButtonClickAlterar: function( button, e, opts ) {
		var grid = button.up('window').down('grid');
		record = grid.getSelectionModel().getSelection();

		if( record[0] ) {
			var win = Ext.create('GestorFinanceiro.view.movimentacao.NotasForm', {tipo: button.up('window').getTipo()});
			win.down('form').loadRecord(record[0]);
			win.setTitle('Editar Nota');

			win.show();
		}
	},

	onButtonClickExcluir: function( button, e, opts ) {
		var grid = button.up('window').down('grid'),
			record = grid.getSelectionModel().getSelection(),
			store = grid.getStore();

		if( record[0] ) {

			Ext.Msg.show({
				title: 'Excluir?',
				msg: 'Deseja realmente excluir este registro?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,

				fn: function( buttonId ) {

					if(buttonId == 'yes'){

						Ext.get(button.up('window').getEl()).mask("Excluindo...", 'loading');

						Ext.Ajax.request({
							url: 'data/notas.php?module=delete',
							params: {
								id: record[0].get('id')
							},

							success: function( conn, response, options, eOpts ) {

								Ext.get(button.up('window').getEl()).unmask();
								var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);

								if( result.success ) {
									GestorFinanceiro.util.Util.showToast('Registro excluído!');
									store.load();
								}

								else
									GestorFinanceiro.util.Util.showErrorMsg(conn.responseText);
							},

							failure: function( conn, response, options, eOpts ) {
								Ext.get(button.up('window').getEl()).unmask();
								GestorFinanceiro.util.Util.showErrorMsg(conn.responseText);
							}
						});
					}
				}
			});
		}
	},

	onTreeItemClick: function(tree, record, item, index, e, opts){
		var store = tree.up('form').down('grid').getStore();

		if( record ) {
			if( record.data.mes ) {
				if( record.data.ano ) {
					console.log(record.data.mes + "/" + record.data.ano);
					store.getProxy().setExtraParams({
						ref: record.data.mes + "/" + record.data.ano,
						tipo: tree.up('window').getTipo()
					});

					store.load();
				}
			}
		}
	},



	onGridItemDblClickNotas: function( grid, e, opts ) {
		var btn = grid.up('window').down('button#alterar');
		btn.fireEvent('click', btn, e, opts);
	},
	
	onButtonClickFormAnexar: function( button, e, opts ) {

		var win = button.up('window'),
			record = win.down('form').getForm().getRecord(),

			anexosWnd = Ext.create('Ext.window.Window', {
				title: 'Anexos',
				layout: 'fit',
				width: 500,
				height: 300,
				items:{
					xtype: 'anexospanel',
					header: false
				}
			});

		anexosWnd.down('grid').getStore().getProxy().setExtraParams({
			lancID:  record.get('lancamento')
		});

		anexosWnd.down('grid').getStore().load();

		anexosWnd.show();
	},

	onButtonClickFormSalvar: function( button, e, opts ) {
		var form = button.up('form'),
			win = form.up('window'),
			grid = Ext.ComponentQuery.query('grid#gridnotas')[0],
			tree = grid.up('form').down('treepanel'),
			formEl = form;

		if( form.getForm().isValid() ) {

			Ext.get(form.getEl()).mask("Salvando...", 'loading');

			form.getForm().submit({
				clientValidation: true,
				url: 'data/notas.php?module=salvar',

				success: function( form, action ) {

					Ext.get(formEl.getEl()).unmask();

					var result = action;

					if( result.success ) {

						var selectionText = GestorFinanceiro.util.Util.getTreeSelection(tree);

						/*
							Send update socket
						*/

						var socket = GestorFinanceiro.singleton.Socket.connection.instance;

						socket.emit("updateStore", {
							name: tree.getStore().storeId,
							selected: {
								item: selectionText,
								win : 'listarnotas'
							}
						});

						GestorFinanceiro.util.Util.showToast('Os dados da empresa foram salvos!');
						tree.fireEvent('itemclick', tree);

						tree.getStore().load({
							callback: function( records, operation, success ) {
								if( selectionText ) {

									var record = tree.getRootNode().findChild('text', selectionText, true);
									tree.setSelection(record);
								}
							}
						});

						//if(!win.down('hiddenfield[name=id]').getValue()) win.close();
						// iss-1: Acho que brandao pediu pra nao fechar a janela
						win.close();
					}
				},

				failure: function(form, action){
					Ext.get(formEl.getEl()).unmask();
					Ext.Msg.alert(
						'Erro!',
						'Ocorreu um erro ao tentar salvar.<br>Tente novamente!'
					);
				}
			});
		}
	},

	onButtonClickFormCancelar: function( button, e, opts ) {

		button.up('window').close();
	},

	onSearch: function( field, e ) {
		var val = field.getValue(),
			pattern = new RegExp(val, 'ig'),
			store = field.up('window').down('grid').getStore();

		store.clearFilter();

		store.filterBy( function( record ) {
			if( pattern.test(record.get('numeronota')) | pattern.test(record.get('datahoraemissao')) | pattern.test(record.get('favorecido_nome')) ) {
				return record;
			}
		}, this);
	},

	onButtonClickRefresh: function(button, e, opts){
		var tree = button.up('window').down('treepanel');
		var selectionText = (tree.getSelectionModel().getSelection()[0]) ? tree.getSelectionModel().getSelection()[0].data.text : '';

		tree.fireEvent('itemclick', tree);
		tree.getStore().load({
			callback: function( records, operation, success ) {
				if( selectionText ) {

					var record = tree.getRootNode().findChild('text', selectionText, true);
					tree.setSelection(record);
				}
			}
		});
	},

	onTextfieldSpecialKey: function( field, e , options ) {
		if( e.getKey() == e.ENTER ) {
			var submitBtn = field.up('window').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},			
});