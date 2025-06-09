import { defineField, defineType } from 'sanity'

export const orgType = defineType({
  name: 'organizationalchart',
  title: 'Organizational Chart',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    
    // Fields under "Elected Officials" header
    defineField({
      name: 'natlpresident',
      title: 'National President',  
      type: 'object',
      fieldset: 'elected',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true // enables cropping
          }
        }
      ]
    }),
    
    defineField({
      name: 'governor',
      title: 'Governor',
      type: 'object',
      fieldset: 'elected',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'clubpresident',
      title: 'Club President',
      type: 'object',
      fieldset: 'elected',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'clubvicepresident',
      title: 'Club Vice President',
      type: 'object',
      fieldset: 'elected',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'assemblymen',
      title: 'Club Assemblymen',
      type: 'array',
      fieldset: 'elected',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(2).error('Maximum 2 people per position'),
      description: 'Add up to 2 people for this position'
    }),

    defineField({
      name: 'alternateassemblymen',
      title: 'Club Alternate Assemblymen',
      type: 'array',
      fieldset: 'elected',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 people per position'),
      description: 'Add up to 3 people for this position'
    }),

    // Fields under "Appointed Officials" header
    defineField({
      name: 'secretary',
      title: 'Club Secretary',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'assistantsecretary',
      title: 'Club Assistant Secretary',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'treasurer',
      title: 'Club Treasurer',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'assistanttreasurer',
      title: 'Club Assistant Treasurer',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'auditor',
      title: 'Club Auditor',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'assistantauditor',
      title: 'Club Assistant Auditor',
      type: 'object',
      fieldset: 'appointed',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    // Club Directors section
    defineField({
      name: 'clubdirectors',
      title: 'Club Directors',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(5).error('Maximum 5 directors allowed'),
      description: 'Add up to 5 directors with their positions'
    }),

    // Committee Chairs and Members
    defineField({
      name: 'waysandmeans',
      title: 'Ways & Means Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'waysandmeansmembers',
      title: 'Ways & Means Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Ways & Means Committee Members'
    }),

    defineField({
      name: 'tribunalchair',
      title: 'Tribunal & Grievance Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'tribunalmembers',
      title: 'Tribunal & Grievance Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Tribunal & Grievance Committee Members'
    }),

    defineField({
      name: 'oversightchair',
      title: 'Oversight Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'oversightmembers',
      title: 'Oversight Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Oversight Committee Members'
    }),

    defineField({
      name: 'alalayagilachair',
      title: 'Alalayang Agila & Special Projects Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'alalayagilachairmembers',
      title: 'Alalayang Agila & Special Projects Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Alalayang Agila & Special Projects Committee Members'
    }),

    defineField({
      name: 'protocolchair',
      title: 'Protocol & Peace Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'protocolmembers',
      title: 'Protocol & Peace Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Protocol & Peace Committee Members'
    }),

    defineField({
      name: 'awardschair',
      title: 'Committee Awards & Recognition Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'awardsmembers',
      title: 'Committee Awards & Recognition Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Committee Awards & Recognition Members'
    }),

    defineField({
      name: 'publicinfochair',
      title: 'Public Information Officer & Public Relation Committee Chair',
      type: 'object',
      fieldset: 'clubdirectors',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    defineField({
      name: 'publicinfomembers',
      title: 'Public Information Officer & Public Relation Committee Members',
      type: 'array',
      fieldset: 'clubdirectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ],
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 positions allowed'),
      description: 'Add up to 3 positions for the Public Information Officer & Public Relation Committee Members'
    }),
  ],
  
  fieldsets: [
    {
      name: 'elected',
      title: 'Elected Officials',
    },
    {
      name: 'appointed',
      title: 'Appointed Officials',
    },
    {
      name: 'clubdirectors',    
      title: 'Club Board of Directors',
    }
  ],
  
  initialValue: {
    Title: 'Organizational Chart',
  }
})