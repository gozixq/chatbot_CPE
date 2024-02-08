import React from "react";
const faqContent = [
  { question: "หอในมีผีไหม", answer: "เป็นความเชื่อส่วนบุคคล" },
  {
    question: "หมาใต้ตึกกัดไหม",
    answer:
      "ขึ้นอยู่กับตัวสุนัข โดยสามารถระบุเบื้องต้นถึงความดุร้ายของสุนัขแต่ละตัวได้จากปลอกคอ",
  },
  {
    question: "พี่เตี้ยอยู่ไหนแล้ว",
    answer:
      "พี่เตี้ย สุนัขพันธุ์ทางตัวหนึ่งใน มช. เป็นที่รู้จักจากประเพณีรับน้องขึ้นดอยอันเลื่องชื่อ ในทุกๆ ปีเจ้าหมาแสนรู้ตัวนี้จะร่วมวิ่งขึ้นดอยร่วมกับนักศึกษา เสียชีวิตเมื่อปี พ.ศ.2563",
  },
];
const FAQ = () => {
  return (
    <div className="flex flex-col py-32 bg-black text-white px-8" id="faq">
      <div className="w-full flex justify-center items-center">
        <span className="lg:text-5xl text-2xl font-bold text-transparent bg-clip-text w-fit bg-gradient-to-l from-gray-100 from-10% via-gray-200 via-30% to-gray-500 to-90%">
          Frequently Asked Question
        </span>
      </div>
      <div className="flex lg:flex-row flex-col lg:justify-evenly items-center gap-6 mt-14">
        {faqContent.map((faq, i) => (
          <div key={i} className="flex w-96">
            <div className="flex flex-col lg:gap-3 justify-start items-start">
              <span className="lg:text-3xl text-xl">{faq.question}</span>
              <p className="lg:text-base text-sm text-primary">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
