import ReactDOMServer from 'react-dom/server';

const util = {
  toHtml: (jsx) => `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>revproxy-utils</title></head><body>${ReactDOMServer.renderToString(jsx)}</body></html>`,
}

export default util;

