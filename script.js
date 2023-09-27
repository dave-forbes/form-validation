function errorBorder(node, errorNode) {
  errorNode.classList.add("opacity");
  node.classList.remove("valid-border");
  node.classList.add("error-border");
}

function validBorder(node, errorNode) {
  errorNode.classList.remove("opacity");
  node.classList.remove("error-border");
  node.classList.add("valid-border");
}

const email = document.getElementById("email");
const emailError = document.querySelector(".email.input > p.error");

email.addEventListener("change", checkEmailValidity);

function checkEmailValidity() {
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!emailRegex.test(email.value)) {
    if (email.classList.contains("error-border")) return;
    emailError.textContent = "Please enter a valid email address.";
    errorBorder(email, emailError);
  } else {
    validBorder(email, emailError);
    return true;
  }
}

const country = document.getElementById("country");
const countryError = document.querySelector(".country.input > p.error");

country.addEventListener("change", checkCountryValidity);

function checkCountryValidity() {
  if (country.value === "") {
    if (country.classList.contains("error-border")) return;
    countryError.textContent = "Please select your country.";
    errorBorder(country, countryError);
  } else {
    validBorder(country, countryError);
    return true;
  }
}

const postCode = document.getElementById("post-code");
const postCodeError = document.querySelector(".post-code.input > p.error");

postCode.addEventListener("change", checkPostCodeValidity);

function checkPostCodeValidity() {
  const postCodeRegex = /^[\w\s\-]{0,10}$/g;
  if (!postCodeRegex.test(postCode.value)) {
    if (postCode.classList.contains("error-border")) return;
    postCodeError.textContent = "Please enter a valid post code.";
    errorBorder(postCode, postCodeError);
  } else {
    validBorder(postCode, postCodeError);
    return true;
  }
}

const password = document.getElementById("password");
const passwordError = document.querySelector(".password.input > p.error");

password.addEventListener("change", checkPasswordValidity);

function checkPasswordValidity() {
  const upperCaseRegex = /[A-Z]/g;
  const lowerCaseRegex = /[a-z]/g;
  const numberRegex = /[0-9]/g;
  const specialRegex = /[#?!@$%^&*-]/g;

  if (!upperCaseRegex.test(password.value)) {
    passwordError.textContent = "Password must contain an uppercase letter.";
    errorBorder(password, passwordError);
  } else if (!lowerCaseRegex.test(password.value)) {
    passwordError.textContent = "Password must contain an lowercase letter.";
    errorBorder(password, passwordError);
  } else if (!numberRegex.test(password.value)) {
    passwordError.textContent = "Password must contain a number.";
    errorBorder(password, passwordError);
  } else if (!specialRegex.test(password.value)) {
    passwordError.textContent = "Password must contain a special character.";
    errorBorder(password, passwordError);
  } else if (password.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    errorBorder(password, passwordError);
  } else {
    validBorder(password, passwordError);
    return true;
  }
}

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(
  ".confirm-password.input > p.error"
);

confirmPassword.addEventListener("change", checkConfirmPasswordValidity);

function checkConfirmPasswordValidity() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Your passwords must match each other.";
    errorBorder(confirmPassword, confirmPasswordError);
    passwordError.textContent = "";
    errorBorder(password, passwordError);
  } else if (
    confirmPassword.value === password.value &&
    checkPasswordValidity() !== true
  ) {
    confirmPasswordError.textContent = "";
    errorBorder(confirmPassword, confirmPasswordError);
    errorBorder(password, passwordError);
  } else {
    validBorder(confirmPassword, confirmPasswordError);
    validBorder(password, passwordError);
    return true;
  }
}

function errorBoxShadow(node) {
  node.classList.add("error-box-shadow");
  setTimeout(() => {
    node.classList.remove("error-box-shadow");
  }, 800);
}

const continueButton = document.getElementById("continue-button");

continueButton.addEventListener("click", checkForm);

function checkForm(event) {
  event.preventDefault();
  if (checkEmailValidity() !== true) {
    errorBoxShadow(email);
  }
  if (checkCountryValidity() !== true) {
    errorBoxShadow(country);
  }
  if (checkPostCodeValidity() !== true) {
    errorBoxShadow(postCode);
  }
  if (checkPasswordValidity() !== true) {
    errorBoxShadow(password);
  }
  if (checkConfirmPasswordValidity() !== true) {
    errorBoxShadow(confirmPassword);
  }
  if (
    checkEmailValidity() === true &&
    checkCountryValidity() === true &&
    checkPostCodeValidity() === true &&
    checkPasswordValidity() === true &&
    checkConfirmPasswordValidity() === true
  ) {
    const h1 = document.querySelector("h1");
    const fieldsets = document.querySelectorAll("fieldset");
    h1.classList.add("opacity-0");
    fieldsets.forEach((fieldset) => fieldset.classList.add("opacity-0"));
    setTimeout(() => {
      h1.classList.add("display-none");
      fieldsets.forEach((fieldset) => fieldset.classList.add("display-none"));
    }, 500);
    setTimeout(getGif, 500);
    setTimeout(() => {
      img.classList.add("opacity");
    }, 1000);
  }
}

const errorText = document.querySelector("#error-text");
const img = document.querySelector("img");
const form = document.querySelector("form");

function getGif() {
  errorText.textContent = "";
  url = `https://api.giphy.com/v1/gifs/translate?api_key=HoD2pa83gqhBgOyTwrRksdv4jRni17Mv&s=${"well done"}`;
  fetch(url, { mode: "cors" })
    .then((response) => response.json())
    .then((response) => (img.src = response.data.images.original.url))
    .then(img.classList.remove("display-none"))
    .then(form.classList.add("center"))
    .catch((error) => {
      errorText.textContent = "Couldn't find any gifs...";
      errorText.style.color = "red";
      errorText.classList.remove("display-none");
      console.error("An error occurred:", error);
    });
}
