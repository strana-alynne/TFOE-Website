import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'AboutImage',
      type: 'image',
      description: 'Upload the image that will be used in the about section',
      validation: (Rule) => Rule.required().error('Image is required'), 
    }),
    defineField({
      name: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),

    }),
    defineField({
      name: 'Description',
      type: 'array',
      description: 'Create a short description about the Eagles',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().error('Description is required'),
    }),
  ]

})