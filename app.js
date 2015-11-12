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
Ext.require('AutoMecanica.store.Clientes');
Ext.require('AutoMecanica.store.Produtos');
Ext.require('AutoMecanica.store.MovimentacoesEstoque');
/*Ext.require('AutoMecanica.store.Empresas');
Ext.require('AutoMecanica.store.Tesourarias');
Ext.require('AutoMecanica.store.PlanoContasFluxo');
Ext.require('AutoMecanica.store.Usuarios');
Ext.require('AutoMecanica.store.Fornecedores');
Ext.require('AutoMecanica.store.NaturezasFinanceiras');
Ext.require('AutoMecanica.store.Anexos');
Ext.require('AutoMecanica.store.Notas');
Ext.require('AutoMecanica.store.Extratos');
Ext.require('AutoMecanica.store.FluxoCaixa');
Ext.require('AutoMecanica.store.Balancete');*/
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

    name: 'AutoMecanica',

    extend: 'Ext.app.Application',
    
	requires:[
        'AutoMecanica.singleton.SharedData',
        'AutoMecanica.singleton.SessionMonitor'
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
        'movimentacao.MovimentacaoEstoque',
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
    
    autoCreateViewport: 'AutoMecanica.view.Main',
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to AutoMecanica.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
