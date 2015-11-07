<?php
$now_mt = microtime(true);

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

include "connect.php";

$replace = [
    '&lt;' => '', '&gt;' => '', '&#039;' => '', '&amp;' => '',
    '&quot;' => '', 'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'Ae',
    '&Auml;' => 'A', 'Å' => 'A', 'Ā' => 'A', 'Ą' => 'A', 'Ă' => 'A', 'Æ' => 'Ae',
    'Ç' => 'C', 'Ć' => 'C', 'Č' => 'C', 'Ĉ' => 'C', 'Ċ' => 'C', 'Ď' => 'D', 'Đ' => 'D',
    'Ð' => 'D', 'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ē' => 'E',
    'Ę' => 'E', 'Ě' => 'E', 'Ĕ' => 'E', 'Ė' => 'E', 'Ĝ' => 'G', 'Ğ' => 'G',
    'Ġ' => 'G', 'Ģ' => 'G', 'Ĥ' => 'H', 'Ħ' => 'H', 'Ì' => 'I', 'Í' => 'I',
    'Î' => 'I', 'Ï' => 'I', 'Ī' => 'I', 'Ĩ' => 'I', 'Ĭ' => 'I', 'Į' => 'I',
    'İ' => 'I', 'Ĳ' => 'IJ', 'Ĵ' => 'J', 'Ķ' => 'K', 'Ł' => 'K', 'Ľ' => 'K',
    'Ĺ' => 'K', 'Ļ' => 'K', 'Ŀ' => 'K', 'Ñ' => 'N', 'Ń' => 'N', 'Ň' => 'N',
    'Ņ' => 'N', 'Ŋ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O',
    'Ö' => 'Oe', '&Ouml;' => 'Oe', 'Ø' => 'O', 'Ō' => 'O', 'Ő' => 'O', 'Ŏ' => 'O',
    'Œ' => 'OE', 'Ŕ' => 'R', 'Ř' => 'R', 'Ŗ' => 'R', 'Ś' => 'S', 'Š' => 'S',
    'Ş' => 'S', 'Ŝ' => 'S', 'Ș' => 'S', 'Ť' => 'T', 'Ţ' => 'T', 'Ŧ' => 'T',
    'Ț' => 'T', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'Ue', 'Ū' => 'U',
    '&Uuml;' => 'Ue', 'Ů' => 'U', 'Ű' => 'U', 'Ŭ' => 'U', 'Ũ' => 'U', 'Ų' => 'U',
    'Ŵ' => 'W', 'Ý' => 'Y', 'Ŷ' => 'Y', 'Ÿ' => 'Y', 'Ź' => 'Z', 'Ž' => 'Z',
    'Ż' => 'Z', 'Þ' => 'T', 'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a',
    'ä' => 'ae', '&auml;' => 'ae', 'å' => 'a', 'ā' => 'a', 'ą' => 'a', 'ă' => 'a',
    'æ' => 'ae', 'ç' => 'c', 'ć' => 'c', 'č' => 'c', 'ĉ' => 'c', 'ċ' => 'c',
    'ď' => 'd', 'đ' => 'd', 'ð' => 'd', 'è' => 'e', 'é' => 'e', 'ê' => 'e',
    'ë' => 'e', 'ē' => 'e', 'ę' => 'e', 'ě' => 'e', 'ĕ' => 'e', 'ė' => 'e',
    'ƒ' => 'f', 'ĝ' => 'g', 'ğ' => 'g', 'ġ' => 'g', 'ģ' => 'g', 'ĥ' => 'h',
    'ħ' => 'h', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ī' => 'i',
    'ĩ' => 'i', 'ĭ' => 'i', 'į' => 'i', 'ı' => 'i', 'ĳ' => 'ij', 'ĵ' => 'j',
    'ķ' => 'k', 'ĸ' => 'k', 'ł' => 'l', 'ľ' => 'l', 'ĺ' => 'l', 'ļ' => 'l',
    'ŀ' => 'l', 'ñ' => 'n', 'ń' => 'n', 'ň' => 'n', 'ņ' => 'n', 'ŉ' => 'n',
    'ŋ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'oe',
    '&ouml;' => 'oe', 'ø' => 'o', 'ō' => 'o', 'ő' => 'o', 'ŏ' => 'o', 'œ' => 'oe',
    'ŕ' => 'r', 'ř' => 'r', 'ŗ' => 'r', 'š' => 's', 'ù' => 'u', 'ú' => 'u',
    'û' => 'u', 'ü' => 'ue', 'ū' => 'u', '&uuml;' => 'ue', 'ů' => 'u', 'ű' => 'u',
    'ŭ' => 'u', 'ũ' => 'u', 'ų' => 'u', 'ŵ' => 'w', 'ý' => 'y', 'ÿ' => 'y',
    'ŷ' => 'y', 'ž' => 'z', 'ż' => 'z', 'ź' => 'z', 'þ' => 't', 'ß' => 'ss',
    'ſ' => 'ss', 'ый' => 'iy', 'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G',
    'Д' => 'D', 'Е' => 'E', 'Ё' => 'YO', 'Ж' => 'ZH', 'З' => 'Z', 'И' => 'I',
    'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N', 'О' => 'O',
    'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T', 'У' => 'U', 'Ф' => 'F',
    'Х' => 'H', 'Ц' => 'C', 'Ч' => 'CH', 'Ш' => 'SH', 'Щ' => 'SCH', 'Ъ' => '',
    'Ы' => 'Y', 'Ь' => '', 'Э' => 'E', 'Ю' => 'YU', 'Я' => 'YA', 'а' => 'a',
    'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo',
    'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l',
    'м' => 'm', 'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's',
    'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'c', 'ч' => 'ch',
    'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e',
    'ю' => 'yu', 'я' => 'ya'];

