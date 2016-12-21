<?php 

$angularData = file_get_contents("php://input");

$data = json_decode($angularData, true);
$status = $data["status"];
$id = $data["id"];

$queri = "UPDATE regular_customers SET status = '$status' WHERE id = '$id'";

$con = mysqli_connect("localhost","","","bredis_landing_page");

mysqli_query($con,$queri);

?>