import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import CreateNewProject from "./pages/CreateNewProject"
import ProjectInfo from "./pages/ProjectInfo"
import NotFound from "./pages/NotFound"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="project-info/:slug" element={<ProjectInfo />} />
        <Route path="new-project" element={<CreateNewProject />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
