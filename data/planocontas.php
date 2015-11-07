<?php
include "connect.php";

function mask($val, $mask){
  	$maskared = '';
	$k = 0;
	for($i = 0; $i<=strlen($mask)-1; $i++)
	{
		if($mask[$i] == '#')
		{
			if(isset($val[$k]))
			$maskared .= $val[$k++];
		}
		else
		{
			if(isset($mask[$i]))
			$maskared .= $mask[$i];
		}
	}
	return $maskared;}

function createTree($node, $arr){
	/** Creates a tree containing  its children nodes  **/
	//echo sizeof($arr);
	for ($i=0; $i < sizeof($arr); $i++) { 
		
		if($arr[$i]['parent'] == $node->id){			
			//echo $i;
			$newNode = new stdClass();
			$newNode->id = $arr[$i]['id'];
			$newNode->parent = $arr[$i]['parent'];
			$newNode->textNoMask = $arr[$i]['nome'];
			$newNode->text = $arr[$i]['mask'] . " - " . $arr[$i]['nome'];
			//$newNode->leaf = false;
			$newNode->mask = $arr[$i]['mask'];
			$newNode->contacontabil = $arr[$i]['contacontabil'];
			$newNode->inativo = $arr[$i]['inativo'];
			$newNode->tipo = $arr[$i]['tipo'];
			$newNode->natureza = $arr[$i]['natureza'];
			
			$newNode->children = array();			
			$node->children[] = $newNode;
			createTree($newNode, $arr);

		}
	}	}

