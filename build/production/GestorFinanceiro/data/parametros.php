<?php
include "connect.php";


if(isset($_GET['module'])){
	$module = addslashes($_GET['module']);
	
	switch($module){
		case "loadParametros":
			
			$result = $mysqli->query("
				SELECT 
				recebimento_conta_juros, 
				recebimento_conta_multa, 
				recebimento_conta_desconto,
				pagamento_conta_juros, 
				pagamento_conta_multa, 
				pagamento_conta_desconto 
				FROM parametros WHERE empresa_id = '$empresaId'") or die($mysqli->error) ;
			$arr = array();
			while($r = $result->fetch_assoc())
			{
				array_push($arr, $r);
			}
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $arr
				)
			);
		break;
		case "salvar":
			
			$recebimento_conta_juros = addslashes($_POST['recebimento_conta_juros']);
			$recebimento_conta_multa = addslashes($_POST['recebimento_conta_multa']);
			$recebimento_conta_desconto = addslashes($_POST['recebimento_conta_desconto']);
			$pagamento_conta_juros = addslashes($_POST['pagamento_conta_juros']);
			$pagamento_conta_multa = addslashes($_POST['pagamento_conta_multa']);
			$pagamento_conta_desconto = addslashes($_POST['pagamento_conta_desconto']);

			$result = $mysqli->query("
				UPDATE
				parametros 
				SET
				recebimento_conta_juros = '$recebimento_conta_juros', 
				recebimento_conta_multa = '$recebimento_conta_multa', 
				recebimento_conta_desconto = '$recebimento_conta_desconto',
				pagamento_conta_juros = '$pagamento_conta_juros', 
				pagamento_conta_multa = '$pagamento_conta_multa', 
				pagamento_conta_desconto = '$pagamento_conta_desconto'
				WHERE empresa_id = '$empresaId'") or die($mysqli->error) ;
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
				)
			);
		break;
	}
}

?>