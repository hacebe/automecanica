<?php

function getContaFromFavorecido($id, $tipo = 'adiantamento'){
	global $mysqli, $empresaId;

	/*if($tipo != "socio"){*/
		$sql = $mysqli->query("SELECT $tipo FROM favorecidos WHERE empresa_id = '$empresaId' AND id='$id'");
	/*}else{
		$sql = $mysqli->query("SELECT contacontabil FROM socios WHERE empresa_id = '$empresaId' AND id='$id'");
	}*/
	//echo $sql->num_rows;
	if($sql->num_rows > 0){
		$row = $sql->fetch_array();
		//echo $row[0];
		return $row[0];
	}
	return null;
}


function getContaFromTesouraria($cod){
	global $mysqli, $empresaId;

	$sql = $mysqli->query("SELECT contabil FROM tesouraria WHERE empresa_id = '$empresaId' AND id='$cod'");
	if($sql->num_rows > 0){
		$row = $sql->fetch_array();
		return $row[0];
	}
	return null;
}
function getContaFromPlano($cod){
	global $mysqli, $empresaId;

	$sql = $mysqli->query("
					SELECT 
					cod 
					FROM 
					plano_contas_empresa 
					WHERE 
					contacontabil = '$cod'
					AND 
					empresa_id = '$empresaId'");

	if($sql->num_rows > 0){
		$row = $sql->fetch_array();
		return $row[0];
	}
	return null;
}
/*function getContaFromTesouraria($contabil){
	global $mysqli, $empresaId;

	$sql = $mysqli->query("SELECT contabil FROM tesouraria WHERE empresa_id = '$empresaId' AND contabil='$contabil'");
	if($sql->num_rows > 0){
		$row = $sql->fetch_array();
		return $row[0];
	}
	return null;
}*/

function getSaldoAnterior($fonte, $natureza, $mes, $ano){
	global $mysqli, $empresaId;

	$sql = $mysqli->query("
		SELECT sum(soma) as soma FROM 
            (SELECT
				saldoinicial as soma
			FROM
				tesouraria as t
			WHERE
				id = '$fonte'
			AND
				empresa_id='$empresaId'
            
			UNION ALL

			SELECT 
				sum(CASE 
					WHEN (tipo = 'R') then 
						valor_total
					WHEN (tipo = 'P') then 
						-valor_total
					WHEN (tipo = 'M' AND fonte_financeira != '$fonte') then 
						valor_total
					WHEN (tipo = 'M' AND fonte_financeira = '$fonte') then
					  	 -valor_total
				END) as soma
			FROM lancamentos 
			WHERE 
			empresa_id = '$empresaId' 
			AND
			(
				fonte_financeira = '$fonte'
				OR
				natureza_financeira = (select pce.cod from plano_contas_empresa as pce, tesouraria as t where t.empresa_id = '$empresaId' and pce.empresa_id = t.empresa_id and natureza = 'M' and contacontabil = t.contabil and t.id = '$fonte')
			)
			and 
			MONTH(`data`) < '$mes' 
			and 
			YEAR(`data`) <= '$ano'
			) as `x`;	
	") or die($mysqli->error);

	
	$row = $sql->fetch_assoc();
	return $row['soma'];
}

function getExtrato($fonte, $mes, $ano){
	global $mysqli, $empresaId;

	$contabil = getContaFromTesouraria($fonte);

	$result = $mysqli->query("
		SELECT 
		DATE_FORMAT(l.data, '%Y-%m-%d 00:00:00') as unixdata,
		l.tipo, 
		tipo_doc, 
		n_lanc, 
		n_doc, 
		ref, 
		l.fonte_financeira,
		f.descricao as fonte,
		complemento, 
		if(pce.nome != null or t.descricao != null, if(t.contabil = l.natureza_financeira, t.descricao, pce.nome), if(pce.cod = l.natureza_financeira, pce.nome, t.descricao)) as natureza_financeira, 
		valor_total 
		FROM 
		cacp_gestor.lancamentos as l 
		LEFT JOIN cacp_gestor.plano_contas_empresa as pce ON pce.empresa_id = l.empresa_id
		LEFT join cacp_gestor.tesouraria as t on t.empresa_id = l.empresa_id
		LEFT join cacp_gestor.tesouraria as f on f.empresa_id = l.empresa_id
		WHERE 
		l.empresa_id = '$empresaId'
		AND
		(
			t.contabil = l.natureza_financeira
			or
			pce.cod = l.natureza_financeira
		)
		AND
		f.id = l.fonte_financeira
		AND
		(
			l.fonte_financeira = '$fonte'
			OR
			l.natureza_financeira = (select pce.cod from plano_contas_empresa as pce, tesouraria as t where t.empresa_id = '$empresaId' and pce.empresa_id = t.empresa_id and natureza = 'M' and contacontabil = t.contabil and t.id = '$fonte')
		)
		AND
		MONTH(`data`) = '$mes' 
		AND 
		YEAR(`data`) = '$ano'
		GROUP BY l.id
		ORDER BY n_lanc ASC;
	");
	return $result;
}

function getHistorico($mes, $ano){
	global $mysqli, $empresaId;

	$result = $mysqli->query("
		SELECT
		l.*, if(p.nome = \"Pro-Labore\" OR p.nome = \"Lucros Distribuidos\", IF(s.empresa_id = l.empresa_id, s.nome, null), IF(f.empresa_id = l.empresa_id, f.nome, null)) as favorecido_nome, IF( p.cod = l.natureza_financeira OR t.id = l.natureza_financeira, if(p.cod = l.natureza_financeira, p.nome, null), if(t1.contabil = l.natureza_financeira , t1.descricao, null))  as natureza_titulo, t.descricao as fonte_financeira_nome, IF(t.contabil OR t1.contabil, if(t.contabil, t.contabil, null), if(t1.contabil, t1.contabil, null) ) as fonte_contabil, p.contacontabil as plano_contabil, s.contacontabil as socio_contabil
		FROM 
		cacp_gestor.lancamentos as l 
		LEFT JOIN socios as s ON s.empresa_id = l.empresa_id  AND s.id = l.favorecido
		LEFT JOIN plano_contas_empresa as p ON p.empresa_id = l.empresa_id AND p.cod = natureza_financeira
		LEFT JOIN favorecidos as f ON f.empresa_id = l.empresa_id AND f.id = l.favorecido
		LEFT JOIN tesouraria as t ON t.empresa_id = l.empresa_id AND t.id = fonte_financeira
		LEFT JOIN tesouraria as t1 ON t1.empresa_id = l.empresa_id AND t1.contabil = natureza_financeira
		WHERE 
		MONTH(`data`) = '$mes'
		AND
		YEAR(`data`) = '$ano'
		AND
		l.empresa_id = '$empresaId'
		
		GROUP BY l.id
		ORDER BY `n_lanc` ASC;
	");
	return $result;
}
?>