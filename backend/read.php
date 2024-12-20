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

$allowedOrigin = $env["ALLOWED_ORIGIN"] ?? "https://default-origin.com";

header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $file = "data.txt";
    $data = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    $index = isset($_GET["index"]) ? (int) $_GET["index"] : null;
    $number = isset($_GET["number"]) ? $_GET["number"] : null;
    $company = isset($_GET["company"]) ? $_GET["company"] : null;

    if ($company && $number) {
        $filtered = array_filter($data, function ($line) use ($company, $number) {
            list($branch, $commit) = explode(";", $line);
            return strpos($branch, $company) !== false &&
                (strpos($branch, "-$number/") !== false || strpos($commit, "-$number]") !== false);
        });

        $filtered = array_values($filtered);

        if (count($filtered) > 0) {
            list($branch, $commit) = explode(";", $filtered[0]);
            echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
        } else {
            echo json_encode(["data" => ["branch" => null, "commit" => null]]);
        }
    } elseif ($company && $index !== null) {
        $filtered = array_filter($data, function ($line) use ($company) {
            list($branch, $commit) = explode(";", $line);
            return strpos($branch, $company) !== false;
        });
        $filtered = array_values($filtered);

        $reverseIndex = count($filtered) - 1 - $index;

        if (isset($filtered[$reverseIndex])) {
            list($branch, $commit) = explode(";", $filtered[$reverseIndex]);
            echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
        } else {
            list($branch, $commit) = explode(";", $filtered[0]);
            echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
        }
    } elseif ($index !== null) {
        $reverseIndex = count($data) - 1 - $index;

        if (isset($data[$reverseIndex])) {
            list($branch, $commit) = explode(";", $data[$reverseIndex]);
            echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
        } else {
            list($branch, $commit) = explode(";", $data[0]);
            echo json_encode(["data" => ["branch" => $branch, "commit" => $commit]]);
        }
    } else {
        echo json_encode(["data" => ["branch" => null, "commit" => null]]);
    }
}
