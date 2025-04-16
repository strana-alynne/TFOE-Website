import { defineField, defineType } from 'sanity'

export const contactsType = defineType({
  name: 'contacts',
  title: 'contacts',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'Email',
      type: 'string',
      validation: (rule) => rule.required().error('Email is required'),
    }),

    defineField({
      name: 'EmailCC',
      type: 'string',
      validation: (rule) => rule.required().error('Email is required'),
    }),
    defineField({
      name: 'Address',
      type: 'string',
      validation: (rule) => rule.required().error('Email is required'),
    }),

    defineField({
      name: 'SocialMediaLinks',
      title: 'SocialMediaLinks',
      description:"Input the social media links",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    }),
  ],

  initialValue: {
    Title: 'Contact Us',
    Email: 'tfoe.philippineeagles@gmail.com',
    EmailCC: 'support@tfoe-pe.com',
    Address: "643, San Miguel, Manila, Metro Manila, Philippines",
    SocialMediaLinks: [
      {
        label: '(PRIVATE)Facebook',
        url: 'https://facebook.com'
      },
      {
        label: '(PUBLIC-1)Facebook',
        url: 'https://twitter.com'
      },
      {
        label: '(PUBLIC-2)Facebook',
        url: 'https://linkedin.com'
      },
      {
        label: "Eagle's Nest",
        url: 'https://linkedin.com'
      }
    ]
  }
})
