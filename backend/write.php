<?php
function loadEnv($file)
{
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $env = [];
    foreach ($lines as $line) {
        if (strpos($line, "#") === 0) {
            continue;
        }
        list($key, $value) = explode("=", $line, 2);
        $env[trim($key)] = trim($value);
    }
    return $env;
}

$env = loadEnv(".env");

$allowedOrigin = $env["ALLOWED_ORIGIN"];

header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["branch"]) && isset($data["commit"])) {
        $branch = $data["branch"];
        $commit = $data["commit"];

        $formattedData = "$branch;$commit" . PHP_EOL;

        $file = "data.txt";
        file_put_contents($file, $formattedData, FILE_APPEND | LOCK_EX);

        echo json_encode(["status" => "success", "message" => "Data saved successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Branch and commit are required."]);
    }
}
