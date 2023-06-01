document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');
  const errorElement = document.querySelector('.error-message');
  const successMessage = document.createElement('div');
  successMessage.classList.add('popup');
  successMessage.textContent = 'Message sent successfully!';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    if (nameInput.value.trim() === '') {
      showError('Please enter your name');
      return;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showError('Please enter a valid email address');
      return;
    }

    if (messageInput.value.trim() === '') {
      showError('Please enter a message');
      return;
    }

    const emailData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
      .then(response => {
        if (response.ok) {
     
          document.body.appendChild(successMessage);

      
          setTimeout(() => {
            successMessage.remove();
          }, 3000);

          
          form.reset();
        } else {
          showError('An error occurred. Please try again later.');
        }
      })
      .catch(() => {
        showError('An error occurred. Please try again later.');
      });
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
});
