import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateCard, readDeck, readCard } from '../../utils/api/index.js';
import CardForm from "./CardForm.js";

export default function EditCard({ updateDecks }) {

    //variable to story useHistory hook
    const history = useHistory();

    //deckId params
    const { deckId, cardId } = useParams();

    //deck state defaults to empty array
    const [deck, setDeck] = useState([]);

    //card state, defaults to emptry strings
    const [card, editCard] = useState({ front: "", back: "", deckId: "" });

    //api call, get current card
    useEffect(() => {
        const abortController = new AbortController();
        const cardData = async () => {
            const res = await readCard(cardId, abortController.signal);
            editCard(() => res);
        }
        cardData();
        return () => abortController.abort()
    }, [cardId]);

    //api call, get current deck
    useEffect(() => {
        const abortController = new AbortController();
        const deckData = async () => {
            const res = await readDeck(deckId, abortController.signal);
            setDeck(() => res);
        }
        deckData();
        return () => abortController.abort();
    }, [deckId]);

    //change form handler; updates card data
    const changeForm = ({ target }) => {
        editCard({ ...card, [target.name]: target.value })
    }

    //submit form handler; 
    const submitForm = async (e) => {
        e.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
        updateDecks(1);
    };

    //render to the browser
    return (
        <div className="col-9 mx-auto">

            {/* navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">

                        {/* link to home page */}
                        <Link to={"/"}>
                            <i className="fa fa-home" aria-hidden="true">
                            </i>
                            Home
                        </Link>
                    </li>

                    {/* deck name */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* edit card */}
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>

            </nav>

            <div className="row pl-3 pb-2">
                <h1>Edit Card</h1>
            </div>
            <CardForm
                submitForm={submitForm}
                changeForm={changeForm}
                card={card}
                deckId={deckId} />
        </div>
    )
}
