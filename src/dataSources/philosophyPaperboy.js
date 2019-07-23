// import { parse } from 'node-html-parser';
import cheerio from 'cheerio'
import { fromFetch } from 'rxjs/fetch';
import * as Rx from 'rxjs/operators';
import * as Observable from 'rxjs';
// import * as R from 'ramda';

export const record$ = fromFetch(`https://thephilosophypaperboy.com`)
  .pipe(
    Rx.flatMap(response => response.text()),
    Rx.map(cheerio.load),
    Rx.flatMap($ => $('html > body > main > div > ul > li > article > span')),
    Rx.map(span => {
      const $ = cheerio.load(span);

      const hyperlink = $('a').attr('href');

      const div = $('div');
      const publication = div.find('.feed-source').text();
      const dateText = div.find('.feed-date').text();
      const date = new Date(dateText);

      return ({
        hyperlink,
        publication,
        date,
      })
      debugger;

    }),
  );
