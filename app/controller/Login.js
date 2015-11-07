Ext.define('GestorFinanceiro.controller.Login',{
	extend: 'Ext.app.Controller',

	requires: [
		'GestorFinanceiro.util.Util',
		'GestorFinanceiro.util.MD5'
	],

	views: [
		'Login',
		'Main'
	],

	init: function( application ) {
		var extV = Ext.getVersion();

		if( extV.gt("5.0") && extV.lt("5.1") )
		    Ext.FocusManager.enable();

		this.control({

			"formlogin button#submit": {
				click: this.onButtonClickSubmit
			},

			"formlogin button#logout": {
				click: this.onButtonClickLogout
			},

			"formlogin textfield":{
				specialkey: this.onTextfieldSpecialKey
			}
		})		
	},

	onButtonClickSubmit: function( button, e, opts ){
		//GestorFinanceiro.util.Util.msg('Login', 'Login');
		var formWindow = button.up('window'),
			form = formWindow.down('form'),
			user = form.down('textfield[name=user]').getValue(),
			pass = form.down('textfield[name=pass]').getValue();
			if(form.getForm().isValid()){
				pass = GestorFinanceiro.util.MD5.encode(pass);
				Ext.get(formWindow.getEl()).mask("Autenticando... Aguarde...", 'loading');

				Ext.Ajax.request({
					url: 'data/login.php',
					params: {
						usuario: user,
						senha: pass
					},
					success: function(conn, response, options, eOpts){
						Ext.get(formWindow.getEl()).unmask();
						var result = GestorFinanceiro.util.Util.decodeJSON(conn.responseText);
						if(result.success) {

							Ext.ComponentQuery.query('button#userCombo')[0].setText(result.nome);
							Ext.ComponentQuery.query('toolbar#mainMenu')[0].show();
							formWindow.close();
						}else{
							GestorFinanceiro.util.Util.showErrorMsg(result.error);
						}

					}
				})
			}
	},

	onButtonClickLogout: function( button, e, opts ) {
		var miSair = Ext.ComponentQuery.query('menuitem#sair')[0];
        miSair.fireEvent('click',miSair);										
	},

	onTextfieldSpecialKey: function( field, e , options ) {
		if(e.getKey() == e.ENTER){
			var submitBtn = field.up('window').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},
});