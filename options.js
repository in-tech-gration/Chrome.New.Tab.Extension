document.addEventListener('DOMContentLoaded', function (e) {

  const resourcesForm = document.querySelector("#resources section.inputs");

  chrome.storage.local.get(["savedResources"], function (items) {

    if (items && items.savedResources) {
      const savedResources = JSON.parse(items.savedResources);

      for (let i = 0; i < savedResources.length; i += 2) {
        const pair = addInputPair(savedResources[i][1], savedResources[i + 1][1]);
        resourcesForm.appendChild(pair);
      }
    }
  });

});

let pairCounter = 0;

document.querySelector(".add").addEventListener("click", e => {
})

function addInputPair( labelText, url ){

  const p = document.createElement("p");

  const label = document.createElement("label");
  label.textContent = " Label: ";
  const input = document.createElement("input");
  input.setAttribute("type", "text")
  input.setAttribute("name", `label[${++pairCounter}]`)
  if ( labelText ){
    input.setAttribute("value", labelText);
  }
  label.appendChild(input);
  p.appendChild(label);

  const label2 = document.createElement("label");
  label2.textContent = " URL: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text")
  input2.setAttribute("name", `url[${++pairCounter}]`)
  if ( url ){
    input2.setAttribute("value", url);
  }
  label2.appendChild(input2);
  p.appendChild(label2);

  const textNode = document.createTextNode("\n");
  p.appendChild(textNode);

  const btn = document.createElement("button");
  btn.setAttribute("class", "remove");
  btn.setAttribute("type", "button");
  btn.textContent = "Del";
  p.appendChild(btn);

  return p;

}

document.querySelector("form").addEventListener("click", e => {

  if (e.target.nodeName === "BUTTON") {

    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove()
    }

    if (e.target.classList.contains("add")) {

      const p = addInputPair();

      const buttonsSection = e.currentTarget.querySelector("section.inputs");
      buttonsSection.insertAdjacentElement("beforeEnd", p);

    }

  }

})

document.querySelector("form").addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Save data to storage locally, in just this browser...
  chrome.storage.local.set({
    "savedResources": JSON.stringify([...formData])
  }, function () {
    //  Data's been saved boys and girls, go on home
  });

});