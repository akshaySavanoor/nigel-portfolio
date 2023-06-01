// Smooth scrolling
$(document).ready(function() {
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();

    var target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
});
// Dynamic content loading
document.addEventListener('DOMContentLoaded', function () {
  const projectsContainer = document.querySelector('#projects .projects-container');

  const projects = [
    {
      title: 'Project 1',
      description: 'Description of Project 1.'
    },
    {
      title: 'Project 2',
      description: 'Description of Project 2.'
    },
    {
      title: 'Project 3',
      description: 'Description of Project 3.'
    }
  ];

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;
    projectsContainer.appendChild(projectElement);
  });

  const form = document.querySelector('#contact-form');
  const errorElement = document.querySelector('.error-message');
  const successMessage = document.createElement('div');
  successMessage.classList.add('popup');
  successMessage.textContent = 'Message sent successfully!';

  form.addEventListener('submit', function (e) {
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

    // Prepare the form data
    const formData = new FormData();
    formData.append('name', nameInput.value.trim());
    formData.append('email', emailInput.value.trim());
    formData.append('message', messageInput.value.trim());

    // Send the form data using AJAX
    $.ajax({
      url: form.getAttribute('action'),
      method: 'POST',
      data: formData,
      dataType: 'json',
      success: function () {
        // Show success message pop-up
        document.body.appendChild(successMessage);

        // Remove success message after a few seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);

        // Reset the form after successful submission
        form.reset();
      },
      error: function () {
        showError('An error occurred. Please try again later.');
      }
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
