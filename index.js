console.log('connected!!');
const monthContainer = document.querySelector(
  '.calender__container--nav-month'
);
const calender = document.querySelector('.calender__container');
// const dateContainer = document.querySelector('.calender__container--date');

const days = document.querySelectorAll('.calender__container--day-value');
// const dates = document.querySelectorAll('.calender__container--date-value');

const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const today = new Date();
let month = today.getMonth();

function renderCalender() {
  //remove previous month dates and days
  const prvDateArray = document.querySelector('.calender__container--date');
  const prvDayArray = document.querySelector('.calender__container--day');
  const prvCopy = document.querySelector('.copyright');
  if (prvDateArray) {
    calender.removeChild(prvDateArray);
  }

  if (prvDayArray) {
    calender.removeChild(prvDayArray);
  }
  if (prvCopy) {
    calender.removeChild(prvCopy);
  }

  // calculate total days in current month
  const lastDay = new Date(today.getFullYear(), month + 1, 0).getDate();
  monthContainer.innerHTML = months[month];

  //Create days container
  const days = document.createElement('div');
  days.classList.add('calender__container--day');

  let count = 0;

  let day = new Date(today.getFullYear(), month, 1).getDay();
  console.log('today is', weekdays[day], day);
  while (count < 7) {
    count++;
    if (day > 6) {
      day = 0;
    }
    const dayItem = document.createElement('div');
    dayItem.innerText = weekdays[day];
    dayItem.classList.add('calender__container--day-value');
    if (today.getDay() == day) {
      dayItem.classList.add('active');
    }
    days.appendChild(dayItem);
    day++;
  }

  calender.appendChild(days);

  //create container to hold dates div
  const dateContainer = document.createElement('div');
  dateContainer.classList.add('calender__container--date');

  //create dates div and append it to dates container
  for (let i = 0; i < lastDay; i++) {
    const date = document.createElement('div');
    date.classList.add('calender__container--date-value');
    date.innerText = i + 1;
    dateContainer.appendChild(date);
  }

  //Append the dates container to calender container
  calender.appendChild(dateContainer);
  const currDates = document.querySelectorAll(
    '.calender__container--date-value'
  );

  //highlight todays date
  for (let i = 0; i < lastDay; i++) {
    if (i + 1 == today.getDate()) {
      currDates[i].classList.add('active');
    }
  }

  const copyright = document.createElement('h3');
  copyright.classList.add('copyright');
  copyright.innerText = 'Developed by Ajju yaduvanshi';
  calender.appendChild(copyright);
}

leftBtn.addEventListener('click', () => {
  if (month == 0) {
    month = 11;
  } else {
    month--;
  }

  renderCalender();
});

rightBtn.addEventListener('click', () => {
  if (month == 11) {
    month = 0;
  } else {
    month++;
  }

  renderCalender();
});

renderCalender();