if(isset($_GET['module'])){
	$module = addslashes($_GET['module']);
	$tipoId = addslashes($_GET['tipoId']);
	switch($module){
		case "getAll":
			$result = $mysqli->query("SET NAMES 'utf8'") or die($mysqli->error) ;
			
			$_SESSION['temp_tipo_id'] = ($tipoId) ? $tipoId : $_SESSION['temp_tipo_id'];
			$result = $mysqli->query("SELECT cod as id, parent, mask, nome, tipo, natureza, contacontabil, inativo FROM plano_contas WHERE tipo_id = '$tipoId' ORDER BY id ASC") or die($mysqli->error) ;
			$arr = array();
			while($r = $result->fetch_assoc())
			{
				//if($r['parent'] == null) $r['parent'] = 0;
				//$r['nome'] = sanitizar_utf8($r['nome']);
				array_push($arr, $r);
			}
			$node = new stdClass();
			$node->text = "/";
			$node->expanded = true;
			$node->children = array();

			createTree($node, $arr);

			$output = json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"children" => $node->children
				)
			);
			//$output = str_replace(",\"children\":[]", ",\"leaf\": true", $output);
			$output = str_replace(",\"children\":[]", ",\"children\":[],\"leaf\": true", $output);
			$output = str_replace(",\"children\":[", ",\"expanded\": true,\"children\":[", $output);
			echo $output;
			//print_r($arr);
		break;
		case "salvar":
			$tipoId = $_SESSION['temp_tipo_id'];
			$parent = (addslashes($_POST['parent']) == -1) ? "null" : "'" . addslashes($_POST['parent']) . "' " ;
			$classificacao = addslashes(str_replace(".", "", $_POST['id']));

			$mask = str_replace("..", "", mask($classificacao, "#.#.#.##.###.###"));
			if($mask[strlen($mask)-1] == '.') $mask = substr($mask, 0, strlen($mask)-1);

			$descricao = addslashes($_POST['textNoMask']);
			$contacontabil = addslashes($_POST['contacontabil']);
			$tipo = addslashes($_POST['tipo']);
			$natureza = addslashes($_POST['natureza']);
			$inativo = addslashes($_POST['inativo']);

			$mode = addslashes($_POST['mode']);

			if($mode == 'N'){
				$result = $mysqli->query("SELECT * FROM plano_contas WHERE tipo_id = '$tipoId' and cod = '$classificacao'") or die($mysqli->error());

				if(!$result->num_rows){
					$query = "
						INSERT INTO plano_contas
						(tipo_id, mask, cod, parent, nome, tipo, natureza, contacontabil, inativo)
						VALUES
						('$tipoId', '" . $mask ."', $classificacao, $parent, '$descricao', '$tipo', '$natureza', '$contacontabil', '$inativo')";				

					$mysqli->query($query) or die($mysqli->error);
					
				}else{
					echo json_encode(
						array(
							"success" => false,
							"error" => "Classificacao ja existente!"
						)					
					);
					exit;
				}
			}else if($mode == 'E'){
				$query = "
					UPDATE plano_contas
					SET 
					nome='$descricao', tipo='$tipo', natureza='$natureza', contacontabil='$contacontabil', inativo='$inativo'
					WHERE 
					cod = '$classificacao'
					AND
					tipo_id = '$tipoId'";				

				//echo $query;

				$mysqli->query($query) or die($mysqli->error);

				$query = "
					UPDATE plano_contas_empresa
					SET 
					nome='$descricao', tipo='$tipo', natureza='$natureza', contacontabil='$contacontabil', inativo='$inativo'
					WHERE 
					cod = '$classificacao'
					AND
					tipo_id = '$tipoId'";				

				//echo $query;

				$mysqli->query($query) or die($mysqli->error);
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error
				)
			);



			//$result = $mysqli->query("");
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
			$modo = $_REQUEST['modo'];
			$parent = $_REQUEST['parent'];
			//$empresaId = $_REQUEST['eid'];
			//echo $empresaId;
			$parentVal = -1;
			if(!$parent){				
				//$query = "SELECT plano_contas.cod, plano_contas.nome as nome, plano_contas.parent FROM empresas RIGHT JOIN plano_contas ON empresas.plano_id = tipo_id  WHERE empresas.id = '$empresaId' and tipo = '$tipo' and inativo != 'on'  and natureza = '$modo'";				
				$query = "SELECT plano_contas.cod, plano_contas.nome as nome, plano_contas.parent FROM empresas RIGHT JOIN plano_contas ON empresas.plano_id = tipo_id  WHERE empresas.id = '$empresaId' and inativo != 'on'";				
			}else{
				$query = "SELECT plano_contas.cod, plano_contas.nome as nome FROM empresas RIGHT JOIN plano_contas ON empresas.plano_id = tipo_id  WHERE empresas.id = '$empresaId' and inativo != 'on' and parent = '$parent'";
			}
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
		case "novoPlano":
			$nome = addslashes($_POST['plano']);
			$query = "INSERT INTO tipos_plano
					  (`nome`)
					  VALUES
					  ('$nome')";

			$mysqli->query($query);

			$id = $mysqli->insert_id;
			
			echo json_encode(array(
				"success" => empty($mysqli->error),
				"error" => $mysqli->error,
				"id" => $id
			));			
		break;
		case "clonarPlano":
			$originalId = addslashes($_POST['id']);
			$nome = addslashes($_POST['plano']);
			$query = "INSERT INTO tipos_plano
					  (`nome`)
					  VALUES
					  ('$nome')";

			$mysqli->query($query);

			$id = $mysqli->insert_id;

			$sqlPlano = $mysqli->query("SELECT * FROM plano_contas WHERE tipo_id = '$originalId'");
			while($r = $sqlPlano->fetch_assoc()){
				$r['parent'] = ($r['parent']) ? "'" . $r['parent'] . "'" : 'NULL';
				$sqlInsert = $mysqli->query("INSERT INTO plano_contas (`tipo_id`,`mask`,`cod`,`parent`,`nome`,`tipo`,`natureza`,`contacontabil`,`inativo`) VALUES ('$id','$r[mask]','$r[cod]', $r[parent] ,'$r[nome]','$r[tipo]','$r[natureza]','$r[contacontabil]','$r[inativo]')");
			}
			
			echo json_encode(array(
				"success" => empty($mysqli->error),
				"error" => $mysqli->error,
				"id" => $id
			));			
		break;
		case "delete":
			$cod = addslashes($_POST['cod']);
			$tipoId = $_SESSION['temp_tipo_id'];
			
			$query = "
				SELECT l.natureza_financeira FROM 
				lancamentos as l
				LEFT JOIN plano_contas as p ON p.cod = l.natureza_financeira
				LEFT JOIN plano_contas_empresa as pe ON pe.cod = l.natureza_financeira
				WHERE 
				l.natureza_financeira = '$cod'
				AND
				pe.tipo_id = '$tipoId'
				GROUP BY l.natureza_financeira
				";
			$result = $mysqli->query($query);

			if($result->num_rows){
				
				echo json_encode(array(
					"success" => false,
					"error" => "Existem Lancamentos com esta natureza!"
				));
				
			}else{
				$query = "DELETE FROM plano_contas
						  WHERE
						  cod='$cod' 
						  AND
						  tipo_id = '$tipoId'";

				$mysqli->query($query);

				$query = "DELETE FROM plano_contas_empresa
						  WHERE
						  cod='$cod' 
						  AND
						  tipo_id = '$tipoId'";

				$mysqli->query($query);
				echo json_encode(array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"id" => $id
				));
			}
		break;

	}
}

?>