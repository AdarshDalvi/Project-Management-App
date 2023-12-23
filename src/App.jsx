import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import CreateNewProject from "./pages/CreateNewProject"
import { useSelector } from "react-redux"
import ProjectInfo from "./pages/ProjectInfo"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="new-project" element={<CreateNewProject />} />
        <Route path="project-info/:slug" element={<ProjectInfo />} />
      </Route>
    </Routes>
  )
}

export default App
