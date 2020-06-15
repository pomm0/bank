import React, { useState, useEffect } from 'react';
import { Card as CardComponent, Intro, PaymentIcon, StatefulFetchHoc } from 'components';
import { promiseWithMinRuntime } from 'utils/promise';
import { backendFetch } from 'utils/backendFetch';
import styled from 'styled-components';
import { formatDate } from 'utils/intl';

const GridLayout = styled.div`
  display: grid;
  grid-column: 1;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const PaymentIconContainer = styled.div`
  width: 100px;
  text-align: right;

  svg {
    height: auto;
    width: 100%;
  }
`;

export const Card = () => {
  let [cards, setCards] = useState([]);
  let [state, setState] = useState({ isLoading: true, isError: false });

  useEffect(() => {
    setState({ isError: false, isLoading: true });

    promiseWithMinRuntime(backendFetch({ urlPath: '/cards' }))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`[Cards] fetch error`);
        }

        return response.json();
      })
      .then((json) => {
        if (!json.cards) {
          throw new Error('[Cards] fetch response error');
        }

        setCards(json.cards);
        setState({ isError: false, isLoading: false });
      })
      .catch(() => {
        setState({ isError: true, isLoading: false });
      });
  }, []);

  // Update cards-array state, due to activation change
  const onCardActivate = (id) => {
    const cardIndex = cards.findIndex((card) => card.id === id);
    // Set card as `activate`
    cards[cardIndex].active = true;
    setCards(cards.slice(0));
  };

  return (
    <>
      <Intro
        title="Karten"
        description="Hier sehen Sie jegliche Karten die für Ihr Konto existieren"
        className="mb-2 mt-4"
      />

      <GridLayout>
        {state.isLoading ? (
          <>Lädt... Bitte warten!</>
        ) : (
          cards.map((card, index) => (
            <CardComponent key={index} className="df flex-column">
              <div className="df justify-between">
                <div>
                  <div className="mb-1">
                    <div className="bold">Nummer:</div>
                    {card.number}
                  </div>
                  <div>
                    <div className="bold">Erstellt am:</div>
                    {formatDate(new Date(card.createdAt))}
                  </div>
                  <div className="mt-1">
                    <div className="bold">Status:</div>
                    {card.active ? (
                      <span className="green">Aktiviert</span>
                    ) : (
                      <>
                        <span className="red">Deaktiviert</span>
                      </>
                    )}
                  </div>
                </div>
                <PaymentIconContainer className="flex-shrink-0">
                  <PaymentIcon type={card.type} />
                </PaymentIconContainer>
              </div>
              {!card.active && (
                <StatefulFetchHoc
                  urlPath={`/cards/${card.id}/activate`}
                  method="PUT"
                  onSuccess={() => onCardActivate(card.id)}
                >
                  {({ state, fetch }) => (
                    <>
                      <button
                        disabled={state.isLoading}
                        type="button"
                        className="mt-2"
                        onClick={fetch}
                      >
                        {state.isLoading ? <>Wird aktiviert...</> : <>Jetzt aktivieren</>}
                      </button>
                      {state.isError && <span className="red">Fehler beim aktivieren!</span>}
                    </>
                  )}
                </StatefulFetchHoc>
              )}
            </CardComponent>
          ))
        )}
      </GridLayout>
    </>
  );
};
