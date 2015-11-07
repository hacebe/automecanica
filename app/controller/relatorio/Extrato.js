Ext.define('GestorFinanceiro.controller.relatorio.Extrato',{
	extend: 'Ext.app.Controller',

	views: [
		'relatorio.Extrato',		
	],

	models: [		
		'Extrato',
		'Tesouraria'
	],

	stores:[
		'Extratos',
		'Tesourarias'
	],

	init: function(application){
		this.control({			
			"formextrato": {
				afterrender: this.onAfterRender
			},

			"formextrato button#confirm": {
				click: this.onButtonClickConfirm
			},
			"formextrato button#export": {
				click: this.onButtonClickExport
			},

			"formimportarbalancete button#cancelar": {
				click: this.onButtonClickCancelar
			}
		});
	},

	onAfterRender: function( wnd, e, opts ) {

		var mes = wnd.down('textfield[name=mes]'),
			ano = wnd.down('textfield[name=ano]'),
			date = new Date(),
			month = date.getMonth() + 1,
			year = date.getFullYear(),
			retVal;

		if(month < 10) month = "0" + month;

		mes.setValue(month); 
		ano.setValue(year); 
		//mes.focus();
	},

	onButtonClickExport: function( button, e, opts ) {
		var win = button.up('window'),
			form = win.down('form'),
			grid = win.down('grid');

		var fonte = form.down('combo').getValue(),
			mes = form.down('textfield[name=mes]').getValue(),
			ano = form.down('textfield[name=ano]').getValue();


		window.location = 'data/exportaExtrato.php?mes=' + mes + '&ano=' + ano + '&fonte=' + fonte;
	},

	onButtonClickConfirm: function( button, e, opts ) {
		var win = button.up('window'),
			form = win.down('form'),
			grid = win.down('grid'),
			me = this;

		if( form.getForm().isValid() ) {

			/*form.getForm().submit({

				url: "data/extrato.php?module=getExtrato",
				waitMsg: 'Consultando...',

				success: function( fp, o ) {

					//GestorFinanceiro.util.Util.showToast('Importação concluída!');
					//win.close();
				}
			});*/

			grid.getStore().getProxy().setExtraParams({
				fonte: form.down('combo').getValue(),
				mes: form.down('textfield[name=mes]').getValue(),
				ano: form.down('textfield[name=ano]').getValue()
			})

			var saldoAnt = 0;

			grid.getStore().load(function(r, o, s){
				if(!s){
					GestorFinanceiro.util.Util.showErrorMsg(o.getError());
					saldoAnt = 0;
					form.down('#saldoLabel').setText("Saldo Anterior: R$ " + GestorFinanceiro.util.Util.formatMoney(saldoAnt, 2, ',', '.'));
					grid.getStore().removeAll();
					return;
				}
				saldoAnt = grid.getStore().getProxy().reader.rawData.saldoAnt;
				form.down('#saldoLabel').setText("Saldo Anterior: R$ " + GestorFinanceiro.util.Util.formatMoney(saldoAnt, 2, ',', '.'));
			});
			

		}	
	},

	onButtonClickCancelar: function( button, e, opts ) {

		button.up('window').close();
	}
});