import Layout from './components/Layout'
import Hero from './components/Hero'
import ProcessTimeline from './components/ProcessTimeline'
import PortfolioGrid from './components/PortfolioGrid'
import ProjectEstimator from './components/ProjectEstimator'
import ProjectRequest from './components/ProjectRequest'

function App() {
  return (
    <Layout>
      <div className="space-y-12 pb-20">
        <Hero />
        <ProcessTimeline />
        <PortfolioGrid />
        <ProjectEstimator />
        <ProjectRequest />
      </div>
    </Layout>
  )
}

export default App
