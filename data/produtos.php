<?php
include "connect.php";

if(isset($_GET['module'])) {

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":
			
			$id = addslashes($_POST['id']);
			$nome = addslashes($_POST['nome']);
			$unidade = addslashes($_POST['unidade']);
			$preco = addslashes($_POST['preco']);
			$estoque = addslashes($_POST['estoque']);

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					produtos 
					(`nome`, `unidade`, `preco`, `estoque`) 
					VALUES 
					('". $nome ."','". $unidade ."','". $preco ."','". $estoque ."')
				");
			}else{
				$result = $mysqli->query("
					UPDATE 
					produtos 
					SET `nome` = '". $nome ."', `unidade` = '". $unidade ."', `preco` = '". $preco ."', `estoque`='". $estoque ."'
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
		case "getProdutos":
			$result = $mysqli->query("			
				SELECT 
				*
				FROM 
				produtos");
			
			
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
			$id = $_POST['id'];

			$result = $mysqli->query("			
				DELETE
				FROM 
				produtos 
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
