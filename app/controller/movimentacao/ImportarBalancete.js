Ext.define('AutoMecanica.controller.movimentacao.ImportarBalancete',{
	extend: 'Ext.app.Controller',

	views: [
		'movimentacao.ImportarBalancete',		
	],

	init: function(application){
		this.control({			
			"formimportarbalancete": {
				afterrender: this.onAfterRender
			},

			"formimportarbalancete button#importar": {
				click: this.onButtonClickImportar
			},

			"formimportarbalancete button#cancelar": {
				click: this.onButtonClickCancelar
			}
		});
	},

	onAfterRender: function( wnd, e, opts ) {

		var textfield = wnd.down('textfield'),
			date = new Date(),
			month = date.getMonth() + 1,
			year = date.getFullYear(),
			retVal;

		if(month < 10) month = "0" + month;

		retVal = month + "/" + year;

		textfield.setValue(retVal); 
		textfield.selectText(0);
		textfield.focus();
	},

	onButtonClickImportar: function( button, e, opts ) {
		var win = button.up('window'),
			form = win.down('form'),
			me = this;

		if( form.getForm().isValid() ) {

			form.getForm().submit({

				url: "data/importaBalancete.php",
				waitMsg: 'Importando o arquivo...',

				success: function( fp, o ) {

					AutoMecanica.util.Util.showToast('Importação concluída!');
					win.close();
				}
			});
		}	
	},

	onButtonClickCancelar: function( button, e, opts ) {

		button.up('window').close();
	}
});