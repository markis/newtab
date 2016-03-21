/// <reference path="interfaces/_globals.d.ts" />
import './stylesheets/reset';
import './stylesheets/popup';

import * as React from 'react';
import { render } from 'react-dom';

const app = (
  <form>
    <fieldset>
      <label>
        Off
        <input type="checkbox" />
        <span class="lever"></span>
        On
      </label>
    </fieldset>
  </form>
);

setTimeout(() => {
  render(app, document.body.children[0]);
}, 1);
