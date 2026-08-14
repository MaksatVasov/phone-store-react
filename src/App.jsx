import { RouterProvider } from "react-router-dom";
import { router } from "./components/router";

export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}



