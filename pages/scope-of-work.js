import Head from "next/head"
import content from "docs"

export default function ScopeOfWork(props = {}) {
  return <div>Scope of work TODO</div>
}

export async function getStaticProps({ params }) {
  await content.load()

  const epics = content.available
    .filter((id) => id.startsWith("epics/"))
    .map((id) => content.getModel(id))

  return {
    props: {
      epics: epics.map((epic) => epic.toJSON())
    }
  }
}
