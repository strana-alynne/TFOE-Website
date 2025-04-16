import { defineField, defineType } from 'sanity'

export const certificateType = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Create a short description about the cetificate',
      validation: (rule) => rule.required().error('Description is required'),
    }),
    defineField({
      name: 'CertificateImage',
      type: 'image',
      description: 'Upload the image that will be used in the certificate section',
      validation: (rule) => rule.required().error('Image is required'),
    }),
   
  ]
})