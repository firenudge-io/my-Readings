import { BrowserRouter, Route, Routes, } from "react-router-dom"
import { ProjectNavbar } from "../components/ProjectNavbar"
import { ProjectFooter } from "../components/ProjectFooter"
import { Records } from "../pages/Records"

const RouteItems = [
    { name: "Home", link: "/", element: <Records /> },
    { name: "Home", link: "/my-Readings/", element: <Records /> },
]


export const AppRoutes = () => {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100">
            <BrowserRouter>
                <ProjectNavbar />
                <Routes>
                    {
                        RouteItems.map((item, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={item.link}
                                    element={item.element}
                                />
                            )
                        })
                    }
                </Routes>
                <ProjectFooter />
            </BrowserRouter>
        </div>
    )
}