// Google: "js download text file" => Grepper: "javascript download file from text"
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.addEventListener('DOMContentLoaded', function(e){

  const resources = document.querySelector(".resources section");
  const quickstart = document.querySelector(".quickstart section");
  let _savedResources;
  let _savedQuickstart;

  document.querySelector("#options").addEventListener("click", e =>{
    chrome.runtime.openOptionsPage();
  })

  document.querySelector("#backup").addEventListener("click", e =>{
    console.log("Backing up...", _savedResources);
    const backup = {
      savedResources: _savedResources,
      savedQuickstart: _savedQuickstart
    }
    download("newTab.backup.json", JSON.stringify(backup, null, "\t"));
  })

  document.querySelector("#import").addEventListener("change", e =>{

    const f = new FileReader();

    f.onload = function(){

      const resourcesJSON = JSON.parse(f.result);
      const { savedResources, savedQuickstart } = resourcesJSON;

      // Resources Import
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
      
      // Save data to storage locally, in just this browser...
      chrome.storage.local.set({ "savedResources": JSON.stringify(savedResources, null, "\t" ) }, function () {
        //  Data's been saved boys and girls, go on home
        console.log("Saved!");
      });

      // Quickstart Import
      output = "";

      for ( let i = 0; i < savedQuickstart.length; i+=2 ){
        output += `
          <h3>
            <a target="_blank" href="${savedQuickstart[i+1][1]}">
              ${savedQuickstart[i][1]}
            </a>
          </h3>
        `
      }
      quickstart.innerHTML = output;
      
      // Save data to storage locally, in just this browser...
      chrome.storage.local.set({ "savedQuickstart": JSON.stringify(savedQuickstart, null, "\t") }, function () {
        //  Data's been saved boys and girls, go on home
        console.log("Saved!");
      });
      
    }
    f.readAsText(e.target.files[0]);
  })

  chrome.storage.local.get(["savedResources"], function(items){

    if ( items && items.savedResources ){
      const savedResources = JSON.parse(items.savedResources);
      _savedResources = savedResources;

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

  chrome.storage.local.get(["savedQuickstart"], function(items){

    if ( items && items.savedQuickstart ){
      const savedQuickstart = JSON.parse(items.savedQuickstart);
      _savedQuickstart = savedQuickstart;

      let output = "";

      for ( let i = 0; i < savedQuickstart.length; i+=2 ){
        output += `
          <h3>
            <a target="_blank" href="${savedQuickstart[i+1][1]}">
              ${savedQuickstart[i][1]}
            </a>
          </h3>
        `
      }
      quickstart.innerHTML = output;
    }
  });


});