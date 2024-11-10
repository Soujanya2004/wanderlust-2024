// /preloader js styling
let preloader = document.querySelector("#preloader");

window.addEventListener("load",function(e){

    preloader.style.display = "none";
    // setTimeout(function() {
    //   preloader.style.display = 'none';
    // }, 1000);

});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// // For flash message pop up (Bootstrap toasts)

document.addEventListener('DOMContentLoaded', function () {
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');

  if (toastTrigger && toastLiveExample) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
          toastBootstrap.show();
      });
      
      // Automatically trigger the toast if there's a success message
      if (toastTrigger.style.display === 'none') {
          toastTrigger.click();
      }
  }
});

// Password views eye toggler.
document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.querySelectorAll('.passwordToggler');
  togglePassword.forEach((toggle) => {
      toggle.addEventListener('click', function (e) {
          // console.log(e.target.classList.contains('cnf-passkey'))
          let password;
          if (e.target.classList.contains('cnf-passkey'))
              password = document.querySelector('input[name="cnfPassword"]');
          else
              password = document.querySelector('input[name="password"]');
          const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
          password.setAttribute('type', type);
          this.classList.toggle('fa-eye'); // Toggle icon
          this.classList.toggle('fa-eye-slash'); // Toggle icon
      })
  });
});



let backToTop = document.querySelector(".goto-top");

function handleScroll() {
  let scrollPosition = window.scrollY;
  scrollPosition > 400 ? backToTop.style.display = "flex" : backToTop.style.display = "none";
}

// Check the scroll position when the page loads
window.addEventListener("load", handleScroll);

// Check the scroll position when the user scrolls
window.addEventListener("scroll", handleScroll);

backToTop.addEventListener("click", () => {
  window.scrollTo({top: 0, behavior: "smooth"});
});



// Feedback form
let feedbackForm = document.querySelector(".feedback-popup");
let feedbackContainer = document.querySelector(".feedback-container");
let submitFeedback = document.querySelector("#feedback");
let closeForm = document.querySelector("#close-button");
let form = document.querySelector("#review-form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
// })

submitFeedback.addEventListener("click", () => {
  feedbackContainer.classList.remove("fade-out");
  feedbackForm.style.display = "flex";
});

closeForm.addEventListener("click", (event) => {
  event.preventDefault();
  feedbackContainer.classList.add("fade-out");
  form.reset();
  // feedbackForm.style.display = "none";

  setTimeout( () => {
    feedbackForm.style.display = "none";
  }, 200)
})



// Set limit of three to add tags for list
const checkboxes = document.querySelectorAll('.tag-checkbox');
const tagAlert = document.querySelector('.tag-alert');
    const maxAllowed = 3;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Count the number of checked boxes
            const checkedCount = document.querySelectorAll('.tag-checkbox:checked').length;

            if (checkedCount > maxAllowed) {
                // Uncheck the current checkbox if the limit is reached
                checkbox.checked = false;
                // alert(`You can select up to ${maxAllowed} tags only.`);
                tagAlert.classList.remove("normal-tag-alert");
                tagAlert.classList.add("red-tag-alert");
            } else {
                // Hide the alert message if under the limit
                tagAlert.classList.remove("red-tag-alert");
                tagAlert.classList.add("normal-tag-alert");
            }
        });
    });


// Set limi of 4 max file upload
// Maximum number of files allowed
const maxFiles = 4;
    
// Get input and error message elements
const listingImageInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');

// Listen for changes on the file input
listingImageInput.addEventListener('change', function() {
    // Check the number of files selected
    if (this.files.length > maxFiles) {
        // Display error message
        fileError.classList.remove("nomal-error");
        fileError.classList.add("alert-error");
        
        // Clear the input field to reset file selection
        this.value = '';
    } else {
        // Clear error message if file count is within the limit
        fileError.classList.remove("alert-error");
        fileError.classList.add("nomal-error");
    }
});



// Set the description limit
const description = document.querySelector("#list-description");
const desError = document.querySelector("#des-error");
const maxChars = 1000;

description.addEventListener("input", function() {
    const currentLength = description.value.length;

    if (currentLength > maxChars) {
        // Limit the description to the maximum allowed characters
        description.value = description.value.substring(0, maxChars);
        desError.textContent = "You have reached the 1000-character limit!";
        desError.classList.add("alert-error");
        desError.classList.remove("normal-error");
    } else {
        desError.textContent = `Maximum ${maxChars} characters!`;
        desError.classList.remove("alert-error");
        desError.classList.add("normal-error");
    }
});
