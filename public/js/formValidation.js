// these needs to be global
let meet = document.getElementById("meet");
let selectedOption = meet.options[0].text;
let mailing = document.getElementById("mailing");

document.getElementById("guestbook-form").onsubmit = () => {
  removeErrors();

  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();
  let linkedin = document.getElementById("linkedin").value.trim();
  let other = document.getElementById("other").value.trim();
  if (!fname) {
    isValid = false;
    document.getElementById("err-fname").style.display = "block";
  }

  if (!lname) {
    isValid = false;
    document.getElementById("err-lname").style.display = "block";
  }

  if (mailing.checked && !email) {
    isValid = false;
    document.getElementById("err-email").style.display = "block";
    document.getElementById("err-email").innerHTML = "Please input email!";
  }

  if (email && !emailRegex.test(email)) {
    isValid = false;
    document.getElementById("err-email").style.display = "block";
    document.getElementById("err-email").innerHTML =
      "Email must be in correct format.";
  }

  if (linkedin && !linkedin.startsWith("https://linkedin.com/in/")) {
    isValid = false;
    document.getElementById("err-linkedin").style.display = "block";
  }

  if (selectedOption == "Please Select") {
    isValid = false;
    document.getElementById("err-meet").style.display = "block";
  }

  if (selectedOption == "Other" && !other) {
    isValid = false;
    document.getElementById("err-other").style.display = "block";
  }

  return isValid;
};

meet.addEventListener("change", () => {
  document.getElementById("err-meet").style.display = "none";
  selectedOption = meet.options[meet.selectedIndex].text;
  console.log(selectedOption);
  let optionIsValid = selectedOption == "Other";
  document.getElementById("otherDiv").style.display = optionIsValid
    ? "block"
    : "none";
});

mailing.addEventListener("change", () => {
  document.getElementById("format").style.display = mailing.checked
    ? "block"
    : "none";
});

function removeErrors() {
  let errors = document.getElementsByClassName("error");
  for (let error of errors) {
    error.style.display = "none";
  }
}
