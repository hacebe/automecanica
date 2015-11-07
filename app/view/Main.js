/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('GestorFinanceiro.view.Main', {
    extend: 'Ext.container.Viewport',    

    xtype: 'app-main',   

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    items: [/*{
            
            xtype: 'formlogin'
                    
    },*/{
            xtype: 'toolbar',
            dock: 'top',
            itemId: 'mainMenu',
            border: false,      
            hidden: true,   
            items:[{
                text: 'Cadastro',
                menu:[
                    
                    {text: 'Clientes' , itemId: 'cadClientes', iconCls: 'client-icon'},
                    {text: 'Produtos' , itemId: 'cadProdutos', iconCls: 'client-icon'}/*,
                    {text: 'Fornecedores' , itemId: 'cadFornecedores', iconCls: 'client-icon'},
                    {text: 'Tesouraria' , itemId: 'cadTesouraria', iconCls: 'client-icon'},
                    {text: 'Arquivos' , itemId: 'cadArquivos', iconCls: 'client-icon'},
                    {xtype: 'menuseparator', itemId: 'cadSeparator' , hidden: false},
                    {text: 'Plano de Contas' , itemId: 'cadPlanoContasFluxo', iconCls: 'client-icon', hidden: false},      
                    {text: 'Plano de Contas Empresa' , itemId: 'cadPlanoContasEmpresa', iconCls: 'client-icon', hidden: false},      
                    {text: 'Empresas' , itemId: 'cadEmpresas', iconCls: 'client-icon', hidden: false},
                    {text: 'Usuários' , itemId: 'cadUsuarios', iconCls: 'client-icon', hidden: false},
                    {text: 'Parametros' , itemId: 'cadParametros', iconCls: 'client-icon', hidden: false}*/
                ]
            }/*,{
                text: 'Movimentação',
                menu:[
                    {text: 'Lançamentos', itemId: 'movLancamentos', iconCls: 'money-icon'},
                    {text: 'Lançamentos Fixos', itemId: 'movLancamentosFixos', iconCls: 'debit-icon'},        
                    {xtype: 'menuseparator', itemId: 'movSeparator' , hidden: false},        
                    {text: 'Contas a Pagar' , itemId: 'movContasPagar', iconCls: 'client-icon'},
                    {text: 'Contas a Receber' , itemId: 'movContasReceber', iconCls: 'client-icon'},    
                    {xtype: 'menuseparator', itemId: 'movSeparator2' , hidden: false},            
                    {text: 'Importar Balancete', itemId: 'movImportarBalancete', iconCls: 'debit-icon'},        
                ]
            },{
                text: 'Demonstração',
                menu:[
                    {text: 'Balancete de verificação', itemId: 'demonsBalancete', iconCls: 'calendar-icon', disabled: false},
                    {text: 'Fluxo de Caixa', itemId: 'demonsFluxoCaixa', iconCls: 'calendar-icon', disabled: false},
                    //{text: 'Fluxo de Pgto. de Fornecedores', itemId: 'demonsFluxoPgto', iconCls: 'calendar-icon', disabled: true},
                    //{text: 'Fluxo rec. Clientes', itemId: 'demonsFluxoRec', iconCls: 'client-icon', disabled: true}                    
                ]
            },{
                text: 'Relatorios',
                menu:[
                    {text: 'Extrato Conta Corrente', itemId: 'relatorioExtratoContaCorrente', iconCls:'report-icon'}                  
                ]
            },{
                text: 'Ferramentas',
                menu:[
                    {text: 'Alterar Senha', itemId: 'ferraAlterarSenha', iconCls:'report-icon', disabled: true},
                    {text: 'Auditoria', itemId: 'ferraAuditoria', iconCls:'report-icon', disabled: true},
                    {text: 'Verificar Lançamentos', itemId: 'ferraVerificar', iconCls:'report-icon', disabled: true}
                ]
            }*/,{
                xtype: 'tbfill',
            },{
                text: '',
                itemId: 'userCombo',
                iconCls: 'user-icon',
                menu:[                    
                    {text: 'Acessar outra Empresa', itemId: 'trocaEmpresa', iconCls:'leave-icon'},
                    {xtype: 'menuseparator'},
                    {text: 'Sair', itemId: 'sair', iconCls:'leave-icon'}
                    
                                        
                ]
            }]

    },{        
        bodyStyle: 'background-image: url(resources/images/square.gif)',             
        border: false,
        layout:{
            type: 'vbox',
            align: 'end'
        },
        itemId: 'mainContainer',    
        flex: 1,
        //dockedItems:[]
    },{
            xtype: 'toolbar', 
            style: 'z-index: 99999',
            defaults:{
                textAlign: 'left'
            },
            itemId: 'taskbar',
            layout: { overflowHandler: 'Scroller' },
            items: ['&#160;']           
        }]
});
