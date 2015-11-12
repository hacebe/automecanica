Ext.define('AutoMecanica.controller.Main',{
	extend: 'Ext.app.Controller',
	
	requires:[
		'AutoMecanica.util.Util',
	],

	views: [
		'Main',
		'cadastro.PlanoContasFluxo',
		'cadastro.PlanoContasEmpresa',
		'cadastro.ContasCorrentes',
		'cadastro.Empresas',
		'cadastro.Clientes',
		'cadastro.Produtos',
		'cadastro.Fornecedores',
		'cadastro.Tesouraria',
		'cadastro.Arquivos',
		'cadastro.Usuarios',
		'cadastro.Parametros',
		'movimentacao.Lancamentos',
		'movimentacao.LancamentosFixos',
		'movimentacao.Notas',
		'movimentacao.ImportarBalancete',
	],

	stores:[
		'Empresas'
	],

	init: function(application){
		this.windows = new Ext.util.MixedCollection();		

		this.control({

			//Cadastros
			'menu menuitem#cadClientes': {
				click: this.onMenuClickCadClientes
			},
			'menu menuitem#cadProdutos': {
				click: this.onMenuClickCadProdutos
			},

			'menu menuitem#cadFornecedores': {
				click: this.onMenuClickCadFornecedores
			},

			'menu menuitem#cadTesouraria': {
				click: this.onMenuClickCadTesouraria
			},

			'menu menuitem#cadArquivos': {
				click: this.onMenuClickCadArquivos
			},

			'menu menuitem#cadEmpresas': {
				click: this.onMenuClickCadEmpresas
			},

			'menu menuitem#cadUsuarios': {
				click: this.onMenuClickCadUsuarios
			},

			'menu menuitem#cadPlanoContasFluxo': {
				click: this.onMenuClickPlanoContasFluxo
			},

			'menu menuitem#cadPlanoContasEmpresa': {
				click: this.onMenuClickPlanoContasEmpresa
			},

			'menu menuitem#cadParametros': {
				click: this.onMenuClickCadParametros
			},

			//Lancamentos
			'menu menuitem#movEstoque': {
				click: this.onMenuClickMovimentacaoEstoque
			},

			'menu menuitem#movLancamentos': {
				click: this.onMenuClickMovimentacaoLancamentos
			},

			'menu menuitem#movLancamentosFixos': {
				click: this.onMenuClickMovimentacaoLancamentosFixos
			},

			'menu menuitem#movContasPagar': {
				click: this.onMenuClickMovimentacaoContasPagar
			},

			'menu menuitem#movContasReceber': {
				click: this.onMenuClickMovimentacaoContasReceber
			},

			'menu menuitem#movImportarBalancete': {
				click: this.onMenuClickMovimentacaoImportarBalancete
			},

			//relatorios
			'menu menuitem#relatorioExtratoContaCorrente': {
				click: this.onMenuClickRelatorioExtrato
			},

			'menu menuitem#demonsBalancete': {
				click: this.onMenuClickDemonstracaoBalancete
			},
			'menu menuitem#demonsFluxoCaixa': {
				click: this.onMenuClickDemonstracaoFluxoCaixa
			},

			'menu menuitem#agendaCompromissos': {
				click: this.onMenuClickAgendaCompromissos
			},

			'menu menuitem#agendaContatos': {
				click: this.onMenuClickAgendaContatos
			},

			'menu menuitem#relatorioCompromissos': {
				click: this.onMenuClickRelatorioCompromissos
			},

			'menu menuitem#configRelatorio': {
				click: this.onMenuClickConfiguracoesRelatorio
			},

			'menu menuitem#configSenha': {
				click: this.onMenuClickConfiguracoesSenha
			},

			'menu menuitem#trocaEmpresa': {
				click: this.onMenuClickTrocaEmpresa
			},

			'menu menuitem#sair': {
				click: this.onMenuClickLogout
			},

			'incaltexcimpexpbusca button#refresh':{
				click: this.onToolbarButtonClickRefresh
			},

			'window':{
				minimize: this.minimizeWindow,
				close: this.onWindowClose,
				activate: this.updateActiveWindow,
            	beforeshow: this.updateActiveWindow,
            	deactivate: this.updateActiveWindow
			},

			'#mainContainer': {
				render: this.onMainAfterRender
			}
		});
	},	

	onToolbarButtonClickRefresh: function( btn, e, opts ) {
		var grid = btn.up('window').down('grid');
		grid.getStore().load();
	},

	onMainAfterRender: function( container, e, opts ) {
		Ext.Ajax.request({
			url: 'data/check_session.php',
			success: function(data){
				data = JSON.parse(data.responseText);

				if( data.logado == 0 ) {

					Ext.create('AutoMecanica.view.Login');
				}

				else {
					Ext.ComponentQuery.query('toolbar#mainMenu')[0].show();
				}
					
			}
		})
	},

	onMenuClickCadClientes: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarclientes', 
				namespace: 'AutoMecanica.view.cadastro.Clientes'
			}
		);
	},
	onMenuClickCadProdutos: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarprodutos', 
				namespace: 'AutoMecanica.view.cadastro.Produtos'
			}
		);
	},

	onMenuClickCadFornecedores: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarfornecedores', 
				namespace: 'AutoMecanica.view.cadastro.Fornecedores'
			}
		);
	},

	onMenuClickCadArquivos: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listararquivos', 
				namespace: 'AutoMecanica.view.cadastro.Arquivos'
			}
		);
	},

	onMenuClickCadTesouraria: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listartesouraria', 
				namespace: 'AutoMecanica.view.cadastro.Tesouraria'
			}
		);
	},

	onMenuClickCadEmpresas: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarusuarios', 
				namespace: 'AutoMecanica.view.cadastro.Empresas'
			}
		);
	},
	
	onMenuClickCadUsuarios: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarusuarios', 
				namespace: 'AutoMecanica.view.cadastro.Usuarios'
			}
		);
	},	

	onMenuClickCadParametros: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'parametros', 
				namespace: 'AutoMecanica.view.cadastro.Parametros'
			}
		);
	},	

	onMenuClickMovimentacaoEstoque: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarmovestoque', 
				namespace: 'AutoMecanica.view.movimentacao.MovimentacaoEstoque'
			}
		);
	},
	onMenuClickMovimentacaoLancamentos: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formlancamentos', 
				namespace: 'AutoMecanica.view.movimentacao.Lancamentos'
			}
		);
	},

	onMenuClickMovimentacaoLancamentosFixos: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formlancamentosfixos', 
				namespace: 'AutoMecanica.view.movimentacao.LancamentosFixos'
			}
		);
	},

	onMenuClickMovimentacaoImportarBalancete: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formimportarbalancete', 
				namespace: 'AutoMecanica.view.movimentacao.ImportarBalancete'
			}
		);
	},

	onMenuClickMovimentacaoContasPagar: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarnotas#contasapagar', 
				namespace: 'AutoMecanica.view.movimentacao.Notas', 
				title: 'Contas a Pagar', 
				params:{
					tipo: 'P', 
					itemId: 'contasapagar'
				}
			}
		);
	},

	onMenuClickMovimentacaoContasReceber: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarnotas#contasareceber', 
				namespace: 'AutoMecanica.view.movimentacao.Notas', 
				title: 'Contas a Receber', 
				params:{
					tipo: 'R', 
					itemId: 'contasareceber'
				}
			}
		);
	},

	onMenuClickPlanoContasFluxo: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarplanocontasfluxo', 
				namespace: 'AutoMecanica.view.cadastro.PlanoContasFluxo'
			}
		);
	},

	onMenuClickPlanoContasEmpresa: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'listarplanocontasempresa', 
				namespace: 'AutoMecanica.view.cadastro.PlanoContasEmpresa'
			}
		);
	},

	onMenuClickDemonstracaoBalancete: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formbalancete', 
				namespace: 'AutoMecanica.view.demonstracao.Balancete'
			}
		);
	},
	onMenuClickDemonstracaoFluxoCaixa: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formfluxo', 
				namespace: 'AutoMecanica.view.demonstracao.FluxoCaixa'
			}
		);
	},

	onMenuClickRelatorioExtrato: function( menuitem, e, opts ) {
		this.createWindow(
			{
				xtype: 'formextrato', 
				namespace: 'AutoMecanica.view.relatorio.Extrato'
			}
		);
	},

	
	onMenuClickTrocaEmpresa: function( menuitem, e, opts ) {
		window.location.reload();
	},

	onMenuClickLogout: function(menuitem, e, opts){
		Ext.Ajax.request({
			url: 'data/logout.php',
			success: function(conn, response, options, eOpts){
				var result = JSON.parse(conn.responseText);
				if(result.success){
					window.location.reload();
				}
			}
		})
	},
	
	// TASKBAR

	onWindowBtnClick: function( btn ) {
        var win = btn.win;

        if ( win.minimized || win.hidden ) {
            btn.disable();

            win.show(null, function() {
                btn.enable();
            });

        }

        else if (win.active) {
            btn.disable();

            win.on('hide', function() {
                btn.enable();
            }, null, {single: true});

            win.minimize();
        }

        else {
            win.toFront();
        }
    },

	addTaskButton: function( win ) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margin: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        this.windows.add(win);
        
        var tb = Ext.ComponentQuery.query('#taskbar')[0],
        	cmp = tb.add(config);

    	win.taskButton = cmp;
    	win.animateTarget = win.taskButton.el;
        cmp.toggle(true);

        return cmp;
    },

    setActiveButton: function( btn ) {
        if (btn) {
            btn.toggle(true);
        } else {
            Ext.ComponentQuery.query('#taskbar')[0].items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    },

    removeTaskButton: function( btn ) {
        var found, me = this,
        	tb = Ext.ComponentQuery.query('#taskbar')[0];

        tb.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });

        if (found)
            tb.remove(found);

        return found;
    },

    minimizeWindow: function( win ) {
        win.minimized = true;
        win.hide();
    },

    onWindowClose: function( win ) {
        var me = this;
        me.windows.remove(win);
        me.removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },

    restoreWindow: function( win ) {

        if (win.isVisible()) {
            win.show();
            win.toFront();
        }

        else
            win.show();

        return win;
    },

    updateActiveWindow: function () {
        var me = this,
	        activeWindow = me.getActiveWindow(),
        	last = me.lastActiveWindow;

        if (last && last.isDestroyed) {
            me.lastActiveWindow = null;
            return;
        }

        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }

            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        this.setActiveButton(activeWindow && activeWindow.taskButton);
    },

    getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    createWindow: function( config ) {
    	var xtype = (config.xtype) ? config.xtype : null;
    	var namespace = (config.namespace) ? config.namespace : null;
    	var title = (config.title) ? config.title : false;
    	var params = (config.params) ? config.params : {};
    	var container = Ext.ComponentQuery.query('container#mainContainer')[0];

		params.constrainHeader = true;
		params.constrainTo = container.getEl().dom;
    		
		if( !Ext.ComponentQuery.query(xtype).length ) {
			var win = Ext.create(namespace, params);

			if(title)
				win.setTitle(title);
			
			container.add(win);
			win.show();

			this.addTaskButton(win);
		}

		else {

			Ext.ComponentQuery.query(xtype)[0].show();
			Ext.ComponentQuery.query(xtype)[0].toFront();
		}
    }
});