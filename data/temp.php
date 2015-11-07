<?php
 
/*function getChildrenSum($array)
{
    $sum = 0;

    if (count($array)>0)
    {
        foreach ($array as $item)
        {
            $sum += $item['value'];
            $sum += getChildrenSum($item['children']);
        }
        return $sum;
    }

    else return 0;
}

function getSumFromArray($array,$guid)
{
    foreach ($array as $item)
    {
        if (isset($item['cod'])){

            if ($item['cod']==$guid){
            	echo $item['children'];
                return getChildrenSum($item['children']);
              }else{
              	//echo "different";
              }
        }else{
        	//echo "different";
        }
    }

    return 0;
}*/

/*$testArray = 
		array(
			"value"=>0,
			"cod"=>"1",
			"text"=>"Pai 1",
			"tipo"=>"T",
			"value"=>0,
			"children"=> array(
				array(
					"value"=>0,
					"cod"=>"11",
					"text"=>"Filho 1",
					"tipo"=>"T",
					"value"=>0,
					"children"=> array(
						array(
							"value"=>200,
							"cod"=>"111",
							"text"=>"Neto 1.1",
							"children"=> null,
							"tipo"=>"A"
						),
						array(
							"value"=>413,
							"cod"=>"112",
							"text"=>"Neto 1.2",
							"children"=> null,
							"tipo"=>"A"
						)
					)
				),
				array(
					"value"=>0,
					"cod"=>"12",
					"text"=>"Filho 2",
					"tipo"=>"T",
					"children"=> array(
						array(
							"value"=>0,
							"cod"=>"121",
							"tipo"=>"T",
							"text"=>"Neto 2.1",
							"children"=>array(
								array(
									"value"=>100,
									"cod"=>"1211",
									"text"=>"Neto 2.1",
									"children"=> null,
									"tipo"=>"A"
								),
								array(
									"value"=>903,
									"cod"=>"1221",
									"text"=>"Neto 2.2",
									"children"=> null,
									"tipo"=>"A"
								)
							)
						),
						array(
							"value"=>603,
							"cod"=>"122",
							"text"=>"Neto 2.2",
							"children"=> null,
							"tipo"=>"A"
						)
					)
				)
			)
		
	);*/

//var_dump($testArray);

//echo getChildrenSum($testArray);

//echo json_encode($testArray);

/*include "connect.php";

$plano_id = 12;

$empresaId = 6;


$sqlPlano = $mysqli->query("SELECT * FROM plano_contas WHERE tipo_id = '$plano_id'");
while($r = $sqlPlano->fetch_assoc()){
	$sqlInsert = $mysqli->query("INSERT INTO plano_contas_empresa (empresa_id, `tipo_id`,`mask`,`cod`,`parent`,`nome`,`tipo`,`natureza`,`contacontabil`,`inativo`) VALUES ('$empresaId', '$r[tipo_id]','$r[mask]','$r[cod]','$r[parent]','$r[nome]','$r[tipo]','$r[natureza]','$r[contacontabil]','$r[inativo]')");
}*/

include "connect.php";
$ano = 2015;
$sqlPlano = $mysqli->query("SELECT * FROM tesouraria");
while($r = $sqlPlano->fetch_assoc()){
	$sqlInsert = $mysqli->query("INSERT INTO saldo_contas (conta_id, empresa_id, contabil, ano, saldo_anterior) VALUES ('$r[id]', '$r[empresa_id]', '$r[contabil]','$ano','$r[saldoinicial]')");
}

 ?>