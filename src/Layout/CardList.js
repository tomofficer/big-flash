import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

export default function CardList({ cards }) {

    //variable to store useHistory hook
    const history = useHistory();

    //deckId params
    const { deckId } = useParams();

    //current card state
    const [currentCard, setCurrentCard] = useState(0);

    //flip state, set to front by default
    const [front, setFront] = useState(true);

    //card flip handler
    const flipHandler = () => {
        setFront(() => !front)
    };

    //next card handler, informs the user if deck is on last card; then restarts deck or returns home
    const nextHandler = () => {
        if (currentCard === (cards.length - 1)) {
            window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.")
                ? setCurrentCard(() => 0)
                : history.push("/")

            //if more than one card remains; the deck will move to next card
        } else {
            setCurrentCard((currentCard) => currentCard + 1)
            setFront(() => !front)
        }
    };

    //if proper amount of cards to study (2 or more) then render to browser
    if (cards.length > 2) {
        return (
            <div className="row p-3">
                <div className="card w-100">

                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard + 1} of {cards.length}
                        </h5>

                        <p className="card-text">
                            {front ? cards[currentCard].front : cards[currentCard].back}
                        </p>


                        <button onClick={flipHandler} className="btn btn-secondary mr-3">
                            Flip
                        </button>


                        {front ? null :
                            <button onClick={nextHandler} className="btn btn-primary">
                                Next
                            </button>}
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="row p-3 w-100">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Not enough cards.
                        </h5>
                        <p className="card-text">
                            You need at least 3 cards to study. There are {cards.length} cards in this deck.
                        </p>

                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-3">
                            <i className="fa fa-plus" aria-hidden="true">
                            </i>
                            Add Cards
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
