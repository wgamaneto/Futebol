// body
const validLoginBody = { email: 'valid_email@mail.com', password: 'teste'};
const noEmailLoginBody = { password: 'valid_password' };
const noPasswordLoginBody = { email: 'valid_email@mail.com'};
const invalidEmailLoginBody = { email: 'invalid_email', password: 'valid_password'};
const newMatchBody = {
  "homeTeam": 16, 
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const newMatchEqualTeamsBody = {
  "homeTeam": 8, 
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const updateMatchBody = { 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

// user
const userMock = {
  id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
}

// team
const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  }
]

const team = {
  id: 1,
  teamName: "Avaí/Kindermann"
}

// matches

const matches = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 40,
    "homeTeam": 12,
    "homeTeamGoals": 4,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Palmeiras"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
]

const matchInProgressFalse = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
]

const matchInProgressTrue = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
]

const newMatch = {
  "id": 49,
  "homeTeam": 1,
  "awayTeam": 3,
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
  "inProgress": true
}

// leaderboard

const leaderBoardHome = [
  {
    name: 'Santos',
    totalPoints: '9',
    totalGames: '3',
    totalVictories: '3',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '9',
    goalsOwn: '3',
    goalsBalance: '6',
    efficiency: '100'
  },
  {
    name: 'Palmeiras',
    totalPoints: '7',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '1',
    totalLosses: '0',
    goalsFavor: '10',
    goalsOwn: '5',
    goalsBalance: '5',
    efficiency: '77.78'
  },
  {
    name: 'Corinthians',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '6',
    goalsOwn: '1',
    goalsBalance: '5',
    efficiency: '100'
  },
  {
    name: 'Grêmio',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '4',
    goalsOwn: '1',
    goalsBalance: '3',
    efficiency: '100'
  },
  {
    name: 'Real Brasília',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '2',
    goalsOwn: '0',
    goalsBalance: '2',
    efficiency: '100'
  },
  {
    name: 'São Paulo',
    totalPoints: '4',
    totalGames: '2',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '0',
    goalsFavor: '4',
    goalsOwn: '1',
    goalsBalance: '3',
    efficiency: '66.67'
  },
  {
    name: 'Internacional',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '4',
    goalsOwn: '6',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Botafogo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '2',
    goalsOwn: '4',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Ferroviária',
    totalPoints: '3',
    totalGames: '2',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '3',
    goalsOwn: '2',
    goalsBalance: '1',
    efficiency: '50'
  },
  {
    name: 'Napoli-SC',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '2',
    goalsOwn: '2',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Cruzeiro',
    totalPoints: '1',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '2',
    goalsOwn: '3',
    goalsBalance: '-1',
    efficiency: '16.67'
  },
  {
    name: 'Flamengo',
    totalPoints: '1',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '2',
    goalsBalance: '-1',
    efficiency: '16.67'
  },
  {
    name: 'Minas Brasília',
    totalPoints: '1',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '2',
    goalsFavor: '3',
    goalsOwn: '6',
    goalsBalance: '-3',
    efficiency: '11.11'
  },
  {
    name: 'Avaí/Kindermann',
    totalPoints: '1',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '2',
    goalsFavor: '3',
    goalsOwn: '7',
    goalsBalance: '-4',
    efficiency: '11.11'
  },
  {
    name: 'São José-SP',
    totalPoints: '0',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '2',
    goalsOwn: '5',
    goalsBalance: '-3',
    efficiency: '0'
  },
  {
    name: 'Bahia',
    totalPoints: '0',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '0',
    goalsOwn: '4',
    goalsBalance: '-4',
    efficiency: '0'
  }
]

const leaderBoardAway = [
  {
    name: 'Palmeiras',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '7',
    goalsOwn: '0',
    goalsBalance: '7',
    efficiency: '100'
  },
  {
    name: 'Corinthians',
    totalPoints: '6',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '6',
    goalsOwn: '2',
    goalsBalance: '4',
    efficiency: '66.67'
  },
  {
    name: 'Internacional',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '0',
    goalsBalance: '3',
    efficiency: '100'
  },
  {
    name: 'São José-SP',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '1',
    goalsBalance: '2',
    efficiency: '100'
  },
  {
    name: 'São Paulo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '5',
    goalsBalance: '0',
    efficiency: '44.44'
  },
  {
    name: 'Ferroviária',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '4',
    goalsOwn: '5',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Real Brasília',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '3',
    goalsOwn: '4',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Grêmio',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '7',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Flamengo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Avaí/Kindermann',
    totalPoints: '3',
    totalGames: '2',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '1',
    goalsBalance: '0',
    efficiency: '50'
  },
  {
    name: 'Cruzeiro',
    totalPoints: '3',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '6',
    goalsOwn: '7',
    goalsBalance: '-1',
    efficiency: '33.33'
  },
  {
    name: 'Santos',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '3',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Bahia',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '2',
    goalsOwn: '2',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Minas Brasília',
    totalPoints: '1',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '16.67'
  },
  {
    name: 'Botafogo',
    totalPoints: '0',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '1',
    goalsOwn: '4',
    goalsBalance: '-3',
    efficiency: '0'
  },
  {
    name: 'Napoli-SC',
    totalPoints: '0',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '1',
    goalsOwn: '10',
    goalsBalance: '-9',
    efficiency: '0'
  }
]

export {
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidEmailLoginBody,
  newMatchEqualTeamsBody,
  newMatchBody,
  updateMatchBody,
  userMock,
  teams,
  team,
  matches,
  matchInProgressFalse,
  matchInProgressTrue,
  newMatch,
  leaderBoardHome,
  leaderBoardAway
}