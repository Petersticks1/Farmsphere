<?php
/**
 * FarmSphere – General / Order inquiry form handler
 * Collect POST data, sanitize, send email to FarmSphere, return JSON response.
 */
header('Content-Type: application/json');

$allowed = ['name', 'email', 'phone', 'subject', 'message', 'inquiry_type'];
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
$subject = 'FarmSphere Inquiry: ' . ($data['subject'] ?? 'General');
$body = "New inquiry from FarmSphere website:\n\n";
foreach ($data as $k => $v) {
    $body .= ucfirst($k) . ": " . $v . "\n";
}
$body .= "\n--\nSent from FarmSphere contact form.";

$headers = 'From: ' . ($data['email'] ?? 'noreply@farmsphere.ng') . "\r\n" . 'Reply-To: ' . ($data['email'] ?? '') . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if (@mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Thank you. We will get back to you soon.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Sorry, we could not send your message. Please try emailing us directly.']);
}
