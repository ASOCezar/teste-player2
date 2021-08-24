import * as Styled from './styles';

import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import backArrow from '../../assets/icons/back-arrow.svg';
import attachmentIcon from '../../assets/icons/attachment-icon.svg';

import { Header } from '../../components/Header';

import messages from './dataDispatchs';

export const BankDetails = () => {
  const history = useHistory();
  const { id } = useParams();

  const [bank, setBank] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBackToHome = () => {
    history.goBack();
  };

  useEffect(() => {
    fetch(`https://brasilapi.com.br/api/banks/v1/${id}`)
      .then((res) => res.json())
      .then((res) => setBank(res));
  }, [id]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        pageTitle={
          <div className="top-page">
            <img src={backArrow} />
            <h3>{bank.name}</h3>
          </div>
        }
        handleClick={handleBackToHome}
      />
      <Styled.Container>
        <main>
          <div className="bank-details">
            <h3 className="header-title">Detalhes do Banco</h3>
            <h4 className="section-title">{bank.fullName}</h4>
            <h4 className="section-subtitle">Título</h4>
            <h4 className="section-title">Code: {bank.code}</h4>
            <h4 className="section-subtitle">24/08/2021</h4>
            <h4 className="section-title">IPSB: {bank.ispb}</h4>
            <h4 className="section-subtitle">8:30</h4>
          </div>
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.title} className="message-content">
                <h5 className="message-title">{message.title}</h5>
                <p className="message-text">{message.text}</p>
                {message.attachments.length > 0 &&
                  message.attachments.map((attachment) => (
                    <div className="message-attachment" key={attachment.name + attachment.extension}>
                      <img src={attachmentIcon} />
                      <p>
                        {attachment.name}
                        {attachment.extension} - {attachment.size}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </main>
      </Styled.Container>
    </>
  );
};