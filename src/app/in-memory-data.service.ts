import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teamMembers = [
      { id: 12, name: 'Nick Angelo', halfDaysBanked: 2, datesTakenOff: [
        '2017-03-16', '2018-01-03', '2017-07-03',
      ] },
      { id: 14, name: 'Sebastian Salomone', halfDaysBanked: 4, datesTakenOff: [
        '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 15, name: 'Zach McGuire', halfDaysBanked: 0, datesTakenOff: [
        '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 13, name: 'Rachael Jenkins', halfDaysBanked: 1, datesTakenOff: [
        '2017-03-16'
      ] },
      { id: 11, name: 'Derek Bodi', halfDaysBanked: 5, datesTakenOff: [
        '2017-03-16', '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] }
    ];
    return {teamMembers};
  }
}
