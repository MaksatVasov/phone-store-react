import { useContext, useState } from "react";
import { UIContext } from "../components/UIContext";

export default function useSideBarState() {

    const { sidebar, setSidebar } = useContext(UIContext)

    const [isListOpened, setOpen] = useState(false);

    return { sidebar, setSidebar, isListOpened, setOpen }

}