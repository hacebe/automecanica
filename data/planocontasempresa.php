<?php
include "connect.php";


if(isset($_GET['module'])){
	$module = addslashes($_GET['module']);
	$tipoId = addslashes($_GET['tipoId']);
	switch($module){
		case "getAllFromTipo":
			$tipo = addslashes($_GET['tipo']);
			$result = $mysqli->query("SELECT mask, cod, nome FROM plano_contas WHERE tipo_id = '$tipo' ORDER BY mask ASC") or die($mysqli->error);
			$arr = array();

			while($r = $result->fetch_assoc())
			{
				//$sqlInsert = $mysqli->query("INSERT INTO plano_contas_empresa (empresa_id, tipo_id, mask, cod, parent, nome, tipo, natureza, contacontabil, inativo) VALUES (2, '". $r['tipo_id'] ."', '". $r['mask'] ."', '". $r['cod'] ."', '". $r['parent'] ."', '". $r['nome'] ."', '". $r['tipo'] ."', '". $r['natureza'] ."', '". $r['contacontabil'] ."', '". $r['inativo'] ."')") or die($mysqli->error);

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
		case "getAllFromEmpresa":
			$empresaId  = addslashes($_GET['empresaId']);
			$result = $mysqli->query("SELECT mask, cod, nome FROM plano_contas_empresa WHERE empresa_id = '$empresaId' ORDER BY mask ASC") or die($mysqli->error);
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

		case "addPlano":
			$cod  = addslashes($_POST['cod']);
			$empresaId = (!$_POST['empresa']) ? $empresaId :  addslashes($_POST['empresa']);


			$result = $mysqli->query("
				SELECT 
				plano_contas.*
				FROM 
				plano_contas 
				INNER JOIN empresas ON plano_id = tipo_id
				WHERE 
				empresas.id = '$empresaId'
				AND
				plano_contas.cod = '$cod'
				ORDER BY mask ASC") or die($mysqli->error);
			
			$arr = array();

			while($r = $result->fetch_assoc())
			{
				$sqlInsert = $mysqli->query("INSERT INTO plano_contas_empresa (empresa_id, tipo_id, mask, cod, parent, nome, tipo, natureza, contacontabil, inativo) VALUES ('$empresaId', '". $r['tipo_id'] ."', '". $r['mask'] ."', '". $r['cod'] ."', '". $r['parent'] ."', '". $r['nome'] ."', '". $r['tipo'] ."', '". $r['natureza'] ."', '". $r['contacontabil'] ."', '". $r['inativo'] ."')") or die($mysqli->error);
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,					
					"data" => $arr
				)
			);

		break;

		case "removePlano":
			$cod  = addslashes($_POST['cod']);
			$empresaId = addslashes($_POST['empresaId']);

			$sqlCheck = $mysqli->query("SELECT 
				* 
				FROM cacp_gestor.lancamentos
				WHERE empresa_id = '$empresaId'
				AND natureza_financeira = '$cod'");

			if(!$sqlCheck->num_rows){
				$result = $mysqli->query("
					DELETE
					FROM 
					plano_contas_empresa
					WHERE 
					empresa_id = '$empresaId'
					AND
					cod = '$cod'
					ORDER BY mask ASC") or die($mysqli->error);
			}


			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,					
					"data" => $mysqli->affected_rows
				)
			);

		break;
		
		case "getTipos":
			$query = "SELECT * FROM tipos_plano ORDER BY nome ASC";
			$result = $mysqli->query($query);
			$arr = array();
			while($r = $result->fetch_assoc()){
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
		case "getNaturezas":
			$tipo = $_REQUEST['tipo'];
			//$parent = $_REQUEST['parent'];
			
			if($tipo == 'T')
				//$query = "SELECT plano_contas_empresa.cod, plano_contas_empresa.nome as nome, plano_contas_empresa.parent, plano_contas_empresa.tipo, plano_contas_empresa.natureza as modo FROM plano_contas_empresa WHERE empresa_id = '$empresaId' and tipo = 'T' and cod in (SELECT distinct parent FROM cacp_gestor.plano_contas_empresa WHERE empresa_id = '$empresaId');";
				$query = "(SELECT 
							plano_contas_empresa.cod, 
							plano_contas_empresa.nome as nome, 
							plano_contas_empresa.parent, 
							plano_contas_empresa.tipo, 
							'R' as modo
							FROM 
							plano_contas_empresa 
							WHERE 
							empresa_id = '$empresaId' 
							and 
							tipo = 'T' 
							and 
							cod in 
								(SELECT 
									distinct parent 
								 FROM 
									cacp_gestor.plano_contas_empresa as pce2 
								 WHERE 
									empresa_id = '$empresaId'
								 and	
									natureza = 'R'
								)
							)
							UNION
							(
							SELECT 
							plano_contas_empresa.cod, 
							plano_contas_empresa.nome as nome, 
							plano_contas_empresa.parent, 
							plano_contas_empresa.tipo, 
							'P' as modo
							FROM 
							plano_contas_empresa 
							WHERE 
							empresa_id = '$empresaId' 
							and 
							tipo = 'T' 
							and 
							cod in 
								(SELECT 
									distinct parent 
								 FROM 
									cacp_gestor.plano_contas_empresa as pce2 
								 WHERE 
									empresa_id = '$empresaId'
								 and	
									natureza = 'P'
								)
							)
							UNION
							(
							SELECT 
							plano_contas_empresa.cod, 
							plano_contas_empresa.nome as nome, 
							plano_contas_empresa.parent, 
							plano_contas_empresa.tipo, 
							'M' as modo
							FROM 
							plano_contas_empresa 
							WHERE 
							empresa_id = '$empresaId' 
							and 
							tipo = 'T' 
							and 
							cod in 
								(SELECT 
									distinct parent 
								 FROM 
									cacp_gestor.plano_contas_empresa as pce2 
								 WHERE 
									empresa_id = '$empresaId'
								 and	
									natureza = 'M'
								)
							)";
			else
				$query = "(SELECT plano_contas_empresa.cod, plano_contas_empresa.nome as nome, plano_contas_empresa.parent, plano_contas_empresa.tipo, plano_contas_empresa.natureza as modo FROM empresas RIGHT JOIN plano_contas_empresa ON empresas.id = empresa_id  WHERE empresas.id = '$empresaId' and inativo != 'on'  and tipo = 'A') UNION (SELECT contabil as cod, descricao as nome, '0' as parent, 'A' as tipo, 'M' as modo FROM tesouraria WHERE empresa_id = '$empresaId')";


			/*SELECT 
							tesouraria.contabil as id, 
							tesouraria.descricao as nome, 
							null as parent, 
							'T' as tipo, 
							'M' as modo
							FROM 
							tesouraria 
							WHERE 
							empresa_id = '$empresaId' */
			
			$result = $mysqli->query($query);
			$arr = array();
			while($r = $result->fetch_assoc()){
				array_push($arr, $r);
			}

			echo json_encode(array(
				"success" => empty($mysqli->error),
				"error" => $mysqli->error,
				"data" => $arr,
				"parent" => $parentVal
			));			
		break;

	}
}

?>