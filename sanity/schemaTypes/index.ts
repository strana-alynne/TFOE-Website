import { type SchemaTypeDefinition } from 'sanity'
import {heroSectionType} from "./heroSectionType"
import {blogType} from "./blogType"
import {statisticsType} from "./statisticsType"
import { membershipType } from './membershipType'
import { aboutType } from './aboutType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSectionType, blogType, statisticsType, membershipType, aboutType],
}
