const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("input");
  const msg = document.querySelector("#msg");
  const msgError = document.querySelector("#error");

  const location = search.value;
  msgError.textContent = "";
  msg.textContent = "Loading...";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg.textContent = "";
          msgError.textContent = data.error;
        } else {
          msgError.textContent = "";
          msg.textContent = data.location + "\n" + data.forecast;
        }
      });
    }
  );
});
