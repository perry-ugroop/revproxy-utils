import ReactDOMServer from 'react-dom/server';
import fs from 'fs';


class Util {
  bufferedHtml = null;

  toHtml = (jsx) => {
    if(this.bufferedHtml === null) {
      this.bufferedHtml = fs.readFileSync(`${__dirname}/../template.html.tpl`, { encoding: 'utf8' });
    }

    return this.bufferedHtml.replace('</body>', ReactDOMServer.renderToString(jsx) + '</body>');
  }
}

export default new Util();

