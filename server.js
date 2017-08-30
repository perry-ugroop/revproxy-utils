import jsonfile from 'jsonfile';
import express from 'express';
import React from 'react';
import util from './libs/util';

const config = jsonfile.readFileSync('./config.json');

const app = express();
app.get('/', (req, res) => {
  let reqKeys = Object.keys(req.headers);
  reqKeys.sort();

  const reqEntries = (
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
       { reqKeys.map((item, i) => (<tr key={i}><td>{item}</td><td>{req.headers[item]}</td></tr>)) }
      </tbody>
    </table>
  );

  res.send(util.toHtml(<div>{reqEntries}</div>));
});

console.log(`Listening on port ${config.port}...`);
app.listen(config.port);

