import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import { listDecks } from '../utils/api/index.js';

export default function Home({ deckUpdate, totalDecks }) {

    //deck state
    const [decks, setDecks] = useState([])

    //api call
    useEffect(() => {
        const abortController = new AbortController()
        const getDecks = async () => {
            const decksFromAPI = await listDecks(abortController.signal);
            setDecks(() => decksFromAPI);
        }
        getDecks();
        return () => abortController.abort();
    }, [totalDecks]);

    //rendered to the browser
    return (
        <div>
            <div className="row mx-auto w-75">
                <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
                    <i className="fa fa-plus" aria-hidden="true">
                    </i>
                    Create Deck
                </Link>
            </div>

            <div className="row w-100 mx-auto flex-column align-items-center">
                {decks.map((deck) =>
                    <DeckList
                        key={deck.id}
                        deck={deck}
                        deckUpdate={deckUpdate}
                    />)}
            </div>

        </div>
    )
}

