import { useState } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Deliverables from './components/Deliverables'
import ProcessTimeline from './components/ProcessTimeline'
import PortfolioGrid from './components/PortfolioGrid'
import WhyChooseUs from './components/WhyChooseUs'
import ProjectEstimator from './components/ProjectEstimator'
import ProjectRequest from './components/ProjectRequest'

import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [estimatorData, setEstimatorData] = useState(null)

  return (
    <ThemeProvider>
      <Layout>
        <div className="space-y-12 pb-32 md:pb-20">
          <Hero />
          <Deliverables />
          <ProcessTimeline />
          <PortfolioGrid />
          <WhyChooseUs />
          <ProjectEstimator onEstimatorUpdate={setEstimatorData} />
          <ProjectRequest estimatorData={estimatorData} />
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
