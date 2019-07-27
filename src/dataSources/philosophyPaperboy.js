// import { parse } from 'node-html-parser';
import cheerio from 'cheerio'
import { fromFetch } from 'rxjs/fetch';
import * as Rx from 'rxjs/operators';
import * as Observable from 'rxjs';
// import * as R from 'ramda';

const getPostId = text => text.match(/^post-(?<id>\d+)$/).groups.id;
const getAuthorName = text => {
  const match = text.match(/^.*[bB][yY] (?<author>.*)$/);
  return match ? match.groups.author : undefined;
}

export const record$ = fromFetch(`https://thephilosophypaperboy.com`)
  .pipe(
    Rx.flatMap(response => response.text()),
    Rx.map(cheerio.load),
    Rx.flatMap($ => $('html > body > main > div > ul > li > article > span')),
    Rx.map(span => {
      const id = getPostId(span.parent.attribs.id);
      const $ = cheerio.load(span);
      const linkTag = $('a');
      const hyperlink = linkTag.attr('href');
      const title = linkTag.text();
      const div = $('div');
      const publication = div.find('.feed-source').text();
      const dateText = div.find('.feed-date').text();
      const feedAuthor = div.find('.feed-author').text();
      const author = getAuthorName(feedAuthor || title);
      const date = new Date(dateText);
      const year = date.getFullYear();
      return ({
        id,
        title,
        hyperlink,
        publication,
        date,
        year,
        author,
      })
    }),
  );
