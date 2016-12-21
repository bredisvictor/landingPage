{"regularCustomers":[<?php 



$con = mysqli_connect("localhost","","","bredis_landing_page");

$get = mysqli_query($con,"SELECT * FROM regular_customers");

$customers = "";

while($row = mysqli_fetch_assoc($get)){
    $id = $row["id"];
    $name = $row["fullname"];
    $email = $row["email"];
    $phone = $row["phone"];
    $regDate = $row["reg.date"];
    $priority = $row["priority"];
    $commentStatus = $row["commentStatus"];
    $comment = $row["comment"];
    $status = $row["status"];
    
    if($customers == ""){
    $customers = '
        {
            "id": "'.$id.'",
            "fullname": "'.$name.'",
            "email": "'.$email.'",
            "phone": "'.$phone.'",
            "regDate": "'.$regDate.'",
            "commentStatus": "'.$commentStatus.'",
            "comment": "'.$comment.'",
            "status": "'.$status.'",
            "priority": "'.$priority.'"
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
            "commentStatus": "'.$commentStatus.'",
            "comment": "'.$comment.'",
            "status": "'.$status.'",
            "priority": "'.$priority.'"
        }';
    }
}
    
    echo $customers;

?>]
}