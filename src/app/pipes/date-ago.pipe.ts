import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "dateAgo",
  pure: true,
})
export class DateAgoPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    const JUST_NOW_THRESHOLD = 10;
    const MILLISECONDS_TO_SECONDS = 1000;
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / MILLISECONDS_TO_SECONDS);
      if (seconds < JUST_NOW_THRESHOLD) { // less than 30 seconds ago will show as 'Just now'
        return "Just now";
      }
      // tslint:disable:object-literal-sort-keys
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        if (intervals.hasOwnProperty(i)) {
          counter = Math.floor(seconds / intervals[i]);
          if (counter > 0) {
            if (counter === 1) {
              return counter + " " + i + " ago"; // singular (1 day ago)
            } else {
              return counter + " " + i + "s ago"; // plural (2 days ago)
            }
          }
        }
      }
    }
    return value;
  }

}
