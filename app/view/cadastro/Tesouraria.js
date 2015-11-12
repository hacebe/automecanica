Ext.define('AutoMecanica.view.cadastro.Tesouraria', {
	extend: 'Ext.window.Window',
	alias: 'widget.listartesouraria',

	requires:[
		'AutoMecanica.view.toolbar.IncluirAlterarExcluirImportarExportarBusca'
	],

	width: 590,
	height: 320,

	title: 'Tesouraria',
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
					itemId: 'gridtesouraria',
					store: 'Tesourarias',
					flex:1,

					columns: [
						
						{text: 'Descrição', dataIndex: 'descricao', flex: 2},
						{text: 'Conta', dataIndex: 'conta', flex: 1},
						{text: 'Saldo Inicial', dataIndex: 'saldoinicial', align:'right', flex: 1, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Sistema', dataIndex: 'sistema', width: 120},
						{text: 'Contábil', dataIndex: 'contabil', flex: 1}
					]
					 
				}
			]
		}

	]
})