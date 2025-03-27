import { type SchemaTypeDefinition } from 'sanity'
import {heroSectionType} from "./heroSectionType"
import {blogType} from "./blogType"
import {statisticsType} from "./statisticsType"
import { membershipType } from './membershipType'
import { aboutType } from './aboutType'
import { formType } from './formType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSectionType, blogType, statisticsType, membershipType, aboutType, formType],
}
