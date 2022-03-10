const API_KEY = 'd29f88523debe6035053402940d020cca16ec76fe9d2bc47d28fa4baa91a9473';

const tickers = new Map();

export const loadTickers = () => {
  if (tickers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickers.keys()].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then(r => r.json())
    .then(rawData => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([name, value]) => [name, value.USD])
      )

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickers.get(currency) ?? [];
        handlers.forEach(fn => fn(newPrice));
      })
    });
}


export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickers.get(ticker) || [];
  tickers.set(ticker, [...subscribers, cb]);
}

export const unsubscribeFromTicker = (ticker, cb) => {
  const subscribers = tickers.get(ticker) || [];
  tickers.set(ticker, subscribers.filter(fn => fn !== cb));
}

setInterval(loadTickers, 5000);

window.tickers = tickers;
