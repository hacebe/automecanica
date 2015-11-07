Ext.define('GestorFinanceiro.view.cadastro.Parametros', {
	extend: 'Ext.window.Window',
	alias: 'widget.parametros',

	width: 520,
	height: 370,

	title: 'Parâmetros',
	autoShow: true,		
	layout: 'fit',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			bodyPadding: 10,
			xtype: 'tabpanel',
			items:[
				{
					title: "Contas Juros, Desconto e Multa",
					items:[
						{
							xtype: 'form',
							
							items:[
								{
									xtype: 'fieldset',
									title: 'Recebimento',
									defaults:{
										xtype: 'textfield',
										labelAlign: 'right'
									},
									items:[
										{ fieldLabel: 'Juros', name: 'recebimento_conta_juros'},
										{ fieldLabel: 'Multa', name: 'recebimento_conta_multa'},
										{ fieldLabel: 'Desconto', name: 'recebimento_conta_desconto'}
									]
								},{
									xtype: 'fieldset',
									title: 'Pagamento',
									defaults:{
										xtype: 'textfield',
										labelAlign: 'right'
									},
									items:[
										{ fieldLabel: 'Juros', name: 'pagamento_conta_juros'},
										{ fieldLabel: 'Multa', name: 'pagamento_conta_multa'},
										{ fieldLabel: 'Desconto', name: 'pagamento_conta_desconto'}
									]
								}
							]
						}
					]
				}
			],
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]


})