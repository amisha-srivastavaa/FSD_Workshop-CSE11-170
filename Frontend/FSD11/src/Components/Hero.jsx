import heroImg from '../assets/hero.png'

export function Hero({ onPrimaryAction, count }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Interactive demo</p>
        <h1>Build faster with React + Vite</h1>
        <p>
          Click the buttons and explore the gallery to see the page update in real time.
        </p>
        <button type="button" className="primary-button" onClick={onPrimaryAction}>
          Increase count: {count}
        </button>
      </div>
      <img src={heroImg} alt="Hero scene" className="hero-image" />
    </section>
  )
}
