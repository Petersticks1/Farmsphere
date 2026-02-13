// assets/js/contact-form-simple.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactform');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Prepare form data
            const payload = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('mail').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('Support').value === 'You need to suport?' 
                    ? 'General Inquiry' 
                    : document.getElementById('Support').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Basic validation
            if (!payload.name || !payload.email || !payload.phone || !payload.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show loading
            const btn = e.target.querySelector('button[type="submit"]');
            const btnText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="text-style">Sending...</span><span class="icon"><i class="fa-solid fa-spinner fa-spin"></i></span>';
            
            try {
                const response = await fetch('https://demo.altairattic.net/hotel-two/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = btnText;
            }
        });
    }
});