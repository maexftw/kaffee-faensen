<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$trackerId = $_GET['id'] ?? '';

if (empty($trackerId)) {
    echo json_encode(['error' => 'No tracker ID provided']);
    exit;
}

// Tracker.gg URL
$url = "https://tracker.gg/bf6/profile/{$trackerId}/overview";

// Verwende cURL um die Seite zu laden
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
$html = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$html) {
    echo json_encode(['error' => 'Failed to fetch data']);
    exit;
}

// Parse HTML für Stats
// Tracker.gg verwendet spezifische HTML-Struktur
$stats = [
    'kd' => '0.00',
    'wins' => '0',
    'winrate' => '0%',
    'kills' => '0',
    'deaths' => '0',
    'matches' => '0'
];

// Regex patterns für Stats (muss ggf. angepasst werden)
// K/D Ratio
if (preg_match('/K\/D Ratio<\/span>.*?<span[^>]*>([0-9.]+)<\/span>/s', $html, $matches)) {
    $stats['kd'] = $matches[1];
}

// Wins
if (preg_match('/Wins<\/span>.*?<span[^>]*>([0-9,]+)<\/span>/s', $html, $matches)) {
    $stats['wins'] = str_replace(',', '', $matches[1]);
}

// Win Rate
if (preg_match('/Win %<\/span>.*?<span[^>]*>([0-9.]+)%<\/span>/s', $html, $matches)) {
    $stats['winrate'] = $matches[1] . '%';
}

// Kills
if (preg_match('/Kills<\/span>.*?<span[^>]*>([0-9,]+)<\/span>/s', $html, $matches)) {
    $stats['kills'] = str_replace(',', '', $matches[1]);
}

// Deaths
if (preg_match('/Deaths<\/span>.*?<span[^>]*>([0-9,]+)<\/span>/s', $html, $matches)) {
    $stats['deaths'] = str_replace(',', '', $matches[1]);
}

// Matches
if (preg_match('/Matches<\/span>.*?<span[^>]*>([0-9,]+)<\/span>/s', $html, $matches)) {
    $stats['matches'] = str_replace(',', '', $matches[1]);
}

// Cache für 5 Minuten
header('Cache-Control: max-age=300');

echo json_encode($stats);
?>