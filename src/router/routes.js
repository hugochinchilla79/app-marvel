const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/characters',
        component: () => import('pages/CharacterList.vue'),
        name: 'characters'
      },
      {
        path: '/character/:id/comics',
        component: () => import('pages/PageCharactersComics.vue'),
        name: 'characters-comics',
        props: true
      },
      {
        path: '/character/:id/stories',
        component: () => import('pages/PageCharactersStories.vue'),
        name: 'characters-stories',
        props: true
      },
      {
        path: '/comics',
        component: () => import('pages/ComicList.vue'),
        name: 'comics'
      },
      {
        path: '/comics/:id/stories',
        component: () => import('pages/PageComicsStories.vue'),
        name: 'comic-stories',
        props: true
      },
      {
        path: '/comics/:id/characters',
        component: () => import('pages/PageComicsCharacters.vue'),
        name: 'comics-characters',
        props: true
      },
      {
        path: '/stories',
        component: () => import('pages/StoriesList.vue'),
        name: 'stories'
      },
      {
        path: '/comics/:id',
        component: () => import('pages/PageComic.vue')
      },
      {
        path: '/character/:id',
        component: () => import('pages/PageCharacter.vue'),
        props: true
      },
      {
        path: '/saved-items',
        component: () => import('pages/PageSavedItems.vue'),
        props: true
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
