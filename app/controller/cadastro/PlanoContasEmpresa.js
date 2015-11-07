Ext.define('GestorFinanceiro.controller.cadastro.PlanoContasEmpresa',{
	extend: 'Ext.app.Controller',

	requires:[
		'GestorFinanceiro.util.Util',
	],

	views: [
		'cadastro.PlanoContasEmpresa'
	],

	models: [
		'TipoPlano',
		'Empresa'
	],

	stores:[
		'Empresas',
		'TiposPlanos'
	],	

	init: function(application){		
		this.control({			
			"listarplanocontasempresa": {
				render: this.onRender
			},
			"listarplanocontasempresa combobox#tipo": {
				change: this.onComboboxTipoChange
			},
			"listarplanocontasempresa combobox#empresa": {
				change: this.onComboboxEmpresaChange
			},
			"listarplanocontasempresa grid#gridPlanoContas": {
				itemdblclick: this.onItemDblClickGridPlano
			},
			"listarplanocontasempresa grid#gridPlanoContasEmpresa": {
				itemdblclick: this.onItemDblClickGridPlanoEmpresa
			},
						
		})		
	},

	onRender: function(window, e, opts){
		Ext.StoreManager.lookup('TiposPlanos').load();

	},

	onComboboxTipoChange: function(combo, e, opts){
		var grid = combo.up('container').down('grid'),
			store = grid.getStore();

		store.getProxy().setExtraParams({tipo: combo.getValue()});
		store.load();

		var cmbEmpresa = Ext.ComponentQuery.query('combobox#empresa')[0],
			gridEmpresa = cmbEmpresa.up('container').down('grid');

		cmbEmpresa.clearValue();

		cmbEmpresa.getStore().getProxy().setExtraParams({
			tipo: combo.getValue()
		});
		cmbEmpresa.getStore().load();
		gridEmpresa.getStore().removeAll();


	},

	onComboboxEmpresaChange: function(combo, e, opts){
		var grid = combo.up('container').down('grid'),
			store = grid.getStore();

		store.getProxy().setExtraParams({empresaId: combo.getValue()});
		store.load();
	},

	onItemDblClickGridPlano: function(grid, record, opts){		
		var win = grid.up('window'),
			cmbEmpresa = grid.up('window').down('combo#empresa');

		if(!cmbEmpresa.getValue()) return;

		var recordExists = cmbEmpresa.up('container').down('grid').getStore().findBy(
			function(rec, id){
				if(rec.get('mask') === record.get('mask') && rec.get('nome') === record.get('nome')){
					return true;
				}
				return false;
			}
		);

		if(recordExists != -1) return;

		Ext.get(win.getEl()).mask("Aguarde...", 'loading');
		Ext.Ajax.request({
			url: 'data/planocontasempresa.php?module=addPlano',
			params:{
				cod: record.getData().cod,
				empresa: cmbEmpresa.getValue()
			},
			success: function(conn, response, options, eOpts){
				Ext.get(win.getEl()).unmask();
				var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);						
				if(result.success){		
					cmbEmpresa.up('container').down('grid').getStore().load();
				}else{
					GestorFinanceiro.util.Util.showErrorMsg(result.error);
				}
			
			}			
		})

	},

	onItemDblClickGridPlanoEmpresa: function(grid, record, opts){		
		var win = grid.up('window'),
			cmbEmpresa = grid.up('window').down('combo#empresa');

		Ext.get(win.getEl()).mask("Aguarde...", 'loading');
		Ext.Ajax.request({
			url: 'data/planocontasempresa.php?module=removePlano',
			params:{
				cod: record.getData().cod,
				empresaId: cmbEmpresa.getValue()
			},
			success: function(conn, response, options, eOpts){
				Ext.get(win.getEl()).unmask();
				var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);						
				if(result.success){		
					cmbEmpresa.up('container').down('grid').getStore().load();
				}else{
					GestorFinanceiro.util.Util.showErrorMsg(result.error);
				}
			
			}			
		})

	},

	onContextMenuTree: function(  tree, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		e.preventDefault();	

		var ctxMenu = Ext.create('GestorFinanceiro.view.contextmenu.PlanoContasTree');
		
		ctxMenu.showAt(e.getXY());

	},
	onButtonClickSelecionarTipo: function(button, e, opts){
		var win = button.up('window'),
			tipoCbx = win.down('combobox#tipo'),
			store = tipoCbx.getStore(),
			tree = win.down('treepanel'),
			treestore = tree.getStore();

		if(tipoCbx.getValue()){		
			treestore.getProxy().setExtraParams({
				tipoId: tipoCbx.getValue()
			});
			win.getLayout().setActiveItem(1);			
			treestore.load({
				scope: this,
				callback: function(r){
					tree.getRootNode().expand();
					tree.getRootNode().set('text', tipoCbx.getRawValue());
				}

			});
			win.down('button#backBtn').setDisabled(false);
		}
	},

	onButtonClickNovoTipo: function(button, e, opts){
		var win = button.up('window'),
			tipoCbx = win.down('combobox#tipo'),
			store = tipoCbx.getStore(),
			tree = win.down('treepanel'),
			treestore = tree.getStore();

			Ext.MessageBox.prompt('Novo Plano', 'Digite o nome do plano:', function(btn, value){
				//console.log(button, text);
				if(btn == "ok"){
					Ext.get(win.getEl()).mask("Salvando...", 'loading');
					Ext.Ajax.request({
						url: 'data/planocontas.php?module=novoPlano',
						params:{
							plano: value
						},
						success: function(conn, response, options, eOpts){
							Ext.get(win.getEl()).unmask();
							var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);						
							if(result.success){		
								var record = Ext.create('GestorFinanceiro.model.TipoPlano',{
									id: result.id,
									nome: value
								});								
								store.insert(0, record);
								tipoCbx.select(record);
							}else{
								GestorFinanceiro.util.Util.showErrorMsg(result.error);
							}
						
						}
					})
				}


			}, this);
	},

	onComboTipoPlanoChange: function(combo, nVal, oVal, eOpts ){
		var form = combo.up('window');
			form.down('button#renomearTipo').setDisabled(false);
	},

	onButtonClickRenomearTipo: function(button, e, opts){
		var win = button.up('window'),
			tipoCbx = win.down('combobox#tipo'),
			store = tipoCbx.getStore(),
			tree = win.down('treepanel'),
			treestore = tree.getStore();

			Ext.MessageBox.prompt('Renomear Plano', 'Digite o nome do plano:', function(btn, value){
				//console.log(button, text);
				if(btn == "ok"){
					Ext.get(win.getEl()).mask("Salvando...", 'loading');
					Ext.Ajax.request({
						url: 'data/planocontas.php?module=renomearPlano',
						params:{
							id: tipoCbx.getValue(),
							plano: value
						},
						success: function(conn, response, options, eOpts){
							Ext.get(win.getEl()).unmask();
							var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);						
							if(result.success){		
								var record =  store.getById(tipoCbx.getValue());

								record.set('nome', value);

								//store.insert(0, record);
								//tipoCbx.select(record);
							}else{
								GestorFinanceiro.util.Util.showErrorMsg(result.error);
							}
						
						}
					})
				}


			}, this, false, tipoCbx.getRawValue());
	},

	onMenuItemClickAdd: function(menuitem, e, opts){
		Ext.ComponentQuery.query('listarplanocontasfluxo button#addbtn')[0].fireEvent('click', Ext.ComponentQuery.query('listarplanocontasfluxo button#addbtn')[0]);

	},
	onMenuItemClickEdit: function(menuitem, e, opts){
		Ext.ComponentQuery.query('listarplanocontasfluxo treepanel')[0].fireEvent('itemDblClick', Ext.ComponentQuery.query('listarplanocontasfluxo treepanel')[0]);

	},
	onItemClickTree: function(tree, e,opts){
		var item =	tree,
			record = tree.getSelectionModel().getSelection(),
			form = tree.up('window').down('form'),
			classiTxt = form.down('textfield#classificacao');				

		if(e.childNodes)		
			Ext.getStore('detalhePlanoContasStore').loadRawData(e.childNodes, false);
		else
			Ext.getStore('detalhePlanoContasStore').loadRawData(e.raw.children, false);
	},
	onItemDblClickTree: function(tree, e,opts){
		var item =	tree,
			record = tree.getSelectionModel().getSelection(),
			form = tree.up('window').down('form'),
			classiTxt = form.down('textfield#classificacao');

			console.log(e);

		if(e)
			Ext.getStore('detalhePlanoContasStore').loadRawData(e.parentNode.get('children'), false);
		else
			Ext.getStore('detalhePlanoContasStore').loadRawData(record[0].parentNode.get('children'), false);

		if(record[0]){
			form.loadRecord(record[0]);
			form.getForm().setValues({mode: 'E'});
			this.setFormEnabled(form, true);
			
		}	
	},
	onItemDblClickGrid: function(grid, e,opts){
		//var item =	Ext.ComponentQuery.query('listarplanocontasfluxo gridpanel')[0].getSelectionModel().getSelection()[0].get('text');
		var item =	grid,
			record = grid.getSelectionModel().getSelection(),
			form = grid.up('window').down('form'),
			classiTxt = form.down('textfield#classificacao');		

		if(record[0]){
			form.loadRecord(record[0]);
			form.getForm().setValues({mode: 'E'});
			this.setFormEnabled(form, true);
			
		}	

	},
	onComboNaturezaChange: function(combo, nVal, oVal, eOpts ){
		var form = combo.up('form'),
			//cmbNatureza = form.down('combobox[name=natureza]'),			
			txtContacontabil = form.down('textfield[name=contacontabil]');
	
		if(nVal == 'A'){
			//cmbNatureza.setVisible(true);
			//cmbNatureza.setDisabled(false);
			
			/*txtContacontabil.setVisible(true);
			txtContacontabil.setDisabled(false);*/
		}else{
			//cmbNatureza.setVisible(false);
			//cmbNatureza.setValue('');
			//cmbNatureza.setDisabled(true);
			
			/*txtContacontabil.setVisible(false);
			txtContacontabil.setValue('');
			txtContacontabil.setDisabled(true);*/
		}

	},
	onButtonClickVoltar: function(button, e, opts){
		var win =  button.up('window'),
			form = win.down('form#formPlanoContas'),
			grid = win.down('grid');

		grid.getStore().loadRawData(null);
		win.down('button#backBtn').setDisabled(true);
		form.reset();
		this.setFormEnabled(form, false);

		win.getLayout().setActiveItem(0);

	},
	onButtonClickSalvar: function(button, e, opts){
		var win = button.up('window'),
			tree = win.down('treepanel');
			form = win.down('form#formPlanoContas'),
			grid = win.down('grid'),
			record = form.getRecord(),
			values = form.getValues(),
			me = this;		
			
			values.natureza = (values.natureza) ? values.natureza : '';
			values.contacontabil = (values.contacontabil) ? values.contacontabil : '';
			//console.log(record, values);
			
			Ext.get(win.getEl()).mask("Salvando no Banco de Dados! Aguarde...", 'loading');	
			form.getForm().submit({
				url: 'data/planocontas.php?module=salvar',
				success: function(conn, response, options, eOpts){
					Ext.get(win.getEl()).unmask();				

					//var result = JSON.parse(conn.responseText);						
						me.setFormEnabled(form, false);

						GestorFinanceiro.util.Util.showToast('Registro salvo!');

						tree.getStore().load();	
						form.reset();
					
						if(record) record.set(values);

						grid.getStore().loadRawData(record, true);
				},
				failure: function(conn, response, options, eopts){										
					Ext.get(win.getEl()).unmask();	
					GestorFinanceiro.util.Util.showErrorMsg('Erro ao tentar salvar');					
				}
			});
	},
	onButtonClickCancelar: function(button, e, opts){
		var form = button.up('window').down('form');
		
		form.loadRecord(form.getRecord());

	},
	onButtonClickRefresh: function(button, e, opts){
		var tree = button.up('window').down('treepanel');
		
		tree.getStore().load();

	},
	onButtonClickAdd: function(button, e, opts){
		var form = button.up('window').down('form'),
			tree = button.up('window').down('treepanel'),
			parent,	childCount, lastChild;
			
		form.reset();		

		
		
		//if(tree.getSelectionModel().getSelection().length){
		if(tree.getSelectionModel().getSelection()[0].id == 'root'){
			lastChild = tree.getSelectionModel().getSelection()[0].childNodes.length + 1;
			form.getForm().setValues({mode: 'N', parent: -1, id: lastChild});
			
		}else{			
		
			childCount = tree.getSelectionModel().getSelection()[0].get('children').length;				
			lastChild = tree.getSelectionModel().getSelection()[0].get('children')[childCount-1];			
			parent  = tree.getSelectionModel().getSelection()[0].get('id');
	
			if(childCount){
				console.log(lastChild);
				form.getForm().setValues({mode: 'N', parent: parent, id: (parseInt(lastChild.id , 10) + 1)});			
			}else{
				var newId;
				//console.log(String(parent).length);
				if(String(parent).length == 3){
					newId = parent + "01";
					console.log(newId);
				}else if(String(parent).length >= 5){
					newId = parent + "001";
				}else{
					newId = parent + "1";
				}
				form.getForm().setValues({mode: 'N', parent: parent, id: newId});
				//console.log(newId);
			}			
		}


		this.setFormEnabled(form, true);
		form.down('textfield[name=textNoMask]').focus();
		

	},
	onButtonClickEdit: function(button, e, opts){
		Ext.ComponentQuery.query('listarplanocontasfluxo treepanel')[0].fireEvent('itemDblClick', Ext.ComponentQuery.query('listarplanocontasfluxo treepanel')[0]);

	},

	onFocusClassificacao: function(textfield, e, opts){
		textfield.setValue(textfield.getValue().replace(/\D/g, function(){
			return '';
		}))
	},

	onBlurClassificacao: function(textfield, e, opts){
		
		var mask = "#.#.#.##.###.###".split(''),
			val = textfield.getValue().split(''),
			maskared = '',
			k = 0;
		
		for(var i=0; i<mask.length; i++){
			if(mask[i] == '#')
			{
				if(val[k])
					maskared += val[k++];
			}
			else
			{
				if(mask[i])
					maskared += mask[i]
			}
		}

		maskared = maskared.replace(/\.\./g, function(){
			return '';
		});

		if(maskared[maskared.length - 1] == ".") maskared = maskared.substr(0, maskared.length - 1);

		textfield.setValue(maskared);
	},

	setFormEnabled: function(form, val){		
		if(val){
			form.down('button#salvar').setDisabled(false);	
			form.down('button#cancelar').setDisabled(false);	
			form.down('hiddenfield[name=mode]').setDisabled(false);
			form.down('hiddenfield[name=parent]').setDisabled(false);
			form.down('textfield[name=id]').setDisabled(false);	
			form.down('textfield[name=textNoMask]').setDisabled(false);	
			form.down('textfield[name=tipo]').setDisabled(false);	
			form.down('checkbox[name=inativo]').setDisabled(false);	
			form.down('combobox[name=natureza]').setDisabled(false);	
			form.down('textfield[name=contacontabil]').setDisabled(false);	
			
		
		}else{
			form.down('button#salvar').setDisabled(true);	
			form.down('button#cancelar').setDisabled(true);	
			form.down('hiddenfield[name=mode]').setDisabled(true);
			form.down('hiddenfield[name=parent]').setDisabled(true);
			form.down('textfield[name=id]').setDisabled(true);	
			form.down('textfield[name=textNoMask]').setDisabled(true);	
			form.down('textfield[name=contacontabil]').setDisabled(true);	
			form.down('textfield[name=tipo]').setDisabled(true);	
			form.down('checkbox[name=inativo]').setDisabled(true);		
			form.down('combobox[name=natureza]').setDisabled(true);	

		}
	}


});