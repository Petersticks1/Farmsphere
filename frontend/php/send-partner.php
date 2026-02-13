<?php
/**
 * FarmSphere – Partnership inquiry form handler
 * Collect POST data, sanitize, send email to FarmSphere, return JSON response.
 */
header('Content-Type: application/json');

$allowed = ['name', 'email', 'phone', 'company', 'partnership_type', 'message'];
$data = [];
foreach ($allowed as $key) {
    if (!empty($_POST[$key])) {
        $data[$key] = trim(htmlspecialchars(strip_tags((string) $_POST[$key]), ENT_QUOTES, 'UTF-8'));
    }
}

if (empty($data['email']) || empty($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Email and message are required.']);
    exit;
}

$to = 'info@farmsphere.ng';
$subject = 'FarmSphere Partnership Inquiry: ' . ($data['company'] ?? 'New partner');
$body = "New partnership inquiry from FarmSphere website:\n\n";
foreach ($data as $k => $v) {
    $body .= ucfirst(str_replace('_', ' ', $k)) . ": " . $v . "\n";
}
$body .= "\n--\nSent from FarmSphere partnership form.";

$headers = 'From: ' . ($data['email'] ?? 'noreply@farmsphere.ng') . "\r\n" . 'Reply-To: ' . ($data['email'] ?? '') . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if (@mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Thank you. Our team will contact you regarding partnership.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Sorry, we could not send your message. Please try emailing us directly.']);
}
