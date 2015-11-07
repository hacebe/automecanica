<?php
session_start();
include "connect.php";


if(isset($_GET['module'])){

	$module = addslashes($_GET['module']);

	$userhash = (isset($_SESSION['userhash'])) ? $_SESSION['userhash'] : "  ";

	switch($module){		
		case "getUsuarios":
			$result = $mysqli->query("			
				SELECT 
				id, nome, hash, email, ativo, usuario, tipo
				FROM 				
				usuarios
				WHERE
				id != '". $userId ."'
				") or die($mysqli->error);		
			
			
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
		case "salvar":

			$id = addslashes($_POST['id']);
			$nome = addslashes($_POST['nome']);
			$email = addslashes($_POST['email']);
			$usuario = addslashes($_POST['usuario']);
			$hash = md5($email . date());
			$ativo = addslashes($_POST['ativo']) ? 1 : 0;
			$senha = addslashes($_POST['senha']);
			$tipo = addslashes($_POST['tipo']);

			if(!$id){
					$senha = (addslashes($_POST['senha'])) ? addslashes($_POST['senha']) : date('u');
					$query = "			
					INSERT INTO 
					usuarios
					(hash , usuario, nome, email";

					if($senha) $query.= ", senha";

					$query .= ", ativo , tipo)
					VALUES
					('$hash' , '$usuario', '$nome', '$email'";

					if($senha) $query.= ", '" . md5($senha) . "'";

					$query.= ", '$ativo', '$tipo')";

					$result = $mysqli->query($query) or die($mysqli->error);

			}else{
				
				$query = "			
					UPDATE
					usuarios
					SET
					hash = '$hash', usuario='$usuario', nome='$nome', email='$email', ativo='$ativo' , tipo='$tipo'";
				
				if($senha) $query.= ", senha='" . md5($senha) ."' ";
				
				$query .= "WHERE
					id='$id'";

				$result = $mysqli->query($query) or die($mysqli->error);		
			}

			
					
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
				)
			);

		break;		
		case "delete":
			$id = addslashes($_POST['id']);

			$result = $mysqli->query("			
				DELETE
				FROM 
				usuarios
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
