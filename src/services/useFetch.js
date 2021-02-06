import { useState, useRef, useEffect } from 'react'

const baseUrl = process.env.REACT_APP_API_BASE_URL

export default function useFetch(url) {
  // Ref is  used here because updating a ref does not cause a re-render on React
  const isMounted = useRef(false)

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    isMounted.current = true

    async function init() {
      try {
        const response = await fetch(baseUrl + url)
        if (response.ok) {
          const json = await response.json()

          if (isMounted.current) {
            setData(json)
          }
        } else {
          throw response
        }
      } catch (e) {
        if (isMounted.current) {
          setError(e)
        }
      } finally {
        if (isMounted.current) {
          // Finally block will run after success or failure
          setLoading(false)
        }
      }
    }
    init()

    // Any function returned from useEffect runs when component unmounts
    return () => {
      isMounted.current = false
    }
  }, [url]) // Dependency array. List of reasons that useEffect should re-run.

  return { data, error, loading }
}
