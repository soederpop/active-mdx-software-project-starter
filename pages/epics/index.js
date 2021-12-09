import React from "react"
import content from "docs"

export default function EpicsPage(props = {}) {
  const { epics = [] } = props
  return <div>Epics: {epics.length} </div>
}

export async function getStaticProps() {
  const Epic = content.model("Epic")

  await content.load()

  const epics = content.available
    .filter((i) => i.startsWith("epics"))
    .map((id) => content.document(id).toModel())

  return {
    props: {
      epics: epics.map((epic) => epic.toJSON({ related: ["stories"] }))
    }
  }
}
