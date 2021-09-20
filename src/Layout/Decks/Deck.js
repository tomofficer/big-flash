import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteCard, readDeck } from '../../utils/api/index.js';
import { deleteDeck } from '../../utils/api/index.js';



export default function Deck({ updateDecks }) {

    //variable to store useHistory hook
    const history = useHistory();

    //deckId params
    const { deckId } = useParams();

    //deck state
    const [deck, setDeck] = useState([]);

    //destructured deck contents
    const { id, name, description, cards } = deck;

    //url match
    const { url } = useRouteMatch();

    //api call for current deck, once for each deck id
    useEffect(() => {
        const abortController = new AbortController()
        const deckData = async () => {
            const res = await readDeck(deckId, abortController.signal)
            setDeck(() => res);
        }
        deckData();
        return () => abortController.abort();
    }, [deckId]);

    //delete button handler
    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
            await deleteDeck(id);
            updateDecks(-1);
            history.push('/');
        } else {
            history.go(0);
        }
    };

    //render to the browser
    //if no deck/no cards render Loading...
    if (!deck || !cards) {
        return (
            <div>
                <p>
                    Loading...
                </p>
            </div >
        )
    } else {

        //if deck exists and contains more than 2 cards, render to browser
        return (
            <div className="col-9 mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                <i
                                    className="fa fa-home"
                                    aria-hidden="true">
                                </i>
                                Home
                            </Link>
                        </li>
                        <li
                            className="breadcrumb-item">
                            {name}
                        </li>
                    </ol>
                </nav>
                <div className="card border-0 mb-4">
                    <div className="card-body">
                        <div className="row px-3">
                            <h5 className="card-title">
                                {name}
                            </h5>
                        </div>
                        <p className="card-text">
                            {description}
                        </p>
                        <div className="row px-3">
                            <Link
                                to={`/decks/${id}/edit`}
                                className="btn btn-secondary">
                                <i className="fa fa-edit"
                                    aria-hidden="true">
                                </i>
                                Edit
                            </Link>
                            <Link
                                to={`/decks/${id}/study`}
                                className="btn btn-primary ml-3">
                                <i className="fa fa-bookmark"
                                    aria-hidden="true">
                                </i>
                                Study
                            </Link>
                            <Link
                                to={`/decks/${id}/cards/new`}
                                className="btn btn-primary ml-3">
                                <i className="fa fa-plus"
                                    aria-hidden="true">
                                </i>
                                Add Cards
                            </Link>
                            <button
                                onClick={deleteHandler}
                                name="delete" value={id}
                                className="btn btn-danger ml-auto">
                                <i className="fa fa-trash"
                                    aria-hidden="true">
                                </i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row pl-3 pb-2">
                    <h1>
                        Cards
                    </h1>
                </div>
                {cards.map((card, index) =>
                    <div className="row" key={index}>
                        <div className="col">
                            <div className="card">
                                <div className="row card-body">
                                    <p className="col-6 card-text">
                                        {card.front}
                                    </p>
                                    <p className="col-6 card-text">
                                        {card.back}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-end p-4">
                                    <Link
                                        to={`${url}/cards/${card.id}/edit`}
                                        className="btn btn-secondary">
                                        <i className="fa fa-edit"
                                            aria-hidden="true">
                                        </i>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this card? You will not be able to recover it.")) {
                                                await deleteCard(card.id)
                                                updateDecks(-1)
                                                history.go(0)
                                            } else {
                                                history.go(0)
                                            }
                                        }}
                                        name="deleteCard"
                                        value={card.id}
                                        className="btn btn-danger ml-3">
                                        <i className="fa fa-trash"
                                            aria-hidden="true">
                                        </i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}


