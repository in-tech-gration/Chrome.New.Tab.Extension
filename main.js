document.addEventListener('DOMContentLoaded', function(e){

  const resources = document.querySelector(".resources section");

  document.querySelector("#options").addEventListener("click", e =>{
    chrome.runtime.openOptionsPage();
  })

  chrome.storage.local.get(["savedResources"], function(items){

    if ( items && items.savedResources ){
      const savedResources = JSON.parse(items.savedResources);
      let output = "";

      for ( let i = 0; i < savedResources.length; i+=2 ){
        output += `
          <h3>
            <a target="_blank" href="${savedResources[i+1][1]}">
              ${savedResources[i][1]}
            </a>
          </h3>
        `
      }
      resources.innerHTML = output;
    }
  });


});