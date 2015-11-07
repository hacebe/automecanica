<?php
include "connect.php";

if(isset($_GET['module'])){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":

			$id = addslashes($_POST['id']);	
			$nome = addslashes($_POST['nome']);
			$rg = addslashes($_POST['rg']);
			$cpf = addslashes($_POST['cpf']);
			$participacao = str_replace(".", "", addslashes($_POST['participacao']));
			$participacao = str_replace(",", ".", $participacao);
			$data_nascimento = addslashes($_POST['dt_nascimento']);
			$contacontabil = addslashes($_POST['contacontabil']);
			$apelido = addslashes($_POST['apelido']);

			$empresaId = addslashes($_POST['eid']);

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					socios
					(`nome`, `rg`, `cpf` ,`participacao`, `dt_nascimento`, `apelido`, `contacontabil`, `empresa_id`)
					VALUES 
					('". $nome ."','". $rg ."','". $cpf ."', '". $participacao ."' ,'". $data_nascimento ."','". $apelido ."','". $contacontabil ."', '$empresaId')
				");
			}else{
				$result = $mysqli->query("
					UPDATE 
					socios 
					SET 
					`nome` = '". $nome ."', `rg` = '". $rg ."', `cpf` = '". $cpf ."', `participacao`='" . $participacao . "', `dt_nascimento` = '". $data_nascimento ."', `apelido` = '". $apelido ."',  `contacontabil`='". $contacontabil ."' 
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
		case "getSocios":
		
			if(isset($_GET['eid'])){
				$empresaId = addslashes($_GET['eid']);
			};

			$query = "			
				SELECT 
				*
				FROM 
				socios
				WHERE 
				empresa_id = '". $empresaId ."'";			

			$result = $mysqli->query($query) or die($mysqli->error);
						
			$data = array();

			while ($row = $result->fetch_assoc()) {	
				$row['participacao'] = number_format($row['participacao'], 2, ",", "");			
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
				socios
				WHERE 
				id = '". $id ."'
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
