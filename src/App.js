import "./App.css";
import { useState } from "react";
import {
  Input,
  Form,
  Checkbox,
  Radio,
  Typography,
  Upload,
  Button,
  Row,
  Col,
} from "antd";
import FormQuestions from "./services/models";
import sendEmail from "./services/email";

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function App() {
  const [displayOptional, setDisplayOptional] = useState({
    q2: false,
    q5: false,
  });
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    sendEmail({ questions: values, attachments: fileList })
      .then((res) => {
        alert("Registration completed");
      })
      .catch((error) => {
        alert("Some error occurred");
      });
  };
  const onChange = (e) => {
    if (e.target.name === "q1") {
      setDisplayOptional(
        e.target.value === "No"
          ? { ...displayOptional, q2: true }
          : { ...displayOptional, q2: false }
      );
    } else {
      setDisplayOptional(
        e.target.value === "Yes"
          ? { ...displayOptional, q5: true }
          : { ...displayOptional, q5: false }
      );
    }
  };

  return (
    <div className="App">
      <Row justify="center">
        <Col span={12}>
          <Form onFinish={onFinish} className="registration-form">
            <Form.Item>
              <Title level={5}>{FormQuestions.q1.content}</Title>
              <Form.Item
                rules={[{ required: true, message: "Please pick one option" }]}
                name="q1"
              >
                <Radio.Group onChange={onChange} value={0} name="q1">
                  {FormQuestions.q1.options.map((option) => {
                    return (
                      <Row>
                        <Radio
                          key={option.key}
                          defaultChecked={false}
                          value={option.value}
                        >
                          {option.value}
                        </Radio>
                      </Row>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            {displayOptional.q2 ? (
              <Form.Item>
                <Title level={5}>{FormQuestions.q2.content}</Title>
                <Form.Item
                  name="q2"
                  rules={[
                    {
                      required: true,
                      message: "Please pick at least one option",
                    },
                  ]}
                >
                  <Checkbox.Group>
                    {FormQuestions.q2.options.map((option) => {
                      return (
                        <Row>
                          <Checkbox key={option.key} value={option.value}>
                            {option.value}
                          </Checkbox>
                        </Row>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </Form.Item>
            ) : null}

            <Form.Item>
              <Title level={5}>{FormQuestions.q3.content}</Title>
              <Form.Item name="q3">
                <TextArea row={5} />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Title level={5}>{FormQuestions.q4.content}</Title>
              <Form.Item
                name="q4"
                rules={[{ required: true, message: "Please pick one option" }]}
              >
                <Radio.Group name="q4" onChange={onChange}>
                  {FormQuestions.q4.options.map((option) => {
                    return (
                      <Row>
                        <Radio
                          defaultChecked={false}
                          value={option.value}
                          key={option.key}
                        >
                          {option.value}
                        </Radio>
                      </Row>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            {displayOptional.q5 ? (
              <Form.Item>
                <Title level={5}>{FormQuestions.q5.content}</Title>
                <Form.Item
                  name="q5"
                  rules={[
                    {
                      required: true,
                      message: "Please input your requirements",
                    },
                  ]}
                >
                  <TextArea row={5} />
                </Form.Item>
              </Form.Item>
            ) : null}

            <Form.Item>
              <Title level={5}>{FormQuestions.q6.content}</Title>
              <Form.Item>
                <Text>Choose Files: </Text>
                <Upload
                  multiple={true}
                  fileList={fileList}
                  customRequest={({ onSuccess }) => {
                    onSuccess("ok");
                  }}
                  onChange={(files) => {
                    setFileList([...files.fileList]);
                  }}
                  accept=".doc,.docx,application/msword,application/pdf,.zip,.rar,.txt"
                >
                  <Button type="dashed">Browse</Button>
                </Upload>
              </Form.Item>
            </Form.Item>

            <Button htmlType="submit" className="submit-btn">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
