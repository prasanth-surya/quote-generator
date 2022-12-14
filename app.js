const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const tweetButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loader = document.querySelector(".spinner");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quoteAuthor.textContent) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quoteText.textContent > 120) {
    quoteContainer.classList.add("long-quote");
  } else {
    quoteContainer.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  const response = await fetch(apiUrl);
  apiQuotes = await response.json();
  newQuote();
}

function tweet() {
  let twitterUrl = `https://www.twitter.com/intent/tweet?text=${quoteText.innerText}`;

  window.open(twitterUrl, "_blank");
}

tweetButton.addEventListener("click", tweet);

newQuoteButton.addEventListener("click", getQuotes);

getQuotes();
