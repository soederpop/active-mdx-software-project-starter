import React from "react"
import content from "docs"

export default function StoriesPage(props = {}) {
  const { stories = [] } = props
  return <div>Stories: {stories.length} </div>
}

export async function getStaticProps() {
  await content.load()

  const stories = content.available
    .filter((i) => i.startsWith("stories"))
    .map((id) => content.document(id).toModel())

  return {
    props: {
      stories: stories.map((epic) =>
        epic.toJSON({
          attributes: ["acceptanceCriteria", "mockupLinks"]
        })
      )
    }
  }
}
