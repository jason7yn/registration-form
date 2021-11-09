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

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function App() {
  const [displayOptional, setDisplayOptional] = useState({
    q2: false,
    q5: false,
  });
  const [fileList, setFileList] = useState([]);

  const onFinsh = (values) => {
    console.log(values);
    console.log(fileList);
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
  //antd upload component is designed for backend upload
  //used customise request to bypass this feature
  const fakeRequest = ({ onSuccess }) => {
    onSuccess("ok");
  };
  const handleUpload = (files) => {
    setFileList([...files.fileList]);
  };

  return (
    <div className="App">
      <Row justify="center">
        <Col span={12}>
          <Form onFinish={onFinsh} className="registration-form">
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
                  customRequest={fakeRequest}
                  onChange={handleUpload}
                  accept=".doc,.docx,application/msword,application/pdf,.zip,.rar"
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
