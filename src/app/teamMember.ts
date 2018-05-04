import { Transaction } from './Transaction';

export class TeamMember {
  id: number;
  name: string;
  halfDaysBanked: number;
  datesTakenOff: Transaction[];

  getNumberOfHalfDaysTaken(): number {
    let count = 0;
    this.datesTakenOff.forEach(day => {
      if (day.isHalfDay) {
        count++;
      } else {
        count += 2;
      }
    });
    return count;
  }
}
