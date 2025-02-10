import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'AboutImage',
      type: 'image',
    }),
   
  ]
})