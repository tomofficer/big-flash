import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api/index.js';
import CardForm from "./CardForm.js";



export default function AddCard({ updateDecks }) {

    //deckId params
    const { deckId } = useParams();

    //deck state, defaults to empty array
    const [deck, setDeck] = useState([]);

    //card state, defaults to empty strings in form inputs
    const [card, addCard] = useState(
        { front: "", back: "", deckId: "" });

    //api call, create new deck
    useEffect(() => {
        const abortController = new AbortController();
        const deckData = async () => {
            const res = await readDeck(deckId, abortController.signal);
            setDeck(() => res)
        };
        deckData();
        return () => abortController.abort();
    }, [deckId]);



    //add name and value to card state
    const changeForm = ({ target }) => {
        addCard({ ...card, [target.name]: target.value })
    };


    //add card and update decks
    const submitForm = async (e) => {
        e.preventDefault();
        addCard({ ...card, deckId: deckId });
        await createCard(deckId, card);
        updateDecks(1);
        addCard({ front: "", back: "", deckId: "" });
    };


    //render to the browswer
    return (
        <div className="col-9 mx-auto">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        Add Card
                    </li>
                </ol>
            </nav>
            <div className="row pl-3 pb-2">
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm
                submitForm={submitForm}
                changeForm={changeForm}
                card={card}
                deckId={deckId}
            />
        </div>
    )
}
