/** Shared renderer for the empty and error states. */
export default function Message({ title, children }) {
  return (
    <div className="message">
      <p className="message__title">{title}</p>
      {children ? <p className="message__text">{children}</p> : null}
    </div>
  )
}
