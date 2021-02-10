<?php

require_once('class/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;             

$mail->isSMTP();                                      
$mail->Host = 'smtp.gmail.com';  
$mail->SMTPAuth = true;                              
$mail->Username = 'ocp.princessmae@gmail.com';                 
$mail->Password = 'gvqahoophpsdzvqe';                          
$mail->SMTPSecure = 'tls';                           
$mail->Port = 587;                                    

?>