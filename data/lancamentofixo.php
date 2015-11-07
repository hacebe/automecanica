<?php
include "connect.php";

if(isset($_GET['module']) ){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":

			
			$data = $_POST['data'];
			
			$data = json_decode($data);

			if(gettype($data) != "array"){
				$data = array($data);				
			}

			for($i = 0; $i<sizeof($data); $i++){
				
				$id = addslashes($data[$i]->id);	
				$sequencia = addslashes($data[$i]->sequencia);
				$contacredito = addslashes($data[$i]->contacredito);
				$contadebito = addslashes($data[$i]->contadebito);
				$descricao = addslashes($data[$i]->descricao);
				$complemento = addslashes($data[$i]->complemento);
				//$valor = str_replace(".", "", addslashes($data[$i]->valor));
				$valor = str_replace(",", ".", addslashes($data[$i]->valor));
				//$valor = str_replace(",", ".", addslashes($valor));
				$revisado = addslashes($data[$i]->revisado);
				

				if(!($data[$i]->id+0)) {
					//insert
					$query = "INSERT 
					INTO 
					lancamentosfixos (						
						`empresa_id`,
						`sequencia`,
						`contacredito`,
						`contadebito`,
						`descricao`,
						`complemento`,
						`valor`,
						`revisado`
					)
					VALUES 
					(
						'" . $empresaId ."',
						'" . $sequencia ."',
						'" . $contacredito ."',
						'" . $contadebito ."',
						'" . $descricao ."',
						'" . $complemento ."',
						'" . $valor ."',
						'" . $revisado ."'
					)";
					$data[$i]->isInteger = false;
				}else{
					//update
					
					$query = "UPDATE 
					lancamentosfixos
					SET 						
					sequencia = '" . $sequencia ."',
					contacredito = '" . $contacredito ."',
					contadebito = '" . $contadebito ."',
					descricao = '" . $descricao ."',
					complemento = '" . $complemento ."',
					valor = '" . $valor ."',
					revisado = '" . $revisado ."'

					WHERE 
					`id` = '". $id ."'
					AND
					`empresa_id` = '$empresaId'";
				}

				$mysqli->query($query);

				if($mysqli->insert_id){
					$data[$i]->id = $mysqli->insert_id;
				}else if($mysqli->affected_rows){
					//$data[$i]->id = $mysqli->insert_id;
				}
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $data
				)
			);
			
		break;		
		case "getLancamentos":
			$result = $mysqli->query("			
				SELECT
				*
				FROM 
				lancamentosfixos
				WHERE 
				empresa_id = '$empresaId'
				ORDER BY `sequencia` ASC;") or die($mysqli->error);	
			
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
				lancamentosfixos
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
