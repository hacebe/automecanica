Ext.define('GestorFinanceiro.view.cadastro.Clientes', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarclientes',

	requires:[
		'GestorFinanceiro.view.toolbar.IncluirAlterarExcluirImportarExportarBusca'
	],

	width: 800,
	height: 530,

	title: 'Cadastro de Clientes',
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
					itemId: 'gridclientes',
					store: Ext.create('GestorFinanceiro.store.Clientes', {storeId: 'Clientes'}),
					flex:1,

					columns: [
						
						{text: 'Nome', dataIndex: 'nome', flex: 2},
						{text: 'Endereço', dataIndex: 'endereco', width: 120, flex: 1},
						{text: 'E-mail', dataIndex: 'telefone_fixo', width: 120},
						{text: 'Telefone', dataIndex: 'telefone_fixo', width: 120},
						{text: 'Celular 1', dataIndex: 'telefone_celular1', width: 120},
						{text: 'Celular 2', dataIndex: 'telefone_celular2', width: 120},
						{text: 'CPF', dataIndex: 'cpf'}
					]
					
				}
			]
		}

	]
})