import { defineField, defineType } from 'sanity'

export const statisticsType = defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'Members',
      type: 'number',
      validation: (rule) => rule.required().error('This is required'),
    }),
    defineField({
      name: 'Branches',
      type: 'number',
      validation: (rule) => rule.required().error('This is required'),
    }),
    defineField({
      name: 'Years',
      type: 'number',
      validation: (rule) => rule.required().error('This is required'),
    }),
   
  ]
})