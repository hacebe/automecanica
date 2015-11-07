Ext.define('GestorFinanceiro.view.cadastro.PlanoContasEmpresa', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarplanocontasempresa',

	requires:[
		'Ux.InputTextMask'
	],

	width: 800,
	height: 530,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	title: 'Planos de Contas Empresa',
	autoShow: true,		
	
	constrainHeader: true,
	minimizable: true,
	maximizable: true,	

	defaults:{
		bodyPadding: 10,
	},

	items:[
		{
			
			layout: {
				type: 'vbox',
				align: 'stretch'
			},

			flex:1,
			items:[
				{
					fieldLabel: 'Modelo de Plano de Contas',
					labelAlign: 'top',
					xtype: 'combobox',
					itemId: 'tipo',
					editable:false,
					store: 'TiposPlanos',
					valueField: 'id',
					displayField: 'nome',
					queryMode: 'local'

				},{
					xtype: 'grid',
					border: 1,
					itemId: 'gridPlanoContas',
					flex: 1,
					store: Ext.create('Ext.data.Store', {
						fields: ['mask', 'cod', 'nome'],

						proxy:{
							type: 'ajax',
							url: 'data/planocontasempresa.php?module=getAllFromTipo',
							reader: {
								type: 'json',
								rootProperty: 'data'
							}
						}
	
					}),
					columns: [
						{text: 'Classificação', dataIndex: 'mask', width: 120},
						{text: 'Descrição', dataIndex: 'nome', flex: 1}
					]
				},
				{
					xtype: 'label',
					text: 'Duplo clique para adicionar',
					style: 'color: red'
				}
			]
		},{
			
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex:1,
			items:[
				{
					fieldLabel: 'Empresa',
					labelAlign: 'top',
					xtype: 'combobox',
					itemId: 'empresa',
					editable:false,
					store: Ext.create('Ext.data.Store', {
						fields: ['mask', 'cod', 'nome'],

						proxy:{
							type: 'ajax',
							url: 'data/empresa.php?module=getAllFromTipo',
							reader: {
								type: 'json',
								rootProperty: 'data'
							}
						}
	
					}),
					valueField: 'id',
					displayField: 'razao_social',
					queryMode: 'local'

				},{
					xtype: 'grid',
					border: 1,
					itemId: 'gridPlanoContasEmpresa',
					flex: 1,
					store: Ext.create('Ext.data.Store', {
						fields: ['mask', 'cod', 'nome'],

						proxy:{
							type: 'ajax',
							url: 'data/planocontasempresa.php?module=getAllFromEmpresa',
							reader: {
								type: 'json',
								rootProperty: 'data'
							}
						}
	
					}),
					columns: [
						{text: 'Classificação', dataIndex: 'mask', width: 120},
						{text: 'Descrição', dataIndex: 'nome', flex: 1}
					]
				},
				{
					xtype: 'label',
					text: 'Duplo clique para remover',
					style: 'color: red'
				}
			]
		}
	],

	/*items:[
		{
			layout: 'center',
			
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
						queryMode: 'local'

					},
					{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							style: 'margin-right: 10px'
						},
						items:[
							{xtype: 'button', text: 'Novo', itemId: 'newTipo'},
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
									store: Ext.create('Ext.data.Store',{
										
										storeId: 'naturezaPlanoContas',

										fields:['natureza', 'text'],

										data:[
											{natureza: '', text: ' - '},
											{natureza: 'R', text: 'Recebimentos'},
											{natureza: 'P', text: 'Pagamentos'},
											{natureza: 'M', text: 'Misto'}
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
										{text: 'Salvar', itemId: 'salvar', disabled: true, cls: 'default-btn', style: 'margin-left:30px'}
									]
								}
							]					
							
						}
					]
				}

			]
		}
	]*/
})