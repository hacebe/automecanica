<?php
include "connect.php";
error_reporting(1);

$fontes =array();

$months = array("saldoanterior", "debito", "credito", "saldoatual");

$data = new stdClass();

function getSaldoAno($ano, $contabil){
	global $mysqli, $empresaId;

	$sqlFonte = $mysqli->query("SELECT id from tesouraria WHERE contabil = '$contabil' and empresa_id = '$empresaId'") or die($mysqli->error);
	if($sqlFonte->num_rows){	
		$r = $sqlFonte->fetch_assoc();

		$fonte = $r['id'];

		$query = "SELECT ";

		for($i = 0; $i<12; $i++){
			$query .= "(SELECT sum(CASE fonte_financeira when '$fonte' THEN CASE tipo when 'R' then valor_total else -valor_total end ELSE valor_total END) FROM lancamentos WHERE empresa_id = '$empresaId' and year(`data`) = '$ano' and (fonte_financeira = $fonte OR natureza_financeira = (SELECT cod FROM plano_contas_empresa WHERE empresa_id = '$empresaId' and contacontabil = '$contabil' LIMIT 1)) and month(`data`) = '". ($i+1) ."') as m". (($i < 9) ? "0" . ($i+1) : ($i+1)) . (($i < 11) ? "," : "");
		}
		
		$sql = $mysqli->query($query) or die($mysqli->error);
		$r = $sql->fetch_assoc();
	}
	//print_r($r);
	return $r;


}

function getNodeValue ( $cod, $m ) {
	global $data;
	$node = new stdClass();

	foreach($data as $key=>$value) {
		$item = &$value;

		if($key == $cod && $item['tipo'] == "T") {
			//echo $item['tipo'] . "\n";
			$nv = &$item['cod'];
			$node->$nv = &$item;
		}


		if(sizeof(get_object_vars($node)) && $item['parent'] == get_object_vars($node)[$cod]['cod'] ) {
			$nv = &$item['cod'];
			$node->$nv = &$item;

		}
	}

	$parentID = null;
	$fId = null;

	foreach($node as $key=>$value) {
		$item = &$value;

		if(!isset($fId)){
			$fId = &$item['cod'];
		}

		if($item['tipo'] == "A") {
			$parentID = &$item['parent'];
			while (isset($parentID) && isset($node->$parentID)) {
				$pv = &$node->$parentID;
				$pv[$m] += $item[$m];
				//echo "true ";
				$parentID = ($pv['parent']) ? $pv['parent'] : null;
			}
		}
	}

	return $node;
}


function getYearTotal() {
	global $data, $months;
	$all = array();

	for ($i = 0; $i < sizeof($months); $i++) {
		array_push($all, getMonthTotal($i));
	}

	//print_r($all);

}

function getMonthTotal ( $m, $s ) {
	global $months, $data;

	#m <- mes, $s <-saldo
	if(!$s) $s = 0;

	$parentID = null;
	$month = $months[$m];


	$fId = null;

	foreach($data as $key=>$value) {
		$item = $value;
			//print_r($item);
		if(!isset($fId)){
			$fId = $item['cod'];
		}

		if($item['tipo'] == "A") {
			$parentID = $item['parent'];
			while (isset($parentID) && isset($data->$parentID)) {
				$pv = &$data->$parentID;
				$pv[$month] += $item[$month];
				//echo "true ";
				$parentID = ($pv['parent']) ? $pv['parent'] : null;
			}
		}
	}

	$dt = $data->$fId;
	$s += $dt[$month];

	return $s;
}

function deleteInvalidInput () {
	global $data, $months;

	$l = get_object_vars($data);

	foreach ($data as $key => $value) {
		$soma = 0;
		foreach($value as $k=>$v){
			for($i = 0; $i<sizeof($months); $i++){
				if($value[$months[$i]] != 0) $soma++;
			}
			if($soma == 0){
				//echo "deleting " . $data->$key . "\n";
				unset($data->$key);
			}
			$soma = 0;
			
		}
	}
}

