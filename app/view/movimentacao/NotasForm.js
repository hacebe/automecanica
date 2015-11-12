Ext.define('AutoMecanica.view.movimentacao.NotasForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formnotas',
	title: 'Incluir',

	config:{
		tipo: undefined
	},

	width: 400,
	height: 550,

	layout: 'fit',
	modal: true,


	items:[
		{
			xtype: 'form',			
			bodyPadding: 10,
			defaults:{
				xtype: 'textfield',
				hideTrigger: true, 
				decimalSeparator: ',', 
				xtype: 'numericfield', 
				fieldStyle:'text-align: right'
			},
			items:[
				{xtype: 'hiddenfield', name: 'id'},
				{xtype: 'hiddenfield', name: 'lancamento'},
				{xtype: 'hiddenfield', name: 'tiponota'},
				{fieldLabel: 'Numero da Nota', name: 'numeronota', xtype: 'textfield', allowBlank: false},
				{fieldLabel: 'Data da Emissão', name: 'dataemissao', xtype: 'textfield', allowBlank: false},
				{fieldLabel: 'Cliente', name: 'favorecido', xtype: 'combo', store: 'Clientes', displayField: 'nome', valueField: 'id', anchor: '100%', hideTrigger: false, fieldStyle:'text-align: left'},
				{fieldLabel: 'Valor da Nota', name: 'valornota'},
				{fieldLabel: '- PIS', name: 'pis'},
				{fieldLabel: '- COFINS', name: 'cofins'},
				{fieldLabel: '- IRRF', name: 'ir'},
				{fieldLabel: '- CSLL', name: 'csll'},
				{fieldLabel: '- ISS', name: 'iss'},
				{fieldLabel: '- INSS', name: 'inss'},
				{fieldLabel: 'Valor Liquido', editable:false, name: 'valorliquido'},
				{fieldLabel: '- Descontos', editable:false, name: 'descontos'},
				{fieldLabel: '- Adiantam.', editable:false, name: 'adiantamentos'},
				{fieldLabel: '+ Juros', editable:false, name: 'juros'},
				{fieldLabel: '+ Multas', editable:false, name: 'multas'},
				{fieldLabel: '- Pagamento', editable:false, name: 'total'},
				{fieldLabel: '= Saldo', editable:false, name: 'somatotal'}
			],
	
			buttons:[				
				{text: 'Anexos', itemId: 'anexar'},
				{xtype: 'tbfill'},
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});