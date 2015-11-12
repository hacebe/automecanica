Ext.define('AutoMecanica.view.cadastro.Arquivos', {
	extend: 'Ext.window.Window',
	alias: 'widget.arquivosform',

	width: 520,
	height: 370,

	title: 'Arquivos',
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
				type:'hbox',				
				align: 'stretch'
			},	
			

			items:[
				{
					xtype:'treepanel',
					
				},
				{
					
					xtype: 'grid',
					itemId: 'gridusuarios',
					store: Ext.create('AutoMecanica.store.Usuarios'),
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