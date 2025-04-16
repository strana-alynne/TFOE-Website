import type { StructureResolver } from 'sanity/structure'
import {
  DocumentIcon,
  BookmarkFilledIcon,
  BarChartIcon,
  UsersIcon,
  FolderIcon,
  SparkleIcon,
  MobileDeviceIcon,
  StarIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Logo')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('logo')
            .documentId('logo')
        ),
      S.listItem()
        .title('Contacts')
        .icon(MobileDeviceIcon)
        .child(
          S.document()
            .schemaType('contacts')
            .documentId('contacts')
        ),
      S.listItem()
        .title('About')
        .icon(FolderIcon)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Login and Sign Up Section')
        .icon(BookmarkFilledIcon)
        .child(
          S.document()
            .schemaType('loginandSignupsection')
            .documentId('loginandSignupsection')
        ),
      S.listItem()
        .title('Statistics')
        .icon(BarChartIcon)
        .child(
          S.document()
            .schemaType('statistics')
            .documentId('statistics')
        ),
      S.listItem()
        .title('Membership Forms')
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType('membership')
            .documentId('membership')
        ),
      S.listItem()
        .title('Certificate')
        .icon(SparkleIcon)
        .child(
          S.document()
            .schemaType('certificate')
            .documentId('certificate')
        ),

      // Only the blog is a non-singleton document type
      S.documentTypeListItem('blog').title('Blog').icon(DocumentIcon),

      // Exclude all singleton types from the auto-generated list
      ...S.documentTypeListItems().filter(listItem =>
        ![
          'blog',
          'logo',
          'contacts',
          'about',
          'loginandSignupsection',
          'statistics',
          'membership', // fixed typo
          'certificate',
        ].includes(listItem.getId() ?? '')
      ),
    ])
