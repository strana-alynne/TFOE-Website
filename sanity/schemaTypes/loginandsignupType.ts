import {defineField, defineType} from 'sanity'

export const loginandsignupType = defineType({
  name: 'loginandSignupsection',
  title: 'Login and Sign Up Section',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: Rule => Rule.required().error('Title is required'),}),
    
    defineField({
      name: 'LoginImage',
      title: 'Login Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image that is exactly 1200x800 pixels.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'SignUpImage',
      title: 'Sign Up Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image that is exactly 1200x800 pixels.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'PreRegImage',
      title: 'Pre Registration Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image that is exactly 1200x800 pixels.',
      validation: Rule => Rule.required(),
    }),
  ],
})
