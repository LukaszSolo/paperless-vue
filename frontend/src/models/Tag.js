export default class Tag {
  constructor (tagId, slug, tagName, colour, match, matchingAlgorithm) {
    this.id = tagId
    this.slug = slug
    this.tagName = tagName
    this.tagColour = colour
    this.match = match
    this.matchingAlgorithm = matchingAlgorithm
  }

  get name () {
    return this.tagName
  }

  get tagColor () {
    if (this.tagColour === 1) return '#a6cee3'
    if (this.tagColour === 2) return '#1f78b4'
    if (this.tagColour === 3) return '#b2df8a'
    if (this.tagColour === 4) return '#33a02c'
    if (this.tagColour === 5) return '#fb9a99'
    if (this.tagColour === 6) return '#e31a1c'
    if (this.tagColour === 7) return '#fdbf6f'
    if (this.tagColour === 8) return '#ff7f00'
    if (this.tagColour === 9) return '#cab2d6'
    if (this.tagColour === 10) return '#6a3d9a'
    if (this.tagColour === 11) return '#b15928'
    if (this.tagColour === 12) return '#000000'
    if (this.tagColour === 13) return '#cccccc'
    return '#000'
  }
}
