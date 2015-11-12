Ext.define('AutoMecanica.view.cadastro.ContasCorrentes', {
	extend: 'Ext.window.Window',
	alias: 'widget.formcontascorrentes',

	width: 800,
	height: 530,

	title: 'Financeiro - Contas Correntes',
	autoShow: true,
	

	layout: 'fit',

	tbar:[
				{fieldLabel: 'Ano', labelWidth: 40, labelAlign: 'right', width: 100, xtype: 'numberfield'},
				{text: 'Iniciar Exercicio'},
				{text: '<--'},
				{text: '<-'},
				{text: '->'},
				{text: '-->'},
				{text: 'Novo'},
				{text: 'Gravar'},
				{text: 'Alterar'},
				{text: 'Excluir'},
				{text: 'Relatorio'},
				{text: 'Sair'}
	],	

	items:[
		{
			xtype: 'form',	
			layout: 'hbox',			
			bodyPadding: '20px',
			items:[
				{
					xtype: 'container',
					width:'50%',
					layout: 'vbox',
					style:'padding-right:20px',

					defaults:{
						xtype: 'textfield',
						labelAlign: 'right',
						labelWidth: 90
					},

					items:[
						{fieldLabel: 'Conta', itemId: 'conta', width: 150},
						{fieldLabel: 'Descrição', itemId: 'descricao', width:'100%'},
						{fieldLabel: 'Carteira', itemId: 'carteira'},
						{fieldLabel: 'N. Número', itemId: 'nnumero'},
						{fieldLabel: 'Convenio', itemId: 'convenio'},
						{fieldLabel: 'Banco', itemId: 'banco'},
						{fieldLabel: 'Agencia', itemId: 'agencia'},
						{fieldLabel: 'C. Corrente', itemId: 'contacorrente'},
						{fieldLabel: 'Ag. C.C.', itemId: 'agenciaconta'},
						{fieldLabel: 'Ret. Bancario', itemId: 'retbancario'},
						{fieldLabel: 'Conta Contábil', itemId: 'contacontabil'}								
						
					]
				},
				{
					xtype: 'container',					
					items:[{
						xtype: 'textfield', fieldLabel: 'Saldo Anterior', itemId: 'saldoanterior', width: 150, labelAlign: 'right',},
						
						{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Janeiro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Fevereiro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Março',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Abril',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Maio',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Junho',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Julho',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Agosto',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Setembro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Outubro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Novembro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						},{
							
							xtype: 'fieldcontainer',
							layout: 'hbox',							
							fieldLabel: 'Dezembro',
							labelAlign: 'right',

							defaults:{
								xtype: 'textfield',
								hideLabel: true,								
								width: 140
							},

							items:[
								{itemId: 'saldoanterior1', emptyText: 'Entrada', width: 80},
								{itemId: 'saldoanterior2', emptyText: 'Saida', width: 80},
								{itemId: 'saldoanterior3', emptyText: 'Saldo', width: 80}
							]
						
						
						}


					]
				}
			]
		}

	]
})