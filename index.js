`use strict`;
const signUp = document.querySelector(`.sign_up`);
const login__container = document.querySelector(`.login__container`);
const hidden = document.querySelector(`.hidden`);
const username = document.querySelector(`#Username`);
const number = document.querySelector(`#number`);
const date = document.querySelector(`#Date`);
const submit = document.querySelector(`#submit`);
const password = document.querySelector(`#password`);
const login_number = document.querySelector(`#login_number`);
const login__password = document.querySelector(`#login__password`);
const login = document.querySelector(`#login`);
const hidden_dashbaord = document.querySelector(`.hidden_dashbaord`);
const search = document.querySelector(`.search`);
const display = document.querySelector(`.display`);
const search__input = document.querySelector(`#search__input`);
const welcome = document.querySelector(`.Welcome`);
const success = document.querySelectorAll(`.success`);
const error = document.querySelectorAll(`.error`);
const errorForlogin = document.querySelector(`.errorForlogin`);




class inputvalue {
  constructor(username, number, date, password) {
    this.username = username;
    this.number = number;
    this.date = date;
    this.password = password;
  }
}

class validate {
  constructor() {
    this.personalData = [];
    this._getLocalStorage();
    this._signup();
    submit.addEventListener(`submit`, this._getdatailes.bind(this));
  }
  _signup() {
    signUp.addEventListener(`click`, function (e) {
      e.preventDefault();
      login__container.classList.add(`hidden`);
      hidden.classList.add(`create____back__container`);
    });
  }
  _getdatailes(e) {
    e.preventDefault();
    let user = username.value;
    let phoneNumber = +number.value;
    let dateOfBirth = +date.value;
    let userPassword = +password.value;

    const datailes = new inputvalue(
      user,
      phoneNumber,
      dateOfBirth,
      userPassword
    );
    if (
      user === `` ||
      phoneNumber === `` ||
      dateOfBirth === `` ||
      userPassword === ``
    ) {
        this._errorMassage()
       // throw new Error(`invalide input`);
    } else {
        this._seccessfullMassage();
      this.personalData.push(datailes);
      username.value = number.value = date.value = password.value = ``;
    }
    this._setLocalStorage();
  }
  _seccessfullMassage(){
    success.forEach(el => {
        el.classList.add(`success_active`)
    });
  }

  _setLocalStorage() {
    localStorage.setItem(`datas`, JSON.stringify(this.personalData));
  }
  _getLocalStorage() {
    
    const data = JSON.parse(localStorage.getItem(`datas`));
    if (!data) {
    } else {
      this.personalData = data;

      this._verify();
    }
  }
  _verify() {
    this.personalData.forEach((personal) => {
      const user = personal.username;
      const phoneNumber = personal.number;
      const userPassword = personal.password;
      login.addEventListener(`click`, function (e) {
        e.preventDefault();
        const lNumber = login_number.value;
        const lPassword = +login__password.value;
        

        if (lPassword === userPassword && lNumber === user) {
          // console.log(phoneNumber);
          login.textContent = ` Loading `

          
          setTimeout(function () {
            welcome.textContent = `Welcome ${lNumber
                }`;
            login__container.classList.add(`hidden`);
            hidden_dashbaord.classList.add(`country__data`);
          }, 2000);
        } else {
            errorForlogin.classList.add(`error_active`)

            
        }
      });
    });
  }
  _errorMassage(){
        error.classList.add(`error_active`)

  }
}

const Validate = new validate();

///
const a = `tiddy`
console.log(a);

search.addEventListener(`click`, function (e) {
  e.preventDefault();
  const getCountryName = String( search__input.value[0]).toUpperCase() + String( search__input.value).slice(1);
  console.log(getCountryName);

  const request = new XMLHttpRequest();
  request.open(
    `GET`,
    `https://restcountries.com/v3.1/name/${getCountryName}
    `
  );
  request.send();
  request.addEventListener(`load`, function () {
    const [data] = JSON.parse(this.responseText);
    if (!data.Borders) {
        return 0
    }
    
    const html = `
  <div class="view">
            <img id="image" src="${data.flags.svg}">
            <div class="contain">
                <h1>Country💖: ${data.name.common}</h1>
                <p>Time zone⏲: ${data.timezones}</p>
                <p>Region💒: ${data.region}</p>
                <p>Capital🌆
                : ${data.capital}</p>
                <p>startOfWeek▶: ${data.startOfWeek}</p>
                <p>Population👨‍👨‍👧‍👧: ${data.population}</p>
                <p id="Borders">Borders⛵: ${data.borders}</p>

                
            </div>
            <div class="delete">
            <img class="coatOfArms" src="${data.coatOfArms.svg}">

            </div>

        </div>

  `;
    display.insertAdjacentHTML(`afterbegin`, html);
  });
});
