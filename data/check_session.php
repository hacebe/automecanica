<?php
include "connect.php";
if(isset($_SESSION['userhash']) && isset($_SESSION['username'])){

		echo json_encode(
			array(
				"success" => 1,
				"error" => '',
				"logado" => 1,
				"nome" => $_SESSION['username'],
				"tipo" => $_SESSION['usertype']
			)
		);	

}else{
	unset($_SESSION);
	echo json_encode(
		array(
			"success" => 0,
			"error" => "not logged in",
			"logado" => 0
			)
		);
}
?>