const storage = {
  comics: window.localStorage.getItem('comics')
    ? JSON.parse(window.localStorage.getItem('comics'))
    : [],
  characters: window.localStorage.getItem('characters')
    ? JSON.parse(window.localStorage.getItem('characters'))
    : [],
  stories: [],
  comicIds: window.localStorage.getItem('comicIds')
    ? JSON.parse(window.localStorage.getItem('comicIds'))
    : [],
  characterIds: window.localStorage.getItem('characterIds')
    ? JSON.parse(window.localStorage.getItem('characterIds'))
    : [],
  saveComic (comic) {
    this.comics.push(comic)
    window.localStorage.setItem('comics', JSON.stringify(this.comics))
  },
  saveComicId (comicId) {
    this.comicIds.push(comicId)
    window.localStorage.setItem('comicIds', JSON.stringify(this.comicIds))
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
  clear () {
    window.localStorage.clear()
  }
}

export default storage
