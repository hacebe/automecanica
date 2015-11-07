<?php
session_start();
include "connect.php";
require_once("autoload.php");

if(isset($_GET['module'])) {

	$module = addslashes($_GET['module']);

	$userhash = $_SESSION['userhash'];

	//$mysqli = new Mysqli('localhost', 'root', '102030', 'cacp_gestor');

	switch($module){
		case "salvar":
			$id = addslashes($_POST['id']);
			$numeronota = addslashes($_POST['numeronota']);
			$dataemissao = addslashes($_POST['dataemissao']);
			$horaemissao = addslashes($_POST['horaemissao']);
			$favorecido = addslashes($_POST['favorecido']);
			$tiponota = addslashes($_POST['tiponota']);
			$valornota = str_replace(".", "", addslashes($_POST['valornota']));
			$valornota = str_replace(",", ".", $valornota);
			$pis = str_replace(".", "", addslashes($_POST['pis']));
			$pis = str_replace(",", ".", $pis);
			$cofins = str_replace(".", "", addslashes($_POST['cofins']));
			$cofins = str_replace(",", ".", $cofins);
			$inss = str_replace(".", "", addslashes($_POST['inss']));
			$inss = str_replace(",", ".", $inss);
			$ir = str_replace(".", "", addslashes($_POST['ir']));
			$ir = str_replace(",", ".", $ir);
			$iss = str_replace(".", "", addslashes($_POST['iss']));
			$iss = str_replace(",", ".", $iss);
			$csll = str_replace(".", "", addslashes($_POST['csll']));
			$csll = str_replace(",", ".", $csll);
					
		
			if(!$id){
				$query = "			
					INSERT
					INTO								
					notasfiscais
					(empresa_id, tiponota, favorecido, numeronota, dataemissao, valornota, pis, cofins, inss, iss, ir, csll)
					VALUES
					('$empresaId', '$tiponota', '$favorecido', '$numeronota', UNIX_TIMESTAMP(STR_TO_DATE('". $dataemissao ."','%d/%m/%Y')) , '$valornota', '$pis', '$cofins', '$inss', '$iss', '$ir', '$csll')";
				$result = $mysqli->query($query);
			}else{
				$query = "			
					UPDATE								
					notasfiscais
					SET
					`numeronota` = '$numeronota',
					`favorecido` = '$favorecido',
					`dataemissao` = UNIX_TIMESTAMP(STR_TO_DATE('". $dataemissao ."','%d/%m/%Y')) ,
					`valornota` = '$valornota',
					`pis` = '$pis',
					`cofins` = '$cofins',
					`inss` = '$inss',
					`iss` = '$iss',
					`ir` = '$ir',
					`csll` = '$csll'
					WHERE
					id = " . $id . "
					AND
					empresa_id = '$empresaId'
				";
				
				$result = $mysqli->query($query);	
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
				)
			);

		break;
		case "getAllHeaders":
			$tipo = addslashes($_GET['tipo']);
			$result = $mysqli->query("			
				SELECT
				distinct YEAR(from_unixtime(`dataemissao`)) as ano 
				FROM 
				cacp_gestor.notasfiscais
				WHERE 
				empresa_id = '$empresaId'
				AND
				tiponota = '$tipo'
				ORDER BY ANO ASC;
			");
			
			
			$data = array();

			while ($row = $result->fetch_assoc()) {
				$row['children'] = array();
				$row['text'] = $row['ano'];
				$row['expanded'] = true;
			    $lancResult = $mysqli->query("
			    	SELECT
					distinct MONTH(from_unixtime(`dataemissao`)) as mes, YEAR(from_unixtime(`dataemissao`)) as ano
					FROM 
					cacp_gestor.notasfiscais 
					WHERE 
					YEAR(from_unixtime(`dataemissao`)) = '". $row['ano'] ."'
					AND
					empresa_id = '$empresaId'
					AND
					tiponota = '$tipo'						
					ORDER BY `dataemissao` ASC;
			    ");

			    while($r = $lancResult->fetch_assoc()){
			    	$r['leaf'] = true;
			    	if($r['mes'] < 10) $r['mes'] = "0" . $r['mes'];
					$r['text'] = $r['mes'] . "/" . $r['ano'];
			    	array_push($row['children'], $r);
			    }
			    $data[] = $row;
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"children" => $data
				)				
			);
		break;
		case "getNotas":
			$tipoNota = addslashes($_GET['tipo']);
			$ref = explode('/', $_GET['ref']);
			$mes = $ref[0]; 
			$ano = $ref[1]; 

			$result = $mysqli->query("			
				SELECT 
				n.*, from_unixtime(dataemissao, '%Y-%m-%d 00:00:00') as unixdataemissao, from_unixtime(dataemissao, '%d/%m/%Y %h:%i:%s') as datahoraemissao, from_unixtime(dataemissao, '%d/%m/%Y') as dataemissao, from_unixtime(dataemissao, '%h:%i:%s') as horaemissao, LPAD(numeronota, 7, '0') as numeronota, sum(l.valor_desconto) as descontos, sum(l.valor_desconto_adiantamento) as adiantamentos, sum(l.valor_juros) as juros, sum(l.valor_multa) as multas, sum(l.valor_total) as total, f.nome as favorecido_nome, count(a.id) as anexos, l.id as lancamento 
				FROM 
				notasfiscais as n
				LEFT JOIN lancamentos as l ON l.n_doc = n.numeronota AND l.tipo_doc = 'N' AND l.empresa_id = n.empresa_id and l.tipo = '$tipoNota'
				LEFT JOIN anexos_lancamento as a ON a.lancamento_id = l.id
				LEFT JOIN favorecidos as f ON f.id = n.favorecido AND f.empresa_id = n.empresa_id
				WHERE 
				n.empresa_id = '$empresaId'
				AND
				n.tiponota = '$tipoNota'
				AND
				YEAR(FROM_UNIXTIME(`dataemissao`)) = '$ano'
				AND
				MONTH(FROM_UNIXTIME(`dataemissao`)) = '$mes'
				GROUP BY  n.numeronota
				ORDER BY unixdataemissao ASC

				") or die($mysqli->error);	
			
			
			$data = array();

			while ($row = $result->fetch_assoc()) {
				$row['valorliquido'] = 
					  $row['valornota']
					- $row['pis']
					- $row['cofins']
					- $row['ir']
					- $row['csll']
					- $row['iss']
					- $row['inss'];

				$row['saldo'] = 
					  $row['valorliquido']
					- $row['descontos']
					- $row['adiantamentos']
					+ $row['juros']
					+ $row['multa']
					- $row['total'];
					


			    $data[] = $row;

			}
			$end = microtime(true);
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $data
				)
			);

		break;
		case "delete":
			$id = $_POST['id'];

			$result = $mysqli->query("			
				DELETE
				FROM 
				notasfiscais
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
