export default `SELECT h.team_name as name,
CAST(SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3 ELSE 0 END) AS UNSIGNED) +
CAST(SUM(CASE WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED) 
  AS totalPoints,
COUNT(h.team_name) as totalGames,
CAST(SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED) 
  AS totalVictories,
CAST(SUM(CASE WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)
  AS totalDraws,
CAST(SUM(CASE WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)
  AS totalLosses,
CAST(SUM(m.away_team_goals) AS UNSIGNED) AS goalsFavor,
CAST(SUM(m.home_team_goals) AS UNSIGNED) AS goalsOwn,
CAST(SUM(m.away_team_goals) - SUM(m.home_team_goals) AS SIGNED) AS goalsBalance,
ROUND(
  SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3 
      WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) /
  ((COUNT(h.team_name) * 3)) * 100  
,2) as efficiency
from TRYBE_FUTEBOL_CLUBE.matches as m
inner join TRYBE_FUTEBOL_CLUBE.teams as h on m.away_team = h.id
WHERE m.in_progress = 0
GROUP BY h.team_name
ORDER BY 
  totalPoints DESC, 
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn DESC;`;
