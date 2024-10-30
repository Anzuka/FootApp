import { TournamentStatus } from "../../tools/enums/tournament-status"
import { TournamentType } from "../../tools/enums/tournament-type"

export interface TournamentCardModel {
    id: number
    name: string
    type: TournamentType
    img: string
    status: TournamentStatus
}