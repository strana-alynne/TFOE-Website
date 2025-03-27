import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, DocumentIcon, DesktopIcon, BarChartIcon, UsersIcon, FolderIcon} from '@sanity/icons'
import { FormInputIcon } from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog').icon(DocumentIcon),
      S.documentTypeListItem('statistics').title('Statistics').icon(BarChartIcon),
      S.documentTypeListItem('about').title('About').icon(FolderIcon),
      S.documentTypeListItem('form').title('Membership Forms').icon(FormInputIcon),
    ])