if(isset($_GET['module']) ){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "balancete":
			$output = $_GET['output'];
			$mes = addslashes(($_GET['mes']) ? $_GET['mes'] : Date('m'));
			$ano = addslashes(($_GET['ano']) ? $_GET['ano'] : Date('Y'));
			$empresaId = (!$_GET['empresa']) ? $empresaId : $_GET['empresa'];

			//echo $ano;
			//$result = $mysqli->query("SET NAMES 'LATIN1'");

			$result = $mysqli->query("
				SELECT mask, cod, parent, nome, tipo, natureza, contacontabil FROM plano_contas_empresa WHERE empresa_id = '". $empresaId ."'  order by mask
			");
			$plano_contas = array();
			while($r = $result->fetch_assoc()){
				//Cria um objeto para guardar as somas de cada mes do ano de uma determinada natureza.
				$dataTable = new stdClass();
				
				$sql_meses = $mysqli->query("SELECT 
												(SELECT sum(valor_total) as soma FROM lancamentos WHERE natureza_financeira = '". $r['cod'] ."' and YEAR(data) = '". $ano ."' and MONTH(data) < '". $mes ."' and empresa_id = '$empresaId') as saldoanterior,
											    (SELECT sum(valor_total) as soma FROM lancamentos WHERE natureza_financeira = '". $r['cod'] ."' and YEAR(data) = '". $ano ."' and MONTH(data) = '". $mes ."' and tipo = 'P' and empresa_id = '$empresaId') as debito,
								    			(SELECT sum(valor_total) as soma FROM lancamentos WHERE natureza_financeira = '". $r['cod'] ."' and YEAR(data) = '". $ano ."' and MONTH(data) = '". $mes ."' and tipo = 'R' and empresa_id = '$empresaId') as credito") or die($mysqli->error);
				//$sql_meses = $mysqli->query("SELECT sum(valor_total) as soma FROM lancamentos WHERE natureza_financeira = '". $r['cod'] ."' and YEAR(data) = '". $ano ."' and MONTH(data) < '". $mes ."' and empresa_id = '$empresaId'") or die($mysqli->error);
				while($res = $sql_meses->fetch_assoc()){
					//se o mês possuir lançamentos, adicionamos no objeto de propriedade "mm";
					if($res['saldoanterior'] != null){
						$dataTable->saldo = '0';
						//$dataTable->saldoanterior = ($r['natureza'] == "P") ? (double)$res['soma'] * -1 : (double)$res['soma'];
						$dataTable->saldoanterior = $res['saldoanterior'];
						$dataTable->debito = $res['debito'];
						$dataTable->credito = $res['credito'];
					}
					$r['dataTable'] = $dataTable;
				}
				$plano_contas[] =  $r;
			}	


			$lastCodSize = 0;
			$lastCod = null;
			//$headersSum = new stdClass();
			//$sqlFontes = $mysqli->query("SELECT * FROM tesouraria");

			for($i = 0; $i<sizeof($plano_contas); $i++){


				$record = array();

				$record['mask'] = $plano_contas[$i]['mask'];
				$record['cod'] = $plano_contas[$i]['cod'];
				$record['tipo'] = $plano_contas[$i]['tipo'];
				$record['parent'] = $plano_contas[$i]['parent'];
				$record['plano'] = $plano_contas[$i]['nome'];
				$record['contacontabil'] = $plano_contas[$i]['contacontabil'];
				isset($plano_contas[$i]['dataTable']->saldoanterior) ? $record['saldoanterior'] = $plano_contas[$i]['dataTable']->saldoanterior : $record['saldoanterior'] = 0;
				isset($plano_contas[$i]['dataTable']->debito) ? $record['debito'] = $plano_contas[$i]['dataTable']->debito : $record['debito'] = 0;
				isset($plano_contas[$i]['dataTable']->credito) ? $record['credito'] = $plano_contas[$i]['dataTable']->credito : $record['credito'] = 0;
				$record['saldoatual'] = $plano_contas[$i]['dataTable']->credito - $plano_contas[$i]['dataTable']->debito ;//+ $plano_contas[$i]['dataTable']->saldoanterior;

				$data->$record['cod'] = $record;
				$lastCodSize = strlen((string)$record['cod']);
				$lastCod = $record['mask'];
			}


			$data1 = getYearTotal();

			deleteInvalidInput();

			if(isset($output) && $output == "csv"){
				foreach ($data as $key => $value) {
					$r = $value;
					echo $r['mask'] . "  " . $r['plano'] . ",". $r['saldoanterior'] . ",". $r['debito'] .",". $r['credito'] .",". $r['saldoatual']."\n";
				}
				$r = null;
			}else if(isset($output) && $output == "json"){
				$arrayData = array();
				foreach ($data as $key => $value) {
					array_push($arrayData, $value);
				}

				echo json_encode(
					array(
						"success" => "true",
						"data" => $arrayData
					)
				);
			}else if(isset($output) && $output == "xls"){
				//include "exportaBalancete.php";

				$arrayData = array();
				foreach ($data as $key => $value) {
					array_push($arrayData, $value);
				}

				//generateXLS($arrayData);
			}
		
		break;
	}

}else{
	die("<center><h1>Forbidden</h1></center>");
}