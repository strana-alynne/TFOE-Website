import { defineField, defineType } from 'sanity'

export const membershipType = defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'DownloadableNationaIdForm',
      description: 'Provide the link for the downloadable national ID form',
      type: 'url',
    }),
    defineField({
      name: 'NationaIdLink',
      description: 'Provide the link for the national ID form submission',
      type: 'url',
    }),
    defineField({
      name: 'DownloadablePersonalSheetForm',
      description: 'Provide the link for the downloadable personal sheet form',
      type: 'url',
    }),
    defineField({
      name: 'PersonalSheetLink',
      description: 'Provide the link for the personal sheet submission',
      type: 'url',
    }),
  ],
  initialValue: {
    DownloadableNationaIdForm: 'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ftfoe-pe.com%2FMEMBERSHIP-APPLICATION-NEWFORM-1.docx&wdOrigin=BROWSELINK',
    NationaIdLink: 'https://id.tfoe-pe.com/register/',
    DownloadablePersonalSheetForm: 'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ftfoe-pe.com%2FNATIONAL-ID-APPLICATION-RENEWAL-AND-NEW-MEMBERS-2.docx&wdOrigin=BROWSELINK',
    PersonalSheetLink: 'https://example.com/submit/personal-sheet',
  },
})
