import { ACTIONS, ROLES } from "@/utils/constants"

type role = typeof ROLES[keyof typeof ROLES]

export interface Message {
    id : string
    type: string
    content: any
    role: role
}


export type ActionKeys = keyof typeof ACTIONS