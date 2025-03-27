import { defineField, defineType } from 'sanity'

export const formType = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  fields: [
    defineField({
      name: 'PersonalSheetDownload',
      type: 'url',
    }),
   
    defineField({
      name: 'NationalIDForm',
      type: 'url',
    }),
   
    defineField({
      name: 'NationIDOnlineForm',
      type: 'url',
    }),
   
  ]
})