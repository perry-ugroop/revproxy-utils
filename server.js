import jsonfile from 'jsonfile';
import express from 'express';
import React from 'react';
import util from './libs/util';

const config = jsonfile.readFileSync('./config.json');

const app = express();
app.use(express.static(`${__dirname}/assets`));

app.use((req, res) => {
  let reqKeys = Object.keys(req.headers);
  reqKeys.sort();

  const reqEntries = (
    <div id="wrapper">
      <table>
        <thead>
          <tr>
            <th className="key">req.headers prop</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
         { reqKeys.map((item, i) => (<tr key={i} className="key"><td>{item}</td><td>{req.headers[item]}</td></tr>)) }
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>req prop</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="key">httpVersion</td>
            <td>{req.httpVersion}</td>
          </tr>
          <tr>
            <td className="key">method</td>
            <td>{req.method}</td>
          </tr>
          <tr>
            <td className="key">originalUrl</td>
            <td>{req.originalUrl}</td>
          </tr>
          <tr>
            <td className="key">params</td>
            <td>json: {JSON.stringify(req.params)}</td>
          </tr>
          <tr>
            <td className="key">query</td>
            <td>json: {JSON.stringify(req.query)}</td>
          </tr>
          <tr>
            <td className="key">url</td>
            <td>{req.url}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  res.send(util.toHtml(reqEntries));
});

console.log(`Listening on port ${config.port}...`);
app.listen(config.port);

