import { paramsInterface } from '@/utils/types'
import { footballTeams } from '@/utils/constants'
import { getFromEnties } from '@/utils/helpers'

interface footballTeam {
  id: string
  name: string
  synonyms: string[]
}

interface getFirstTeamProps {
  text: string
}

function ExtractFootballTeams ({ text }: getFirstTeamProps): footballTeam[] {
  const tag = '#FootballTeam'

  const teamsById = getFromEnties({
    tag,
    text,
    enties: Object.values(footballTeams).flat()
  })

  return teamsById || []
}

function getFirstTeam ({ text }: getFirstTeamProps): paramsInterface {
  const teams = ExtractFootballTeams({ text })

  if (teams.length === 0) {
    return {}
  }

  return {
    team: {
      id: teams[0].id,
      name: teams[0].name
    }
  }
}

function getTwoTeams ({ text }: getFirstTeamProps): paramsInterface {
  const teams = ExtractFootballTeams({ text })

  if (teams.length === 0) {
    return {}
  }

  return {
    teams: 
      teams.map(team => ({
        id: team.id,
        name: team.name
      })) || []
  }
}

export { getFirstTeam, getTwoTeams }
