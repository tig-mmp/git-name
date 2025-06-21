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
    $number = isset($_GET["number"]) ? $_GET["number"] : null;
    $company = isset($_GET["company"]) ? $_GET["company"] : null;

    if ($company && $number) {
        $filtered = array_filter($data, function ($line) use ($company, $number) {
            $parts = explode(";", $line, 2);
            if (count($parts) !== 2) {
                return false;
            }
            [$branch, $commit] = $parts;
            return str_contains($branch, $company) &&
                (str_contains($branch, "-$number/") || str_contains($commit, "-$number]"));
        });

        $filtered = array_values($filtered);

        [$branch, $commit] = $filtered[0] ? explode(";", $filtered[0]) : [null, null];
        echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
    } elseif ($company && $index !== null) {
        $filtered = array_values(array_filter(
            $data,
            fn($line) => str_contains($line, $company)
        ));

        $reverseIndex = count($filtered) - 1 - $index;

        if (isset($filtered[$reverseIndex])) {
            [$branch, $commit] = explode(";", $filtered[$reverseIndex]);
        } elseif (isset($filtered[0])) {
            [$branch, $commit] = explode(";", $filtered[0]);
        } else {
            [$branch, $commit] = [null, null];
        }
        echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
    } elseif ($index !== null) {
        $reverseIndex = count($data) - 1 - $index;
        if (isset($data[$reverseIndex])) {
            $parts = explode(";", $data[$reverseIndex], 2);
            [$branch, $commit] = count($parts) === 2 ? $parts : [null, null];
        } else {
            $parts = explode(";", $data[0] ?? ";", 2);
            [$branch, $commit] = count($parts) === 2 ? $parts : [null, null];
        }

        echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
    } else {
        echo json_encode(["data" => ["branch" => null, "commit" => null]]);
    }
}
