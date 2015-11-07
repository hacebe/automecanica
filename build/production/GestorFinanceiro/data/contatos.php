<?php
include "connect.php";

if(isset($_GET['module'])) {

	$module = $_GET['module'];

	switch($module){		
		case "salvar":

			$id = $_POST['id'];			
			$empresa_id = $_POST['eid'];
			$nome = $_POST['nome'];
			$telefone = $_POST['telefone'];
			$ramal = $_POST['ramal'];
			$cargo = $_POST['cargo'];
			$email = $_POST['email'];			

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					contatos
					(`nome`, `empresa_id`, `telefone`, `ramal`, `cargo`, `email`)
					VALUES 
					('". $nome ."','". $empresa_id ."', '". $telefone ."' ,'". $ramal ."','". $cargo ."','". $email ."')");
			}else{
				$result = $mysqli->query("
					UPDATE 
					contatos 
					SET 
					`nome` = '". $nome ."', `telefone` = '". $telefone ."', `ramal` = '". $ramal ."', `cargo`='" . $cargo . "', `email` = '". $email ."' 
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
		case "getContatos":
		
			$empresaId = $_GET['eid'];

			$query = "			
				SELECT 
				*
				FROM 
				contatos
				WHERE 
				empresa_id = '". $empresaId ."'";			

			$result = $mysqli->query($query) or die($mysqli->error);
						
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
				contatos
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
