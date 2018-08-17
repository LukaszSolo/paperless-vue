import DocumentsList from '@/components/Documents/List'
import DocumentView from '@/components/Documents/View'
import Logs from '@/components/Log'
import Router from 'vue-router'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Documents',
      component: DocumentsList
    },
    {
      path: '/documents/view/:id',
      name: 'DocumentView',
      component: DocumentView
    },
    {
      path: '/documents/tag/:tagId',
      name: 'TaggedDocuments',
      component: DocumentsList
    },
    {
      path: '/documents/search/:search',
      name: 'SearchedDocuments',
      component: DocumentsList
    },
    {
      path: '/correspondents',
      name: 'Correspondents',
      component: DocumentsList
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs
    }
  ]
})
