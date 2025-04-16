import { CalendarIcon } from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      title: 'Hero Section?',
      name: 'HeroSection',
      description: 'Do want this blog to be displayed in the banner section?',
      type: 'boolean',
    
    }),
    defineField({
      name: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'Category',
      type: 'string',
      validation: (rule) => rule.required().error('Category is required'),
      options: {
        list: ['News', 'Events', 'Updates'
        ],
        layout: 'radio',
      }

    }),
    defineField({
      name: 'Date',
      type: 'date',
      validation: (rule) => rule.required().error('Date is required'),
    }),
    defineField({
      name: 'Image',
      type: 'image',
      description: 'Ensure the image is 1200x800 pixels',
      validation: (rule) => rule.required().error('Image is required'),

    }),
    defineField({
      name: 'Details',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().error('Details is required'),

    }),
  ],
  preview: {
    select: {title: 'Title', image: 'Image', date: 'Date', hero: 'HeroSection'},
    prepare({title, image, date, hero}) {
        const nameFormatted = title || 'Untitled event'
        const dateFormatted = date
          ? new Date(date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          : 'No date'
    
        return {
          title: title ? `${nameFormatted} (${title})` : nameFormatted,
          subtitle: hero ? `${dateFormatted} Hero Section` : dateFormatted,
          media: image || CalendarIcon,
        }
      },
  }
})