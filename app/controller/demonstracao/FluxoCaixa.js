Ext.define('GestorFinanceiro.controller.demonstracao.FluxoCaixa',{
	extend: 'Ext.app.Controller',

	views: [
		'demonstracao.FluxoCaixa',		
	],

	models: [		
		'FluxoCaixa',
	],

	stores:[
		'FluxoCaixa',
	],

	init: function(application){
		this.control({			
			"formfluxo": {
				afterrender: this.onAfterRender
			},

			"formfluxo button#confirm": {
				click: this.onButtonClickConfirm
			},
			"formfluxo button#export": {
				click: this.onButtonClickExport
			}
		});
	},

	onAfterRender: function( wnd, e, opts ) {

		var ano = wnd.down('textfield[name=ano]'),
			date = new Date(),
			year = date.getFullYear();

		ano.setValue(year); 

		var empresasCount = Ext.StoreManager.lookup("Empresas").totalCount;

		var combo = wnd.down('combo');
		if(empresasCount <= 1){
			Ext.apply(combo, {allowBlank: true});
			combo.setHidden(true);
		}else{
			Ext.apply(combo, {allowBlank: false});
			combo.setHidden(false);
		}
	},

	onButtonClickExport: function( button, e, opts ) {
		var win = button.up('window'),
			form = win.down('form');

		var ano = form.down('textfield[name=ano]').getValue();

		if( form.getForm().isValid() ) {
			window.location = 'data/fluxo.php?module=fluxo&output=xls&ano=' + ano + ((form.down('combo').getValue()) ? '&empresa=' + form.down('combo').getValue() : "");
		}
	},

	onButtonClickConfirm: function( button, e, opts ) {
		var win = button.up('window'),
			form = win.down('form'),
			grid = win.down('grid'),
			me = this;

		if( form.getForm().isValid() ) {

			grid.getStore().getProxy().setExtraParams({
				empresa: form.down('combo').getValue(),
				ano: form.down('textfield[name=ano]').getValue()
			})
			grid.getStore().load();
		}	
	},

	onButtonClickCancelar: function( button, e, opts ) {

		button.up('window').close();
	}
});