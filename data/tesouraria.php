<?php
include "connect.php";

if(isset($_GET['module'])){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":

			$id = addslashes($_POST['id']);	
			$descricao = addslashes($_POST['descricao']);
			$conta = addslashes($_POST['conta']);
			$saldoinicial = str_replace(".", "", addslashes($_POST['saldoinicial']));
			$saldoinicial = str_replace(",", ".", $saldoinicial);
			$sistema = addslashes($_POST['sistema']);
			$contabil = addslashes($_POST['contabil']);

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					tesouraria
					(`descricao`, `conta`, `saldoinicial`, `sistema`, `contabil`, `empresa_id`) 
					VALUES 
					('". $descricao ."', '". $conta ."','". $saldoinicial ."','". $sistema ."','". $contabil ."', '$empresaId')
				");
			}else{
				$result = $mysqli->query("
					UPDATE 
					tesouraria 
					SET `descricao` = '". $descricao ."', `conta` = '". $conta ."',`saldoinicial` = '". $saldoinicial ."', `sistema` = '". $sistema ."', `contabil`='". $contabil ."' 
					WHERE 
					`id` = '". $id ."'
				");
			}

			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error					
				)
			);
			
		break;
		case "getAll":
			$result = $mysqli->query("			
				SELECT *
				FROM 
				tesouraria
				WHERE 			
				empresa_id = '$empresaId'");
			
			
			$data = array();

			while ($row = $result->fetch_assoc()) {

			    $data[] = $row;

			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $data
				)
			);

		break;
		case "delete":
			$id = addslashes($_POST['id']);

			$result = $mysqli->query("			
				DELETE
				FROM 
				tesouraria
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
