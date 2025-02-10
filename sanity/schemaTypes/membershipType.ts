import { defineField, defineType } from 'sanity'

export const membershipType = defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  fields: [
    defineField({
      name: 'NationaIdForm',
      type: 'file'
    }),
    defineField({
      name: 'NationaIdLink',
      type: 'url',
    }),
    defineField({
      name: 'PersonalSheetForm',
      type: 'file',
    }),
    defineField({
      name: 'PersonalSheetLink',
      type: 'url',
    }),
   
  ]
})