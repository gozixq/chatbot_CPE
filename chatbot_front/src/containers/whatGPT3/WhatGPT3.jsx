import React from "react";
import Feature from "../../components/feature/Feature";
import "./whatGPT3.css";

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Frequently Asked Question</h1>
    </div>

    <div className="gpt3__whatgpt3-container">
      <Feature
        title="หอในมีผีไหม"
        text="เป็นความเชื่อส่วนบุคคล"
        className="glowing-border"
      />
      <Feature
        title="หมาใต้ตึกกัดไหม"
        text="ขึ้นอยู่กับตัวสุนัข โดยสามารถระบุเบื้องต้นถึงความดุร้ายของสุนัขแต่ละตัวได้จากปลอกคอ"
        className="glowing-border"
      />
      <Feature
        title="พี่เตี้ยอยู่ไหนแล้ว"
        text="พี่เตี้ย สุนัขพันธุ์ทางตัวหนึ่งใน มช. เป็นที่รู้จักจากประเพณีรับน้องขึ้นดอยอันเลื่องชื่อ ในทุกๆ ปีเจ้าหมาแสนรู้ตัวนี้จะร่วมวิ่งขึ้นดอยร่วมกับนักศึกษา เสียชีวิตเมื่อปี พ.ศ.2563"
        className="glowing-border"
      />
    </div>
  </div>
);

export default WhatGPT3;
