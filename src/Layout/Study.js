import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api/index.js';
import CardList from './CardList';

export default function Study() {

    //deck state
    const [deck, setDeck] = useState({});

    //deckId params
    const { deckId } = useParams();

    //api call for current deck using built in readDeck function, once for each deckId
    useEffect(() => {
        const getDeck = async () => {
            const currentDeck = await readDeck(deckId);
            setDeck(() => currentDeck);
        }
        getDeck();
    }, [deckId]);

    //if deck exists render to browser
    if (Object.keys(deck).length) {
        return (
            <div className="col-9 mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}><i className="fa fa-home" aria-hidden="true">
                            </i> Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                <div>
                    <h1>{deck.name}: Study</h1>
                </div>
                <CardList cards={deck.cards} />
            </div>
        )
    } else {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                    Loading...
                </span>
            </div>
        )
    }
}

