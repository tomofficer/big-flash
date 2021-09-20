import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api/index.js';

export default function EditDeck({ updateDecks }) {

    //deck state; defaults to empty strings for form inputs
    const [deck, editDeck] = useState({ name: "", description: "" });

    //variable to story useHistory hook
    const history = useHistory();

    //deckId params
    const { deckId } = useParams();

    //api call for current deck
    useEffect(() => {
        const abortController = new AbortController();
        const deckData = async () => {
            const res = await readDeck(deckId, abortController.signal);
            editDeck(() => res);
        }
        deckData();
        return () => abortController.abort();
    }, [deckId]);


    //change form handler; updates current deck data
    const changeForm = ({ target }) => {
        editDeck({ ...deck, [target.name]: target.value })
    };

    //submit form handler; makes new post request to update deck list
    const submitForm = async (e) => {
        e.preventDefault();
        const res = await updateDeck(deck);
        history.push(`/decks/${res.id}`);
        updateDecks(1);
    };

    //if no deck render "Loading"
    if (!deck) {
        return (
            <p>
                Loading...
            </p>
        )
    } else {

        //render to browser
        return (
            <div className="col-9 mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                <i className="fa fa-home" aria-hidden="true">
                                </i> Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            Edit Deck
                        </li>
                    </ol>
                </nav>
                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={deck.name}
                            onChange={changeForm}
                            id="name"
                            className="form-control"
                            placeholder={deck.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={deck.description}
                            onChange={changeForm}
                            className="form-control"
                            id="description"
                            placeholder={deck.description}
                            rows={4}
                            required
                        />
                    </div>
                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

