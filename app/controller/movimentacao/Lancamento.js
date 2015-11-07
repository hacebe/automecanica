Ext.define('GestorFinanceiro.controller.movimentacao.Lancamento',{
	extend: 'Ext.app.Controller',

	requires:[
		'GestorFinanceiro.util.Util',
	],

	views: [
		'movimentacao.Lancamentos',		
	],

	models: [		
		'MapaLancamento',
		'Lancamento',
	],

	stores:[
		'MapaLancamentos',
		'Lancamentos',		
		'NaturezasFinanceiras'
	],

	init: function( application ) {
		this.control({
			"formlancamentos": {
				render: this.onRender,
				afterrender: this.onAfterRender
			},

			"formlancamentos treepanel": {
				cellcontextmenu: this.onContextMenuTree,
				itemclick: this.onItemClickTree
			},

			"formlancamentos grid#detalhegrid": {
				itemdblclick: this.onItemDblClickGrid,
			},

			"formlancamentos combobox#comboTipo": {
				change: this.onComboTipoChange
			},

			"formlancamentos combobox#comboNatureza2": {
				change: this.onComboNaturezaCatChange
			},

			"formlancamentos combobox#comboNatureza": {
				change: this.onComboNaturezaChange,
			},

			"formlancamentos combobox#comboTipoDoc": {
				change: this.onComboTipoDocChange
			},

			"formlancamentos button#novo": {
				click: this.onButtonClickNovo
			},

			"formlancamentos button#salvar": {
				click: this.onButtonClickSalvar
			},

			"formlancamentos button#exportar": {
				click: this.onButtonClickExportar
			},

			"formlancamentos button#cancelar": {
				click: this.onButtonClickCancelar
			},

			"formlancamentos button#excluir": {
				click: this.onButtonClickExcluir
			},

			"formlancamentos button#refreshbtn": {
				click: this.onButtonClickRefresh
			},

			"formlancamentos numberfield[name*=valor_]": {
				blur: this.onBlurValues
			},

			"formlancamentos textfield[name=ref]": {
				blur: this.onBlurReferencia
			},

			"formlancamentos textfield[name=data]": {
				blur: this.onBlurDate
			},

			"formlancamentos filefield": {
				change: this.onChangeFileField
			},
			
			"formlancamentos #deleteAction": {
				click: this.onClickDeleteActionIcon
			},

			"formlancamentos #downloadAction": {
				click: this.onClickDownloadActionIcon
			}
		});
	},

	onRender: function( wnd, e, opts ) {
		wnd.down('grid').getStore().removeAll();
		

	},

	onAfterRender: function( wnd, e, opts ) {
var store1 = Ext.StoreManager.lookup('natureza1'),
			store2 = Ext.StoreManager.lookup('natureza2');
		
		if(!store2.getCount()){
			store2.getProxy().setExtraParams({
				tipo: 'T'
			});
			store2.load();
		}
		if(!store1.getCount())
			store1.load();

	},


	onBlurReferencia: function( field, e, opts ) {

		var val = field.getValue(),
			d = new Date(),
			date = null;

		var ref = (function () {
			var y = d.getFullYear();
		    var month = d.getMonth();

		    if(month == 0) {
		    	--y;
		    	month = 12;
		    	field.setValue(month + '-' + y);

		    	return false;
		    }

		    return month < 10 ? '0' + month : '' + month;
		})();

		if(!ref) {
			return;
		}

		else if( !val.length ) {
			date = GestorFinanceiro.util.Util.dac( ref, true );
		}

		else if (val.indexOf('-') == -1) {
			date = GestorFinanceiro.util.Util.dac(val, true);
		}

		if ( date )
			field.setValue(date);
	},

	onBlurDate: function( field, e, opts ) {
		var val = field.getValue(),
			form = field.up('form'),
			parsed = GestorFinanceiro.util.Util.dac(val);

		if( parsed ) {

			field.setValue(parsed);

			if( form.down('hiddenfield[name=id]').getValue() == '' ) {

				Ext.Ajax.request({
					url: 'data/lancamento.php?module=getLastNLanc',

					params:{
						dateRef: GestorFinanceiro.util.Util.JS2PHPDate(parsed)
					},

					success: function( conn, response, opts, eOpts ) {

						var data = JSON.parse(conn.responseText);
						form.down('textfield[name=n_lanc]').setValue(data.data);
					}
				});
			}
		}
	},

	onBlurValues: function( field, e, opts ) {
		var totalTxt = Ext.ComponentQuery.query('numberfield[name=valor_total]')[0],
			fields = Ext.ComponentQuery.query('numberfield[name!=valor_total] '),
			sum = 0;

		for( var i=0; i < fields.length; i++ ) {
			if( fields[i].name == 'valor_desconto' || fields[i].name == 'valor_desconto_adiantamento' )
				sum -= fields[i].getValue();
			else
				sum += fields[i].getValue();
		}

		totalTxt.setValue(sum);
	},

	onContextMenuTree: function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) { e.preventDefault(); },

	onItemClickTree: function( tree, record, item, index, e,opts ) {
		var item =	tree,
			//record = tree.getSelectionModel().getSelection(),
			form = tree.up('window').down('form'),
			store = Ext.getStore('Lancamentos');		
	
		if( record ) {
			if( record.data.ref ) {
				store.getProxy().setExtraParams({
					ref: record.data.ref
				});

				store.load();
			}
		}
	},

	onItemDblClickGrid: function( grid, e,opts ) {
		var item =	grid,
			record = grid.getSelectionModel().getSelection(),
			form = grid.up('window').down('form#formlancamentos'),
			salvarBtn = grid.up('window').down('button#salvar'),
			excluirBtn = grid.up('window').down('button#excluir'),
			cancelarBtn = grid.up('window').down('button#cancelar');

			form.getForm().setValues({
				favorecido: null
			});

		if( record[0] ) {

			form.up('tabpanel').setActiveItem(0);
			form.loadRecord(record[0]);
			form.down('[name=data]').setValue(GestorFinanceiro.util.Util.PHP2JSDate(record[0].get('data')));

			form.up('tabpanel').down('grid').getStore().getProxy().setExtraParams({
				lancID:  record[0].get('id')
			});

			form.up('tabpanel').down('grid').getStore().load();

			excluirBtn.setDisabled(false);
			salvarBtn.setDisabled(false);
			cancelarBtn.setDisabled(false);
		}
	},

	onComboTipoDocChange: function( combo, nVal, oVal, eOpts ) {
		var form = combo.up('form'),
			txtNDoc = form.down('textfield[name=n_doc]'),
			cmbFavorecido = form.down('combobox#comboFavorecido'),
			cmbNatureza = form.down('combobox#comboNatureza');
		
		if( combo.getValue() == 'C' || combo.getValue() == 'N' || combo.getValue() == 'R' ) {
			
			txtNDoc.setVisible(true);
		}

		else {

			txtNDoc.setVisible(false);
			txtNDoc.setValue("");
		}

		this.changeFormField(form);
	},

	onComboTipoChange: function( combo, nVal, oVal, eOpts ) {
		var form = combo.up('form'),			
			cmbNatureza = form.down('combobox[name=natureza_financeira]'),
			cmbNatureza2 = form.down('combobox#comboNatureza2'),
			cmbFavorecido = form.down('combobox#comboFavorecido');

		var valCmbNatureza = cmbNatureza.getValue();
		var valCmbNatureza2 = cmbNatureza2.getValue();

		cmbNatureza.clearValue();
		cmbNatureza2.clearValue();
			
		var storeNatureza2 = cmbNatureza2.getStore();
		storeNatureza2.clearFilter();

		storeNatureza2.filterBy(function(record){	
			if(record.get('modo') == combo.getValue()){
				return record;	
			}
		}, this);

		/*cmbNatureza2.getStore().getProxy().setExtraParams({
			tipo: 'T',
			modo: combo.getValue()
		});*/

		/*cmbNatureza2.getStore().load(function(){
			if(valCmbNatureza2)
				cmbNatureza2.setValue(valCmbNatureza2);
			console.log("callback tipoChange");
		});*/

		this.changeFormField(form);
	},

	onComboNaturezaCatChange: function( combo, nVal, oVal, eOpts ) {
		var form = combo.up('form'),
			cmbNatureza = form.down('combobox[name=natureza_financeira]'),
			valCmbNatureza = cmbNatureza.getValue();

		if( combo.getValue() ) {
			if( combo.getSelection() ) {

				var storeNatureza = cmbNatureza.getStore();
					storeNatureza.clearFilter();

					storeNatureza.filterBy(function(record){	

						if(record.get('tipo') == 'A' && record.get('parent') == combo.getValue()){
							return record;	
						}
					}, this);
			}
		}
	},

	changeFormField: function( form ) {
		var cmbFavorecido = form.down('#comboFavorecido'),
			cmbNatureza = form.down('#comboNatureza'),
			cmbNatureza2 = form.down('#comboNatureza2'),
			cmbTipo = form.down('#comboTipo'),
			cmbTipoDoc = form.down('#comboTipoDoc'),
			desc_adiantamento = form.down('numberfield[name=valor_desconto_adiantamento]');

		var types = {
			R: {
				favorecidoLabel : 'Cliente',
				dataProxy: 'data/clientes.php?module=getClientes'
			},
			P: {
				favorecidoLabel : 'Fornecedor',
				dataProxy: 'data/fornecedores.php?module=getFornecedores'
			}
		};

		var mostraSocio;

		if( cmbTipo.getValue() == cmbTipo.getValue() ) {
			if( cmbTipoDoc.getValue() == "N" ) {
				// Mostra Favorecidos
				cmbFavorecido.setVisible(true);

				desc_adiantamento.setDisabled(false);
				Ext.apply(cmbFavorecido, {allowBlank: false});

				//Renomeia label para Cliente/Fornecedor
				if( cmbTipo.getValue() ) {
					cmbFavorecido.setFieldLabel(types[cmbTipo.getValue()].favorecidoLabel);

					//Carrega Clientes/Fornecedores
					cmbFavorecido.getStore().getProxy().url = types[cmbTipo.getValue()].dataProxy;
					cmbFavorecido.getStore().load();
				}
			}

			else {

				//esconde Favorecidos
				cmbFavorecido.setVisible(false);
				desc_adiantamento.setDisabled(true);
				desc_adiantamento.setValue(0);

				Ext.apply(cmbFavorecido, {allowBlank: true});
			}

			// MOSTRA SOCIOS SE CMB NATUREZA FOR PROLABORE OU LUCROS DISTRIBUIDOS

			if( cmbNatureza.getRawValue() == "Pro-Labore" || cmbNatureza.getRawValue() == "Lucros Distribuidos" ) {
				mostraSocio = true;
			}

			if( mostraSocio ) {

				//mostra Favorecidos
				cmbFavorecido.setVisible(true);
				desc_adiantamento.setDisabled(true);
				desc_adiantamento.setValue(0);

				Ext.apply(cmbFavorecido, {allowBlank: false});

				cmbFavorecido.setFieldLabel('Sócio');

				var socio_id = form.getValues().favorecido;

				cmbFavorecido.getStore().getProxy().url = "data/socios.php?module=getSocios";
				cmbFavorecido.getStore().load( function() {
					if( socio_id ) {
						cmbFavorecido.setValue(socio_id);
					}
				});
			}
		}		
	},

	onComboNaturezaChange: function( combo, nVal, oVal, eOpts ) {
		var form = combo.up('form');
		this.changeFormField(form);
	},

	onButtonClickNovo: function( button, e, opts ) {
		var form = button.up('form'),
			salvarBtn = button.up('window').down('button#salvar'),
			cancelarBtn = button.up('window').down('button#cancelar'),
			record = form.getRecord(),
			values = form.getValues(),
			me = this;

		values.favorecido_nome = form.down('#comboFavorecido').getRawValue();
		values.natureza_titulo = form.down('#comboNatureza').getRawValue();

		values.valor_doc = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_doc);	
		if(values.valor_desconto_adiantamento) values.valor_desconto_adiantamento = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_desconto_adiantamento);	
		values.valor_multa = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_multa);	
		values.valor_desconto = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_desconto);	
		values.valor_juros = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_juros);	
		values.valor_total = GestorFinanceiro.util.Util.removeFormatMoney(values.valor_total);	

		values.id = null,
		
		form.down('hiddenfield[name=id]').setValue('');
		//form.down('textfield[name=n_lanc]').setValue( parseInt(form.down('textfield[name=n_lanc]').getValue()) + 1);
		var data_field = form.down('textfield[name=data]');
		/*console.log(data_field.getValue());
		data_field.fireEvent('blur', data_field);*/

		Ext.Ajax.request({
			url: 'data/lancamento.php?module=getLastNLanc',
			params:{
				dateRef: GestorFinanceiro.util.Util.JS2PHPDate(data_field.getValue())
			},
			success: function(conn, response, opts, eOpts){
				var data = JSON.parse(conn.responseText);
				form.down('textfield[name=n_lanc]').setValue(data.data);
			}
		})
		
		//form.down('textfield[name=n_lanc]').setValue( (grid.getStore().max('n_lanc')) ? parseInt(grid.getStore().max('n_lanc')) + 1 : '');
		form.down('textfield[name=n_doc]').setValue('');
		form.down('textfield[name=valor_doc]').setValue('');
		form.down('textfield[name=valor_desconto_adiantamento]').setValue('');
		form.down('textfield[name=valor_multa]').setValue('');
		form.down('textfield[name=valor_desconto]').setValue('');
		form.down('textfield[name=valor_juros]').setValue('');
		form.down('textfield[name=valor_total]').setValue('');
		form.down('textarea[name=observacao]').setValue('');

		record.set('data', GestorFinanceiro.util.Util.PHP2JSDate(values.data));

		form.getForm().setValues({
			data: GestorFinanceiro.util.Util.PHP2JSDate(values.data)
		});

		form.down('button#excluir').setDisabled(true);
		form.down('combo#comboTipo').focus();
	},

	onButtonClickExcluir: function( button, e, opts ) {
		var form = button.up('form'),
			record = form.getRecord(),
			tree = form.up('window').down('treepanel');

		if( record ) {

			Ext.Msg.show({
				title: 'Excluir?',
				msg: 'Deseja realmente excluir este Lançamento?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,

				fn: function( buttonId ) {

					if( buttonId == 'yes' ) {

						Ext.get(button.up('window').getEl()).mask("Excluindo...", 'loading');

						Ext.Ajax.request({
							url: 'data/lancamento.php?module=delete',

							params: {
								id: record.get('id')
							},

							success: function( conn, response, options, eOpts ) {

								Ext.get(button.up('window').getEl()).unmask();

								var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);

								if( result.success ) {

									GestorFinanceiro.util.Util.showToast('Lançamento excluído!');

									tree.fireEvent('itemclick', tree);

									form.down('button#excluir').setDisabled(true);
									form.reset();
								}

								else
									GestorFinanceiro.util.Util.showErrorMsg(conn.responseText);
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

	onButtonClickSalvar: function( button, e, opts ) {
		var win = button.up('window'),
			tree = win.down('treepanel'),
			form = win.down('form#formlancamentos'),
			grid = win.down('grid'),
			record = form.getRecord(),
			values = form.getValues(),
			me = this;

			if(!record) record = Ext.create('GestorFinanceiro.model.Lancamento');

			record.set('data', GestorFinanceiro.util.Util.JS2PHPDate(values.data));

			form.getForm().setValues({
				data: record.get('data')
			});

			if( !win.down('combo#comboFavorecido').isVisible() ) {

				form.getForm().setValues({
					favorecido: null
				});

				record.set('favorecido', null);
			}
		var selectionText = (tree.getSelectionModel().getSelection()[0]) ? tree.getSelectionModel().getSelection()[0].data.text : '';

		Ext.get(win.getEl()).mask("Salvando no Banco de Dados! Aguarde...", 'loading');

		form.getForm().submit({
			url: 'data/lancamento.php?module=salvar',

			success: function( conn, response, options, eOpts ) {

				record.set('data', GestorFinanceiro.util.Util.PHP2JSDate(values.data));

				form.getForm().setValues({
					data: record.get('data')
				});

				/*
					Send update socket
				*/

				var socket = GestorFinanceiro.singleton.Socket.connection.instance;

				socket.emit("updateStore", {
					name: tree.getStore().storeId,
					selected: {
						item: selectionText,
						win : 'formlancamentos'
					}
				});

				Ext.get(win.getEl()).unmask();

				GestorFinanceiro.util.Util.showToast('Lançamento salvo!');

				tree.fireEvent('itemclick', tree);
				tree.getStore().load({
					callback: function( records, operation, success ) {
						if( selectionText ) {

							var record = tree.getRootNode().findChild('text', selectionText, true);
							tree.setSelection(record);

							Ext.getStore('Lancamentos').load();
						}
					}
				});

				form.down('button#novo').focus();

				//the code that was previously here has been moved to the NOVO button
			},
			failure: function( conn, response, options, eopts ) {
				Ext.get(win.getEl()).unmask();
				record.set('data', GestorFinanceiro.util.Util.PHP2JSDate(values.data));

				form.getForm().setValues({
					data: GestorFinanceiro.util.Util.PHP2JSDate(values.data)
				});

				GestorFinanceiro.util.Util.showErrorMsg('Erro ao tentar salvar<br>' + response.result.error);					
			}
		});
	},

	onButtonClickCancelar: function( button, e, opts ) {

		var form = button.up('window').down('form');

		if( form.getRecord() ) {

			form.loadRecord(form.getRecord());
			form.down('button#excluir').setDisabled(false)
		}

		else {
			form.down('button#excluir').setDisabled(true);
			form.reset();
		}
	},

	onButtonClickExportar: function( button, e, opts ) {
		var tree = button.up('window').down('treepanel');

		if(!tree.getSelectionModel().getSelection().length) return;

		var data = tree.getSelectionModel().getSelection()[0].data;

		window.location = 'data/exportaLancamento.php?ref=' + data.mes + '-' + data.ano;
	},

	onButtonClickRefresh: function( button, e, opts ) {

		var tree = button.up('window').down('treepanel');
		tree.getStore().load();
	},		

	onChangeFileField: function( ff, value, eOpts ){
		var form = ff.up('form'),
			gridDetalhe = form.up('window').down('#detalhegrid');

		if( form.getForm().isValid() ) {

			form.getForm().submit({
				url: 'data/lancamento.php?module=attach',
				waitMsg: 'Anexando arquivo...',
				params: {
					lancID: Ext.ComponentQuery.query('#formlancamentos')[0].getValues().id
				},

				success: function( fp, o ) {
					GestorFinanceiro.util.Util.showToast('Arquivo anexado com sucesso!');
					form.up('container').down('grid').getStore().load();
					gridDetalhe.getStore().load();
				},

				failure: function( fp, o ) {

					GestorFinanceiro.util.Util.showErrorMsg(o.result.msg.join('<br>'));
				}
			})
		}
	},

	onClickDeleteActionIcon: function( grid, rowIndex, colIndex ) {

        var rec = grid.getStore().getAt(rowIndex);
    },

	setFormEnabled: function( form, val ) {}
});