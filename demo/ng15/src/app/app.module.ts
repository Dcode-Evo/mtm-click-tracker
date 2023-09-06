import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteComponent } from './route.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatomoModule.forRoot({
      scriptUrl: '/assets/matomo.js',
      trackers: [
        {
          trackerUrl: 'http://fake.matomo.link/fake-matomo.php',
          siteId: 1,
        },
      ],
      routeTracking: {
        enable: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
