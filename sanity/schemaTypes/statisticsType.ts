import { defineField, defineType } from 'sanity'

export const statisticsType = defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('This is required'),
    }),
    defineField({
      name: 'Members',
      type: 'number',
      description: 'Total number of members in the Eagles',
      validation: (rule) => rule.required().error('This is required'),
    }),
    defineField({
      name: 'Branches',
      type: 'number',
      description: 'Total number of branches in the Eagles',
      validation: (rule) => rule.required().error('This is required'),
    }),
    defineField({
      name: 'Years',
      type: 'number',
      description: 'Total number of years the Eagles have been in existence',
      validation: (rule) => rule.required().error('This is required'),
    }),
  ],
  initialValue: {
    Title: 'Eagles Statistics',
    Members: 5000,
    Branches: 50,
    Years: 46,
  },
})
