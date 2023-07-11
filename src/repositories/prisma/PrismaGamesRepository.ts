import { Prisma, Game } from '@prisma/client'
import { GamesProps, GamesRepository } from '../GamesRepository'
import { prisma } from '@/lib/prisma'

interface QueryGamesProps {
  id: string
  date: string
  category_id: string
  category_name: string
  group_id: string
  group_name: string
  team_a_id: string
  team_a_name: string
  image_a: string
  team_b_id: string
  team_b_name: string
  image_b: string
}

export class PrismaGamesRepository implements GamesRepository {
  async create(data: Prisma.GameUncheckedCreateInput): Promise<Game> {
    const game = await prisma.game.create({ data })

    return game
  }

  async findById(id: string): Promise<Game | null> {
    const game = await prisma.game.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return game
  }

  async findByCupConfigId(cupConfigId: string): Promise<GamesProps[]> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
              team_a.id as team_a_id,
              team_a.name as team_a_name, 
              team_a.image as image_a,
              team_b.id as team_b_id,
              team_b.name as team_b_name,
              team_b.image as image_b,
              c.id as category_id, 
              c.name as category_name, 
              gr.id as group_id, 
              gr.name as group_name 
              FROM games AS g
              LEFT JOIN teams AS team_a ON team_a.id = g.team_a
              LEFT JOIN teams AS team_b ON team_b.id = g.team_b
              LEFT JOIN categories AS c ON c.id = g.category_id
              LEFT JOIN groups AS gr ON gr.id = g.group_id
              where c.cup_config_id = ${cupConfigId}
              GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, c.id, gr.id, team_a.image, team_b.image
              ORDER BY g.date`

    const returnGames: GamesProps[] = []

    games.map((item) =>
      returnGames.push({
        id: item.id,
        date: new Date(item.date),
        categoryId: item.category_id,
        categoryName: item.category_name,
        groupId: item.group_id,
        groupName: item.group_name,
        teamAId: item.team_a_id,
        teamA: item.team_a_name,
        imageTeamA: item.image_a,
        teamBId: item.team_b_id,
        teamB: item.team_b_name,
        imageTeamB: item.image_b,
      }),
    )

    return returnGames
  }

  async nextFourGamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
            team_a.id as team_a_id,
            team_a.name as team_a_name, 
            team_a.image as image_a,
            team_b.id as team_b_id,
            team_b.name as team_b_name,
            team_b.image as image_b,
            c.id as category_id, 
            c.name as category_name, 
            gr.id as group_id, 
            gr.name as group_name 
            FROM games AS g
            LEFT JOIN teams AS team_a ON team_a.id = g.team_a
            LEFT JOIN teams AS team_b ON team_b.id = g.team_b
            LEFT JOIN categories AS c ON c.id = g.category_id
            LEFT JOIN groups AS gr ON gr.id = g.group_id
            WHERE date_trunc('day', g.date) > current_date AND g.cup_config_id = ${cupConfigId}
            GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, c.id, gr.id, team_a.image, team_b.image
            ORDER BY g.date
            LIMIT 4`

    const returnGames: GamesProps[] = []

    games.map((item) =>
      returnGames.push({
        id: item.id,
        date: new Date(item.date),
        categoryId: item.category_id,
        categoryName: item.category_name,
        groupId: item.group_id,
        groupName: item.group_name,
        teamAId: item.team_a_id,
        teamA: item.team_a_name,
        imageTeamA: item.image_a,
        teamBId: item.team_b_id,
        teamB: item.team_b_name,
        imageTeamB: item.image_b,
      }),
    )

