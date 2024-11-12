export enum MatchStage {
  GROUP_STAGE= "GROUP_STAGE",
  FINAL  = "FINAL",
  SEMI_FINAL = "SEMI_FINAL",
  QUARTER_FINAL = " QUARTER_FINAL",
  ROUND_OF_16 = "ROUND_OF_16",


}

export function getMatchStage(stage: string): MatchStage | undefined {
  return MatchStage[stage as keyof typeof MatchStage];
}
