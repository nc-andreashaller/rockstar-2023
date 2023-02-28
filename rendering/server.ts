import 'zone.js/node';

import {AzureFunction, Context, HttpRequest} from "@azure/functions";
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

function getPath(req: HttpRequest) {
  const header = req.headers['x-routing-path'];
  if(!!header) {
    return header;
  }

  const query = new URLSearchParams(req.query);
  if(query.has('path')) {
    return query.get('path');
  }

  return false;
}

// The Express app is exported so that it can be used by serverless Functions.
export const run: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  context.log('url', req.url);
  
  const server = express();
  context.log('express created');
  const distFolder = join(process.cwd(), 'dist/rendering/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  server.set('view engine', 'html');
  server.set('views', distFolder);

  const body = await (new Promise<string>(resolve => {
    //resolve(`debug ${process.cwd()} | ${fs.readdirSync(process.cwd())} |`);
    context.log('rendering index');
    try {
      const path = getPath(req);
      if(!path) {
        resolve('404');
      }
      server.render(indexHtml, { req, url: `http://localhost:4280${path}`, providers: [{ provide: 'SSR_PATH', useValue: path }] }, (err, doc) => {
        context.log('index rendered');
        if(err) {
          resolve(`fail ${err}`);
        } else {
          resolve(doc);
        }
      });
      context.log('rendering index (waiting)');
    } catch(e) {
      context.log('rendering failed', e);
      resolve('fail');
    } 
  }));

  context.log('creating response');
  context.res = {
      // status: 200, /* Defaults to 200 */
      headers: {
        "Content-Type": "text/html"
      },
      body: body || ''
  };

}
