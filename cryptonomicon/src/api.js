const API_KEY = 'd29f88523debe6035053402940d020cca16ec76fe9d2bc47d28fa4baa91a9473';

const tickers = new Map();
const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)
const AGGREGATE_INDEX = '5';

socket.addEventListener('message', e => {
  const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data);
  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickers.get(currency) ?? [];
  handlers.forEach(fn => fn(newPrice));
})

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener('open', () => {
    socket.send(message);
  }, { once: true })

}

function subscribeToTickerOnWs(ticker) {
  sendToWebSocket({
    action: 'SubAdd',
    subs: [`5~CCCAGG~${ticker}~USD`]
  });
}

function unsubscribeFromTickerOnWs(ticker) {
  sendToWebSocket({
    action: 'SubRemove',
    subs: [`5~CCCAGG~${ticker}~USD`]
  });
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickers.get(ticker) || [];
  tickers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
}

export const unsubscribeFromTicker = ticker => {
  tickers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
}

export async function loadCoinsList() {
  const f = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true');
  const data = await f.json();
  let coinList = [];
  Object.values(data.Data).forEach(coin => coinList.push(coin.Symbol));
  return coinList
}



