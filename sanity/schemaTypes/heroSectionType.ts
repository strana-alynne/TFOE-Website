import {defineField, defineType} from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'Category',
      type: 'reference',
      to: [{type: 'blog'}],
    }),
    defineField({
      name: 'Title',
      type: 'reference',
      to: [{type: 'blog'}],
    }),
    defineField({
      name: 'Details',
      type: 'reference',
      to: [{type: 'blog'}],
    }),
    defineField({
      name: 'Link',
      type: 'reference',
      to: [{type: 'blog'}],
    }),
  ],
})