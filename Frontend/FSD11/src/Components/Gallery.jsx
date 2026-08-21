const galleryItems = [
  {
    id: 'workspace',
    title: 'Workspace',
    description: 'A clean workspace image with modern layout and style cues.',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'A creative design concept with bright, friendly colors.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'code',
    title: 'Code',
    description: 'A developer environment showing code, terminals, and ideas.',
    image:
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=60',
  },
]

export function Gallery({ activeId, onSelect }) {
  const active = galleryItems.find((item) => item.id === activeId) ?? galleryItems[0]

  return (
    <section className="gallery-section">
      <div className="gallery-preview">
        <img src={active.image} alt={active.title} className="gallery-main-image" />
        <div className="gallery-copy">
          <h2>{active.title}</h2>
          <p>{active.description}</p>
        </div>
      </div>
      <div className="gallery-actions">
        {galleryItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeId ? 'gallery-pill active' : 'gallery-pill'}
            onClick={() => onSelect(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  )
}
