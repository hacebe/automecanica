<?php
include "connect.php";

if(isset($_GET['module']) ){

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":

			$id = addslashes($_POST['id']);	
			$data = addslashes($_POST['data']);
			$tipo = addslashes($_POST['tipo']);
			$tipo_doc = addslashes($_POST['tipo_doc']);
			$n_lanc = addslashes($_POST['n_lanc']);
			$n_doc = addslashes($_POST['n_doc']);
			$ref = addslashes($_POST['ref']);
			$complemento = addslashes($_POST['complemento']);
			$natureza_cat = addslashes($_POST['natureza_cat']);
			$natureza_financeira = addslashes($_POST['natureza_financeira']);
			$fonte_financeira = addslashes($_POST['fonte_financeira']);
			$valor_doc = str_replace(".", "", addslashes($_POST['valor_doc']));
			$valor_doc = str_replace(",", ".", $valor_doc);
			$valor_desconto_adiantamento = str_replace(".", "", addslashes($_POST['valor_desconto_adiantamento']));
			$valor_desconto_adiantamento = str_replace(",", ".", $valor_desconto_adiantamento);
			$valor_juros = str_replace(".", "", addslashes($_POST['valor_juros']));
			$valor_juros = str_replace(",", ".", $valor_juros);
			$valor_multa = str_replace(".", "", addslashes($_POST['valor_multa']));
			$valor_multa = str_replace(",", ".", $valor_multa);
			$valor_desconto = str_replace(".", "", addslashes($_POST['valor_desconto']));
			$valor_desconto = str_replace(",", ".", $valor_desconto);

			$valor_total = str_replace(".", "", addslashes($_POST['valor_total']));
			$valor_total = str_replace(",", ".", $valor_total);
			//$contacontabil = addslashes($_POST['contacontabil']);
			$favorecido = $_POST['favorecido'];
			if(sizeof($favorecido) == 0) {
				$favorecido = 'null';
			}else{
				$favorecido = "'" . addslashes($_POST['favorecido']) . "'";
			}

			$observacao = addslashes($_POST['observacao']);
			//echo $favorecido;

			if($id == ""){	


				$result = $mysqli->query("
					SELECT 
					* 
					FROM
					lancamentos
					WHERE 
					month(`data`) = ". substr($data, 5, 2)."
					AND
					year(`data`) = ". substr($data, 0, 4) ."
					AND
					`n_lanc` = '". $n_lanc ."'
					AND
					`empresa_id` = '$empresaId'
				");

				if($result->num_rows <= 0){

					$result = $mysqli->query("
						INSERT 
						INTO 
						lancamentos	(						
							`empresa_id`,
							`data`,
							`tipo`,
							`tipo_doc`,
							`n_lanc`,
							`n_doc`,
							`ref`,
							`complemento`,
							`natureza_cat`,
							`natureza_financeira`,
							`fonte_financeira`,
							`valor_doc`,
							`valor_desconto_adiantamento`,
							`valor_juros`,
							`valor_multa`,
							`valor_desconto`,
							`valor_total`,
							`favorecido`,
							`observacao`					
						)
						VALUES 
						(
							'" . $empresaId ."',
							'" . $data ."',
							'" . $tipo ."',
							'" . $tipo_doc ."',
							'" . $n_lanc ."',
							'" . $n_doc ."',
							'" . $ref ."',
							'" . $complemento ."',
							'" . $natureza_cat ."',
							'" . $natureza_financeira ."',
							'" . $fonte_financeira ."',
							'" . $valor_doc ."',
							'" . $valor_desconto_adiantamento ."',
							'" . $valor_juros ."',
							'" . $valor_multa ."',
							'" . $valor_desconto ."',
							'" . $valor_total ."',
							" . $favorecido .",
							'" . $observacao . "'
							)
					");
					
					$lancID = $mysqli->insert_id;

					$sql = $mysqli->query("
						UPDATE 
						anexos_lancamento 
						SET
						`lancamento_id`='$lancID'
						WHERE
						lancamento_id = 0
						AND
						empresa_id = '$empresaId'
					");

					echo json_encode(
						array(
							"success" => empty($mysqli->error),
							"error" => $mysqli->error
						)
					);
				}else{
					echo json_encode(
						array(
							"success" => false,
							"error" => "Já existe um lançamento com o mesmo número"
						)
					);

				}
			}else{

				$result = $mysqli->query("
					SELECT 
					* 
					FROM
					lancamentos
					WHERE 
					month(`data`) = ". substr($data, 5, 2)."
					AND
					year(`data`) = ". substr($data, 0, 4) ."
					AND
					`n_lanc` = '". $n_lanc ."'
					AND
					`empresa_id` = '$empresaId'
					AND
					id != '$id'
				");

				if($result->num_rows <= 0){
					$result = $mysqli->query("
						UPDATE 
						lancamentos
						SET 						
							`data` = '" . $data ."',
							`tipo` = '" . $tipo ."',
							`tipo_doc` = '" . $tipo_doc ."',
							`n_lanc` = '" . $n_lanc ."',
							`n_doc` = '" . $n_doc ."',
							`ref` = '" . $ref ."',
							`complemento` = '" . $complemento ."',
							`natureza_cat` = '" . $natureza_cat ."',
							`natureza_financeira` = '" . $natureza_financeira ."',
							`fonte_financeira` = '" . $fonte_financeira ."',
							`valor_doc` = '" . $valor_doc ."',
							`valor_desconto_adiantamento` = '" . $valor_desconto_adiantamento ."',
							`valor_juros` = '" . $valor_juros ."',
							`valor_multa` = '" . $valor_multa ."',
							`valor_desconto` = '" . $valor_desconto ."',
							`valor_total` = '" . $valor_total ."',
							`favorecido` = " . $favorecido . ",
							`observacao` = '" . $observacao . "'
						WHERE 
						`id` = '". $id ."'
						AND
						`empresa_id` = '$empresaId'
					");
					echo json_encode(
						array(
							"success" => empty($mysqli->error),
							"error" => $mysqli->error
						)
					);
				}else{
					echo json_encode(
						array(
							"success" => false,
							"error" => "Já existe um lançamento com o mesmo número"
						)
					);

				}

			}

			
			
		break;
		case "getAllHeaders":
			$result = $mysqli->query("			
				SELECT
				distinct YEAR(`data`) as ano 
				FROM 
				cacp_gestor.lancamentos 
				WHERE 
				empresa_id = '$empresaId'
				ORDER BY ANO ASC;");
			
			
			$data = array();

			while ($row = $result->fetch_assoc()) {
				$row['children'] = array();
				$row['text'] = $row['ano'];
				$row['expanded'] = true;
			    $lancResult = $mysqli->query("
					SELECT
					distinct MONTH(`data`) as mes, YEAR(`data`) as ano
					FROM 
					cacp_gestor.lancamentos 
					WHERE 
					YEAR(`data`) = '". $row['ano'] ."'
					AND
					empresa_id = '$empresaId'					
					ORDER BY `data` ASC;
			    ");

			    while($r = $lancResult->fetch_assoc()){
			    	$r['leaf'] = true;
			    	if($r['mes'] < 10) $r['mes'] = "0" . $r['mes'];
					$r['text'] = $r['mes'] . "/" . $r['ano'];
					$r['ref'] = $r['mes'] . $r['ano'];
			    	array_push($row['children'], $r);
			    }
			    $data[] = $row;
			}
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error" => $mysqli->error,
					"children" => $data
				)				
			);

		break;
		case "getLancamentos":
			$ref = addslashes($_GET['ref']);
			$m = substr($ref, 0,2);
			$y = substr($ref, 2);
			$result = $mysqli->query("			
				SELECT
				l.*, count(a.id) as anexos,  if(p.nome = \"Pro-Labore\" OR p.nome = \"Lucros Distribuidos\", IF(s.empresa_id = l.empresa_id, s.nome, null), IF(f.empresa_id = l.empresa_id, f.nome, null)) as favorecido_nome, p.nome as natureza_titulo
				FROM 
				cacp_gestor.lancamentos as l 
				LEFT JOIN cacp_gestor.anexos_lancamento as a ON a.lancamento_id = l.id
				LEFT JOIN cacp_gestor.favorecidos as f ON f.id = l.favorecido
				LEFT JOIN cacp_gestor.socios as s ON s.id = l.favorecido
				LEFT JOIN cacp_gestor.plano_contas_empresa as p ON p.empresa_id = l.empresa_id
				WHERE 
				MONTH(`data`) = '$m'
				AND
				YEAR(`data`) = '$y'
				AND
				l.empresa_id = '$empresaId'
				AND 
				p.cod = l.natureza_financeira
				GROUP BY l.id
				ORDER BY `data` ASC;") or die($mysqli->error);	
			
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
				lancamentos
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
		case "getLastNLanc":
			$dateRef = $_POST['dateRef'];
			$mes = substr($dateRef, 5, 2);
			$ano = substr($dateRef, 0, 4);
			$result = $mysqli->query("			
				SELECT
				(n_lanc + 1) as lastlanc
				FROM 
				cacp_gestor.lancamentos 
				WHERE 
				MONTH(`data`) = '$mes'
				AND
				YEAR(`data`) = '$ano'
				AND
				empresa_id = '$empresaId'
				ORDER BY n_lanc DESC LIMIT 1;");
			$data;

			if($result->num_rows){
				$r = $result->fetch_assoc();
				$data = $r['lastlanc'];
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"erro" => $mysqli->error,
					"data" => $data
				)
			);
		break;
		case "attach":
			$_UP['folder'] = "attaches/" . md5($empresaId) . "/";
			if(!is_dir($_UP['folder'])) mkdir($_UP['folder']);
			$_UP['size'] = 30 * 1024 * 1024; //max of 30MB file size
			//$_UP['ext'] = array("xls", "xlsx", "csv", "ods");
			$_UP['rename'] = true;

			$_UP['erros'][0] = 'Não houve erro';
			$_UP['erros'][1] = 'O arquivo no upload é maior do que o limite do PHP';
			$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado no HTML';
			$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
			$_UP['erros'][4] = 'Não foi feito o upload do arquivo';

			$msgs = array();

			if ($_FILES['arquivo']['error'] != 0) {
			  $msgs[] = "Não foi possível fazer o upload, erro: " . $_UP['erros'][$_FILES['arquivo']['error']];
			}

			$extensao = strtolower(end(explode('.', $_FILES['arquivo']['name'])));
			/*if (array_search($extensao, $_UP['ext']) === false) {
			  $msgs = "Por favor, envie arquivos com as seguintes extensões: xls, xlsx, csv ou ods";
			}*/

			if ($_UP['size'] < $_FILES['arquivo']['size'] || !$_FILES['arquivo']['size']) {
			  $msgs[] = "O arquivo enviado é muito grande, envie arquivos de até 30MB.";
			}

			if ($_UP['rename'] == true) {
			  // Cria um nome baseado no UNIX TIMESTAMP atual e com extensão .jpg
			  $nome_final = md5(time()). '.' . $extensao;
			} else {
			  // Mantém o nome original do arquivo
			  $nome_final = $_FILES['arquivo']['name'];
			}

			if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['folder'] . $nome_final)) {
			  // Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
				$filename = $_UP['folder'] . $nome_final;
				$success = true;
			} else {
			  // Não foi possível fazer o upload, provavelmente a pasta está incorreta
			  //$msgs[] = "Não foi possível enviar o arquivo, tente novamente";
			  $success = false;
			}
			if($success){
				$sql = $mysqli->query("
					INSERT INTO 
					anexos_lancamento 
					(
						`lancamento_id`, 
						`empresa_id`, 
						`nome_arquivo`, 
						`tamanho`, 
						`tipo`, 
						`local`,
						`enviado`
					) 
					VALUES 
					(
						'" . $_POST['lancID'] . "',
						'" . $empresaId . "',
						'" . $_FILES['arquivo']['name'] ."',
						'" . $_FILES['arquivo']['size'] . "',
						'" . $extensao . "',
						'" . $_UP['folder'] . $nome_final . "',
						UNIX_TIMESTAMP()
					)
				");
			}

			echo json_encode(
				array(
					"success" => $success,
					"size"=> $_FILES['arquivo']['size'],
					"msg" => $msgs
				)
			);
		break;
		case "getAttaches":
			$lancID = $_GET['lancID'];
			if(!$lancID) $lancID = 0;
			$sql = $mysqli->query("SELECT *, from_unixtime(enviado, '%d/%m/%Y  %h:%i:%s') as data_envio FROM anexos_lancamento WHERE lancamento_id = '$lancID' and empresa_id = '$empresaId'");
			$data = array();
			while($r = $sql->fetch_assoc()){
				$data[] = $r;
			}

			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error"=> $mysqli->error,
					"data" => $data
				)
			);
		break;
		case "deleteAttach":
			$attachID = $_POST['attachID'];
			$sql = $mysqli->query("SELECT * FROM anexos_lancamento WHERE id = '$attachID' and empresa_id = '$empresaId'");
			if($sql->num_rows){
				$r = $sql->fetch_assoc();
				unlink($r['local']);
			}
			$sql = $mysqli->query("DELETE FROM anexos_lancamento WHERE id = '$attachID' and empresa_id = '$empresaId'");
			
			echo json_encode(
				array(
					"success" => empty($mysqli->error),
					"error"=> $mysqli->error
				)
			);
		break;
		case "downloadAttach":
			$attachID = $_GET['attachID'];
			$sql = $mysqli->query("SELECT * FROM anexos_lancamento WHERE id = '$attachID' and empresa_id = '$empresaId'");
			if($sql->num_rows){
				$r = $sql->fetch_assoc();
				$finfo = finfo_open(FILEINFO_MIME_TYPE);
				header('Content-Type: '.finfo_file($finfo, $r['local']));

				$finfo = finfo_open(FILEINFO_MIME_ENCODING);
				header('Content-Transfer-Encoding: '.finfo_file($finfo, $r['local'])); 

				header('Content-disposition: attachment; filename="'.$r['nome_arquivo'].'"'); 
				readfile($r['local']); // do the double-download-dance (dirty but worky)
			}
			
		break;
	}

}else{
	die("<center><h1>Forbidden</h1></center>");
}
