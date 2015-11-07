Ext.define('GestorFinanceiro.view.movimentacao.Lancamentos', {
	extend: 'Ext.window.Window',
	alias: 'widget.formlancamentos',	

	requires:[
		'GestorFinanceiro.util.Util'
	],

	width: 800,
	height: 630,

	title: 'Lançamentos',
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
					flex: 1,
					columns: {
						items:[
							{text: 'Data', dataIndex: 'data', minWidth: 80, renderer: function(value){
								//return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
								return GestorFinanceiro.util.Util.PHP2JSDate(value);
							}},
							{
								menuDisabled: true,
								header: '<img class="header-icon" style="vertical-align:middle;" src="resources/images/icon-attachment.png"/>',
								dataIndex: 'anexos', width: 30, 
								renderer: function(value, meta, record, rowindx, colindx, store) {
								    
								    if (value != 0) {
								        meta.css = 'icon-attachment';
								    }else{
								        meta.css = '';
								    }
								    return '';
								}
							},
							{text: 'Tipo', dataIndex: 'tipo', minWidth: 50, width: 50},
							{text: 'Nº Lanç.', dataIndex: 'n_lanc',minWidth: 60, width: 60},
							{text: 'Tipo Documento', dataIndex: 'tipo_doc',minWidth: 110, width: 100, renderer:function(value){
								var tipo;
								switch(value){
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
									case "E":
										tipo = "Extrato";
									break;
								}
								return tipo;
							}},
							{text: 'Nº Doc.', dataIndex: 'n_doc',minWidth: 60, width: 60},
							{text: 'Complemento', dataIndex: 'complemento',minWidth: 90},
							{text: 'Referencia', dataIndex: 'ref',minWidth: 70, /*renderer: function(value){
								return value.substr(0,2) + "/" + value.substr(2,4);
							}*/},
							{text: 'Natureza Financeira', dataIndex: 'natureza_titulo',minWidth: 110},
							{text: 'Fonte Financeira', dataIndex: 'fonte_financeira',minWidth: 100, renderer: function(value){
								var record = Ext.StoreManager.lookup('Tesourarias').findRecord('id', value);
								if(record){
									return record.get('descricao');
								}else{
									return "";
								}
							}},						
							{text: 'Valor', dataIndex: 'valor_doc', align:'right',minWidth: 60, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Desc. Adiantamento', dataIndex: 'valor_desconto_adiantamento', align:'right', minWidth: 120, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Juros', dataIndex: 'valor_juros', align:'right',minWidth: 60, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Multa', dataIndex: 'valor_multa', align:'right',minWidth: 60, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Desconto', dataIndex: 'valor_desconto', align:'right',minWidth: 75, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Total', dataIndex: 'valor_total', align:'right',minWidth: 60, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Favorecido', dataIndex: 'favorecido_nome',minWidth: 120}
						],
						defaults: {
							autoSizeColumn: true
						}
					},viewConfig : {
				    	listeners : {
						    refresh : function (dataview) {
						      Ext.each(dataview.panel.columns, function (column) {
						       if (column.autoSizeColumn === true)
						        column.autoSize();
							  })
						    }
					    }
					}
				},
				{
					region: 'south',
					xtype:'tabpanel',
					flex: 3,
					collapsible: false,
					items:[{
						title: 'Lançamento',
						xtype: 'form',
						itemId: 'formlancamentos',
						
						bodyPadding: 10,
						/*bodyStyle: 'background-color: #EDEDED',*/
						scrollable: true,					
						
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
								editable:true, 
								fieldLabel: 'Tipo Lançamento',
								name: 'tipo',
								allowBlank: false,
								typeAhead: true,
								queryMode: 'local',
								minChars: 1,
								typeAheadDelay: 0,
								displayField: 'text',
								valueField: 'tipo',
								width: 320,
								itemId: 'comboTipo',							
								store: Ext.create('Ext.data.Store',{
									
									storeId: 'tipoLancamento',

									fields:['tipo', 'text'],

									data:[
										{tipo: 'P', text: 'Pagamento'},
										{tipo: 'R', text: 'Recebimento'},
										{tipo: 'M', text: 'Transferência Financeira'}
									]
								})
							},
							{fieldLabel: 'Data', name: 'data', enableKeyEvents: true, submitFormat: 'Y-m-d', width: 230, allowBlank: false},
							//{fieldLabel: 'Data', name: 'data', width: 230, allowBlank: false},
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
										editable:true, 
										allowBlank: false,
										typeAhead: true,
										queryMode: 'local',
										minChars: 0,
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
												{tipo: 'E', text: 'Extrato'}
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
									{fieldLabel: 'Referência', width: 200, name: 'ref', maxLength: 7, enforceMaxLength: true, minLength: 6},
									{fieldLabel: 'Complemento', name: 'complemento'}								
								]
							},
							{
								xtype: 'combobox', 
								itemId: 'comboNatureza2',
								editable: true,
								width: 485,	
								fieldLabel: 'Natureza Financeira', 
								queryMode: 'local',
								displayField: 'nome',
								valueField: 'cod',
								name: 'natureza_cat', 
								allowBlank: false,
								store: Ext.create('GestorFinanceiro.store.NaturezasFinanceiras', {
									storeId: 'natureza2'
								})
							},
							{
								xtype: 'combobox', 
								itemId: 'comboNatureza',									
								editable: true,		
								width: 485,	
								typeAhead: true,
								queryMode: 'local',
								minChars: 1,
								typeAheadDelay: 0,
								//queryMode: 'local',
								displayField: 'nome',
								valueField: 'cod',
								fieldLabel: ' ',
								labelSeparator: '',
								name: 'natureza_financeira', 
								allowBlank: false,
								store: Ext.create('GestorFinanceiro.store.NaturezasFinanceiras', {
									storeId: 'natureza1'
								})
							}															
							,
							{
								xtype: 'combobox', 
								itemId: 'comboFonte',
								fieldLabel: 'Fonte Financeira',
								editable: true,
								width: 485,
								typeAhead: true,
								queryMode: 'remote',
								minChars: 1,
								typeAheadDelay: 0,
								displayField: 'descricao',
								valueField: 'id',
								name: 'fonte_financeira', 
								allowBlank: false,
								store: 'Tesourarias'
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
										editable: false,
										hidden: true,
										queryMode: 'local',
										itemId: 'comboFavorecido',
										fieldLabel: 'Cliente',
										width: 260,
										displayField: 'nome',
										valueField: 'id',
										name: 'favorecido', 
										allowBlank: true,
										store: Ext.create('GestorFinanceiro.store.Fornecedores', {
											storeId: 'favorecidos'
										}),									
									}
								]
							},
							
							{fieldLabel: 'Desc. Adiantamento', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_desconto_adiantamento', fieldStyle:'text-align: right'},
							{fieldLabel: 'Juros', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_juros', fieldStyle:'text-align: right'},
							{fieldLabel: 'Multa', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_multa', fieldStyle:'text-align: right'},
							{fieldLabel: 'Desconto', hideTrigger: true, width:225, decimalSeparator: ',', xtype: 'numericfield', name: 'valor_desconto', fieldStyle:'text-align: right'},
							{fieldLabel: 'Total', editable:false, width:225, decimalSeparator: ',', hideTrigger: true, xtype: 'numericfield', name: 'valor_total', fieldStyle:'text-align: right'},
							
							{fieldLabel: 'Obs.', xtype: 'textarea', width:225, labelAlign: 'top', height: 133 , name: 'observacao', style: 'position:absolute; left:270px; top:250px;'},
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
									{text: 'Cancelar', itemId: 'cancelar', disabled: true},						
									{text: 'Excluir', itemId: 'excluir', disabled: true},						
									{text: 'Salvar', itemId: 'salvar', disabled: false, cls: 'default-btn'},
									{text: 'Exportar', itemId: 'exportar', disabled: false}
								]
							}
						]					
						
					},{
						title:'Anexos',
						layout:{
							type:'vbox',
							align: 'stretch',
							pack: 'start'
						},
						items:[
							{
								xtype:'grid',
								flex: 1,
								store: Ext.create("GestorFinanceiro.store.Anexos"),

								columns: [
									{text: '', width: 32, dataIndex: 'tipo', 
										renderer: function(value, meta, record, rowindx, colindx, store) {
										    var extensions = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'zip','rar','7z', 'gz', 'pdf', 'jpg', 'png', 'gif', 'bmp'];
										    if (extensions.indexOf(value) > -1) {
										        meta.css = 'icon-' + value;
										    }else{
										        meta.css = 'icon-unknown';
										    }
										    return '';
										}
									},
									{text: 'Arquivo', flex:2, dataIndex: 'nome_arquivo'},
									{text: 'Enviado em', flex:1, dataIndex: 'data_envio'},
									{text: 'Tamanho', dataIndex: 'tamanho', 
										renderer: function(value){
											return GestorFinanceiro.util.Util.humanFileSize(value, true);
										}
									},
									{
										xtype:'actioncolumn',
										width: 50,
										items:[
											{
												icon: 'resources/images/icon-delete.png',
												tooltip: 'Excluir',
												handler: function(grid, rowIndex, colIndex) {
								                    var rec = grid.getStore().getAt(rowIndex),
								                    	gridDetalhe = grid.up('window').down('#detalhegrid');
								                    //alert("Delete " + rec.get('nome_arquivo'));
								                    Ext.Ajax.request({
								                    	url: 'data/lancamento.php?module=deleteAttach',
								                    	params:{
								                    		attachID: rec.get('id')
								                    	},
								                    	success: function(fp, o){
								                    		GestorFinanceiro.util.Util.showToast('Anexo excluido');
								                    		gridDetalhe.getStore().load();
								                    		grid.getStore().load();
								                    	}
								                    })
								                }
											},{
												icon: 'resources/images/arrow_down.png',
												tooltip: 'Baixar Arquivo',
												handler: function(grid, rowIndex, colIndex) {
													var rec = grid.getStore().getAt(rowIndex);

								                    window.location='data/lancamento.php?module=downloadAttach&attachID=' + rec.get('id');
								                }
											}
										]
									}
								]
							},{
								xtype:'form',

								layout: 'hbox',
								defaults:{
									xtype: 'button',
									style: 'margin-left: 10px'
								},
								items:[
									{buttonText: 'Anexar arquivo', name: 'arquivo', itemId: 'attachFile', xtype:'filefield', buttonOnly: true, hideEmptyLabel: true, width:100},
									/*{text: 'Remover anexo', disabled: true, itemId: 'removeAttach'}*/
								]
							}
						]
					}]
				}
			]
		}

	]
})
