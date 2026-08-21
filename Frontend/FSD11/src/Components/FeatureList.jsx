const features = [
  {
    title: 'Fast updates',
    detail: 'State-driven UI makes every click update instantly without a full refresh.',
  },
  {
    title: 'Component architecture',
    detail: 'Reusable building blocks keep the page maintainable and easy to extend.',
  },
  {
    title: 'Responsive layout',
    detail: 'The page adapts to smaller screens while keeping the interface clear.',
  },
]

export function FeatureList() {
  return (
    <section className="feature-list">
      <h2>Features</h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
