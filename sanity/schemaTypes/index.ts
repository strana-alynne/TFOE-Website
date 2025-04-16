import { type SchemaTypeDefinition } from 'sanity'
import { blogType } from "./blogType"
import { statisticsType } from "./statisticsType"
import { aboutType } from './aboutType'
import { loginandsignupType } from "./loginandsignupType"
import { contactsType } from './ContactsType'
import { certificateType } from './certificateType'
import { logoType } from './logoType'
import { membershipType } from './membershipType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blogType, statisticsType, aboutType, loginandsignupType, contactsType, certificateType, logoType, membershipType],
}
