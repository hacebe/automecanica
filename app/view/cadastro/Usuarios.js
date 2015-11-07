Ext.define('GestorFinanceiro.view.cadastro.Usuarios', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarusuarios',

	requires:[
		'GestorFinanceiro.view.toolbar.IncluirAlterarExcluirImportarExportarBusca'
	],

	width: 520,
	height: 370,

	title: 'Usuários',
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
					itemId: 'gridusuarios',
					store: Ext.create('GestorFinanceiro.store.Usuarios', {storeId: 'Usuarios'}),
					flex:1,

					columns: [						
						{text: 'Nome', dataIndex: 'nome', flex: 2},
						{text: 'Usuário', dataIndex: 'usuario', flex: 1},
						{text: 'E-mail', dataIndex: 'email', flex: 1},
						{text: 'Ativo', dataIndex: 'ativo', width: 70, 
							renderer: function(v,m){
								switch(v){
									case "1":
										m.style = 'color: green; font-weight: bold';
										return "Ativo";							
										break;
									case "0":
										m.style = 'color: red; font-weight: bold';
										return "Inativo";
										break;
								}
							}
				 		},						
					]
					
				}
			]
		}

	]
})