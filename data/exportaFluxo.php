<?php
$months = array("saldo", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez");
function generateXLS($data){
	global $mysqli, $ano;//include "connect.php";

	require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel/IOFactory.php';
	$filename = 'fluxocaixa_'. $ano .'.xlsx';
	//$filename = md5(time()). '.xlsx';

	header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	header("Content-Disposition: attachment; filename=\"$filename\"");
	header("Cache-Control: max-age=0");

	$excelObj = new PHPExcel();

	$excelObj->getProperties()->setCreator("Gestor Financeiro Web")
	->setLastModifiedBy("Vinícius Hacebe")
	->setTitle("Fluxo de Caixa")
	->setSubject("Fluxo de Caixa")
	->setDescription("Dados exportados do fluxo de caixa")
	->setKeywords("fluxo de caixa")
	->setCategory("fluxo de caixa");


	$sheet = $excelObj->setActiveSheetIndex(0);

	$sheet->  setCellValue('A1', 'Classificação')
	->setCellValue('B1', 'Descrição')
	->setCellValue('C1', 'Saldo')
	->setCellValue('D1', 'Jan/' . $ano)
	->setCellValue('E1', 'Fev/' . $ano)
	->setCellValue('F1', 'Mar/' . $ano)
	->setCellValue('G1', 'Abr/' . $ano)
	->setCellValue('H1', 'Mai/' . $ano)
	->setCellValue('I1', 'Jun/' . $ano)
	->setCellValue('J1', 'Jul/' . $ano)
	->setCellValue('K1', 'Ago/' . $ano)
	->setCellValue('L1', 'Set/' . $ano)
	->setCellValue('M1', 'Out/' . $ano)
	->setCellValue('N1', 'Nov/' . $ano)
	->setCellValue('O1', 'Dez/' . $ano);

	$recordIndex = 2;

	for($i =0; $i<sizeof($data); $i++){
		writeToSheet($recordIndex, $data, $i, $sheet);
	}


	foreach(range('A','O') as $columnID) {
	    $excelObj->getActiveSheet()->getColumnDimension($columnID)
	        ->setAutoSize(true);
	}

	$excelObj->getActiveSheet()
	    	 ->getStyle('A1:A2560')
	    	 ->getAlignment()
	    	 ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);


$objWriter = PHPExcel_IOFactory::createWriter($excelObj, 'Excel2007');
//$objWriter->save($filename);
$objWriter->save('php://output');
//print_r($data);

}

function writeToSheet(&$recordIndex, $r, $i, &$sheet){

		global $replace, $fonte, $months;

		for($u = 0; $u<13; $u++){
			if(!$r[$i][$months[$u]]) $r[$i][$months[$u]] = "-";
		}

		$sheet->setCellValue('A' . $recordIndex, $r[$i]['mask'])
			  ->setCellValue('B' . $recordIndex, $r[$i]['plano'])
			  ->setCellValue('C'.  $recordIndex, $r[$i]['saldo'])
			  ->setCellValue('D' . $recordIndex, $r[$i]['jan'])
			  ->setCellValue('E' . $recordIndex, $r[$i]['fev']) 
			  ->setCellValue('F' . $recordIndex, $r[$i]['mar']) 
			  ->setCellValue('G' . $recordIndex, $r[$i]['abr']) 
			  ->setCellValue('H' . $recordIndex, $r[$i]['mai']) 
			  ->setCellValue('I' . $recordIndex, $r[$i]['jun']) 
			  ->setCellValue('J' . $recordIndex, $r[$i]['jul']) 
			  ->setCellValue('K' . $recordIndex, $r[$i]['ago']) 
			  ->setCellValue('L' . $recordIndex, $r[$i]['set']) 
			  ->setCellValue('M' . $recordIndex, $r[$i]['out']) 
			  ->setCellValue('N' . $recordIndex, $r[$i]['nov']) 
			  ->setCellValue('O' . $recordIndex, $r[$i]['dez']);



		/*$sheet->getStyle('A' . $recordIndex)->getNumberFormat()
					    ->setFormatCode('@');*/

		foreach(range('C','O') as $columnID) {
			$sheet->getStyle($columnID . $recordIndex)->getNumberFormat()
			->setFormatCode(
				'#,##0.00'
				);

			$sheet->getStyle($columnID . $recordIndex)->getAlignment()
	    	 ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);


		}

		foreach(range('A','O') as $columnID) {
			if($r[$i]['tipo'] == 'T'){
				$sheet->getStyle($columnID . $recordIndex)->getFont()->setBold(true);
			}
		}

		




		$recordIndex++;
	}
?>