<?php

function __autoload($class){
	include "../classes/" . $class . ".php";
}

?>