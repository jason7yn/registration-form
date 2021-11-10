import axios from "axios";
import FormQuestions from "./models";

const httpService = axios.create({
  baseURL: "http://localhost:8000/",
});

const sendEmail = (data) => {
  const keys = Object.keys(data.questions);
  const target = "I am attending this session because";

  let form = new FormData();

  const content = keys.map((key) => {
    return {
      question: FormQuestions[key].content,
      answer: data.questions[key] ? data.questions[key] : "not provided",
      multiple: FormQuestions[key].content === target ? true : false,
    };
  });

  if (data.attachments.length !== 0) {
    data.attachments.forEach((file) => {
      form.append("files", file.originFileObj);
    });
    form.append("hasAttachments", true);
  } else {
    form.append("hasAttachments", false);
  }

  form.append("questions", JSON.stringify(content));

  return httpService.post("email", form);
};

export default sendEmail;
