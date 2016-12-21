{"customers":[<?php 



$con = mysqli_connect("localhost","","","bredis_landing_page");

$get = mysqli_query($con,"SELECT * FROM new_customers");

$customers = "";

while($row = mysqli_fetch_assoc($get)){
    $id = $row["id"];
    $name = $row["fullname"];
    $email = $row["email"];
    $phone = $row["phone"];
    $regDate = $row["reg.date"];
   
    if($customers == ""){
    $customers = '
        {
            "id": "'.$id.'",
            "fullname": "'.$name.'",
            "email": "'.$email.'",
            "phone": "'.$phone.'",
            "regDate": "'.$regDate.'",
            "commentStatus": "disabled",
            "comment": "No Comment",
            "priority": "Low",
            "status": "progress"
        }';
    }
    else{
        $customers = $customers.',
        {
            "id": "'.$id.'",
            "fullname": "'.$name.'",
            "email": "'.$email.'",
            "phone": "'.$phone.'",
            "regDate": "'.$regDate.'",
            "commentStatus": "disabled",
            "comment": "No Comment",
            "priority": "Low",
            "status": "progress"
        }';
    }
}
    
    echo $customers;

?>]
}