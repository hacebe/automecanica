<?php
//session_start();
include "connect.php";
require_once("autoload.php");

function bind_array($stmt, &$row) {
    $md = $stmt->result_metadata();
    $params = array();
    while($field = $md->fetch_field()) {
        $params[] = &$row[$field->name];
    }

    call_user_func_array(array($stmt, 'bind_result'), $params);
}

if(isset($_GET['module'])) {

	$module = addslashes($_GET['module']);
	$userhash = $_SESSION['userhash'];

	//$mysqli = new Mysqli('localhost', 'root', '102030', 'cacp_gestor');

	switch($module){
		case "salvar":
			$id = addslashes($_POST['id']);
			$razao = addslashes($_POST['razao_social']);
			$fantasia = addslashes($_POST['nome_fantasia']);
			$endereco = addslashes($_POST['endereco']);
			$telefone = addslashes($_POST['telefone']);
			$telefone2 = addslashes($_POST['telefone2']);
			$telefone3 = addslashes($_POST['telefone3']);
			$cnpj = addslashes($_POST['cnpj']);
			$plano_id = addslashes($_POST['plano_id']);
		
			if(!$id){
				$query = "			
					INSERT
					INTO								
					empresas
					(razao_social, nome_fantasia, endereco, telefone, telefone2, telefone3, cnpj, plano_id)
					VALUES
					('$razao', '$fantasia' , '$endereco' ,'$telefone','$telefone2','$telefone3', '$cnpj', '$plano_id')";
				$result = $mysqli->query($query);
				//echo $query;						

				$empresaId = $mysqli->insert_id;
				if($result){
					$query = "
						INSERT
						INTO
						usuario_empresa
						(empresa_id, usuario_id)
						VALUES
						('$empresaId', '" . $userId . "')";
					$sql = $mysqli->query($query);

					$query = "
						INSERT
						INTO
						parametros
						(empresa_id)
						VALUES
						('$empresaId')";
					$sql = $mysqli->query($query);

				}

				if($empresaId){
					$sqlPlano = $mysqli->query("SELECT * FROM plano_contas WHERE tipo_id = '$plano_id'");
					while($r = $sqlPlano->fetch_assoc()){
						$sqlInsert = $mysqli->query("INSERT INTO plano_contas_empresa (empresa_id, `tipo_id`,`mask`,`cod`,`parent`,`nome`,`tipo`,`natureza`,`contacontabil`,`inativo`) VALUES ('$empresaId', '$r[tipo_id]','$r[mask]','$r[cod]','$r[parent]','$r[nome]','$r[tipo]','$r[natureza]','$r[contacontabil]','$r[inativo]')");
					}
				}


			}else{
				$query = "			
					UPDATE								
					empresas
					SET
					razao_social='$razao', nome_fantasia='$fantasia', endereco='$endereco', telefone='$telefone',telefone2='$telefone2',telefone3='$telefone3', cnpj='$cnpj'
					WHERE
					id = " . $id . "
				";
				
				$result = $mysqli->query($query);	
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"query"	=> $query
				)
			);

		break;

		case "getEmpresas":
			

			$result = $mysqli->query("			
				SELECT 
				e.id, e.razao_social, e.nome_fantasia, e.cnpj, e.endereco, e.telefone ,e.telefone2 ,e.telefone3 , e.plano_id
				FROM 
				cacp_gestor.usuario_empresa as ue, 
				cacp_gestor.usuarios as u, 
				cacp_gestor.empresas as e 
				WHERE 
				u.hash = '" . $userhash . "' 
				and 
				e.id = ue.empresa_id
				and
				u.id = ue.usuario_id
				") or die($mysqli->error);	
			
			
			$data = array();

			while ($row = $result->fetch_assoc()) {

			    $data[] = $row;

			}
			//$end = microtime(true);

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $data
				)
			);

		break;
		case "getAllFromTipo":
			$tipo = addslashes($_GET['tipo']);
			$result = $mysqli->query("			
				SELECT 
				id, razao_social
				FROM 
				empresas
				WHERE 
				plano_id = '$tipo'
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
		case "setEmpresa":
			$_SESSION['selected_company'] = addslashes($_POST['empresaId']);
			echo json_encode(
				array(
					"success" => true,
					"error" => ""				
				)
			);

		break;

		case "getUsuariosNotInEmpresa":
			$empresaId = addslashes($_GET['eid']);
			$result = $mysqli->query("			
				SELECT
				distinct u.id
				FROM								
				usuario_empresa as ue
				RIGHT JOIN usuarios as u ON ue.usuario_id = u.id
				WHERE
				ue.empresa_id = '". $empresaId ."'				
				") or die($mysqli->error);

			$users = array();
			while($r = $result->fetch_array()){
				$users[] = $r[0];				
			}

			$arrUsers = implode(',', $users);			

			$query = "
				SELECT 
				id, hash, usuario, nome, email, ativo
				FROM 
				cacp_gestor.usuarios 
				WHERE 
				id not in (". $arrUsers .")
				AND
				id != '" . $userId . "'";

			//echo $query;

			$result = $mysqli->query($query);

			$users = array();
			while($r = $result->fetch_assoc()){
				$users[] = $r;
			}			

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $users
				)
			);

		break;
		case "getUsuariosInEmpresa":
			$empresaId = addslashes($_GET['eid']);
			$result = $mysqli->query("			
				SELECT
				distinct u.id
				FROM								
				usuario_empresa as ue
				RIGHT JOIN usuarios as u ON ue.usuario_id = u.id
				WHERE
				ue.empresa_id = '". $empresaId ."'
				") or die($mysqli->error);

			$users = array();
			while($r = $result->fetch_array()){
				$users[] = $r[0];				
			}

			$arrUsers = implode(',', $users);			

			$query = "
				SELECT 
				id, hash, usuario, nome, email, ativo
				FROM 
				cacp_gestor.usuarios 
				WHERE 
				id in (". $arrUsers .")
				AND
				id != '" . $userId . "'";

			//echo $query;

			$result = $mysqli->query($query);

			$users = array();
			while($r = $result->fetch_assoc()){
				$users[] = $r;
			}			

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"data" => $users
				)
			);

		break;

		case "removeAllUsers":

			$empresaId = addslashes($_POST['eid']);
			$result = $mysqli->query("			
				DELETE				
				FROM								
				usuario_empresa				
				WHERE
				empresa_id = '". $empresaId ."'
				AND usuario_id != '" . $userId . "'") or die($mysqli->error);

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error					
				)
			);

		break;

		case "addAllUsers":
			$empresaId = addslashes($_POST['eid']);
			$result = $mysqli->query("			
				SELECT 
				u.id 
				FROM 
				usuario_empresa as ue 
				RIGHT JOIN 
				usuarios as u 
				ON u.id != ue.usuario_id 
				WHERE 
				ue.empresa_id = '". $empresaId ."'
				AND 
				u.id != '". $userId ."'
				") or die($mysqli->error);			

			while($r = $result->fetch_assoc()){
				$mysqli->query("
					INSERT INTO
					usuario_empresa
					(`empresa_id`, `usuario_id`)
					VALUES
					('" . $empresaId . "', '". $r['id'] ."')
				") or die($mysqli->error);
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error					
				)
			);			

		break;

		case "addSelUsers":
			$empresaId = addslashes($_POST['eid']);
			$ids = addslashes($_POST['ids']);

			$idsArr = explode(",", $ids);

			for($i=0; $i<sizeof($idsArr); $i++){
				$mysqli->query("
					INSERT INTO
					usuario_empresa
					(`empresa_id`, `usuario_id`)
					VALUES
					('" . $empresaId . "', '". $idsArr[$i] ."')
				") or die($mysqli->error);
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
					//"data" => $idsArr
				)
			);
		break;

		case "removeSelUsers":
			$empresaId = addslashes($_POST['eid']);
			$ids = addslashes($_POST['ids']);
			
			$mysqli->query("
				DELETE FROM
				usuario_empresa
				WHERE
				usuario_empresa.empresa_id = '". $empresaId ."'
				AND
				usuario_empresa.usuario_id
				in ('". $ids ."');
			") or die($mysqli->error);
			

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
					//"data" => $idsArr
				)
			);
		break;
	}

}else{
	die("<center><h1>Forbidden</h1></center>");
}
