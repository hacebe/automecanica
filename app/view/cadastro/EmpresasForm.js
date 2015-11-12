Ext.define('AutoMecanica.view.cadastro.EmpresasForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formempresas',
	title: 'Incluir',

	width: 800,
	height: 400,

	layout: 'fit',
	constrainHeader: true,	

	modal: true,

	/*bodyPadding: 10,*/

	items:[
	{

		xtype: 'tabpanel',	
		/*plain: true,		*/
		items:[
		{

			title: 'Dados da Empresa',
			itemId: 'cadastrotab',
			defaults:{
				bodyPadding: 10,					
			},				
			items:[
			{

				xtype: 'form',
				border: false,
				itemId: 'cadastroform',
				defaults:{
					xtype: 'textfield',
					labelAlign: 'right',
					anchor: '100%'
				},
				items:[
					{xtype: 'hiddenfield', name: 'id'},
					{fieldLabel: 'Razão Social', name: 'razao_social', allowBlank: false},
					{fieldLabel: 'Nome Fantasia', name: 'nome_fantasia', allowBlank: false},
					{fieldLabel: 'Endereço', xtype: 'textareafield', name: 'endereco'},					
					{fieldLabel: 'CNPJ', name: 'cnpj'},
					{fieldLabel: 'Plano de Caixa', name: 'plano_id', xtype: 'combobox', store: 'TiposPlanos', editable: false, displayField: 'nome', valueField: 'id', allowBlank: false, queryMode: 'local'},
					{
						xtype: 'container',
						layout: {
							type:'hbox',
							align: 'stretch'
						},						

						defaults:{
							xtype: 'textfield',
							labelAlign: 'right'
						},

						items:[
							{fieldLabel: 'Telefone 1', name: 'telefone'},
							{fieldLabel: 'Telefone 2', name: 'telefone2'},
							{fieldLabel: 'Telefone 3', name: 'telefone3'},
						]

					}
				]
			}],

			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		},{
			title: 'Contatos',
			itemId: 'contatostab',
			layout: 'fit',

			items:[
			{

				xtype: 'form',
				itemId: 'contatosform',
				border: false,
				padding: 10,
				layout: 
				{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[
				{
					xtype: 'container',
					items: [
					{
						xtype: 'container',
						layout:'hbox',
						defaults:{
							xtype: 'textfield',
							labelAlign: 'right',
							labelWidth: 80,
							disabled: true
						},
						items:[
							{xtype: 'hiddenfield', name: 'id', disabled: false},
							{fieldLabel: 'Nome', name: 'nome', flex:3},
							{fieldLabel: 'E-Mail', name: 'email', flex: 2}
						]
					},{
						xtype: 'container',
						layout: 'hbox',
						style: 'padding-top: 10px',
						defaults:{
							xtype: 'textfield',
							labelAlign: 'right',
							labelWidth: 80,
							disabled: true
						},
						items:[
							{fieldLabel: 'Cargo', name: 'cargo', flex:1},
							{fieldLabel: 'Telefone', name: 'telefone', flex:1},
							{fieldLabel: 'Ramal', name: 'ramal', flex:1},
						]									
					},{
						xtype: 'container',
						layout: {
							type:'hbox',
							pack: 'end'
						},
						style: 'padding-top: 10px',
						defaults:{
							xtype: 'button',
							style: 'margin-right: 10px'
						},
						items:[															
							{text: 'Novo', itemId: 'novobtn'},
							{text: 'Salvar', itemId: 'salvarbtn', disabled: true},
							{text: 'Excluir', itemId: 'excluirbtn', disabled: true},
							{text: 'Cancelar', itemId: 'cancelarbtn', disabled: true}
						]									
					}]
				},{
					xtype: 'grid',
					store: 'Contatos',
					itemId: 'contatosgrid',

					flex: 1,
					style: 'margin-top: 10px',

					columns: [
						{text: 'Nome', dataIndex: 'nome', flex: 2},
						{text: 'E-mail', dataIndex: 'email', flex: 1},
						{text: 'Cargo', dataIndex: 'cargo'	, flex: 1},
						{text: 'Telefone', dataIndex: 'telefone', flex: 1},
						{text: 'Ramal', dataIndex: 'ramal', width: 70}						
					]
				}]
			
			}
			]
		},{
			title: 'Sócios',
			itemId: 'sociostab',
			layout: 'fit',			
			items:[
			{
				xtype: 'form',
				itemId: 'sociosform',
				border: false,
				padding: 10,
				layout: 
				{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[
				{
					
					xtype: 'container',
					items: [
					{
						xtype: 'container',
						layout:'hbox',
						defaults:{
							xtype: 'textfield',
							labelAlign: 'right',
							labelWidth: 50
						},
						items:[
							{xtype: 'hiddenfield', name: 'id'},
							{fieldLabel: 'CPF', name: 'cpf', flex:1, disabled: true},
							{fieldLabel: 'RG', name: 'rg', labelWidth: 30, flex:1, disabled: true},
							{fieldLabel: 'Dt. Nascimento', name: 'dt_nascimento', xtype:'datefield', format: 'd/m/Y', submitFormat: 'Y-m-d', labelWidth: 120, width: 230, disabled: true},	
							{fieldLabel: 'Participação (%)', name: 'participacao', labelWidth: 100, flex:1, disabled: true}
						]
					},{
						xtype: 'container',
						layout: 'hbox',
						style: 'padding-top: 10px',
						defaults:{
							xtype: 'textfield',
							labelAlign: 'right',
							labelWidth: 50
						},
						items:[
							{fieldLabel: 'Nome', name: 'nome', flex: 2, disabled: true},
							{fieldLabel: 'Apelido', name: 'apelido', flex: 1, disabled: true},
							{fieldLabel: 'Conta Contábil', name: 'contacontabil', flex:1, labelWidth: 100, disabled: true}
						]									
					},{
						xtype: 'container',
						layout: {
							type:'hbox',
							pack: 'end'
						},
						style: 'padding-top: 10px',
						defaults:{
							xtype: 'button',
							style: 'margin-right: 10px'
						},
						items:[															
							{text: 'Novo', itemId: 'novobtn'},
							{text: 'Salvar', itemId: 'salvarbtn', disabled: true},
							{text: 'Excluir', itemId: 'excluirbtn', disabled: true},
							{text: 'Cancelar', itemId: 'cancelarbtn', disabled: true}
						]									
					}]
				},{
					xtype: 'grid',
					store: 'Socios',
					itemId: 'sociosgrid',

					flex: 2,
					style: 'margin-top: 10px',

					columns: [
						{text: 'CPF', dataIndex: 'cpf', width: 100},
						{text: 'RG', dataIndex: 'rg', width: 100},
						{text: 'Nome do Sócio', dataIndex: 'nome'	, flex: 2},
						{text: 'Apelido', dataIndex: 'apelido'},
						{text: 'Participação', dataIndex: 'participacao'},
						{text: 'Data Nascimento', dataIndex: 'dt_nascimento', renderer: function(value){
							return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
						}},
						{text: 'Conta Contábil', dataIndex: 'contacontabil'}
					]
				}]
			}]
		},{
			title: 'Usuários',
			itemId: 'usuariostab',
			layout: 'fit',
			padding: 10,
			items:[
			{
				xtype: 'container',
				layout: {
					type: 'hbox',									
					align: 'stretch'
				},
				items:[
				{
					xtype: 'grid',
					itemId: 'gridunig',
					flex: 1,
					selModel: {
						mode: "MULTI"
					},
					store: Ext.create('AutoMecanica.store.Usuarios', {
						storeId: 'usuariosNotInEmpresa',
						proxy:{
							url: 'data/empresa.php?module=getUsuariosNotInEmpresa'
						}
					}),
					tbar:[
						{xtype: 'textfield', emptyText: 'Localizar', itemId: 'searchUnig', flex:1}
					],
					columns: [
						{text: 'Usuários Disponíveis', dataIndex: 'nome', flex: 1},
					]
				},{
					//botoes do meio
					xtype: 'container',

					layout: {
						type: 'vbox',
						pack: 'center',
						align: 'stretch'
					},
					defaults:{
						margin: 10
					},
					items:[
						{xtype: 'button', text: '<<', itemId: 'removeAllUsuarios'},
						{xtype: 'button', text: '<', itemId: 'removeSelUsuario'},
						{xtype: 'button', text: '>', itemId: 'addSelUsuario'},
						{xtype: 'button', text: '>>', itemId: 'addAllUsuarios'}
					]
				},{
					xtype: 'grid',
					itemId: 'griduig',
					flex: 1,
					selModel: {
						mode: "MULTI"
					},
					store: Ext.create('AutoMecanica.store.Usuarios', {
						storeId: 'usuariosInEmpresa',											
						proxy:{
							url: 'data/empresa.php?module=getUsuariosInEmpresa'
						}
					}),
					tbar:[
						{xtype: 'textfield', emptyText: 'Localizar', itemId: 'searchUig', flex:1}
					],
					columns: [
						{text: 'Usuários adicionados', dataIndex: 'nome', flex: 1}
					]
				}]
			}]
		}]
	}]
});