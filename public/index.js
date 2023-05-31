// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Dynamic content loading
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
  
  // Form validation
  const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const errorElement = document.querySelector('.error-message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

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

  // Create an object to store the form data
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  // Send the form data as a POST request to the server
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully');
        // Reset the form after successful submission
        form.reset();
        // Optionally, display a success message to the user
      } else {
        console.error('Error sending email');
        // Optionally, display an error message to the user
      }
    })
    .catch(error => {
      console.error(error);
      // Handle any other error that occurred during the request
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