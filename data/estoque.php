<?php
include "connect.php";

if(isset($_GET['module'])) {

	$module = addslashes($_GET['module']);

	switch($module){		
		case "salvar":
			
			$id = addslashes($_POST['id']);
			$nome = addslashes($_POST['nome']);
			$endereco = addslashes($_POST['endereco']);
			$email = addslashes($_POST['email']);
			$telefone_fixo = addslashes($_POST['telefone_fixo']);
			$telefone_celular1 = addslashes($_POST['telefone_celular1']);
			$telefone_celular2 = addslashes($_POST['telefone_celular2']);
			$cpf = addslashes($_POST['cpf']);
			$tipo = addslashes($_POST['tipo']);		
			/*$pessoa = addslashes($_POST['pessoa']);*/

			if($id == ""){	
				$result = $mysqli->query("
					INSERT 
					INTO 
					favorecidos 
					(`nome`, `email`, `endereco`, `telefone_fixo`, `telefone_celular1` ,`telefone_celular2`, `cpf`, `tipo`) 
					VALUES 
					('". $nome ."','". $email ."','". $endereco ."','". $telefone_fixo ."','". $telefone_celular1 ."','". $telefone_celular2 ."','". $cpf ."', 'C')
				");
			}else{
				$result = $mysqli->query("
					UPDATE 
					favorecidos 
					SET `nome` = '". $nome ."', `email` = '". $email ."', `endereco` = '". $endereco ."', `telefone_fixo`='". $telefone_fixo ."', `telefone_celular1`='". $telefone_celular1 ."', `telefone_celular2`='". $telefone_celular2 ."', `cpf`='". $cpf ."'
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
		case "getMovimentacoes":
			$result = $mysqli->query("			
				SELECT 
				@m.id := m.id as id,
				m.datahora, 
				from_unixtime(datahora) as unixdata,
				m.fornecedor, 
				f.nome as fornecedor_nome,
				m.usuario, 
				u.nome as usuario_nome,
				m.tipo,
				m.descricao,
				(	SELECT 
						sum(valor_unitario * quantidade) 
						FROM 
						movimento_estoque_produto 
						WHERE 
						id_movimentacao = @m.id
				)  as valor_total
				FROM 
				movimentacao_estoque as m
				LEFT JOIN favorecidos as f ON f.id = fornecedor
				LEFT JOIN usuarios as u ON u.id = m.usuario
				ORDER BY m.datahora DESC");
			
			
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
