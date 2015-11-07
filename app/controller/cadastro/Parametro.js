Ext.define('GestorFinanceiro.controller.cadastro.Parametro',{
	extend: 'Ext.app.Controller',

	views: [
		'cadastro.Parametros'
	],

	models: [
//		'Usuario'
	],

	stores:[
//		'Usuarios'
	],

	/*refs:[
		{

		}
	],*/

	init: function(application){		
		this.control({
			"parametros": {
				render: this.onFormRender
			},

			"parametros button#salvar":{
				click: this.onButtonClickFormSalvar
			},
			"parametros button#cancelar":{
				click: this.onButtonClickFormCancelar
			}

			/*"listarusuarios button#incluir": {
				click: this.onButtonClickIncluir
			},
			"listarusuarios button#alterar": {
				click: this.onButtonClickAlterar
			},
			"listarusuarios button#excluir": {
				click: this.onButtonClickExcluir
			},
			"listarusuarios button#importar": {
				click: this.onButtonClickImportar
			},
			"listarusuarios button#exportar": {
				click: this.onButtonClickExportar
			},
			"listarusuarios textfield#searchField": {
				change: this.onSearch
			},
			"listarusuarios grid": {
				itemdblclick: this.onGridItemDblClickUsuarios,
				render: this.onGridRender
			},
			*/
		})		
	},

	onFormRender: function(window, e, opts){
		var form = window.down('form');
		
		Ext.Ajax.request({
			url: 'data/parametros.php?module=loadParametros',
			success: function(conn, response, options, eOpts){
				data = JSON.parse(conn.responseText);
				var model = Ext.create('Ext.data.Model',{
					fields:[
						'recebimento_conta_juros',
						'recebimento_conta_multa',
						'recebimento_conta_desconto',
						'pagamento_conta_juros',
						'pagamento_conta_multa',
						'pagamento_conta_desconto'
					]
				});
				model.set(data.data[0]);
				form.loadRecord(model);
			},
			failure: function(conn, response, options, eOpts){
				console.log(conn.responseText);
			},
		})
	},

	onButtonClickFormSalvar: function(button, e, opts){
		var win = button.up('window'),
			form = win.down('form');


		if(form.getForm().isValid()){
			Ext.get(form.getEl()).mask("Salvando...", 'loading');
			form.getForm().submit({
				clientValidation: true,
				url: 'data/parametros.php?module=salvar',
				success: function(frm, action){
					Ext.get(form.getEl()).unmask();
					var result = action;
					if(result.success){
						GestorFinanceiro.util.Util.showToast('Parametros salvos!');
						win.close();
					}
				},
				failure: function(frm, action){
					Ext.get(form.getEl()).unmask();
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
	}
	
});