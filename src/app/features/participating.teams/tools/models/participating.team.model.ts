import { SubscriptionStatusModel } from "../enums/subcription.status"

export interface ParticipatingTeamModel{
    tournament: TournamentModel,
    team: TeamModel,
    subscriptionStatus: SubscriptionStatusModel
    
}

interface TeamModel{
    id: number,
    name: string
}

interface TournamentModel{
    id: number,
    name: string
}
