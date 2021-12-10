import React from "react"
import {
  Divider,
  Grid,
  GridRow as Row,
  GridColumn as Col,
  Header,
  Segment
} from "semantic-ui-react"
import { sumBy } from "lodash-es"

export default function ProjectTimeline({ epics = [] } = {}) {
  const totalHours = sumBy(epics, (epic) => epic.totalEstimates.high)

  return (
    <Grid style={{ width: "100%" }} divided="vertically">
      {epics.map((epic) => (
        <Row key={epic.id}>
          <Col width={3}>
            <Header as="h5" content={epic.title} />
          </Col>
          <Col width={13}>
            <Segment
              basic
              inverted
              color="blue"
              data-startAt={epic.meta.timeline.startAt}
              textAlign="center"
              style={{
                left: toPercent(epic.meta.timeline.startAt, totalHours),
                width: toPercent(epic.totalEstimates.high, totalHours)
              }}
            >
              {epic.totalEstimates.high} Hours
            </Segment>
          </Col>
        </Row>
      ))}
      <Row>
        <Col width={8} floated="right" textAlign="right">
          <Header as="h5" content={`Total Hours: ${totalHours}`} />
        </Col>
      </Row>
    </Grid>
  )
}

function toPercent(value, total) {
  return `${(value / total) * 100}%`
}
