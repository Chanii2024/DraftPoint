import Layout from './components/Layout'
import Hero from './components/Hero'
import PortfolioGrid from './components/PortfolioGrid'
import ProjectRequest from './components/ProjectRequest'

function App() {
  return (
    <Layout>
      <div className="space-y-12 pb-20">
        <Hero />
        <PortfolioGrid />
        <ProjectRequest />
      </div>
    </Layout>
  )
}

export default App
