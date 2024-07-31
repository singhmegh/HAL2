
    // Function to handle showing main content and enabling navbar links
function showMainContent() {
    document.getElementById("main-content").style.display = "block";
    document.getElementById("temp-access").style.display = "none";
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("disabled");
    });
  }
  
  // this event listener call when document will load in the browsers
  document.addEventListener("DOMContentLoaded", function () {
    //select the tabs which we want to disabled them at starting
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
    //iterate through all the links and add class disabled. "disabled" class is provided by the bootstrap.
    navLinks.forEach((link) => {
      link.classList.add("disabled");
    });
  
    // Check if the user is already logged in
    if (localStorage.getItem("isLogged") === "true") {
      showMainContent();
    } else {
      // Disable navbar links initially
      navLinks.forEach((link) => {
        link.classList.add("disabled");
      });
    }
  
    //handle signup form submissions
    document
      .getElementById("signupForm")
      .addEventListener("submit", function (events) {
        events.preventDefault();
  
        //access the name, email and password and confirm password
        const name = document.getElementById("signupName1").value;
        const email = document.getElementById("signupEmail1").value;
        const password = document.getElementById("signupPassword1").value;
        const confirmPassword = document.getElementById(
          "signupPassword2"
        ).value;
        //   console.log(name, email, password, confirmPassword);
        if (
          validateEmail(email) &&
          validatePassword(password) &&
          validatePassword(confirmPassword) &&
          password === confirmPassword
        ) {
          //setting the data into localStorage
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("isLogged", true);
          var signupModal = bootstrap.Modal.getInstance(
            document.getElementById("SignupModal")
          );
          signupModal.hide();
          showMainContent();
  
          location.reload();
        } else {
          alert("Invalid email or password");
        }
      });
  
    //handle login form submission
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        //access the email and password
        const email = document.getElementById("loginName1").value;
        const password = document.getElementById("loginPassword1").value;
  
        //fetching the details from localStorage
        const existEmail = localStorage.getItem("email");
        const existPassword = localStorage.getItem("password");
  
        if (validateEmail(email) && validatePassword(password)) {
          if (email === existEmail && password === existPassword) {
            var loginModal = bootstrap.Modal.getInstance(
              document.getElementById("LoginModal")
            );
            loginModal.hide();
            //it will set the users is logged in 
            localStorage.setItem("isLogged", true);
  
            showMainContent();
  
            location.reload();
          } else {
            alert("Please check you email and password");
          }
        } else {
          alert("Invalid email or password.");
        }
      });
  });
  
  //logout functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
      //it will set users is not logged in 
    localStorage.setItem("isLogged", false);
    location.reload();
  });
  
  //function to validate the email
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  //function to validate the password
  function validatePassword(password) {
    return password.length >= 8 && password.length <= 64;
  }
  
  


//year//
const d = new Date();
let year = d.getFullYear();
document.getElementById("demo").innerHTML = year;