    return returnGames
  }

  async oldFourGamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
          team_a.id as team_a_id,
          team_a.name as team_a_name, 
          team_a.image as image_a,
          team_b.id as team_b_id,
          team_b.name as team_b_name,
          team_b.image as image_b,
          c.id as category_id, 
          c.name as category_name, 
          gr.id as group_id, 
          gr.name as group_name 
          FROM games AS g
          LEFT JOIN teams AS team_a ON team_a.id = g.team_a
          LEFT JOIN teams AS team_b ON team_b.id = g.team_b
          LEFT JOIN categories AS c ON c.id = g.category_id
          LEFT JOIN groups AS gr ON gr.id = g.group_id
          WHERE g.date < now() AND g.cup_config_id = ${cupConfigId}
          GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, c.id, gr.id, team_a.image, team_b.image
          ORDER BY g.date DESC
          LIMIT 4`

    const returnGames: GamesProps[] = []

    games.map((item) =>
      returnGames.push({
        id: item.id,
        date: new Date(item.date),
        categoryId: item.category_id,
        categoryName: item.category_name,
        groupId: item.group_id,
        groupName: item.group_name,
        teamAId: item.team_a_id,
        teamA: item.team_a_name,
        imageTeamA: item.image_a,
        teamBId: item.team_b_id,
        teamB: item.team_b_name,
        imageTeamB: item.image_b,
      }),
    )

    return returnGames
  }

  async gamesTodayByCupConfigId(cupConfigId: string): Promise<GamesProps[]> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
        team_a.id as team_a_id,
        team_a.name as team_a_name, 
        team_a.image as image_a,
        team_b.id as team_b_id,
        team_b.name as team_b_name,
        team_b.image as image_b,
        c.id as category_id, 
        c.name as category_name, 
        gr.id as group_id, 
        gr.name as group_name 
        FROM games AS g
        LEFT JOIN teams AS team_a ON team_a.id = g.team_a
        LEFT JOIN teams AS team_b ON team_b.id = g.team_b
        LEFT JOIN categories AS c ON c.id = g.category_id
        LEFT JOIN groups AS gr ON gr.id = g.group_id
        WHERE date_trunc('day', g.date) = current_date AND g.cup_config_id = ${cupConfigId}
        GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, c.id, gr.id, team_a.image, team_b.image
        ORDER BY g.date
        LIMIT 4`

    const returnGames: GamesProps[] = []

    games.map((item) =>
      returnGames.push({
        id: item.id,
        date: new Date(item.date),
        categoryId: item.category_id,
        categoryName: item.category_name,
        groupId: item.group_id,
        groupName: item.group_name,
        teamAId: item.team_a_id,
        teamA: item.team_a_name,
        imageTeamA: item.image_a,
        teamBId: item.team_b_id,
        teamB: item.team_b_name,
        imageTeamB: item.image_b,
      }),
    )

    return returnGames
  }

  async allgamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
      team_a.id as team_a_id,
      team_a.name as team_a_name, 
      team_a.image as image_a,
      team_b.id as team_b_id,
      team_b.name as team_b_name,
      team_b.image as image_b,
      c.id as category_id, 
      c.name as category_name, 
      gr.id as group_id, 
      gr.name as group_name 
      FROM games AS g
      LEFT JOIN teams AS team_a ON team_a.id = g.team_a
      LEFT JOIN teams AS team_b ON team_b.id = g.team_b
      LEFT JOIN categories AS c ON c.id = g.category_id
      LEFT JOIN groups AS gr ON gr.id = g.group_id
      WHERE g.cup_config_id = ${cupConfigId}
      GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, c.id, gr.id, team_a.image, team_b.image
      ORDER BY g.date`

    const returnGames: GamesProps[] = []

    games.map((item) =>
      returnGames.push({
        id: item.id,
        date: new Date(item.date),
        categoryId: item.category_id,
        categoryName: item.category_name,
        groupId: item.group_id,
        groupName: item.group_name,
        teamAId: item.team_a_id,
        teamA: item.team_a_name,
        imageTeamA: item.image_a,
        teamBId: item.team_b_id,
        teamB: item.team_b_name,
        imageTeamB: item.image_b,
      }),
    )

    return returnGames
  }

  async findGameByIdAllData(id: string): Promise<GamesProps | null> {
    const games: QueryGamesProps[] =
      await prisma.$queryRaw`SELECT g.id, g.date, 
    team_a.id as team_a_id,
    team_a.name as team_a_name, 
    team_a.image as image_a,
    team_b.id as team_b_id,
    team_b.name as team_b_name,
    team_b.image as image_b,
    c.id as category_id, 
    c.name as category_name, 
    gr.id as group_id, 
    gr.name as group_name 
        FROM games AS g
        LEFT JOIN teams AS team_a ON team_a.id = g.team_a
        LEFT JOIN teams AS team_b ON team_b.id = g.team_b
        LEFT JOIN categories AS c ON c.id = g.category_id
        LEFT JOIN groups AS gr ON gr.id = g.group_id
        WHERE g.id = ${id}
        GROUP BY g.id, team_a.id, team_a.name, team_b.id, team_b.name, 
        c.id, gr.id, team_a.image, team_b.image
        ORDER BY g.date
        LIMIT 1`

    const returnGames: GamesProps = {
      id: games[0].id,
      date: new Date(games[0].date),
      categoryId: games[0].category_id,
      categoryName: games[0].category_name,
      groupId: games[0].group_id,
      groupName: games[0].group_name,
      teamAId: games[0].team_a_id,
      teamA: games[0].team_a_name,
      imageTeamA: games[0].image_a,
      teamBId: games[0].team_b_id,
      teamB: games[0].team_b_name,
      imageTeamB: games[0].image_b,
    }

    return returnGames
  }
}
