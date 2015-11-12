<?php

function copy_directory( $source, $destination ) {
    if ( is_dir( $source ) ) {
    @mkdir( $destination );
    $directory = dir( $source );
    while ( FALSE !== ( $readdirectory = $directory->read() ) ) {
        if ( $readdirectory == '.' || $readdirectory == '..' ) {
            continue;
        }
        $PathDir = $source . '/' . $readdirectory; 
        if ( is_dir( $PathDir ) ) {
            copy_directory( $PathDir, $destination . '/' . $readdirectory );
            continue;
        }
        copy( $PathDir, $destination . '/' . $readdirectory );
    }

    $directory->close();
    }else {
    copy( $source, $destination );
    }
}

function rrmdir($dir) { 
  foreach(glob($dir . '/*') as $file) { 
    if(is_dir($file)) rrmdir($file); else unlink($file); 
  } rmdir($dir); 
}

$today = $NewDate=Date('Ymd');

$folderName = "backup_" . $today; 

$originFolder = "/var/www/html/AutoMecanica/data/attaches";
$destinyFolder = "/home/casa/mount";

exec("mount -t cifs //192.168.0.3/usuarios/T.I/gestor_web " . $destinyFolder . " -o username=rodrigorhas,password=summer123,uid=1000,gid=1000");

// Create remote folder to hold back-up files
if(!is_dir($destinyFolder . "/" . $folderName))
    @mkdir($destinyFolder . "/" . $folderName);

echo "Copying...\n";

// Copy whole directory
copy_directory($originFolder, $destinyFolder . "/" . $folderName);

sleep(5);

// Remove Old Back-up files older than 14 days
$pastDate = $NewDate=Date('Ymd', strtotime("-14 days"));
$oldFolderName = "backup_" . $pastDate; 

if(is_dir($destinyFolder . "/" . $oldFolderName)){
    echo "Removing...";
    rrmdir($destinyFolder . "/" . $oldFolderName);
    sleep(5);
}

echo "Done!\n";

exec("umount $destinyFolder");

?>