$mesano = $_GET['ref'];
if(sizeof($mesano) > 0){
	$mesano = explode("-", $mesano);
	$mes = $mesano[0];
	$ano = $mesano[1];
}else{
	exit;
}

require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel/IOFactory.php';
$filename = 'lancamentos_' . $mes . '_'. $ano .'.xlsx';
//$filename = md5(time()). '.xlsx';

header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Cache-Control: max-age=0");

$excelObj = new PHPExcel();

$excelObj->getProperties()->setCreator("Gestor Financeiro Web")
							 ->setLastModifiedBy("Vinícius Hacebe")
							 ->setTitle("Lançamentos")
							 ->setSubject("Lançamentos")
							 ->setDescription("Dados exportados dos lançamentos da Empresa")
							 ->setKeywords("lançamento")
							 ->setCategory("lancamento");





$doc_types['O'] = "Outros";
$doc_types['G'] = "Guia";
$doc_types['R'] = "Recibo";
$doc_types['N'] = "Nota Fiscal";
$doc_types['C'] = "Cheque";
/*$sql = $mysqli->query("SELECT 
						* 
						FROM 
						lancamentos 
						WHERE 
						empresa_id = '$empresaId' 
						and 
						month(data) = '$mes' 
						and 
						year(data) = '$ano'
						order by n_lanc asc");*/

