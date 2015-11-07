Ext.define('GestorFinanceiro.view.cadastro.ProdutosForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formprodutos',
	title: 'Incluir Produto',

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
				{fieldLabel: 'Unidade', name: 'unidade', xtype: 'combobox' ,store: Ext.create('Ext.data.Store')},
				{fieldLabel: 'Preço', name: 'preco'},
				{fieldLabel: 'Quantidade', name: 'estoque'}
			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});