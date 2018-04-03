import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teamMembers = [
      { id: 11, name: 'Derek Bodi', marblesEarned: 6, datesTakenOff: [
        '2017-03-16' , '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 12, name: 'Nick Angelo', marblesEarned: 5, datesTakenOff: [
        '2017-03-16' , '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 13, name: 'Rachael Jenkins', marblesEarned: 4, datesTakenOff: [
        '2017-03-16' , '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 14, name: 'Sebastian Salomone', marblesEarned: 3, datesTakenOff: [
        '2017-03-16' , '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] },
      { id: 15, name: 'Zach McGuire', marblesEarned: 2, datesTakenOff: [
        '2017-03-16' , '2017-02-13', '2018-01-03', '2017-07-03', '2017-12-23'
      ] }
    ];
    return {teamMembers};
  }
}