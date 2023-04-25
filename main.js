const myForm = document.querySelector('.myForm');
const result = document.querySelector('.result');
let select = document.querySelectorAll('select');
let input = document.querySelector('.amountNum');
const url = "https://v6.exchangerate-api.com/v6/a45865e18835785346feaeb5/latest/USD";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let countryCode = data.conversion_rates;
    let arrKey = Object.keys(countryCode);
    let key = arrKey.map((e) => {
      let keys = `<option value="${e}">${e}</option>`;
      return keys;
    })
    select[0].innerHTML += key;
    select[1].innerHTML += key;
  });
myForm.addEventListener('submit', (d) => {
  d.preventDefault();
  const from = select[0].value;
  const to = select[1].value;
  let amount = input.value;
  fetch(`https://v6.exchangerate-api.com/v6/a45865e18835785346feaeb5/latest/${from}`)
    .then((res) => res.json())
    .then((data) => {
      const exchangeRate = data.conversion_rates[to];
      const convertes = (amount * exchangeRate) ;
      result.innerHTML = `${amount} ${from} = ${convertes} ${to}`;
      if(isNaN(amount) || amount <= 0) {
        result.innerHTML = 'Please Enter A Valid Number';
      }
    })
})  

