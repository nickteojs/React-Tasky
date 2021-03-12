import {useState, useEffect} from 'react'
import Quotes from './Quotes'

const Quote = () => {
    const [quote, setQuote] = useState([])
    const [author, setAuthor] = useState([])

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(response => {
                if (response.status >= 400) {
                    console.log("Failed to fetch, using data from local quotes instead")
                    const randomQuote = Quotes[Math.floor(Math.random() * 1600)]
                    const {text, author} = randomQuote
                    setQuote(text)
                    setAuthor(author)
                }
                return response.json();
            })
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * 1642)]
                const {text, author} = randomQuote
                setQuote(text)
                setAuthor(author)
            })
      }, [])

    return (
        <div className="quote">
            <p>"{quote}"</p>
            <p className="author">- {author}</p>
        </div>
    )
}

export default Quote
