<?php 

$angularData = file_get_contents("php://input");

$data = json_decode($angularData, true);
$id = $data["id"];
$from = $data["from"];
$table;

if($from == "new"){
    $table = "new_customers";
}
else{
    $table = "regular_customers";
}


$con = mysqli_connect("localhost","","","bredis_landing_page");

$delete = mysqli_query($con,"DELETE FROM $table WHERE id ='$id'");

?>