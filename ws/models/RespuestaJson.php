<?php
class RespuestaJson {
    public static function sendResponse($success, $message, $data = null) {
        echo json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ]);
    }
}
