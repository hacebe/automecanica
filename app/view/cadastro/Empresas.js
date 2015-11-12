Ext.define('AutoMecanica.view.cadastro.Empresas', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarempresas',

	width: 800,
	height: 530,

	title: 'Cadastro de Empresas',
	autoShow: true,		
	layout: 'fit',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'form',
			/*bodyPadding: '10px',*/
			layout: 'fit',

			dockedItems: [
				{
					xtype:'incaltexcimpexpbusca'
				}
			],

			items:[
				{								
					xtype: 'grid',
					store: 'Empresas',										
					flex: 1,
					itemId: 'gridempresas',

					columns: [
						{text: 'Código', dataIndex: 'id', width: 70},
						{text: 'CNPJ', dataIndex: 'cnpj', width: 120},
						{text: 'Nome', dataIndex: 'razao_social', flex: 2},
						{text: 'Fantasia', dataIndex: 'nome_fantasia', flex: 1}
					]
				}
							
						/*,
					{
						
					,
				]*/
			]
		}

	]
})