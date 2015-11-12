Ext.define('AutoMecanica.view.cadastro.ProdutosForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formprodutos',
	title: 'Incluir Produto',

	width: 400,
	height: 200,

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
				{fieldLabel: 'Unidade', name: 'unidade', xtype: 'combobox' , valueField: 'text', displayField: 'text',
					store: Ext.create('Ext.data.Store',{
						fields:['text'],
						data:[
							{text: 'CX'},
							{text: 'KG'},
							{text: 'LT'},
							{text: 'ML'},
							{text: 'PC'},
							{text: 'UN'}
						]
					})},
				{fieldLabel: 'Preço', name: 'preco'},
				{fieldLabel: 'Estoque Inicial', name: 'estoque'}
			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});