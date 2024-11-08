export enum TournamentStatus {
    BUILDING = "BUILDING",
    PENDING = "PENDING",
    STARTED = "STARTED",
    INTERRUPTED = "INTERRUPTED",
    CLOSED = "CLOSED",
    CANCELED = "CANCELED",
  }
  
export function getTournamentStatus(status: string): TournamentStatus | undefined {
  return TournamentStatus[status as keyof typeof TournamentStatus];
}