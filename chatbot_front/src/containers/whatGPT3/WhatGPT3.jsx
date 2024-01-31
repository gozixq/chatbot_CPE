import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Frequently Asked Question</h1>
    </div>

    <div className="gpt3__whatgpt3-container">
      <Feature title="หอในมีผีไหม" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." className="glowing-border"/>
      <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" className="glowing-border" />
      <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" className="glowing-border"/>
    </div>
  </div>
);

export default WhatGPT3;
