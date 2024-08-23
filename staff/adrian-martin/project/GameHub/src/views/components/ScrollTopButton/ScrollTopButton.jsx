import { useState, useEffect } from 'react'
import './ScrollTopButton.css'

import Button from '../../../components/core/Button/Button'

const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        isVisible && (
            <div className='Scroll'>
                <Button className='Scroll-icon' onClick={scrollToTop}>
                    ⭡
                </Button>
            </div>
        )
    )
}

export default ScrollTopButton