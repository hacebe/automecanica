Ext.define('GestorFinanceiro.controller.demonstracao.Balancete',{
	extend: 'Ext.app.Controller',

	views: [
		'demonstracao.Balancete',		
	],

	models: [		
		'Balancete',
	],

	stores:[
		'Balancete',
	],

	init: function(application){
		this.control({			
			"formbalancete": {
				afterrender: this.onAfterRender
			},

			"formbalancete button#confirm": {
				click: this.onButtonClickConfirm
			},
			"formbalancete button#export": {
				click: this.onButtonClickExport
			}
		});
	},

	onAfterRender: function( wnd, e, opts ) {

		var mes = wnd.down('textfield[name=mes]'),
			ano = wnd.down('textfield[name=ano]'),
			date = new Date(),
			month = date.getMonth(),
			year = date.getFullYear();

		mes.setValue(month); 
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
		var mes = form.down('textfield[name=mes]').getValue();

		if( form.getForm().isValid() ) {
			window.location = 'data/balancete.php?module=balancete&output=xls&mes=' + mes + '&ano=' + ano + ((form.down('combo').getValue()) ? '&empresa=' + form.down('combo').getValue() : "");
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
				mes: form.down('textfield[name=mes]').getValue(),
				ano: form.down('textfield[name=ano]').getValue()
			})
			grid.getStore().load();
		}	
	},

	onButtonClickCancelar: function( button, e, opts ) {

		button.up('window').close();
	}
});