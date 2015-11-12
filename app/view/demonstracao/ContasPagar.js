Ext.define('AutoMecanica.view.demonstracao.ContasPagar', {
	extend: 'Ext.window.Window',
	alias: 'widget.formcontaspagar',	

	requires:[
		'AutoMecanica.util.Util'
	],

	width: 800,
	height: 530,

	title: 'Balancete de Verificação',
	autoShow: true,		
	layout: 'fit',
	
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'container',
			//bodyPadding: '10px',
			
			layout: "border",						

			defaults:{
				split: true,
				collapsible: true
			},

			items:[				
				{					
					//Tree Anos
					xtype: 'treepanel',

					tbar:[
						{text: 'Atualizar', itemId: 'refreshbtn'}
					],

					itemId: 'treeanos',
					region: 'west',
					weight: 50,					
					collapsible: false,
					width: 150,					
					minWidth: 100,
					store: 'MapaLancamentos',
					rootVisible: false
				
				},{
					region: 'center',
					xtype: 'grid',
					collapsible: false,
					itemId: 'detalhegrid',
					store: 'Lancamentos',
					flex: 2,
					columns: [
						{text: 'Data', dataIndex: 'data', width: 90, renderer: function(value){
							return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
						}},
						{text: 'Tipo', dataIndex: 'tipo', width: 45},
						{text: 'Nº Lanç.', dataIndex: 'n_lanc', width: 90},
						{text: 'Tipo Documento', dataIndex: 'tipo_doc', width: 100, renderer:function(value){
							var tipo;
							switch(value){
								case "O":
									tipo = "Outros";
								break;
								case "N":
									tipo = "Nota Fiscal";
								break;
								case "R":
									tipo = "Recibo";
								break;
								case "G":
									tipo = "Guia";
								break;
								case "C":
									tipo = "Cheque";
								break;
							}
							return tipo;
						}},
						{text: 'Nº Doc.', dataIndex: 'n_doc', width: 90},
						{text: 'Complemento', dataIndex: 'complemento', width: 120},
						{text: 'Referencia', dataIndex: 'ref', width: 80, /*renderer: function(value){
							return value.substr(0,2) + "/" + value.substr(2,4);
						}*/},
						{text: 'Natureza Financeira', dataIndex: 'natureza_financeira', width: 90},
						{text: 'Fonte Financeira', dataIndex: 'fonte_financeira', renderer: function(value){
							var record = Ext.StoreManager.lookup('Tesourarias').findRecord('id', value);
							if(record){
								return record.get('descricao');
							}else{
								return "";
							}
						}},						
						{text: 'Valor', dataIndex: 'valor_doc', align:'right', width: 110, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Juros', dataIndex: 'valor_juros', align:'right', width: 110, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Multa', dataIndex: 'valor_multa', align:'right', width: 110, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Desconto', dataIndex: 'valor_desconto', align:'right', width: 110, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Total', dataIndex: 'valor_total', align:'right', width: 110, renderer:function(value){
							return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
						}},
						{text: 'Favorecido', dataIndex: 'favorecido_nome', width: 120}
					]
					
				},{
					region: 'south',
					xtype: 'form',
					itemId: 'formlancamentos',
					flex: 3,
					bodyPadding: 10,
					/*bodyStyle: 'background-color: #EDEDED',*/
					scrollable: true,					
					collapsible: false,
					defaults:{
						xtype: 'textfield',
						labelAlign: 'right',
						disabled: false,
						labelWidth: 130
					},
					/*tbar: [
						{text: 'Novo', itemId: 'novo', disabled: false},
						{text: 'Salvar', itemId: 'salvar', disabled: false},
						{text: 'Cancelar', itemId: 'cancelar', disabled: false}						
					],*/
					items:[						
						{xtype: 'hiddenfield', name: 'id'},						
						{
							xtype: 'combobox', 
							editable:false, 
							fieldLabel: 'Tipo Lançamento',
							name: 'tipo',
							allowBlank: false,
							displayField: 'text',
							valueField: 'tipo',
							itemId: 'comboTipo',							
							store: Ext.create('Ext.data.Store',{
								
								storeId: 'tipoLancamento',

								fields:['tipo', 'text'],

								data:[
									{tipo: 'P', text: 'Pagamento'},
									{tipo: 'R', text: 'Recebimento'},
									{tipo: 'M', text: 'Misto'}
								]
							})
						},
						{fieldLabel: 'Data', name: 'data', format: 'd/m/Y', submitFormat: 'Y-m-d', allowBlank: false, xtype: 'datefield'},
						{
							xtype: 'container',	
							style: 'padding-bottom: 5px',						
							layout: {
								type:'hbox',
								align: 'stretch'
							},
							defaults:{
								labelWidth: 130,
								labelAlign: 'right'
							},

							items:[
								{
									xtype: 'combobox', 
									fieldLabel: 'Tipo Documento',
									name: 'tipo_doc',
									editable:false, 
									allowBlank: false,
									displayField: 'text',							
									valueField: 'tipo',
									itemId: 'comboTipoDoc',
									store: Ext.create('Ext.data.Store',{
										
										storeId: 'tipoDocumento',

										fields:['tipo', 'text'],

										data:[
											{tipo: 'C', text: 'Cheque'},
											{tipo: 'G', text: 'Guia'},
											{tipo: 'N', text: 'Nota Fiscal'},
											{tipo: 'R', text: 'Recibo'},
											{tipo: 'O', text: 'Outro'}
										]
									})
								},
								{xtype: 'textfield', hidden: true, labelAlign:'right', fieldLabel: 'Nº Documento', width: 200, name: 'n_doc'}
							]
						},
						{fieldLabel: 'Nº Lançamento', name: 'n_lanc'},
						{
							xtype: 'container',	
							style: 'padding-bottom: 5px',						
							layout: {
								type:'hbox',
								align: 'stretch'
							},
							defaults:{
								xtype: 'textfield',
								labelWidth: 130,
								labelAlign: 'right'
							},
							items:[
								{fieldLabel: 'Referência', width: 200, name: 'ref'},
								{fieldLabel: 'Complemento', name: 'complemento'}								
							]
						},
						{
							xtype: 'container',	
							style: 'padding-bottom: 5px',						
							layout: {
								type:'hbox',
								align: 'stretch'
							},
							defaults:{								
								labelWidth: 130,
								labelAlign: 'right'
							},
							items:[
								{
									xtype: 'combobox', 
									itemId: 'comboNatureza2',
									editable: false,
									width: 350,	
									fieldLabel: 'Natureza Financeira', 
									queryMode: 'local',
									displayField: 'nome',
									valueField: 'cod',
									name: 'natureza_cat', 
									allowBlank: false,
									store: Ext.create('AutoMecanica.store.NaturezasFinanceiras', {
										storeId: 'natureza2'
									})
								},
								{
									xtype: 'combobox', 
									itemId: 'comboNatureza',									
									editable: false,		
									width: 250,	
									queryMode: 'local',
									displayField: 'nome',
									valueField: 'cod',
									name: 'natureza_financeira', 
									allowBlank: false,
									store: Ext.create('AutoMecanica.store.NaturezasFinanceiras', {
										storeId: 'natureza1'
									})
								}															
							]
						},
						{
							xtype: 'combobox', 
							itemId: 'comboFonte',
							fieldLabel: 'Fonte Financeira',
							editable: false,
							width: 485,
							displayField: 'descricao',
							valueField: 'id',
							name: 'fonte_financeira', 
							allowBlank: false,
							store: 'Tesourarias',
							/*displayTpl: new Ext.XTemplate(
								'<tpl for=".">'+
									'{[typeof values === "string" ? values : values["descricao"]]} (' +
									'{[typeof values === "string" ? values : values["conta"]]})' +
								'</tpl>'
							),
							listConfig: {																
								getInnerTpl: function(){
									return '{descricao} ({conta})';
								}
							}*/
						},
						{
							xtype: 'container',	
							style: 'padding-bottom: 5px',						
							layout: {
								type:'hbox',
								align: 'stretch'
							},
							defaults:{								
								labelWidth: 130,
								labelAlign: 'right'
							},
							items:[
								{fieldLabel: 'Valor', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_doc', fieldStyle:'text-align: right', allowBlank: false},
								{
									xtype: 'combobox',
									labelWidth: 75, 
									hidden: true,
									itemId: 'comboFavorecido',
									fieldLabel: 'Cliente',
									editable: false,
									width: 260,
									displayField: 'nome',
									valueField: 'id',
									name: 'favorecido', 
									allowBlank: true,
									store: Ext.create('AutoMecanica.store.Fornecedores', {
										storeId: 'favorecidos'
									}),									
								}
							]
						},
						
						{fieldLabel: 'Juros', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_juros', fieldStyle:'text-align: right'},
						{fieldLabel: 'Multa', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_multa', fieldStyle:'text-align: right'},
						{fieldLabel: 'Desconto', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_desconto', fieldStyle:'text-align: right'},
						{fieldLabel: 'Total', editable:false, width:225, decimalSeparator: ',', hideTrigger: true, xtype: 'numericfield', name: 'valor_total', fieldStyle:'text-align: right'},
						{
							xtype: 'container',
							layout: {
								type:'hbox',
								pack: 'center'
							},

							disabled: false,

							defaults:{
								xtype: 'button',
								style: 'margin-right: 10px'									
							},

							items:[
								{text: 'Novo', itemId: 'novo', disabled: false},
								{text: 'Cancelar', itemId: 'cancelar', disabled: false},						
								{text: 'Salvar', itemId: 'salvar', disabled: false, cls: 'default-btn'}
							]
						}
					]					
					
				}
			]
		}

	]
})
