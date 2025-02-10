import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, DocumentIcon, DesktopIcon, BarChartIcon, UsersIcon, FolderIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
      S.documentTypeListItem('blog').title('Blog').icon(DocumentIcon),
      S.documentTypeListItem('heroSection').title('Hero Section').icon(DesktopIcon),
      S.documentTypeListItem('statistics').title('Statistics').icon(BarChartIcon),
      S.documentTypeListItem('membership').title('Membership').icon(UsersIcon),
      S.documentTypeListItem('about').title('About').icon(FolderIcon),
    ])