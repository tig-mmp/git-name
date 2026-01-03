<?php

$allowedOrigin = $_ENV["ALLOWED_ORIGIN"] ?? "*";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["branch"], $data["commit"])) {
        $branch = $data["branch"];
        $commit = $data["commit"];

        $formattedData = "$branch;$commit" . PHP_EOL;

        $file = __DIR__ . "/data.txt";

        if (!is_writable(dirname($file))) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Directory not writable"]);
            exit;
        }

        $bytes = file_put_contents($file, $formattedData, FILE_APPEND | LOCK_EX);
        if ($bytes === false) {
            $err = error_get_last();
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Write failed", "detail" => $err]);
        } else {
            echo json_encode(["status" => "success", "message" => "Data saved successfully.", "bytes" => $bytes]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Branch and commit are required."]);
    }
}
