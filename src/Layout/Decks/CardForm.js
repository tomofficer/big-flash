import React from 'react';
import { Link } from 'react-router-dom';

//pass props from add card
export default function CardForm({ card, deckId, submitForm, changeForm }) {

    //render card form data to page
    return (
        <form
            id="cardForm"
            onSubmit={submitForm}
        >
            <div className="form-group">
                <label>
                    Front
                </label>
                <textarea
                    name="front"
                    value={card.front}
                    onChange={changeForm}
                    id="front"
                    className="form-control"
                    placeholder="Front side of card"
                    rows={4}
                />
            </div>
            <div className="form-group">
                <label>Back</label>
                <textarea
                    name="back"
                    value={card.back}
                    onChange={changeForm}
                    className="form-control"
                    id="back"
                    placeholder="Back side of card"
                    rows={4}
                />
            </div>
            <Link
                to={`/decks/${deckId}`}
                name="cancel"
                className="btn btn-secondary mr-3">
                Done
            </Link>
            <button
                type="submit"
                className="btn btn-primary">
                Save
            </button>
        </form>
    )
}
