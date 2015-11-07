<?php
$now_mt = microtime(true);

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

include "connect.php";


require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel/IOFactory.php';

//$filename = "../../../Balancete042015.xlsx";

$_UP['folder'] = "temp/";
$_UP['size'] = 2 * 1024 * 1024;
$_UP['ext'] = array("xls", "xlsx", "csv", "ods");
$_UP['rename'] = true;

$_UP['erros'][0] = 'Não houve erro';
$_UP['erros'][1] = 'O arquivo no upload é maior do que o limite do PHP';
$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado no HTML';
$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
$_UP['erros'][4] = 'Não foi feito o upload do arquivo';

if ($_FILES['arquivo']['error'] != 0) {
  $msg = "Não foi possível fazer o upload, erro:" . $_UP['erros'][$_FILES['arquivo']['error']];
}

$extensao = strtolower(end(explode('.', $_FILES['arquivo']['name'])));
if (array_search($extensao, $_UP['ext']) === false) {
  $msg = "Por favor, envie arquivos com as seguintes extensões: xls, xlsx, csv ou ods";
}

if ($_UP['size'] < $_FILES['arquivo']['size']) {
  $msg = "O arquivo enviado é muito grande, envie arquivos de até 2Mb.";
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
} else {
  // Não foi possível fazer o upload, provavelmente a pasta está incorreta
  $msg = "Não foi possível enviar o arquivo, tente novamente";
}

$excelReader = PHPExcel_IOFactory::createReaderForFile($filename);
$excelReader->setReadDataOnly();
$excelObj = $excelReader->load($filename);
$excelObj->getActiveSheet()->toArray(null, true, true, true);

$sheet = $excelObj->getSheet(0);
$hRow = $sheet->getHighestRow();
$hCol = $sheet->getHighestColumn();

$mesano = explode("/", $_POST['mesano']);

$mes = $mesano[0];
$ano = $mesano[1];
//$empresaId = 3;

$sql = $mysqli->query("DELETE FROM balancete_demonstracao WHERE empresa_id = '$empresaId' AND mes = '$mes' AND ano = '$ano'");
$mysql_errors = array();
if($mysqli->error) array_push($mysql_errors, $mysqli->error);
for($row = 1; $row <= $hRow; $row++){
	$rowData = $sheet->rangeToArray('A' . $row . ':' . $hCol . $row, null, true, false)[0];
	$mysqli->query("
		INSERT INTO balancete_demonstracao
		(
			empresa_id,
			mes,
			ano,
			cod_interno,
			mask,
			descricao,
			saldo_anterior,
			debito,
			credito,
			total
		) VALUES (
			$empresaId,
			'$mes',
			'$ano',
			'$rowData[0]',
			'$rowData[1]',
			'". trim(addslashes($rowData[2])) ."',
			'$rowData[3]',
			'$rowData[4]',
			'$rowData[5]',
			'$rowData[6]'
		)
	");
	if($mysqli->error) array_push($mysql_errors, $mysqli->error);
}

$finished_mt = microtime(true);

echo json_encode(
	array(
		"success" => empty($mysql_errors),
		"error" => $mysql_errors,
		"msg" => $msg,
		"loadtime" => $now_mt-$finished_mt
	)
);

//var_dump($excelObj->getActiveSheet()->toArray(null, true, true, true));


?>