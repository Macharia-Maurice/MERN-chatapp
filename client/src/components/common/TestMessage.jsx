import { MessageBox } from 'react-chat-elements';

const TestMessage = () => (
  <div className="p-4">
    <MessageBox
      text="This is a test message."
      position="left"
      date={new Date().toLocaleString()}
      notch={true}

    />
  </div>
);

export default TestMessage;
