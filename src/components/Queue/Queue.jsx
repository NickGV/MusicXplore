import { QueueItem } from "./QueueItem"
import './Queue.css'

export const Queue = () => {
  return (
    <section className="queue">
        <h1 className="queue__title">Queue</h1>
        <div className="queue__list">
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
          <QueueItem/>
        </div>
    </section>
  )
}
