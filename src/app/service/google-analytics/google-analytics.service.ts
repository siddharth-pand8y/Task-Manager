import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  eventLogging(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = '',
    eventValue: any = null
  ): void {
    gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue,
    });
  }
}
