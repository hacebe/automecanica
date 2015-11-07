<?php
//error_reporting(E_ALL);
session_start();

$mysqli = new Mysqli('localhost', 'root', '923885', 'oficina_gestor');

$result = $mysqli->query("SET NAMES 'UTF8'") or die($mysqli->error);

$result = $mysqli->query("			
				SELECT 
				id				
				FROM								
				usuarios
				WHERE
				hash = '". $_SESSION['userhash'] ."'				
				") or die($mysqli->error);
$userId = null;
if($result->num_rows){
	$r = $result->fetch_assoc();
	$userId = $r['id'];

}

