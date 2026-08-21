import { useState } from 'react'
import './App.css'
import { Hero } from './Components/Hero.jsx'
import { Tabs } from './Components/Tabs.jsx'
import { Gallery } from './Components/Gallery.jsx'
import { FeatureList } from './Components/FeatureList.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeGallery, setActiveGallery] = useState('workspace')

  return (
    <div className="page">
      <Hero count={count} onPrimaryAction={() => setCount((value) => value + 1)} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <Gallery activeId={activeGallery} onSelect={setActiveGallery} />
      <FeatureList />
    </div>
  )
}

export default App
