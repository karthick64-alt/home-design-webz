// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contact = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        
        // Save contact message
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });
}



