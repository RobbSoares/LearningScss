const theme = document.querySelector('.theme');
const btn = document.querySelector('.button');

btn.addEventListener('click', () => {
  if (!theme.classList.contains('.light')) {
    theme.classList.toggle('light');
  }
})
