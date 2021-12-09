import React from "react"
import content from "docs"

export default function EpicsPage(props = {}) {
  const { epics = [] } = props
  return <div>Epics: {epics.length} </div>
}

export async function getStaticProps() {
  await content.load()
  const Epic = content.model("Epic")

  const epics = await Epic.query().fetchAll()

  return {
    props: {
      epics
    }
  }
}
