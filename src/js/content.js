window.addEventListener("mouseup", wordSelected);

function wordSelected() {
  let selectedText = window.getSelection().toString();
  if(selectedText.length > 0) {
    chrome.runtime.sendMessage(selectedText);
  }
}

