import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teamMembers = [
      { id: 11, name: 'Derek Bodi', marblesEarned: 6 },
      { id: 12, name: 'Nick Angelo', marblesEarned: 5},
      { id: 13, name: 'Rachael Jenkins', marblesEarned: 4 },
      { id: 14, name: 'Sebastian Salomone', marblesEarned: 3 },
      { id: 15, name: 'Zach McGuire', marblesEarned: 2 }
    ];
    return {teamMembers};
  }
}
