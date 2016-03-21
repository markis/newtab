/// <reference path="interfaces/_globals.d.ts" />
import './stylesheets/reset';
import './stylesheets/newtab';

import CacheContext from './components/cache-context';
import HeroImage from './components/hero-image';
import Timer from './components/timer';
import Clock from './components/clock';
import * as React from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

const transparentGif = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const app = (
  <CacheContext cacheKey="photo" defaultValue={transparentGif}>
    {(backgroundUrl: string) => backgroundUrl && (
      <HeroImage backgroundUrl={backgroundUrl}>
        <div className="container">
          <h1 className="headline">
            <Timer>
              {(hours: number, minutes: number) => (
                <Clock hours={hours} minutes={minutes} />
              )}
            </Timer>
          </h1>
        </div>
      </HeroImage>
    )}
  </CacheContext>
);

setTimeout(() => {
  render(app, document.body.children[0]);
}, 1);
