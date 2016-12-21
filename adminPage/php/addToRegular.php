<?php 

$angularData = file_get_contents("php://input");

$data = json_decode($angularData, true);
$id= $data["id"];
$name = $data["fullname"];
$phone = $data["phone"];
$email = $data["email"];
$priority = $data["priority"];
$regData = $data["regDate"];
$commentStatus = $data["commentStatus"];
$comment = $data["comment"];

$queri1 = "INSERT INTO regular_customers (fullname, email,phone,`reg.date`,comment, 	commentStatus,priority,status) 
VALUES('$name','$email','$phone','$regData','$comment','$commentStatus','$priority','progress')";

$queri2 = "DELETE FROM new_customers WHERE id = '$id'";


$con = mysqli_connect("localhost","","","bredis_landing_page");

mysqli_query($con,$queri1);
mysqli_query($con,$queri2);


?>