<?php
include "connect.php";

if(isset($_GET['module'])){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":

			$id = addslashes($_POST['id']);
			$nome = addslashes($_POST['nome']);
			$sistema = addslashes($_POST['sistema']);
			$contabil = addslashes($_POST['contabil']);
			$adiantamento = addslashes($_POST['adiantamento']);

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					favorecidos 
					(`nome`, `sistema`, `contabil`, `adiantamento` ,`tipo`, `empresa_id`) 
					VALUES 
					('". $nome ."','". $sistema ."','". $contabil ."','". $adiantamento ."','F', '$empresaId')
				");
			}else{
				$result = $mysqli->query("
					UPDATE 
					favorecidos 
					SET `nome` = '". $nome ."', `sistema` = '". $sistema ."', `contabil`='". $contabil ."', `adiantamento`='". $adiantamento ."' 
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
		case "getFornecedores":
			$result = $mysqli->query("			
				SELECT 
				*
				FROM 
				favorecidos 
				WHERE 
				tipo = 'F'
				AND
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
				favorecidos 
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
