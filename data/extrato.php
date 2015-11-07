<?php
include "connect.php";
include "queryLancamentos.php";
error_reporting(-1);

$monthName = 0;
$finalTree = null;
$treeTotal = 0;
$tree = null;
function buildTree(array $dataset){
	$tree = array();
	$references = array();

	foreach($dataset as $id => &$node){
		$references[$node['cod']] = &$node;
		$node['children'] = array();

		if(is_null($node['parent']) || $node['parent'] == 0){
			//$tree[$node['cod']] = &$node;
			$tree[] = &$node;
		}else{
			$references[$node['parent']]['children'][] = &$node;
		}
	}

	return $tree;
}

if(isset($_GET['module']) ){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "getExtrato":
			$fonte = addslashes($_GET['fonte']);
			$mes = addslashes($_GET['mes']);
			$ano = addslashes($_GET['ano']);

			//$result = $mysqli->query("SELECT contabil FROM tesouraria WHERE id = '$fonte' AND empresa_id = '$empresaId' LIMIT 1");

			//$rNatureza = $result->fetch_array();
			$natureza = getContaFromTesouraria($fonte);
			if(!$natureza){
				echo json_encode(
					array(
						"success"=> false,
						"error" => "Conta contábil para esta conta não foi definida! Altere na tesouraria"
					)
				);
				exit;
			}
			
			$saldoAnt = getSaldoAnterior($fonte, $natureza, $mes, $ano);
			//echo $saldoAnt;

			$result = getExtrato($fonte, $mes, $ano);

			$data = array();

			$saldo = $saldoAnt;

			while ($row = $result->fetch_assoc()) {						    
			    if($row['tipo'] == 'R'){
				    $row['entrada'] = $row['valor_total'];
				    $saldo += $row['entrada'];
			    }else if($row['tipo'] == 'P'){
				    $row['saida'] = $row['valor_total'];
				    $saldo -= $row['saida'];
			    }else {
			    	if($row['fonte_financeira'] == $fonte){
			    		$row['saida'] = $row['valor_total'];
				    	$saldo -= $row['saida'];
			    	}else{
				    	$row['entrada'] = $row['valor_total'];
				    	$saldo += $row['entrada'];
			    	}
			    }
				$row['saldo'] = $saldo;
				unset($row['valor_total']);

				$historico = "NL:" . $row['n_lanc'] . " ";
				if($row['tipo'] == "M"){
					$historico .= "Transferencia";

				}else{
					$historico .= ($row['tipo'] == "R") ? "Recebimento" : "Pagamento";
					
				}
				
				if($row['tipo'] == "M"){
					if($fonte == $row['fonte_financeira']){
						$historico .= " " . $row['natureza_financeira'];
					}else{
						$historico .= " " . $row['fonte'];
					}
				}

				$tipo_doc = "";

				switch ($row['tipo_doc']) {
					case 'R':
						$tipo_doc = "Recibo";
						break;
					case 'G':
						$tipo_doc = "Guia";
						break;
					case 'N':
						$tipo_doc = "Nota Fiscal";
						break;
					case 'C':
						$tipo_doc = "Cheque";
						break;
					case 'E':
						$tipo_doc = "Extrato";
						break;
				}

				$historico .= " " . $tipo_doc;

				if($row['n_doc'])
					$historico .= " " . $row['n_doc'];

				$row['ref'] = str_replace("-", "", $row['ref']);
				$historico .= " " . $row['ref'];

				if($row['complemento'])
					$historico .= " " . $row['complemento'];

				if($row['tipo'] != "M")
					if($row['natureza_financeira'])
						$historico .= " " . $row['natureza_financeira'];

				$row['historico'] = $historico;

				//$row['unixdata'] = intval($row['unixdata']);

			    $data[] = $row;
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $data,
					"saldoAnt" => $saldoAnt
				)				
			);

		break;
	}

}else{
	die("<center><h1>Forbidden</h1></center>");
}

function recursive ( &$node ) {
	global $monthName, $treeTotal;

	if($node['children']) {
		for ($i = 0; $i < sizeof($node['children']); $i++) {
			$children = $node['children'][$i];

			if($children['tipo'] == "A" && $children[$monthName] != "-") {
				$treeTotal += $children[$monthName];
			}
			else {
				recursive ($children);
			}
		};
	}

}

function getNodeValue ( &$node ) {
	global $treeTotal, $tree;
	//$treeTotal = 0;

	recursive ($node);
	$node['value'] = $treeTotal;
	$treeTotal = 0;
	//print_r($node) . "\n";

	//print_r($node);
	//$ = $node;
	//echo $node['value'] . "\n";
}

function getTotal (&$node ) {
	getNodeValue ($node);

	if($node['children']) {
		for ($i = 0; $i < sizeof($node['children']); $i++) {
			$children = $node['children'][$i];

			if($children['tipo'] == "T") {
				getNodeValue ($children);

				if($children['children'])
					getTotal ($children);
			}
		};
	}
}

//getTotal ();


function getMonth ($month, &$tree) {
	$months = array(
		'jan',
		'fev',
		'mar',
		'abr',
		'mai',
		'jun',
		'jul',
		'ago',
		'set',
		'out',
		'nov',
		'dez'
	);

	$currentMonth = --$month;
	global $monthName;
	$monthName = $months[$currentMonth];
	getTotal($tree);

	//print_r($tree);

	//console.debug(tree[0].children[0].value.toFixed(2))
}