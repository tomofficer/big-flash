import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api/index.js';


export default function CreateDeck({ updateDecks }) {

    //variable to store useHistory hook
    const history = useHistory();

    //new deck state, form inputs default to empty strings
    const [newDeck, setNewDeck] = useState({ name: "", description: "" });

    //update content, name, description of new deck
    const changeForm = ({ target }) => {
        setNewDeck({ ...newDeck, [target.name]: target.value })
    };

    //create the new deck
    const submitForm = async (e) => {
        e.preventDefault();
        const res = await createDeck(newDeck);
        history.push(`/decks/${res.id}`);
        updateDecks(1);
    };

    // render to browser
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
                        className="breadcrumb-item"
                    >Create Deck
                    </li>
                </ol>

            </nav>
            <form
                onSubmit={submitForm}>
                <div className="form-group">
                    <label>
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={newDeck.name}
                        onChange={changeForm}
                        id="name"
                        className="form-control"
                        placeholder="Deck Name"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={newDeck.description}
                        onChange={changeForm}
                        className="form-control"
                        id="description"
                        placeholder="Brief description of the deck."
                        rows={4}
                    />
                </div>
                <Link
                    to="/"
                    name="cancel"
                    className="btn btn-secondary mr-3">
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

