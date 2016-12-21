<?php 

$angularData = file_get_contents("php://input");

$data = json_decode($angularData, true);

if(isset($data["name"]) && isset($data["phone"]) &&  isset($data["email"])){
    
    if($data["name"] == "" || $data["phone"] == "" || $data["email"] == "" ){
    echo "error";
       die();
    }
else{
    $name = trim(htmlentities($data["name"]));
    $p =  trim(htmlentities($data["phone"]));
    $h =  trim(htmlentities($data["firstPhone"]));
    $phone = $h.$p;
    $email =  trim(htmlentities($data["email"]));
    $date =  trim(htmlentities($data["date"]));



    $con = mysqli_connect("localhost","","","bredis_landing_page");

    $send = mysqli_query($con,"INSERT INTO new_customers (fullname, email,phone,`reg.date`) 
    VALUES('$name','$email','$phone','$date')");

    if($send){
        echo "Form sent success";
    }
}
}
else{
    echo "error";
       die();
}
   
?>