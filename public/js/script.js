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