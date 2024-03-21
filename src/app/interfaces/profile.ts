import { EdLevel } from "@prisma/client"

export interface edit_profile {
  user_id:          number,
  vision?:          string,
  skills?:          string[],
  ed_lvl?:          EdLevel,
  prof_formation?:  string[],
  events?:          string[],
  presentations?:   string[],
  publications?:    string[],
  grants?:          string[]
}