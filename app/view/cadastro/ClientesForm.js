Ext.define('GestorFinanceiro.view.cadastro.ClientesForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formclientes',
	title: 'Incluir Cliente',

	width: 500,
	height: 350,

	layout: 'fit',
	modal: true,


	items:[
		{
			xtype: 'form',			
			bodyPadding: 10,
			defaults:{
				xtype: 'textfield',
				anchor: '100%',
				allowBlank: true,
				labelWidth: 130
			},
			items:[
				{xtype: 'hiddenfield', name: 'id'},
				{fieldLabel: 'Nome', name: 'nome', allowBlank: false},
				{fieldLabel: 'Endereço', name: 'endereco', xtype: 'textarea'},
				{fieldLabel: 'E-mail', name: 'email'},
				{fieldLabel: 'Telefone Fixo', name: 'telefone_fixo'},
				{fieldLabel: 'Telefone Celular 1', name: 'telefone_celular1'},
				{fieldLabel: 'Telefone Celular 2', name: 'telefone_celular2'},
				{fieldLabel: 'CPF', name: 'cpf'}
			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});