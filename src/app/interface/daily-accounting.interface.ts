import { Observable } from 'rxjs/Observable';
import { DailyAccounting } from '../model/daily-accounting.model';

export abstract class IDailyAccounting {
  readonly dailyAccounting$: Observable<DailyAccounting>;
  abstract getDailyAccounting(): void;
}
