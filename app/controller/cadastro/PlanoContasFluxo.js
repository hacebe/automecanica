Ext.define('AutoMecanica.controller.cadastro.PlanoContasFluxo',{
	extend: 'Ext.app.Controller',

	requires:[
		'AutoMecanica.util.Util',
	],

	views: [
		'cadastro.PlanoContasFluxo',
		'contextmenu.PlanoContasTree'		
	],

	models: [
		'Cliente',
		'TipoPlano'
	],

	stores:[
		'Clientes',
		'TiposPlanos'
	],	

	init: function(application){		
		this.control({			
			"listarplanocontasfluxo": {
				render: this.onRender
			},
			"listarplanocontasfluxo treepanel": {
				cellcontextmenu: this.onContextMenuTree,
				itemclick: this.onItemClickTree,
				itemdblclick: this.onItemDblClickTree
			},
			"listarplanocontasfluxo grid#detalhegrid":{
				itemdblclick: this.onItemDblClickGrid,
			},
			"listarplanocontasfluxo textfield#classificacao":{
				blur: this.onBlurClassificacao,
				focus: this.onFocusClassificacao
			},
			"listarplanocontasfluxo combobox#comboNatureza":{
				change: this.onComboNaturezaChange
			},
			"listarplanocontasfluxo combobox#tipo":{
				change: this.onComboTipoPlanoChange
			},
			"listarplanocontasfluxo button#backBtn": {
				click: this.onButtonClickVoltar
			},
			"listarplanocontasfluxo button#addbtn": {
				click: this.onButtonClickAdd
			},
			"listarplanocontasfluxo button#editbtn": {
				click: this.onButtonClickEdit
			},
			"listarplanocontasfluxo button#refreshbtn": {
				click: this.onButtonClickRefresh
			},
			"listarplanocontasfluxo button#salvar": {
				click: this.onButtonClickSalvar
			},
			"listarplanocontasfluxo button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarplanocontasfluxo button#cancelar": {
				click: this.onButtonClickCancelar
			},
			"ctxmenuplanocontastree menuitem#addbtn": {
				click: this.onMenuItemClickAdd
			},
			"ctxmenuplanocontastree menuitem#editbtn": {
				click: this.onMenuItemClickEdit
			},

			"listarplanocontasfluxo button#newTipo": {
				click: this.onButtonClickNovoTipo
			},
			"listarplanocontasfluxo button#cloneTipo": {
				click: this.onButtonClickClonarTipo
			},
			"listarplanocontasfluxo button#renomearTipo": {
				click: this.onButtonClickRenomearTipo
			},
			"listarplanocontasfluxo button#selectTipo": {
				click: this.onButtonClickSelecionarTipo
			},

			
		})		
	},

	onRender: function(window, e, opts){
		Ext.StoreManager.lookup('TiposPlanos').load();

	},
	onContextMenuTree: function(  tree, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		e.preventDefault();	

		var ctxMenu = Ext.create('AutoMecanica.view.contextmenu.PlanoContasTree');
		
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
							var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);						
							if(result.success){		
								var record = Ext.create('AutoMecanica.model.TipoPlano',{
									id: result.id,
									nome: value
								});								
								store.insert(0, record);
								tipoCbx.select(record);
							}else{
								AutoMecanica.util.Util.showErrorMsg(result.error);
							}
						
						}
					})
				}


			}, this);
	},

	onButtonClickClonarTipo: function(button, e, opts){
		var win = button.up('window'),
			tipoCbx = win.down('combobox#tipo'),
			store = tipoCbx.getStore(),
			tree = win.down('treepanel'),
			treestore = tree.getStore();

			Ext.MessageBox.prompt('Clonar Plano', 'Digite o nome do plano:', function(btn, value){
				//console.log(button, text);
				if(btn == "ok"){
					Ext.get(win.getEl()).mask("Salvando...", 'loading');
					Ext.Ajax.request({
						url: 'data/planocontas.php?module=clonarPlano',
						params:{
							id: tipoCbx.getValue(),
							plano: value
						},
						success: function(conn, response, options, eOpts){
							Ext.get(win.getEl()).unmask();
							var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);						
							if(result.success){		
								var record = Ext.create('AutoMecanica.model.TipoPlano',{
									id: result.id,
									nome: value
								});								
								store.insert(0, record);
								tipoCbx.select(record);
							}else{
								AutoMecanica.util.Util.showErrorMsg(result.error);
							}
						
						}
					})
				}


			}, this);
	},

	onComboTipoPlanoChange: function(combo, nVal, oVal, eOpts ){
		var form = combo.up('window');
			form.down('button#renomearTipo').setDisabled(false);
			form.down('button#cloneTipo').setDisabled(false);
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
							var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);						
							if(result.success){		
								var record =  store.getById(tipoCbx.getValue());

								record.set('nome', value);

								//store.insert(0, record);
								//tipoCbx.select(record);
							}else{
								AutoMecanica.util.Util.showErrorMsg(result.error);
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

						AutoMecanica.util.Util.showToast('Registro salvo!');

						tree.getStore().load();	
						form.reset();
						return;
					
						if(record) record.set(values);

						grid.getStore().loadRawData(record, true);
				},
				failure: function(conn, response, options, eopts){										
					Ext.get(win.getEl()).unmask();	
					AutoMecanica.util.Util.showErrorMsg('Erro ao tentar salvar');					
				}
			});
	},
	onButtonClickCancelar: function(button, e, opts){
		var form = button.up('window').down('form');
		
		form.loadRecord(form.getRecord());

	},
	onButtonClickExcluir: function(button, e, opts){
		var form = button.up('window').down('form'),
			values = form.getValues(),
			win = button.up('window'),
			tree = win.down('treepanel');


			/*console.log(values);
			return;*/
		Ext.Msg.show({
			title: 'Excluir?',
			msg: 'Deseja realmente excluir este registro?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(buttonId){
				Ext.get(win.getEl()).mask("Excluindo...", 'loading');
				Ext.Ajax.request({
					url: 'data/planocontas.php?module=delete',
					params:{
						cod: values.id
					},
					success: function(conn, response, options, eOpts){
						Ext.get(win.getEl()).unmask();
						var result = AutoMecanica.util.Util.decodeJSON(conn.responseText);						
						if(result.success){		
							AutoMecanica.util.Util.showToast('Classificação excluida com sucesso ');
							tree.getStore().load()
						}else{
							AutoMecanica.util.Util.showErrorMsg(result.error);
						}
					},
					failure: function(conn, response, options, eOpts){
						Ext.get(win.getEl()).unmask();
						AutoMecanica.util.Util.showErrorMsg('Erro ao tentar excluir');
					}
				})
			}
		})
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
			form.down('button#excluir').setDisabled(false);	
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
			form.down('button#excluir').setDisabled(true);		
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