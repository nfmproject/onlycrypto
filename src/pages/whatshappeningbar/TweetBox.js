import React from "react";
import { Form } from "usetheform"; 
// import { Form, useForm } from "usetheform"; in case of using ReactJsonViewer()
// import JSONTree from "react-json-tree";
import { WhatsHappeningBar } from "../../components/WhatsHappeningBar/WhatsHappeningBar";
import { Preview } from "../../components/Preview/Preview";
import { UploadMediaBar } from "../../components/UploadMediaBar/UploadMediaBar";
import { Submit } from "../../components/Submit/Submit";
import { CharacterCounter } from "../../components/CharacterCounter/CharacterCounter";
import "./TweetBox.css";

const MAX_CHARS_ALLOWED = 50;

export default function App() {
  return (
    <div className="App"> 
      <Form onSubmit={onSubmit}>
        <WhatsHappeningBar maxChars={MAX_CHARS_ALLOWED} />
        <Preview />
        <span className="ThematicBreak" />
        <div className="ActionBar">
          <UploadMediaBar />
          <div className="ActionBar__Submit">
            <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
            <span className="ThematicBreakVertical" />
            <Submit />
          </div>
        </div>
        {/* form state viewer - debug only */}
        {/* <ReactJsonViewer /> */}
      </Form>
    </div>
  );
}

async function onSubmit(state) {
  // make an API call
  // await submitForm(state)
  const {
    editor: { plainText },
    ...resState
  } = state;
  console.log("onSubmit  => ", { ...resState, plainText });
  return true;
}