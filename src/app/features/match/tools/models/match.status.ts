export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  INPROGRESS = "INPROGRESS",
  FINISHED = "FINISHED",
  INTERRUPTED = "INTERRUPTED",
  CANCELED = "CANCELED"
}

export function getMatchStatus(status: string): MatchStatus | undefined {
  return MatchStatus[status as keyof typeof MatchStatus];
}
