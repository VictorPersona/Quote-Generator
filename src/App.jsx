import { useEffect, useState } from 'react'
import data from './assets/data.json'
import './App.css'

function App() {
  const [quotesData, setQuotesData] = useState()

  const [quote, setQuote] = useState({})

  useEffect(() => {
    fetch('https://api.quotable.io/quotes/random?limit=30')
      .then((res) => res.json())
      .then((mainData) => {
        setQuotesData(mainData)
        handleRandomQuote()
      })
  }, [])

  function handleRandomQuote() {
    if (quotesData && quotesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.length)
      const currentQuote = {
        content: quotesData[randomIndex].content,
        author: quotesData[randomIndex].author,
      }
      setQuote(currentQuote)
    }
  }

  return (
    <>
      {quotesData ? (
        <div className="quoteContainer">
          <h2>{quote.content}</h2>
          <h3>{quote.author}</h3>
        </div>
      ) : (
        <h2>No Quotes Available</h2>
      )}
      <button className="newQuote" onClick={handleRandomQuote}>
        New Quote
      </button>
    </>
  )
}

export default App
