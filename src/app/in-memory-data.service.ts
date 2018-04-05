import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teamMembers = [
      { id: 12, name: 'Nick Angelo', datesTakenOff: [
        '2017-03-16', '2018-01-03', '2017-07-03',
      ] },
      { id: 14, name: 'Sebastian Salomone', datesTakenOff: [
        '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 15, name: 'Zach McGuire', datesTakenOff: [
        '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 13, name: 'Rachael Jenkins', datesTakenOff: [
        '2017-03-16'
      ] },
      { id: 11, name: 'Derek Bodi', datesTakenOff: [
        '2017-03-16', '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] }
    ];
    return {teamMembers};
  }
}
