/* eslint-disable no-undef */
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const faqContent = [
  { id: 1, question: "หอในมีผีไหม?", answer: "เป็นความเชื่อส่วนบุคคล" },
  {
    id: 2,
    question: "หมาใต้ตึกกัดไหม?",
    answer:
      "ขึ้นอยู่กับตัวสุนัข โดยสามารถระบุเบื้องต้นถึงความดุร้ายของสุนัขแต่ละตัวได้จากปลอกคอ",
  },
  {
    id: 3,
    question: "พี่เตี้ยอยู่ไหนแล้ว?",
    answer:
      "พี่เตี้ย สุนัขพันธุ์ทางตัวหนึ่งใน มช. เป็นที่รู้จักจากประเพณีรับน้องขึ้นดอยอันเลื่องชื่อ ในทุกๆ ปีเจ้าหมาแสนรู้ตัวนี้จะร่วมวิ่งขึ้นดอยร่วมกับนักศึกษา เสียชีวิตเมื่อปี พ.ศ.2563",
  },
];
const FAQ = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex flex-col py-32 bg-black text-white px-8" id="faq">
      <div className="w-full flex justify-center items-center">
        <span className="lg:text-5xl font-bold text-3xl text-transparent bg-clip-text w-fit bg-gradient-to-l from-gray-100 from-10% via-gray-200 via-30% to-gray-500 to-90%">
          Frequently Asked Question
        </span>
      </div>
      <div className="flex lg:flex-row flex-col lg:justify-evenly items-start gap-10 mt-14 px-[5%]">
        {faqContent.map((faq, i) => (
          <Accordion
            key={i}
            open={open === faq.id}
            icon={<Icon id={faq.id} open={open} />}
            className="group"
          >
            <AccordionHeader
              onClick={() => handleOpen(faq.id)}
              className={`text-gray-500 group-hover:text-white !border-primary ${
                open === faq.id && "text-white"
              }`}
            >
              {faq.question}
            </AccordionHeader>
            <AccordionBody className="text-primary/80">
              {faq.answer}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
