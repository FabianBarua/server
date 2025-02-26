// import { loadNextFixtures } from '@/core/services/fixture'
// import { getNextFootballMatch } from '@/core/services/fixture/getNextGame'
// import { simple_response_template } from '@/core/templates'
// import { processCommandResponse, teamMatchQueryParams } from '@/types/nlp'

import { Message, team, teamMatchQueryParams } from "@/utils/types"
import { simple_response_template } from "@/views/templates"

// @ts-ignore
const getFormattedDate = (date: number) => {
  const daysOfWeek = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado'
  ]
  const formattedDate = new Date(date)
  const dayOfWeek = daysOfWeek[formattedDate.getDay()]
  const day = formattedDate.getDate()
  const month = formattedDate.toLocaleString('pt-BR', { month: 'long' })

  return `${dayOfWeek}, ${day} de ${month}`
}

export async function getNearestGameForTeam ({
  team
}: teamMatchQueryParams): Promise<Message | null> {

  if (!team.id) {
    return null
  }

  return await simple_response_template(
    `O próximo jogo do ${team.name} é contra o time adversário no dia da semana, dia e mês`
  )

  // const data = await loadNextFixtures(team.id)

  // const nextMatch = getNextFootballMatch(data)

  // if (!data || !nextMatch) {
  //   return await simple_response_template(
  //     `Não foi possível encontrar o próximo jogo do time ${team.name}`
  //   )
  // }

  // return await simple_response_template(
  //   `O próximo jogo do ${nextMatch.teams[1]} é contra o ${
  //     nextMatch.teams[0]
  //   } no dia ${getFormattedDate(nextMatch.matchDate)}`
  // )
}

export async function findNextMatchForTwoTeams ({
  teams
}: {
  teams: team[]
}): Promise<Message | null> {

  console.log('teams', teams)

  if (teams.length === 1) {
    return await getNearestGameForTeam({
      team: teams[0]
    })
  }
  

  return await simple_response_template(`O próximo jogo do ${teams[0]?.name} é contra o ${teams[1]?.name} no dia da semana, dia e mês`)

  // const data = await loadNextFixtures(team.id)

  // const nextMatch = getNextFootballMatch(data)

  // if (!data || !nextMatch) {
  //   return await simple_response_template(
  //     `Não foi possível encontrar o próximo jogo do time ${team.name}`
  //   )
  // }

  // return await simple_response_template(
  //   `O próximo jogo do ${nextMatch.teams[1]} é contra o ${
  //     nextMatch.teams[0]
  //   } no dia ${getFormattedDate(nextMatch.matchDate)}`
  // )
}
