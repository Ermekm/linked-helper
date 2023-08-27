import { useState } from "react"

const useModal = () => {
    const [isActive, setActive] = useState<boolean>(false)
    const [content, setContent] = useState<JSX.Element | null>(null)

    const start = () => {
        setActive(true)
    }

    const destroy = () => {
        setActive(false)
    }

    return { start, destroy, setContent, isActive, content }
}

export default useModal