import jsonfile from 'jsonfile';
import express from 'express';
import React from 'react';
import util from './libs/util';

const config = jsonfile.readFileSync('./config.json');

const app = express();
app.use(express.static(`${__dirname}/assets`));

app.use((req, res, next) => {
  let reqKeys = Object.keys(req.headers);
  reqKeys.sort();

  let reqProps = ['httpVersion', 'method', 'originalUrl', 'params', 'query', 'url'];
  reqProps.sort();

  const reqEntries = (
    <div id="wrapper">
      <table>
        <thead>
          <tr>
            <th className="key">req.headers item</th>
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
         { 
           reqProps.map((item, i) => (
             <tr key={i}><td className="key">{item}</td>
               <td>{ typeof(req[item]) === 'undefined' ? '' : 
                       (typeof(req[item]) !== 'object' ? (typeof(req[item]) !== 'boolean' ? req[item] : (req[item] ? 'true' : 'false')) : 'json: ' + JSON.stringify(req[item])) 
               }</td>
             </tr>)) 
         }
        </tbody>
      </table>
    </div>
  );

  res.set({ 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Expires': 0 });
  res.send(util.toHtml(reqEntries));

  return next();
});

console.log(`Listening on port ${config.port}...`);
app.listen(config.port);

