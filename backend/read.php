<?php

$allowedOrigin = $_ENV["ALLOWED_ORIGIN"] ?? "*";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $file = "data.txt";
    if (!file_exists($file)) {
        echo json_encode(["error" => "File $file not found"]);
        exit;
    }

    $data = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    $index = isset($_GET["index"]) ? (int) $_GET["index"] : null;
    $number = $_GET["number"] ?? null;
    $company = $_GET["company"] ?? null;

    if ($company) {
        $data = array_filter($data, fn($line) => is_string($line) && str_contains($line, $company));
    }
    if ($number) {
        $data = array_filter($data, function ($line) use ($number) {
            $parts = is_string($line) ? explode(";", $line, 2) : [null, null];
            if (count($parts) !== 2) {
                return false;
            }
            [$branch, $commit] = $parts;
            return str_contains($branch, "-$number/") || str_contains($commit, "-$number]");
        });
    }

    $data = array_values(array: $data);

    if (!empty($data)) {
        if ($index !== null) {
            $reverseIndex = count($data) - 1 - $index;
            $line = $data[$reverseIndex] ?? $data[0];
        } else {
            $line = end($data);
        }
        [$branch, $commit] = explode(";", $line, 2) + [null, null];
    } else {
        [$branch, $commit] = [null, null];
    }

    echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
}
