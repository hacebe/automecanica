Ext.define('AutoMecanica.view.cadastro.Produtos', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarprodutos',

	requires:[
		'AutoMecanica.view.toolbar.IncluirAlterarExcluirImportarExportarBusca'
	],

	width: 800,
	height: 530,

	title: 'Cadastro de Produtos',
	autoShow: true,		
	layout: 'fit',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'form',
			
			layout: {
				type:'vbox',				
				align: 'stretch'
			},	

			dockedItems: [
				{
					xtype:'incaltexcimpexpbusca'
				}
			],

			items:[
				{
					
					xtype: 'grid',
					itemId: 'gridprodutos',
					store: Ext.create('AutoMecanica.store.Produtos', {storeId: 'Produtos'}),
					flex:1,

					columns: [
						{text: 'Cod.', dataIndex: 'id', width: 60},
						{text: 'Produto', dataIndex: 'nome', flex: 1},
						{text: 'Unidade', dataIndex: 'unidade', width: 60},
						{text: 'Preço', dataIndex: 'preco', width: 120},
						{text: 'Qtde.', dataIndex: 'estoque', width: 120}
					]
					
				}
			]
		}

	]
})