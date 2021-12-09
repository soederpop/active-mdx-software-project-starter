import runtime from "@skypager/node"
import docs from "../docs/index.mjs"

async function main() {
  await docs.load()

  await runtime.repl("interactive").launch({
    runtime,
    docs
  })
}

main()
