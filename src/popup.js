document.addEventListener("DOMContentLoaded", function(event) {
  let bgPage;
  if (chrome && chrome.extension) {
    bgPage = chrome.extension.getBackgroundPage();
  }
  let selectedText = bgPage ? bgPage.selectedText : new Date().getTime();
  refresh(selectedText);
  document.getElementById('selectedText').addEventListener('keyup', setDate);
  document.getElementById('tzString').innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;
});


function refresh(selectedText) {
  document.getElementById('selectedText').value = selectedText;
  document.getElementById('timezoneDate').innerHTML = new Date(+selectedText).toString();
  document.getElementById('utcDate').innerHTML = new Date(+selectedText).toUTCString();
  document.getElementById('selectedText').addEventListener('keyup', setDate);
}

function setDate(event) {
  if (document.getElementById('selectedText').value) {
    refresh(document.getElementById('selectedText').value);
  }
}