const storage = {
  comics: window.localStorage.getItem('comics')
    ? JSON.parse(window.localStorage.getItem('comics'))
    : [],
  characters: window.localStorage.getItem('characters')
    ? JSON.parse(window.localStorage.getItem('characters'))
    : [],
  stories: window.localStorage.getItem('stories')
    ? JSON.parse(window.localStorage.getItem('stories'))
    : [],
  storyIds: window.localStorage.getItem('storyIds')
    ? JSON.parse(window.localStorage.getItem('storyIds'))
    : [],
  comicIds: window.localStorage.getItem('comicIds')
    ? JSON.parse(window.localStorage.getItem('comicIds'))
    : [],
  characterIds: window.localStorage.getItem('characterIds')
    ? JSON.parse(window.localStorage.getItem('characterIds'))
    : [],
  saveComic (comic) {
    if (!this.comics.find(com => com.id === comic.id)) {
      this.comics.push(comic)
      window.localStorage.setItem('comics', JSON.stringify(this.comics))
    }
  },
  saveComicId (comicId) {
    if (this.comicIds.indexOf(comicId) === -1) {
      this.comicIds.push(comicId)
      window.localStorage.setItem('comicIds', JSON.stringify(this.comicIds))
    }
  },
  saveCharacter (character) {
    if (!this.characters.find(char => char.id === character.id)) {
      this.characters.push(character)
      window.localStorage.setItem(
        'characters',
        JSON.stringify(this.characters)
      )
    }
  },
  saveCharacterId (characterId) {
    if (this.characterIds.indexOf(characterId) === -1) {
      this.characterIds.push(characterId)
      window.localStorage.setItem(
        'characterIds',
        JSON.stringify(this.characterIds)
      )
    }
  },

  saveStory (story) {
    if (!this.stories.find(stor => stor.id === story.id)) {
      this.stories.push(story)
      window.localStorage.setItem('stories', JSON.stringify(this.stories))
    }
  },
  saveStoryId (storyId) {
    if (this.storyIds.indexOf(storyId) === -1) {
      this.storyIds.push(storyId)
      window.localStorage.setItem('storyIds', JSON.stringify(this.storyIds))
    }
  },
  deleteComicId (comicId) {
    let index = this.comicIds.indexOf(comicId)
    if (index !== -1) {
      this.comicIds.splice(index, 1)
    }
  },
  deleteCharacterId (characterId) {
    let index = this.characterIds.indexOf(characterId)
    if (index !== -1) {
      this.characterIds.splice(index, 1)
    }
  },
  deleteStoryId (storyId) {
    let index = this.storyIds.indexOf(storyId)
    if (index !== -1) {
      this.storyIds.splice(index, 1)
    }
  },
  deleteCharacter (character) {
    let index = this.characters.findIndex(char => char.id === character.id)
    if (index !== -1) {
      this.characters.splice(index, 1)

      window.localStorage.setItem(
        'characters',
        JSON.stringify(this.characters)
      )
    }
  },
  deleteComic (comic) {
    let index = this.comics.findIndex(com => com.id === comic.id)
    if (index !== -1) {
      this.comics.splice(index, 1)
      window.localStorage.setItem(
        'comics',
        JSON.stringify(this.characters)
      )
    }
  },
  deleteStory (story) {
    let index = this.stories.findIndex(stor => stor.id === story.id)
    if (index !== -1) {
      this.stories.splice(index, 1)
      window.localStorage.setItem(
        'stories',
        JSON.stringify(this.stories)
      )
    }
  },
  clear () {
    window.localStorage.clear()
  }
}

export default storage
