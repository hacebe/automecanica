Ext.define('AutoMecanica.view.cadastro.FornecedoresForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formfornecedores',
	title: 'Incluir Fornecedor',

	width: 300,
	height: 200,

	layout: 'fit',
	modal: true,


	items:[
		{
			xtype: 'form',			
			bodyPadding: 10,
			defaults:{
				xtype: 'textfield',
				anchor: '100%'
			},
			items:[
				{xtype: 'hiddenfield', name: 'id'},
				{fieldLabel: 'Nome', name: 'nome', allowBlank: false},
				{fieldLabel: 'Sistema', name: 'sistema', allowBlank: true},
				{fieldLabel: 'Contábil', name: 'contabil', allowBlank: false},
				{fieldLabel: 'Adiantamento', name: 'adiantamento', allowBlank: true}
			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});