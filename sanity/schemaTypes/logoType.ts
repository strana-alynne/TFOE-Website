import { defineField, defineType } from 'sanity'

export const logoType = defineType({
  name: 'logo',
  title: 'Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
      
    }),
    defineField({
      name: 'Logo',
      type: 'image',
      description: 'Uploade the logo that will be used in the entire website',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required'), 
    }),
  ]

})