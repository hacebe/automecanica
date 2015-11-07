/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
//var extV = Ext.getVersion();
//if (extV.gt("5.0") && extV.lt("5.1")) {
  //  Ext.FocusManager.enable();
//}

    (function (  ) {
        
    })();

Ext.require('Ext.*');
Ext.require('GestorFinanceiro.store.Clientes');
Ext.require('GestorFinanceiro.store.Produtos');
/*Ext.require('GestorFinanceiro.store.Empresas');
Ext.require('GestorFinanceiro.store.Tesourarias');
Ext.require('GestorFinanceiro.store.PlanoContasFluxo');
Ext.require('GestorFinanceiro.store.Usuarios');
Ext.require('GestorFinanceiro.store.Fornecedores');
Ext.require('GestorFinanceiro.store.NaturezasFinanceiras');
Ext.require('GestorFinanceiro.store.Anexos');
Ext.require('GestorFinanceiro.store.Notas');
Ext.require('GestorFinanceiro.store.Extratos');
Ext.require('GestorFinanceiro.store.FluxoCaixa');
Ext.require('GestorFinanceiro.store.Balancete');*/
Ext.require('Ux.InputTextMask');
Ext.require('Ux.NumericField');
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ux' : 'ux'
    }
});
Ext.application({

    name: 'GestorFinanceiro',

    extend: 'Ext.app.Application',
    
	requires:[
        'GestorFinanceiro.singleton.SharedData',
        'GestorFinanceiro.singleton.SessionMonitor'
    ],

    views: [
        'Main',
        'Login'
    ],

    controllers: [
    	'Main',
    	'Login',
        'cadastro.Cliente',
        'cadastro.Produto',
        /*'cadastro.Usuario',
        'cadastro.Fornecedor',
        'cadastro.Tesouraria',
        'cadastro.PlanoContasFluxo',
        'cadastro.PlanoContasEmpresa',
        'cadastro.Empresa',
        'cadastro.Parametro',
        'movimentacao.Lancamento',
        'movimentacao.LancamentoFixo',
        'movimentacao.Notas',
        'movimentacao.ImportarBalancete',
        'demonstracao.FluxoCaixa',
        'demonstracao.Balancete',
        'relatorio.Extrato'*/
    ],
    
    autoCreateViewport: 'GestorFinanceiro.view.Main',
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to GestorFinanceiro.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
