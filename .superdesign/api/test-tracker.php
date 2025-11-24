<?php
// Test file to verify tracker-proxy.php is working
// Open this file in browser: http://localhost/.superdesign/api/test-tracker.php

echo "<h1>Tracker Proxy Test</h1>";
echo "<p>Testing connection to Tracker.gg for Maex (ID: 3179257088)</p>";

// Include the proxy
$trackerId = '3179257088';
$url = "https://tracker.gg/bf6/profile/{$trackerId}/overview";

echo "<h2>Step 1: Testing cURL connection</h2>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
$html = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p>HTTP Status Code: <strong>{$httpCode}</strong></p>";
echo "<p>HTML Length: <strong>" . strlen($html) . "</strong> characters</p>";

if ($httpCode !== 200 || !$html) {
    echo "<p style='color:red;'>❌ Failed to fetch data from Tracker.gg</p>";
    exit;
}

echo "<p style='color:green;'>✅ Successfully fetched HTML from Tracker.gg</p>";

echo "<h2>Step 2: Testing regex patterns</h2>";

$stats = [
    'kd' => '0.00',
    'wins' => '0',
    'winrate' => '0%'
];

// K/D Ratio
if (preg_match('/K\/D Ratio<\/span>.*?<span[^>]*>([0-9.]+)<\/span>/s', $html, $matches)) {
    $stats['kd'] = $matches[1];
    echo "<p>✅ K/D found: <strong>{$matches[1]}</strong></p>";
} else {
    echo "<p style='color:orange;'>⚠️ K/D not found with current pattern</p>";

    // Try alternative patterns
    if (preg_match('/K\/D.*?([0-9]+\.[0-9]+)/s', $html, $matches)) {
        $stats['kd'] = $matches[1];
        echo "<p>✅ K/D found with alternative pattern: <strong>{$matches[1]}</strong></p>";
    }
}

// Wins
if (preg_match('/Wins<\/span>.*?<span[^>]*>([0-9,]+)<\/span>/s', $html, $matches)) {
    $stats['wins'] = str_replace(',', '', $matches[1]);
    echo "<p>✅ Wins found: <strong>{$matches[1]}</strong></p>";
} else {
    echo "<p style='color:orange;'>⚠️ Wins not found with current pattern</p>";

    // Try alternative patterns
    if (preg_match('/Wins.*?([0-9,]+)/s', $html, $matches)) {
        $stats['wins'] = str_replace(',', '', $matches[1]);
        echo "<p>✅ Wins found with alternative pattern: <strong>{$matches[1]}</strong></p>";
    }
}

// Win Rate
if (preg_match('/Win %<\/span>.*?<span[^>]*>([0-9.]+)%<\/span>/s', $html, $matches)) {
    $stats['winrate'] = $matches[1] . '%';
    echo "<p>✅ Win Rate found: <strong>{$matches[1]}%</strong></p>";
} else {
    echo "<p style='color:orange;'>⚠️ Win Rate not found with current pattern</p>";

    // Try alternative patterns
    if (preg_match('/Win.*?([0-9]+\.[0-9]+)%/s', $html, $matches)) {
        $stats['winrate'] = $matches[1] . '%';
        echo "<p>✅ Win Rate found with alternative pattern: <strong>{$matches[1]}%</strong></p>";
    }
}

echo "<h2>Step 3: Final Stats</h2>";
echo "<pre>";
print_r($stats);
echo "</pre>";

echo "<h2>Step 4: JSON Output (what the API returns)</h2>";
echo "<pre>";
echo json_encode($stats, JSON_PRETTY_PRINT);
echo "</pre>";

echo "<h2>How to use:</h2>";
echo "<ol>";
echo "<li>Make sure you have a local web server running (XAMPP, WAMP, or built-in PHP server)</li>";
echo "<li>Access this file via: <code>http://localhost/path/to/.superdesign/api/test-tracker.php</code></li>";
echo "<li>If you see stats above, the proxy is working!</li>";
echo "<li>Then update the HTML file to use the correct path to tracker-proxy.php</li>";
echo "</ol>";

echo "<h3>Debug: Show first 2000 characters of HTML</h3>";
echo "<textarea style='width:100%; height:200px;'>" . substr($html, 0, 2000) . "</textarea>";
?>
