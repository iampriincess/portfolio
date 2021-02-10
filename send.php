<?php

include('core/init.php');

$errorMessage = array(
    'name' => '',
    'email' => '',
    'message' => ''
);
$validation = array();
$status = 'error';

if(!empty($_POST)){
    
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    //validation
    
    foreach($_POST as $key => $value){
           
        if( $key == 'name' ){

            if(empty($value) || $value == ''){
                $errorMessage['name'] = '*Required. Please fill correct data.';
                array_push($validation,'name');
            }
            elseif( preg_match('/^[a-zA-Z][a-zA-Z ]*$/', $value) == FALSE ){
                $errorMessage['name'] = 'Invalid input.';
                array_push($validation,'name');
            }
            elseif( strlen($value) < 2 ){
                $errorMessage['name'] = 'Invalid input.';
                array_push($validation,'name');
            }

        }

        if( $key == 'email' ){

            if(empty($value) || $value == ''){
                $errorMessage['email'] = '*Required. Please fill correct data.';
                array_push($validation,'email');
            }
            elseif(!filter_var($value, FILTER_VALIDATE_EMAIL)){
                $errorMessage['email'] = 'Invalid input.';
                array_push($validation,'email');
            }

        }

        if( $key == 'message' ){

            if(empty($value) || $value == ''){
                $errorMessage['message'] = '*Required. Please fill correct data.';
                array_push($validation,'message');
            }

        }
            
    }
    
    //check if have error
    
    if( count($validation) == 0 ){
        
        $mail->setFrom($email, $name);
        //$mail->addAddress('joe@example.net', 'Joe User');    
        $mail->addAddress('princessmaebuangjug@gmail.com');               
        $mail->addReplyTo($email, $name);
    
        $mail->isHTML(true);                                  
    
        $mail->Subject = 'Contact Inquiry';
        $mail->Body    = $message;
    
    
        if( $mail->send() ) {
           
            $status = 'success';
            
        } else {
            $status = 'notSend';
        }
        
    }
    
    
    echo json_encode(array('status' => $status, 'errormessage' => $errorMessage));
        
}

?>