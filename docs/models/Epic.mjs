import { Model } from "active-mdx"
import Story from "./Story.mjs"

export default class Epic extends Model {
  static sections = ["stories"]

  get defaults() {
    return {
      meta: {
        status: "created"
      }
    }
  }

  get isComplete() {
    return this.stories()
      .fetchAll()
      .every((story) => story.isComplete)
  }

  get description() {
    const { document } = this
    const { leadingElementsAfterTitle = [] } = document.nodes

    return leadingElementsAfterTitle.map(document.utils.toString).join("")
  }

  toJSON({ related = [], attributes = [], ...options } = {}) {
    return super.toJSON({
      related: ["stories", ...related],
      attributes: ["description", "isComplete", "slug", ...attributes],
      ...options
    })
  }

  stories() {
    return this.hasMany(Story, {
      heading: "stories",
      meta: () => ({ epic: this.title.toLowerCase() })
    })
  }

  static is(document) {
    return document.id.startsWith("epic")
  }
}
