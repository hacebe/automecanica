Ext.define('AutoMecanica.view.movimentacao.ImportarBalancete', {
	extend: 'Ext.window.Window',
	alias: 'widget.formimportarbalancete',	

	requires:[
		'AutoMecanica.util.Util'
	],

	width: 400,

	title: 'Importar Balancete',
	autoShow: true,		
	layout: {
		type :'vbox',
		align: 'stretch'
	},
	
	constrainHeader: true,

	buttons:[
		{text: 'Cancelar', itemId: 'cancelar'},
		{text: 'Importar', itemId: 'importar', cls: 'default-btn'}
	],

	items:{
		xtype: 'form',
		items:[
			{
				//xtype: 'container',
				bodyPadding: '10px',
				items:[
					{
						xtype: 'textfield',
						flex: 1,
						fieldLabel: 'Informe o mês/ano do balancete (99/9999)',
						labelAlign: 'top',
						maxLength: 7,
						itemId: 'dataBalancete',
						name: 'mesano'
					},
					{
						xtype: 'filefield',
						flex: 1,
						fieldLabel: 'Selecione o arquivo (.xls/.xlsx) para importar',
						labelAlign: 'top',
						buttonText: 'Procurar...',
						itemId: 'fileBalancete',
						name: 'arquivo'
						
					}
				]
			}

			
		]
	}
})
