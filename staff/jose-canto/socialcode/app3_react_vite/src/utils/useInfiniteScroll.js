import { useEffect, useCallback } from "react"

const useInfiniteScroll = (callback) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return
    }
    callback()
  }, [callback])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])
}


export default useInfiniteScroll