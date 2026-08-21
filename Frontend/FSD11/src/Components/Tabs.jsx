const tabs = [
  {
    id: 'overview',
    title: 'Overview',
    content:
      'This page is built with React and Vite, using components and state to make the experience interactive.',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    content:
      'The gallery section displays visual content and supports dynamic layout updates as the page state changes.',
  },
  {
    id: 'about',
    title: 'About',
    content:
      'This interactive webpage demonstrates component composition, state handling, and responsive styling.',
  },
]

export function Tabs({ activeTab, onChange }) {
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <section className="tabs-section">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => onChange(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        <h2>{active.title}</h2>
        <p>{active.content}</p>
      </div>
    </section>
  )
}
