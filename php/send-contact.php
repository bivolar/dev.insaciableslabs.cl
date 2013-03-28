<?php

function mail_send($arr)
{
    if (!isset($arr['to_email'], $arr['from_email'], $arr['subject'], $arr['message'])) {
        throw new HelperException('mail(); not all parameters provided.');
    }
    
    $to            = empty($arr['to_name']) ? $arr['to_email'] : '"' . mb_encode_mimeheader($arr['to_name']) . '" <' . $arr['to_email'] . '>';
    $from        = empty($arr['from_name']) ? $arr['from_email'] : '"' . mb_encode_mimeheader($arr['from_name']) . '" <' . $arr['from_email'] . '>';
    
    $headers    = array
    (
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset="UTF-8";',
        'Content-Transfer-Encoding: 7bit',
        'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
        'Message-ID: <' . $_SERVER['REQUEST_TIME'] . md5($_SERVER['REQUEST_TIME']) . '@' . $_SERVER['SERVER_NAME'] . '>',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
        'X-Mailer: PHP v' . phpversion(),
        'X-Originating-IP: ' . $_SERVER['SERVER_ADDR'],
    );
    
    return mail($to, '=?UTF-8?B?' . base64_encode($arr['subject']) . '?=', $arr['message'], implode("\n", $headers));
}

$to = "tomasbarrios@gmail.com,carlobaeza@gmail.com, jimibustamante@gmail.com,adoniez@gmail.com, sams91@gmail.com";
$subject = "Contacto Pagina Web Insaciables";
$nombre = $_POST['nombre'];
$message = $_POST['mensaje'];
$from = $_POST['email'];

$mail = mail_send(array('to_email'=>$to, 'from_name'=>$nombre, 'from_email'=>$from,'subject'=>$subject,'message'=>$message));

if ( $mail == true ) {
	$response = array('success'=>'true');
} else {
	$response = array('success'=>'false');
}

echo json_encode($response);

?>