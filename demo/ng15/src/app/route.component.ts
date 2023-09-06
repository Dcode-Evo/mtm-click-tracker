import { Component } from '@angular/core';

@Component({
  selector: 'app-route',
  template: `<h1>I'm Route!</h1>
  <div class="card-container">
    <div class="card cursor-pointer"
         data-mtm-click
         data-mtm-category="my-click-category"
         data-mtm-action="click-on-dynamic-link"
         data-mtm-name="click-me"
    >
      CLICK ME!
    </div>
  </div>
  `,
})
export class RouteComponent {
}
