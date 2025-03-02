/**
 * JRM Borås Website
 * Modern JS implementation replacing jQuery dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll implementation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formStatus = document.getElementById('form-status');
      formStatus.textContent = 'Skickar...';
      formStatus.className = 'mt-3 alert alert-info';
      
      try {
        // Form data collection
        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!formDataObj.name || !formDataObj.email || !formDataObj.message) {
          formStatus.textContent = 'Vänligen fyll i alla obligatoriska fält.';
          formStatus.className = 'mt-3 alert alert-warning';
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formDataObj.email)) {
          formStatus.textContent = 'Vänligen ange en giltig e-postadress.';
          formStatus.className = 'mt-3 alert alert-warning';
          return;
        }
        
        // Replace with your actual form submission endpoint
        // This is a placeholder - you'll need to implement server-side handling
        const response = await fetch('contact-form-handler.php', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          formStatus.textContent = 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.';
          formStatus.className = 'mt-3 alert alert-success';
          contactForm.reset();
        } else {
          throw new Error('Server response was not OK');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        formStatus.textContent = 'Ett fel uppstod. Försök igen senare eller kontakta oss direkt via telefon.';
        formStatus.className = 'mt-3 alert alert-danger';
      }
    });
  }
  
  // If you're hosting images externally, add error handling
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // Replace broken images with a fallback
      console.log('Image failed to load:', this.src);
      if (!this.src.includes('fallback')) {
        this.src = 'images/fallback.png';
        this.alt = 'Bild kunde inte laddas';
      }
    });
  });
  
  // For service images that are loaded as background images
  document.querySelectorAll('.service-image').forEach(div => {
    // Create an image element to test loading
    const img = new Image();
    const bgImage = window.getComputedStyle(div).backgroundImage;
    const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    
    img.onerror = function() {
      // If image fails to load, set a fallback
      console.log('Background image failed to load:', url);
      div.style.backgroundImage = 'url("images/fallback.png")';
    };
    
    if (url !== 'none') {
      img.src = url;
    }
  });
});