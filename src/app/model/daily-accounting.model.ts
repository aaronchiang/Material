export class DailyAccounting {
  CurrentTime: Date = new Date();
  BaseDate: Date = new Date();
  IsNavReady = false;
  IsWork: boolean;
  Confirmed = 0;
  Locked = 0;
  Done = false;
  FundList: Array<AccountingFund> = new Array<AccountingFund>();
  SummaryList: Array<Summary> = new Array<Summary>();
}

export class AccountingFund {
  FundId: string;
  FundName: string;
  Nav: number;
  NavDate: string;
  IsConfirmed: boolean;
  IsLocked: boolean;
}

export class Summary {
  LogTime: Date;
  Description: string;
}
