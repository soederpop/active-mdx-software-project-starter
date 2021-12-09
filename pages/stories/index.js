import React from "react"
import content from "docs"

export default function StorysPage(props = {}) {
  const { stories = [] } = props
  return <div>Stories: {stories.length} </div>
}

export async function getStaticProps() {
  await content.load()
  const Story = content.model("Story")

  const stories = await Story.query()
    .fetchAll()
    .then((stories) =>
      stories.map((story) =>
        story.toJSON({
          attributes: ["acceptanceCriteria", "mockupLinks"]
        })
      )
    )

  return {
    props: {
      stories
    }
  }
}
