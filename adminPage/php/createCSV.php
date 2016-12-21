<?php
$csv_file = '"NAME","PHONE","EMAIL","REGISTRATION DATE"'."\r\n"; 
$con = mysqli_connect("localhost","","","bredis_landing_page");
$query = "SELECT * FROM regular_customers";
$result = mysqli_query($con, $query);
if ($result)
{
   while ($row = mysqli_fetch_assoc($result))
   {
      $csv_file .= '"'.$row["fullname"].'","'.$row["phone"].'","'.$row["email"].'","'.$row["reg.date"].'"'."\r\n";
    }
}

$file_name = 'export.csv';
$file = fopen($file_name,"w"); 
fwrite($file,trim($csv_file));
fclose($file);
header('Content-type: application/csv'); 
header("Content-Disposition: attachment; filename=".$file_name);
readfile($file_name);
unlink($file_name); 
?>