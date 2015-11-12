Ext.define('AutoMecanica.view.cadastro.Fornecedores', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarfornecedores',

	requires:[
		'AutoMecanica.view.toolbar.IncluirAlterarExcluirImportarExportarBusca'
	],

	width: 800,
	height: 530,

	title: 'Cadastro de Fornecedores',
	autoShow: true,		
	layout: 'fit',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'form',
			/*bodyPadding: '10px',*/
			
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
					itemId: 'gridfornecedores',
					store: Ext.create('AutoMecanica.store.Fornecedores', {storeId: 'Fornecedores'}),
					flex:1,

					columns: [
						
						{text: 'Nome', dataIndex: 'nome', flex: 2},
						{text: 'Sistema', dataIndex: 'sistema', width: 120},
						{text: 'Contábil', dataIndex: 'contabil', flex: 1},
						{text: 'Adiantamento', dataIndex: 'adiantamento', flex: 1}
					]
					
				}
			]
		}

	]
})