$sql = $mysqli->query("SELECT
				*
				FROM 
				cacp_gestor.parametros
				WHERE 
				empresa_id = '$empresaId'
				");
$parametros = new stdClass();
while($r_param = $sql->fetch_assoc()){
	foreach ($r_param as $key => $value) {
		$parametros->$key = $value;
	}
}

$sql = $mysqli->query("SELECT
				l.*, if(p.nome = \"Pro-Labore\" OR p.nome = \"Lucros Distribuidos\", IF(s.empresa_id = l.empresa_id, s.nome, null), IF(f.empresa_id = l.empresa_id, f.nome, null)) as favorecido_nome, p.nome as natureza_titulo, t.descricao as fonte_financeira_nome, t.contabil as fonte_contabil, p.contacontabil as plano_contabil, s.contacontabil as socio_contabil
				FROM 
				cacp_gestor.lancamentos as l 
				LEFT JOIN cacp_gestor.favorecidos as f ON f.id = l.favorecido
				LEFT JOIN cacp_gestor.socios as s ON s.id = l.favorecido
				LEFT JOIN cacp_gestor.tesouraria as t ON t.empresa_id = l.empresa_id
				LEFT JOIN cacp_gestor.plano_contas_empresa as p ON p.empresa_id = l.empresa_id
				WHERE 
				MONTH(`data`) = '$mes'
				AND
				YEAR(`data`) = '$ano'
				AND
				l.empresa_id = '$empresaId'
				AND 
				p.cod = l.natureza_financeira
				AND
				t.id = l.fonte_financeira
				
				ORDER BY `n_lanc` ASC;");



$sheet = $excelObj->setActiveSheetIndex(0);

	$sheet->  setCellValue('A1', 'Data')
            ->setCellValue('B1', 'Debito')
            ->setCellValue('C1', 'Credito')
            ->setCellValue('D1', 'Cod')
            ->setCellValue('E1', 'Historico')
            ->setCellValue('F1', 'Valor');

$recordIndex = 2;
while($r = $sql->fetch_assoc()){

	writeToSheet($recordIndex, $r, $sheet);

	//$recordIndex++;
	$_HIST = null;
}
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


function writeToSheet(&$recordIndex, $r, &$sheet){

	global $doc_types, $parametros, $replace;

	$_HIST["tipo"] = ($r['tipo'] == 'P') ? 'Pagamento' : 'Recebimento';
	$_HIST["tipo_doc"] = " " . $doc_types[$r['tipo_doc']];
	$_HIST["ref"] = " " . str_replace("-", '', $r['ref']);
	$_HIST["complemento"] = ($r['complemento']) ? " " . str_replace(array_keys($replace), $replace, $r['complemento']) : "";

	$_HIST["n_doc"] = ($r['n_doc'] > 0) ? " " . $r['n_doc'] : "";

	//if($r['natureza_titulo'] == "Lucros Distribuidos"){
	if($r['natureza_titulo'] == "Pro-Labore" || $r['natureza_titulo'] == "Lucros Distribuidos"){
		$_HIST["deb"] = ($r['tipo'] == 'P') ? $r['socio_contabil'] : $r['fonte_contabil'];
		$_HIST["cred"] = ($r['tipo'] == 'P') ? $r['fonte_contabil'] : $r['socio_contabil'];
		$_HIST["fav_text"] = "Socio ";
	}else{
		//echo " [plano contabil] = $r[plano_contabil] [natureza] = $r[natureza_titulo] ";
		$_HIST["deb"] = ($r['tipo'] == 'P') ? $r['plano_contabil'] : $r['fonte_contabil'];
		$_HIST["cred"] = ($r['tipo'] == 'P') ? $r['fonte_contabil'] : $r['plano_contabil'];
		if($r['tipo_doc'] == 'N'/* || $r['tipo_doc'] == 'C' || $r['tipo_doc'] == 'R'*/){
			$_HIST["deb"] = ($r['tipo'] == 'P') ? getContaFromFavorecido($r['favorecido'], 'contabil') : $r['fonte_contabil'];
			$_HIST["cred"] = ($r['tipo'] == 'P') ? $r['fonte_contabil'] : getContaFromFavorecido($r['favorecido'], 'contabil');
			if($r['tipo'] == 'P'){
				$_HIST["fav_text"] = "Fornecedor ";
			}else{
				$_HIST["fav_text"] = "Cliente ";
			}
			
		}

		if($r['natureza_titulo'] == "Pro-Labore"){
			$_HIST["fav_text"] = "Socio ";
		}
	}

	$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4))
		  ->setCellValue('B'.  $recordIndex, $_HIST['deb']) //conta debito
		  ->setCellValue('C' . $recordIndex, $_HIST['cred']) //conta credito
		  ->setCellValueExplicit('D' . $recordIndex, '99.01') //cod fixo em '99.01'
		  ->setCellValue('E' . $recordIndex, 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'] . $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']) //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}
		  ->setCellValue('F' . $recordIndex, $r['valor_doc']);
       
	
	$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
									    ->setFormatCode(
										    '#,##0.00'
										);
	if($r['valor_desconto_adiantamento'] > 0){
    	$recordIndex++;
		$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4));
		
		if($r['tipo'] == 'P'){
			//echo $parametros;
			$sheet->setCellValue('B'.  $recordIndex, $_HIST['deb']); //conta debito
			$sheet->setCellValue('C' . $recordIndex, getContaFromFavorecido($r['favorecido'])); //conta credito
		}else if($r['tipo'] == 'R'){
			$sheet->setCellValue('B'.  $recordIndex, getContaFromFavorecido($r['favorecido'])); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $_HIST['cred']); //conta credito
		}
		$sheet->setCellValueExplicit('D' . $recordIndex, '99.01') //cod fixo em '99.01'
			  ->setCellValue('E' . $recordIndex, 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'] . " Desconto Adiantamento" . $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']) //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}
			  ->setCellValue('F' . $recordIndex, $r['valor_desconto_adiantamento']);
       
	
		$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
										    ->setFormatCode(
											    '#,##0.00'
											);
	}
    if($r['valor_juros'] > 0){
    	$recordIndex++;
		$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4));
		if($r['tipo'] == 'P'){
			//echo $parametros;
			$sheet->setCellValue('B'.  $recordIndex, $parametros->pagamento_conta_juros); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $_HIST['cred']); //conta credito
		}else if($r['tipo'] == 'R'){
			$sheet->setCellValue('B'.  $recordIndex, $_HIST['deb']); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $parametros->recebimento_conta_juros); //conta credito
		}
		$sheet->setCellValueExplicit('D' . $recordIndex, '99.01') //cod fixo em '99.01'
			  ->setCellValue('E' . $recordIndex, 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'] . " Juros" . $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']) //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}
			  ->setCellValue('F' . $recordIndex, $r['valor_juros']);
       
	
		$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
										    ->setFormatCode(
											    '#,##0.00'
											);
	}
	if($r['valor_multa'] > 0){
    	$recordIndex++;
		$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4));
		if($r['tipo'] == 'P'){
			//echo $parametros;
			$sheet->setCellValue('B'.  $recordIndex, $parametros->pagamento_conta_multa); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $_HIST['cred']); //conta credito
		}else if($r['tipo'] == 'R'){
			$sheet->setCellValue('B'.  $recordIndex, $_HIST['deb']); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $parametros->recebimento_conta_multa); //conta credito
		}
		$sheet->setCellValueExplicit('D' . $recordIndex, '99.01') //cod fixo em '99.01'
			  ->setCellValue('E' . $recordIndex, 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'] . " Multa" . $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']) //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}
			  ->setCellValue('F' . $recordIndex, $r['valor_multa']);
       
	
		$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
										    ->setFormatCode(
											    '#,##0.00'
											);
	}
	if($r['valor_desconto'] > 0){
    	$recordIndex++;
		$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4));
		
		if($r['tipo'] == 'P'){
			$sheet->setCellValue('B'.  $recordIndex, $_HIST['deb']); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $parametros->pagamento_conta_desconto); //conta credito
		}else if($r['tipo'] == 'R'){
			$sheet->setCellValue('B'.  $recordIndex, $parametros->recebimento_conta_desconto); //conta debito
			$sheet->setCellValue('C' . $recordIndex, $_HIST['cred']); //conta credito
		}

		$sheet->setCellValueExplicit('D' . $recordIndex, '99.01') //cod fixo em '99.01'
			  ->setCellValue('E' . $recordIndex, 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'] . " Desconto" . $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']) //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}
			  ->setCellValue('F' . $recordIndex, $r['valor_desconto']);
       
	
		$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
										    ->setFormatCode(
											    '#,##0.00'
											);
	}

	$recordIndex++;
}
//, if(p.nome = \"Pro-Labore\" OR p.nome = \"Lucros Distribuidos\", IF(s.empresa_id = l.empresa_id, s.nome, null), IF(f.empresa_id = l.empresa_id, f.nome, null)) as favorecido_nome, p.nome as natureza_titulo, t.descricao as fonte_financeira_nome, t.contabil as fonte_contabil, p.contacontabil as plano_contabil, s.contacontabil as socio_contabil
$sql = $mysqli->query("SELECT
				l.* 
				FROM 
				cacp_gestor.lancamentosfixos as l 
				WHERE
				l.empresa_id = '$empresaId'
				AND 
				l.revisado != ''
				ORDER BY `sequencia` ASC;
				");

//$sheet->getStyle('A1:F1')->getFont()->setBold(true);

while($r = $sql->fetch_assoc()){

	
	//if($r['natureza_titulo'] == "Pro-Labore" || $r['natureza_titulo'] == "Lucros Distribuidos"){
	$_HIST["cred"] = $r['contacredito'];
	$_HIST["deb"] = $r['contadebito'];
	$_HIST["descricao"] = $r['descricao'];
	$_HIST["complemento"] = ($r['complemento']) ? " " . $r['complemento'] : "";

	$sheet->setCellValue('A' . $recordIndex,  date('t/m/Y', strtotime($ano . "-". $mes . "-01")))
            ->setCellValue('B'.  $recordIndex, $_HIST['deb']) //conta debito
            ->setCellValue('C' . $recordIndex, $_HIST['cred']) //conta credito
            ->setCellValue('D' . $recordIndex, '99.01') //cod fixo em '99.01'
            ->setCellValue('E' . $recordIndex, str_replace(array_keys($replace), $replace, $_HIST["descricao"] . $_HIST["complemento"])) //Descrição + Complemento
            ->setCellValue('F' . $recordIndex, $r['valor']);
            
	
	$sheet->getStyle('F' . $recordIndex)->getNumberFormat()
					    ->setFormatCode(
						    '#,##0.00'
						);
	$sheet->getStyle('D' . $recordIndex)->getNumberFormat()
					    ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_TEXT);

	$recordIndex++;
	$_HIST = null;
}

foreach(range('A','F') as $columnID) {
    $excelObj->getActiveSheet()->getColumnDimension($columnID)
        ->setAutoSize(true);
}


$objWriter = PHPExcel_IOFactory::createWriter($excelObj, 'Excel2007');
//$objWriter->save($filename);
$objWriter->save('php://output');



//readfile($filename);

?>