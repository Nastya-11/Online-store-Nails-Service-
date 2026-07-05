'use client';
import { useState } from 'react';
import './Accordion.scss';

type Props = {
  title: string;
  isBorder: boolean;
  children: React.ReactNode;
  svg: string;
};

const Accordion = ({ title, isBorder, children, svg }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isBorder ? 'accordion accordion-border' : 'accordion'}>
      <button
        style={{ borderBottomWidth: isBorder ? '1px' : 0 }}
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          <div className="svg" dangerouslySetInnerHTML={{ __html: svg }}></div>{' '}
          {title}
        </span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
