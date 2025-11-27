// Booking Modal Functions
function openBookingModal(packageType) {
    const modal = document.getElementById('bookingModal');
    const packageInput = document.getElementById('selectedPackage');
    packageInput.value = packageType;
    modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
}

// Close modal on X click
const closeBooking = document.getElementById('closeBooking');
if (closeBooking) {
    closeBooking.addEventListener('click', closeBookingModal);
}

// Close modal on outside click
const bookingModal = document.getElementById('bookingModal');
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
}

// Handle booking form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const booking = {
            package: formData.get('package'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            projectType: formData.get('projectType'),
            notes: formData.get('notes'),
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Show success message
        showNotification('Booking submitted successfully! We will contact you soon.');
        
        // Reset form and close modal
        bookingForm.reset();
        closeBookingModal();
    });
}



