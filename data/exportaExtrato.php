<?php
$now_mt = microtime(true);

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

include "connect.php";
include "queryLancamentos.php";

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

$mes = $_GET['mes'];
$ano = $_GET['ano'];
$fonte = $_GET['fonte'];

require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel/IOFactory.php';
$filename = 'extrato_' . $mes . '_'. $ano .'.xlsx';
//$filename = md5(time()). '.xlsx';

header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Cache-Control: max-age=0");

$excelObj = new PHPExcel();

$excelObj->getProperties()->setCreator("Gestor Financeiro Web")
							 ->setLastModifiedBy("Vinícius Hacebe")
							 ->setTitle("Extrato Conta Corrente")
							 ->setSubject("Extrato Conta Corrente")
							 ->setDescription("Dados exportados dos extratos de conta corrente")
							 ->setKeywords("extrato")
							 ->setCategory("extrato");





$doc_types['G'] = "Guia";
$doc_types['R'] = "Recibo";
$doc_types['N'] = "Nota Fiscal";
$doc_types['C'] = "Cheque";
$doc_types['E'] = "Extrato";

$natureza = getContaFromTesouraria($fonte);

$saldo = getSaldoAnterior($fonte, $natureza, $mes, $ano);
$saldoAnt = $saldo;

$sql = getExtrato($fonte, $mes, $ano);

$sheet = $excelObj->setActiveSheetIndex(0);

	$sheet->  setCellValue('A3', 'Data')
            ->setCellValue('B3', 'Historico')
            ->setCellValue('C3', 'Entrada')
            ->setCellValue('D3', 'Saída')
            ->setCellValue('E3', 'Saldo')
            ->setCellValue('D1', 'Saldo Anterior')
            ->setCellValue('E1', $saldoAnt);

    $sheet->getStyle('E1')->getNumberFormat()
						  ->setFormatCode(
						  '#,##0.00'
						  );


$recordIndex = 4;
while($r = $sql->fetch_assoc()){

	writeToSheet($recordIndex, $r, $sheet, $saldo);

	//$recordIndex++;
	$_HIST = null;
}

function writeToSheet(&$recordIndex, $r, &$sheet, &$saldo){

	global $doc_types, $replace, $fonte;

	$_HIST["tipo"] = ($r['tipo'] == 'P') ? 'Pagamento' : (($r['tipo'] == 'R') ? 'Recebimento' : 'Transferencia');
	$_HIST["tipo_doc"] = " " . $doc_types[$r['tipo_doc']];
	$_HIST["ref"] = " " . str_replace("-", '', $r['ref']);
	$_HIST["complemento"] = ($r['complemento']) ? " " . str_replace(array_keys($replace), $replace, $r['complemento']) : "";

	$_HIST["n_doc"] = ($r['n_doc'] > 0) ? " " . $r['n_doc'] : "";

	if($r['tipo'] == 'R'){
	    $_HIST['entrada'] = $r['valor_total'];
	    $_HIST['saida'] = 0;
	    $saldo += $r['valor_total'];
    }else if($r['tipo'] == 'P'){
	    $_HIST['saida'] = $r['valor_total'];
	    $_HIST['entrada'] = 0;
	    $saldo -= $r['valor_total'];
    }else {
    	if($r['fonte_financeira'] == $fonte){
    		$_HIST['saida'] = $r['valor_total'];
	    	$_HIST['entrada'] = 0;
	    	$saldo -= $r['valor_total'];
    	}else{
	    	$_HIST['entrada'] = $r['valor_total'];
	    	$_HIST['saida'] = 0;
	    	$saldo += $r['valor_total'];
    	}
    }
	$_HIST['saldo'] = $saldo;
	//unset($r['valor_total']);

	$historico  = 'NL:' . $r['n_lanc'] . " " . $_HIST['tipo'];
	if($r['tipo'] == "M"){
		if($fonte == $r['fonte_financeira']){
			$historico .= " " . $r['natureza_financeira'];
		}else{
			$historico .= " " . $r['fonte'];
		}
	}

	$historico .= $_HIST['tipo_doc'] . $_HIST['n_doc'] .  $_HIST['ref'] . $_HIST['complemento'] . " " . str_replace(array_keys($replace), $replace,$r['natureza_titulo']) . " " . $_HIST['fav_text'] . $r['favorecido_nome']; //Historico: NL:{n_lanc} Pagamento/Recebimento {tipo_doc} {n_doc} {ref} {complemento} {natureza_titulo} {favorecido_nome}


	//$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4))
	$sheet->setCellValue('A' . $recordIndex, substr($r['unixdata'], 8,2) . '/' . substr($r['unixdata'], 5,2) . "/" . substr($r['unixdata'], 0,4))
		  ->setCellValue('B' . $recordIndex, $historico)
		  ->setCellValue('C'.  $recordIndex, $_HIST['entrada']) //conta debito
		  ->setCellValue('D' . $recordIndex, $_HIST['saida']) //conta credito
		  ->setCellValue('E' . $recordIndex, $saldo);
       
	
	/*$sheet->getStyle('E' . $recordIndex)->getNumberFormat()
									    ->setFormatCode(
										    '#,##0.00'
										);
*/
	foreach(range('C','E') as $columnID) {
	    $sheet->getStyle($columnID . $recordIndex)->getNumberFormat()
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