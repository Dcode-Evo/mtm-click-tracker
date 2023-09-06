type MatomoEvent = [category: string, action: string, name?: string, value?: number];

export class MatomoClickTracker {
  private destroyed = false;
  private minimalDataAttr = ['category', 'action'];
  private otherDataAttr = ['name', 'value'];
  private readonly debug: (type: 'log' | 'error', ...args: any[]) => void;
  private readonly clickHandler: (e: MouseEvent) => void;

  constructor(enableDebug = false) {
    if (!enableDebug) {
      this.debug = (type, ...args) => {
      };
    } else {
      this.debug = this.debugLog;
    }
    this.clickHandler = this.onClick.bind(this);

    this.addListener();
  }

  /**
   * Track matomo event
   * @param args {[category: string, action: string, name?: string, value?: number]}
   */
  trackEvent(...args: MatomoEvent) {
    if (!this.destroyed) {
      this.debug('log', 'Click tracking data:', args);
      window._paq?.push(['trackEvent', ...args]);
    }
  }

  /**
   * Stop tracking clicks on marked elements and disable `trackEvent` method.
   */
  destroy() {
    this.destroyed = true;
    document.removeEventListener('click', this.clickHandler);
  }

  private onClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    const element = target?.closest<HTMLElement>('[data-mtm-click]');
    if (element) {
      const eventData = this.getTrackingData(element);
      if (eventData) {
        this.trackEvent(...eventData);
      }
    }
  }

  private addListener() {
    document.addEventListener('click', this.clickHandler);
  }

  private getTrackingData(element: HTMLElement): MatomoEvent | null {
    const oneAttribute = this.getOneAttributeData(element);
    if (oneAttribute) {
      return oneAttribute;
    }
    const data: Partial<MatomoEvent> = [];
    this.minimalDataAttr.forEach((name) => {
      const value = element.dataset[`mtm${this.capitalize(name)}`];
      if (value) {
        data.push(value);
      } else {
        this.debug('error', `Missing Matomo click tracking attribute: "data-mtm-${name}"`);
      }
    });
    if (data.length < 2) {
      return null;
    }
    this.otherDataAttr.forEach((name) => {
      const value = element.dataset[`mtm${this.capitalize(name)}`];
      if (value) {
        if (name === 'value') {
          data.push(new Number(value).valueOf());
        } else {
          data.push(value);
        }
      }
    });
    return data as MatomoEvent;
  }

  private getOneAttributeData(element: HTMLElement): MatomoEvent | null {
    const oneAttribute = element.dataset.mtmClick;
    if (!oneAttribute) {
      return null;
    }
    const list: any[] = oneAttribute.split(/[,;]/).map((i: string) => i.trim());
    if (list[0] && list[1] && list.length <= 4) {
      if (list[3]) {
        list[3] = new Number(list[3]).valueOf();
      }
      return list as MatomoEvent;
    }
    return null;
  }

  private capitalize(string: string): string {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  private debugLog(type: 'log' | 'error' = 'error', ...args: any[]) {
    if (type === 'log') {
      console.log(...args);
    } else {
      console.error(...args);
    }
  }
}
