<?php
header("Access-Control-Allow-Origin: *");
include "connect.php";
if(isset($_REQUEST['usuario']) && isset($_REQUEST['senha'])){

	$usuario = $_REQUEST['usuario'];
	$senha = $_REQUEST['senha'];

	$result = $mysqli->query("
		SELECT 
		*
		FROM 
		cacp_gestor.usuarios
		WHERE 
		usuario = '" . $usuario . "' 
		and
		senha = '". $senha . "'
		") or die($mysqli->error);
	

	if($result->num_rows){

		$r = $result->fetch_assoc();

		if(!$r['ativo']){
			echo json_encode(
			array(
				"success" => 0,
				"error" => "Usuário Inativo!",
				"logado" => 0
				)
			);
			exit;
		}

		$_SESSION['userhash'] = $r['hash'];
		$_SESSION['username'] = $r['nome'];
		$_SESSION['usertype'] = $r['tipo'];

		echo json_encode(
			array(
				"success" => empty($mysqli->error),
				"error" => $mysqli->error,
				"logado" => 1,
				"nome" => $_SESSION['username'],
				"tipo" => $r['tipo']
			)
		);
	}else{

		echo json_encode(
			array(
				"success" => 0,
				"error" => "Usuario ou senha incorreta!",
				"logado" => 0
				)
			);

	}

}else{
	echo json_encode(
		array(
			"success" => 0,
			"error" => "Usuario ou senha nao informados!",
			"logado" => 0
			)
		);
}
?>