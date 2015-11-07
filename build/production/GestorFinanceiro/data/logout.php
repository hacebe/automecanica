<?php
include "connect.php";

unset($_SESSION['userhash']);
unset($_SESSION['username']);
unset($_SESSION['selected_company']);


if( !isset($_SESSION['userhash']) && !isset($_SESSION['userhash']) )
{
	echo json_encode(
		array(
			"success" => 1,
		)
	);	
}
else
{
	echo json_encode(
		array(
			"success" => 0,
		)
	);
}

?>