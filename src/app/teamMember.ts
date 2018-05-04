import { Transaction } from './Transaction';

export class TeamMember {
  id: number;
  name: string;
  halfDaysBanked: number;
  datesTakenOff: Transaction[];
}
