let picker, currentDate, pickerOpen = false;

document.addEventListener("DOMContentLoaded", function(event) {
  let bgPage;
  if (chrome && chrome.extension) {
    bgPage = chrome.extension.getBackgroundPage();
  }
  let selectedText = bgPage && bgPage.selectedText ? bgPage.selectedText : new Date().getTime();
  document.getElementById('selectedText').addEventListener('keyup', setDate);
  document.getElementById('tzString').innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;

  document.getElementById('selectedText').addEventListener('keyup', setDate);
  document.getElementById('togglePicker').addEventListener('mousedown', togglePicker);
  picker = flatpickr("#timezoneDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minuteIncrement: 1,
    time_24hr: true,
    onChange: datepickerHasChanged,
    onOpen: () => {
      pickerOpen = true;
      document.body.classList.add('datepicker');
    },
    onClose: () => {
      pickerOpen = false;
      document.body.classList.remove('datepicker');
    },
  });
  refresh(+selectedText);
});

function refresh(selectedText) {
  const d = moment(selectedText);
  currentDate = d.toDate();

  document.getElementById('selectedText').value = selectedText;
  document.getElementById('epochDate').innerHTML = currentDate.getTime();
  document.getElementById('timezoneDate').innerHTML = currentDate.toString();
  document.getElementById('utcDate').innerHTML = currentDate.toUTCString();
}

function datepickerHasChanged(selectedDates, dateStr, instance) {
  refresh(selectedDates[0].getTime());
}

function setDate(event) {
  if (document.getElementById('selectedText').value) {
    refresh(+document.getElementById('selectedText').value);
  }
}

function togglePicker(event) {
  picker.setDate(currentDate, false);
  if (pickerOpen) {
    picker.close();
  } else {
    picker.open();
  }
  event.preventDefault();
  event.stopPropagation();
}