const form = document.querySelector('#booking-form');
const date = document.querySelector('#booking-date');
const result = document.querySelector('#booking-result');
function todayInYerevan() {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'Asia/Yerevan', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
  const part = type => parts.find(p => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
date.min = todayInYerevan();
date.addEventListener('input', () => date.setCustomValidity(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  date.min = todayInYerevan();
  if (!form.reportValidity()) return;
  const name = document.querySelector('#booking-name');
  if (!name.value.trim()) {
    name.setCustomValidity('Please enter your name.');
    name.reportValidity();
    return;
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', {dateStyle:'long',timeZone:'UTC'}).format(new Date(`${date.value}T12:00:00Z`));
  document.querySelector('#booking-summary').textContent = `${name.value.trim()}, here is how your visit would look.`;
  const recap = document.querySelector('#booking-recap');
  recap.replaceChildren();
  const guests = document.querySelector('#booking-guests').value;
  const rows = [['Date',formattedDate],['Time',`${document.querySelector('#booking-time').value} · Yerevan`],['Party',`${guests} ${guests === '1' ? 'guest' : 'guests'}`]];
  for (const [label,value] of rows) {
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    recap.append(term,description);
  }
  form.hidden = true;
  result.hidden = false;
  result.focus();
});
document.querySelector('#booking-name').addEventListener('input', event => event.target.setCustomValidity(''));
document.querySelector('#booking-edit').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  date.focus();
});
