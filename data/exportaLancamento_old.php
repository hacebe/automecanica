<?php
$now_mt = microtime(true);

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

include "connect.php";


require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel/IOFactory.php';


$excelObj = new PHPExcel();

$excelObj->getProperties()->setCreator("Gestor Financeiro Web")
							 ->setLastModifiedBy("Vinícius Hacebe")
							 ->setTitle("Lançamentos")
							 ->setSubject("Lançamentos")
							 ->setDescription("Dados exportados dos lançamentos da Empresa")
							 ->setKeywords("lançamento")
							 ->setCategory("lancamento");



$mesano = $_GET['ref'];
if(sizeof($mesano) > 0){
	$mesano = explode("-", $mesano);
	$mes = $mesano[0];
	$ano = $mesano[1];
}else{
	exit;
}


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
				l.*, if(p.nome = \"Pro-Labore\" OR p.nome = \"Lucros Distribuidos\", IF(s.empresa_id = l.empresa_id, s.nome, null), IF(f.empresa_id = l.empresa_id, f.nome, null)) as favorecido_nome, p.nome as natureza_titulo, t.descricao as fonte_financeira_nome
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
            ->setCellValue('B1', 'Tipo Lanç.')
            ->setCellValue('C1', 'N. Lanç.')
            ->setCellValue('D1', 'Tipo Doc.')
            ->setCellValue('E1', 'N. Doc.')
            ->setCellValue('F1', 'Complemento')
            ->setCellValue('G1', 'Ref.')
            ->setCellValue('H1', 'Natureza Financeira')
            ->setCellValue('I1', 'Fonte Financeira')
            ->setCellValue('J1', 'Valor')
            ->setCellValue('K1', 'Desc. Adiantamento')
            ->setCellValue('L1', 'Juros')
            ->setCellValue('M1', 'Multa')
            ->setCellValue('N1', 'Desconto')
            ->setCellValue('O1', 'Total')
            ->setCellValue('P1', 'Favorecido');

$recordIndex = 2;
while($r = $sql->fetch_assoc()){
	$sheet->setCellValue('A' . $recordIndex, substr($r['data'], 8,2) . '/' . substr($r['data'], 5,2) . "/" . substr($r['data'], 0,4))
            ->setCellValue('B'.  $recordIndex, $r['tipo'])
            ->setCellValue('C' . $recordIndex, $r['n_lanc'])
            ->setCellValue('D' . $recordIndex, $doc_types[$r['tipo_doc']])
            ->setCellValue('E' . $recordIndex, $r['n_doc'])
            ->setCellValue('F' . $recordIndex, $r['complemento'])
            ->setCellValue('G' . $recordIndex, $r['ref'])
            ->setCellValue('H' . $recordIndex, $r['natureza_titulo'])
            ->setCellValue('I' . $recordIndex, $r['fonte_financeira_nome'])
            ->setCellValue('J' . $recordIndex, $r['valor_doc'])
            ->setCellValue('K' . $recordIndex, $r['valor_desconto_adiantamento'])
            ->setCellValue('L' . $recordIndex, $r['valor_juros'])
            ->setCellValue('M' . $recordIndex, $r['valor_multa'])
            ->setCellValue('N' . $recordIndex, $r['valor_desconto'])
            ->setCellValue('O' . $recordIndex, $r['valor_total'])
            ->setCellValue('P' . $recordIndex, $r['favorecido_nome']);
	
	$sheet->getStyle('J' . $recordIndex . ':O' . $recordIndex)->getNumberFormat()
					    ->setFormatCode(
						    '#,##0.00'
						);
	$recordIndex++;
}

$sheet->getStyle('A1:P1')->getFont()->setBold(true);

foreach(range('A','P') as $columnID) {
    $excelObj->getActiveSheet()->getColumnDimension($columnID)
        ->setAutoSize(true);
}

$filename = 'temp/' . md5(time()). '.xlsx';

$objWriter = PHPExcel_IOFactory::createWriter($excelObj, 'Excel2007');
//$objWriter->save($filename);
$objWriter->save('php://output');



//readfile($filename);

?>