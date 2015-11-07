Ext.define('GestorFinanceiro.view.cadastro.PlanoContasFluxo', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarplanocontasfluxo',

	requires:[
		'Ux.InputTextMask'
	],

	width: 800,
	height: 530,

	title: 'Planos de Contas de Fluxo',
	autoShow: true,		
	layout: 'card',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,	

	tbar:[
		{text: 'Voltar', itemId: 'backBtn', disabled: true}
	],

	items:[
		{
			layout: 'center',
			/*bodyStyle: 'background-color: #EDEDED',*/
			items:{
				xtype: 'container',
				layout: 'vbox',
				items:[
					{
						fieldLabel: 'Selecione um plano de contas de fluxo',
						labelAlign: 'top',
						xtype: 'combobox',
						itemId: 'tipo',
						editable:false,
						store: 'TiposPlanos',
						valueField: 'id',
						displayField: 'nome',
						queryMode: 'local',
						anchor: '100%'

					},
					{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							style: 'margin-right: 10px'
						},
						items:[
							{xtype: 'button', text: 'Novo', itemId: 'newTipo'},
							{xtype: 'button', text: 'Clonar', itemId: 'cloneTipo', disabled: true},
							{xtype: 'button', text: 'Renomear', itemId: 'renomearTipo', disabled: true, style: 'margin-right: 30px'},
							{xtype: 'button', text: 'Selecionar', itemId: 'selectTipo', cls: 'default-btn'}
						]
					}
				]

			}
		},{
			xtype: 'container',
			layout: 'fit',

			items:[
				{
					xtype:'container',
					bodyPadding: '10px',
					
					layout: "border",						



					defaults:{
						split: true,
						collapsible: true
					},

					items:[				
						{					
							xtype: 'treepanel',
							itemId: 'treeplanocontas',
							region: 'west',
							weight: 50,							
							useArrows: true,
							width: 280,					
							minWidth: 150,
							store: Ext.create('GestorFinanceiro.store.PlanoContasFluxo'),
							rootVisible: true,
							
							tbar:[
								{
									text: 'Adicionar',
									itemId: 'addbtn'
								},
								{
									text: 'Editar',
									itemId: 'editbtn'
								},
								{
									text: 'Atualizar',
									itemId: 'refreshbtn'
								}
							]
						
						},{
							region: 'center',
							xtype: 'grid',
							itemId: 'detalhegrid',
							store: Ext.create('GestorFinanceiro.store.PlanoContasFluxo', {storeId: 'detalhePlanoContasStore'}),
							flex: 2,
							columns: [
								{text: 'Tipo', dataIndex: 'tipo', width: 45},
								{text: 'Natureza', dataIndex: 'natureza', width:70},
								{text: 'Classificação', dataIndex: 'mask', width: 120},
								{text: 'Descrição', dataIndex: 'textNoMask', flex: 1},
								{text: 'Conta Contábil', dataIndex: 'contacontabil', width: 100},
							]
							
						},{
							region: 'south',
							xtype: 'form',
							itemId: 'formPlanoContas',
							flex: 3,
							bodyPadding: 10,
							/*bodyStyle: 'background-color: #EDEDED',*/
							scrollable: true,					
							collapsible: false,
							defaults:{
								xtype: 'textfield',
								labelAlign: 'right',
								disabled: true
							},
							
							items:[						
								{xtype: 'hiddenfield', name: 'parent'},
								{xtype: 'hiddenfield', name: 'mode'},						
								{fieldLabel: 'Classificação', name: 'id', itemId: 'classificacao', allowBlank: false}, //plugins: [Ext.create('Ux.InputTextMask', '9.9.9.99.999', false)],
								{fieldLabel: 'Descrição', width: 400, name: 'textNoMask', allowBlank: false},								
								{
									xtype: 'combobox', 
									itemId: 'comboNatureza',																	
									editable: false,
									fieldLabel: 'Natureza', 
									displayField: 'text',
									valueField: 'natureza',
									name: 'natureza', 
									allowBlank: true,
									width: 300,
									store: Ext.create('Ext.data.Store',{
										
										storeId: 'naturezaPlanoContas',

										fields:['natureza', 'text'],

										data:[
											{natureza: '', text: ' - '},
											{natureza: 'R', text: 'Recebimentos'},
											{natureza: 'P', text: 'Pagamentos'},
											{natureza: 'M', text: 'Misto'} //Misto
										]
									})
								},
								{
									xtype: 'combobox', 
									editable:false, 
									fieldLabel: 'Tipo',
									name: 'tipo',
									allowBlank: true,
									displayField: 'text',
									valueField: 'tipo',
									itemId: 'comboTipo',
									store: Ext.create('Ext.data.Store',{
										
										storeId: 'tipoPlanoContas',

										fields:['tipo', 'text'],

										data:[
											{tipo: '', text: ' - '},
											{tipo: 'T', text: 'T - Título'},
											{tipo: 'A', text: 'A - Analítico'}
										]
									})
								},
								{fieldLabel: 'Conta Contábil', xtype: 'textfield', name: 'contacontabil'},
								{fieldLabel: 'Inativo', xtype: 'checkbox', name: 'inativo', inputValue: 'on'},
								{
									xtype: 'container',
									layout: {
										type:'hbox',
										pack: 'center'
									},

									disabled: false,

									defaults:{
										xtype: 'button',										
									},

									items:[
										{text: 'Cancelar', itemId: 'cancelar', disabled: true},
										{text: 'Excluir', itemId: 'excluir', disabled: true},
										{text: 'Salvar', itemId: 'salvar', disabled: true, cls: 'default-btn', style: 'margin-left:30px'}
									]
								}
							]					
							
						}
					]
				}

			]
		}
	]
})