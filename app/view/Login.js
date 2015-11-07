Ext.define('GestorFinanceiro.view.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.formlogin',

	width: 320,
	height: 270,

	title: 'Autenticação',
	
	layout: {
		type:'vbox',
		align: 'stretch'
	},

	autoShow: true,
	//constrain: true,
	closable: false,
	modal: true,
	defaultFocus: 'user',

	items:[
		{
			xtype: 'image',
			height: 106,
			src: 'resources/images/LoginHeader.png'
		},
		{
			xtype: 'form',
			defaultType: 'textfield',
			bodyPadding: 10,
			border: false,			
			items: [
			{
				allowBlank: false,
				fieldLabel: 'Usuario',
				name: 'user',
				itemId: 'user',
				emptyText: 'nome de usuário',
				tabIndex: 1
			}, {
				allowBlank: false,
				fieldLabel: 'Senha',
				name: 'pass',
				emptyText: 'senha',
				inputType: 'password',
				tabIndex: 2
			}, {
				xtype:'checkbox',
				fieldLabel: 'Manter conectado',
				name: 'remember',
				tabIndex: 3
			}]
		}
	],

	buttons: [
		//{ text:'Registrar', itemId: 'register'},
		{ text:'Entrar', itemId: 'submit' },
		{ text:'Sair', itemId: 'logout', hidden: true},
		'->',
		{ text:'Selecionar', itemId: 'select', hidden: true, cls: 'default-btn'},
	]
})