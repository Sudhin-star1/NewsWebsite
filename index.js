const today = document.getElementById("today");
const newsContainer = document.getElementById("news-section");
const mainHeadlines = document.getElementById("moving-headline");

let now = new Date().toDateString();

console.log();

today.innerHTML = `${now}`;

const url =
  "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete?query=%3CREQUIRED%3E";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "97e540ab05mshce23918522e8addp1404bcjsn99094ff5708d",
    "X-RapidAPI-Host": "bloomberg-market-and-financial-news.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result.news[0].longURL);
  const marqueeHeadings = [];

  if (result.news) {
    for (let i = 0; i < 18; i++) {
        if(i < 5){
            marqueeHeadings.push(result.news[i].title)
        }
        mainHeadlines.innerHTML = marqueeHeadings.join(". ");
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("news-div");
      newsDiv.innerHTML = `<p style="margin-bottom: 1rem; ">${result.news[i].card}</p>`;
      newsDiv.innerHTML += `<strong style="font-size: 2rem; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">${result.news[i].title}</strong>`;
      newsDiv.innerHTML += `<h2 style="font-size: 1.2rem; margin: 1rem 0; "><a href='${result.news[i].longURL}'>Click here to read the full news</a></h2>`;
      newsContainer.appendChild(newsDiv);
    }
  }
} catch (error) {
  console.error(error);
}
