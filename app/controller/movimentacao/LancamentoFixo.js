Ext.define('AutoMecanica.controller.movimentacao.LancamentoFixo',{
	extend: 'Ext.app.Controller',

	views: [
		'movimentacao.LancamentosFixos',		
	],

	models: [
		'LancamentoFixo',
	],

	stores: [
		'LancamentosFixos'
	],

	init: function( application ) {
		this.control({			
			"formlancamentosfixos": {
				render: this.onRender
			},
			
			"formlancamentosfixos grid":{
				//itemdblclick: this.onItemDblClickGrid,
			},			
			
			"formlancamentosfixos button#refresh":{
				click: this.onButtonClickRefresh
			},

			"formlancamentosfixos button#novo":{
				click: this.onButtonClickNovo
			},
			"formlancamentosfixos button#salvar":{
				click: this.onButtonClickSalvar
			},
			"formlancamentosfixos button#revisado":{
				click: this.onButtonClickRevisado
			}
		})		
	},

	onRender: function( window, e, opts ) {
		var grid = window.down('grid');

		grid.getStore().load();
	},

	onButtonClickRefresh: function( button, e, opts ) {
		
		var grid = button.up('form').down('grid');
		//console.log(grid);
		grid.getStore().load();
	},

	onButtonClickNovo: function( button, e, opts ) {
		var grid = button.up('window').down('grid'),
			record = new AutoMecanica.model.LancamentoFixo({

			});

			grid.getStore().insert(grid.getStore().count(), record);
			grid.getPlugins()[0].startEditByPosition({
			    row: grid.getStore().count()-1,
			    column: 0
			})
		//record.set('id', null);
		//grid.getStore().add(record);	   
		//grid.getStore().loadRawData(record, true);		
	},

	onButtonClickSalvar: function( button, e, opts ) {
		var win = button.up('window'),
			grid = win.down('grid'),
			record = Ext.create('AutoMecanica.model.LancamentoFixo');

		Ext.get(win.getEl()).mask('Sincronizando...', 'loading');
		grid.getStore().sync({
			callback: function(){
				Ext.get(win.getEl()).unmask();
				grid.getStore().load();

				/*
					Send update socket
				*/

				var socket = AutoMecanica.singleton.Socket.connection.instance;

				socket.emit("updateStore", {
					name: grid.getStore().storeId
				});
			}
		})
	},

	onButtonClickRevisado: function( button, e, opts ) {
		var grid = button.up('window').down('grid'),
			selection = grid.getSelectionModel().getSelection();

		var selected = [];

		Ext.each(selection, function(item){
			(!item.data.revisado) ? item.set('revisado', 'R') : item.set('revisado', '');
			selected.push(item);
		})

		//console.log(selected);
	}
});