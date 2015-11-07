<?php
include "connect.php";
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
		case "fluxo":

			$ano = addslashes(($_GET['ano']) ? $_GET['ano'] : Date('Y'));

			//echo $ano;

			$result = $mysqli->query("
				SELECT mask, cod, parent, nome, tipo, natureza FROM plano_contas_empresa WHERE empresa_id = '". $empresaId ."'  order by mask
			");
			$plano_contas = array();
			while($r = $result->fetch_assoc()){
				//Cria um objeto para guardar as somas de cada mes do ano de uma determinada natureza.
				$dataTable = new stdClass();

				for($i = 1; $i <= 12; $i++){
					//pesquisa a soma dos lançamentos em cada mes
					$sql_meses = $mysqli->query("SELECT sum(valor_total) as soma FROM lancamentos WHERE natureza_financeira = '". $r['cod'] ."' and YEAR(data) = '". $ano ."' and MONTH(data) = '". $i ."'") or die($mysqli->error);
					while($res = $sql_meses->fetch_assoc()){
						$refVar = "m";
						$refVar .= ($i < 10) ? "0" . $i : $i;
						//$refVar .= $ano;
						//se o mês possuir lançamentos, adicionamos no objeto de propriedade "mm";
						if($res['soma'] != null){
							$dataTable->saldo = '0';
							$dataTable->$refVar = ($r['natureza'] == "P") ? (double)$res['soma'] * -1 : (double)$res['soma'];
						}
						$r['dataTable'] = $dataTable;
					}
				}
				//se nao existirem lançamentos para um tipo de natureza, nao exibiremos, portanto nao será adicionado ao array
				//if(count((array)$dataTable))
					$plano_contas[] =  $r;
			}	

			$data = array();
			$lastCodSize = 0;
			$lastCod = null;
			$headersSum = new stdClass();

			for($i = 0; $i<sizeof($plano_contas); $i++){

				$record = array();

				$record['mask'] = $plano_contas[$i]['mask'];
				$record['cod'] = $plano_contas[$i]['cod'];
				$record['tipo'] = $plano_contas[$i]['tipo'];
				$record['parent'] = $plano_contas[$i]['parent'];
				$record['plano'] = $plano_contas[$i]['nome'];
				if($plano_contas[$i]['tipo'] == 'A' && count((array)$plano_contas[$i]['dataTable'])){
					$record['saldo'] = ($plano_contas[$i]['dataTable']->saldo) ? $plano_contas[$i]['dataTable']->saldo : "-";
					$record['jan'] = ($plano_contas[$i]['dataTable']->m01) ? $plano_contas[$i]['dataTable']->m01 : "-";
					$record['fev'] = ($plano_contas[$i]['dataTable']->m02) ? $plano_contas[$i]['dataTable']->m02 : "-";
					$record['mar'] = ($plano_contas[$i]['dataTable']->m03) ? $plano_contas[$i]['dataTable']->m03 : "-";
					$record['abr'] = ($plano_contas[$i]['dataTable']->m04) ? $plano_contas[$i]['dataTable']->m04 : "-";
					$record['mai'] = ($plano_contas[$i]['dataTable']->m05) ? $plano_contas[$i]['dataTable']->m05 : "-";
					$record['jun'] = ($plano_contas[$i]['dataTable']->m06) ? $plano_contas[$i]['dataTable']->m06 : "-";
					$record['jul'] = ($plano_contas[$i]['dataTable']->m07) ? $plano_contas[$i]['dataTable']->m07 : "-";
					$record['ago'] = ($plano_contas[$i]['dataTable']->m08) ? $plano_contas[$i]['dataTable']->m08 : "-";
					$record['set'] = ($plano_contas[$i]['dataTable']->m09) ? $plano_contas[$i]['dataTable']->m09 : "-";
					$record['out'] = ($plano_contas[$i]['dataTable']->m10) ? $plano_contas[$i]['dataTable']->m10 : "-";
					$record['nov'] = ($plano_contas[$i]['dataTable']->m11) ? $plano_contas[$i]['dataTable']->m11 : "-";
					$record['dez'] = ($plano_contas[$i]['dataTable']->m12) ? $plano_contas[$i]['dataTable']->m12 : "-";


					for($u = 1; $u<=12; $u++){
						$ref = "m";
						$ref .= ($u < 10) ? "0" . $u : $u;
						if(isset($plano_contas[$i]['dataTable']->$ref))
							$headersSum->$record['parent']->$ref +=  $plano_contas[$i]['dataTable']->$ref;
					}
				}

				if($plano_contas[$i]['tipo'] != 'A' && !count((array)$plano_contas[$i]['dataTable'])){
					unset($plano_contas[$i]);
				}


				if(($plano_contas[$i]['tipo'] != 'A' && ( strpos($record['mask'], $plano_contas[$i]['mask']) >= 0  || strlen((string)$record['cod']) != $lastCodSize)) || ($plano_contas[$i]['tipo'] == 'A' && count((array)$plano_contas[$i]['dataTable']))){

					$data[] = $record;
					$lastCodSize = strlen((string)$record['cod']);
					$lastCod = $record['mask'];
				}
			}

			$tree = buildTree($data);
			getMonth(1, $tree[0]);
			getMonth(2, $tree[0]);

			echo json_encode($tree);

			for($i=0; $i<sizeof($data); $i++){
				$r = $data[$i];
				//echo $r['mask'] . "," . $r['plano'] . ",". $r['saldo'] . ",". $r['jan'] .",". $r['fev'] .",". $r['mar'] .",". $r['abr'] .",". $r['mai'] .",". $r['jun'] .",". $r['jul'] .",". $r['ago'] ."\n";
			}

			/*echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $newdata
				)
			);*/
				
		break;
		case "getExtrato":
			$fonte = addslashes($_GET['fonte']);
			$mes = addslashes($_GET['mes']);
			$ano = addslashes($_GET['ano']);
			$result = $mysqli->query("			
				SELECT 
				sum(
					CASE 
						WHEN 
							tipo = 'P' 
						THEN 
							(valor_total*(-1)) 
						ELSE 
							valor_total 
						END
					) as soma 
				FROM 
				cacp_gestor.lancamentos 
				WHERE 
				empresa_id = '$empresaId' 
				AND
				fonte_financeira = '$fonte' 
				AND
				`data` < '$ano-$mes-01';	
			") or die($mysqli->error);

			/*AND
				MONTH(`data`) < '$mes' 
				AND 
				YEAR(`data`) <= '$ano';*/

			$row = $result->fetch_assoc();
			$saldoAnt = $row['soma'];
			//echo $saldoAnt;

			$result = $mysqli->query("		
				SELECT 
				DATE_FORMAT(l.data, '%Y-%m-%d 00:00:00') as unixdata,
				l.tipo, 
				tipo_doc, 
				n_lanc, 
				n_doc, 
				ref, 
				complemento, 
				pce.nome as natureza_financeira, 
				valor_total 
				FROM 
				cacp_gestor.lancamentos as l 
				LEFT JOIN 
				cacp_gestor.plano_contas_empresa as pce 
				ON 
				pce.cod = natureza_financeira 
				WHERE 
				pce.empresa_id = '$empresaId' 
				AND 
				l.empresa_id = pce.empresa_id 
				AND
				fonte_financeira = '$fonte' 
				AND
				MONTH(`data`) = '$mes' 
				AND 
				YEAR(`data`) = '$ano'
				ORDER BY n_lanc ASC;	

					
			") or die($mysqli->error);	

			$data = array();

			$saldo = $saldoAnt;

			while ($row = $result->fetch_assoc()) {						    
			    if($row['tipo'] == 'R'){
				    $row['entrada'] = $row['valor_total'];
				    $saldo += $row['entrada'];
			    }else{
				    $row['saida'] = $row['valor_total'];
				    $saldo -= $row['saida'];
			    }
				$row['saldo'] = $saldo;
				unset($row['valor_total']);

				$historico = "NL:" . $row['n_lanc'] . " ";
				$historico .= ($row['tipo'] == "R") ? "Recebimento" : "Pagamento";
				
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
					case 'O':
						$tipo_doc = "Outro";
						break;
				}

				$historico .= " " . $tipo_doc;

				if($row['n_doc'])
					$historico .= " " . $row['n_doc'];

				$row['ref'] = str_replace("-", "", $row['ref']);
				$historico .= " " . $row['ref'];

				if($row['complemento'])
					$historico .= " " . $row['complemento'];

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
		case "delete":
			$id = addslashes($_POST['id']);

			$result = $mysqli->query("			
				DELETE
				FROM 
				lancamentos
				WHERE 
				id = '". $id ."'
				AND
				empresa_id = '$empresaId'
			");		
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"excluido" => $mysqli->affected_rows
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