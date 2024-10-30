import { TournamentType } from "../../tools/enums/tournament-type"

export interface TournamentListModel {
    id: number
    name: string
    type: TournamentType
    img: string
    status: string
}