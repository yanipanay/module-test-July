const API = "3be0b9ccfa1a7d79e38b4f8fd547cf51";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;

const sunnyPic = "./images/Sun cloud angled rain.png";
const windyPic = "./images/Tornado.png";
const rainyPic = "./images/Moon cloud mid rain.png";
const cloudyPic = "./images/Moon cloud fast wind.png";

const set = new Set();
const arr = [];

async function getData(url) {
  const FetchedData = await fetch(url);
  const data = await FetchedData.json();
  //   console.log(data);
  return data;
}

function City(temp, tempH, tempL, name, country, details, main) {
  this.temp = temp;
  this.tempH = tempH;
  this.tempL = tempL;
  this.name = name;
  this.country = country;
  this.details = details;
  this.main = main;
}

async function ans() {
  const searchBar = document.getElementById("search_bar");
  const city = searchBar.value;
  searchBar.value = "";
  if (city === "" || set.has(city.toUpperCase())) return;
  set.add(city.toUpperCase());
  //   console.log(set);
  const data = await getData(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
  );
  //   console.log(data);
  const temp = data.main.temp;
  const tempL = data.main.temp_min;
  const tempH = data.main.temp_max;
  const name = data.name;
  const country = data.sys.country;
  const details = data.weather[0].description;
  const main = data.weather[0].main;

  let obj = new City(temp, tempH, tempL, name, country, details, main);
  arr.push(obj);
  arr.sort(compare);
  displayData(arr);
}

function compare(city1, city2) {
  return city1.temp - city2.temp;
}

function displayData(arr) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let city = arr[i];
    const card = document.createElement("div");
    let imgSrc = sunnyPic;

    if (city.main == "Clouds") imgSrc = cloudyPic;
    if (city.main == "Rain") imgSrc = rainyPic;

    card.innerHTML = `<div class="card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="339"
          height="175"
          viewBox="0 0 339 175"
          fill="none"
        >
          <path
            d="M0.42749 66.6407C0.42749 31.7636 0.42749 14.325 11.7839 5.31681C23.1403 -3.69137 40.1213 0.277541 74.0831 8.21537L304.442 62.0566C320.747 65.8675 328.899 67.773 333.663 73.779C338.427 79.7849 338.427 88.1572 338.427 104.902V131C338.427 151.742 338.427 162.113 331.984 168.556C325.54 175 315.169 175 294.427 175H44.4275C23.6857 175 13.3148 175 6.87114 168.556C0.42749 162.113 0.42749 151.742 0.42749 131V66.6407Z"
            fill="url(#paint0_linear_638_13)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_638_13"
              x1="0.42749"
              y1="128"
              x2="350.427"
              y2="128"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#5936B4" />
              <stop offset="1" stop-color="#362A84" />
            </linearGradient>
          </defs>
        </svg>
        <div class="left">
          <div class="temperature">${city.temp}°</div>
          <div class="details">
            <div class="topDetails">H:${city.tempH}° L:${city.tempL}°</div>
            <div class="locDetails">${city.name},${city.country}</div>
          </div>
        </div>
        <div class="right">
          <div class="image">
            <img
              src="${imgSrc}"
              alt=""
              width="140px"
              height="140px"
            />
          </div>
          <div class="weather">${city.details}</div>
        </div>
      </div>`;

    container.appendChild(card);
  }
}
