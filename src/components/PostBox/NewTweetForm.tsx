import React, { CSSProperties } from 'react'

interface Props {
  newTweetInput: any,
  handleNewTweet: any,
  handleSubmit: any
}

const NewTweetForm: React.FC<Props> = ({ newTweetInput, handleSubmit, handleNewTweet }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea    
          placeholder="What's happening?"
          value={newTweetInput}
          style={textFieldStyle}
          onChange={(e) => handleNewTweet(e.target.value)}
        >     
        </textarea>
      </form>
      <span style={thematicBreak} />
      <span style={thematicBreakVertical} />
      <button style={sendButtonStyle} type="submit">Tweet</button>
        <div style={images}>
          <img src="data:image/svg+xml;base64,PHN2ZyB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxnPjxwYXRoIGZpbGw9IiMxZGExZjIiIGQ9Ik0xOSAxMC41VjguOGgtNC40djYuNGgxLjd2LTJoMnYtMS43aC0ydi0xSDE5em0tNy4zLTEuN2gxLjd2Ni40aC0xLjdWOC44em0tMy42IDEuNmMuNCAwIC45LjIgMS4yLjVsMS4yLTFDOS45IDkuMiA5IDguOCA4LjEgOC44Yy0xLjggMC0zLjIgMS40LTMuMiAzLjJzMS40IDMuMiAzLjIgMy4yYzEgMCAxLjgtLjQgMi40LTEuMXYtMi41SDcuN3YxLjJoMS4ydi42Yy0uMi4xLS41LjItLjguMi0uOSAwLTEuNi0uNy0xLjYtMS42IDAtLjguNy0xLjYgMS42LTEuNnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWRhMWYyIiBkPSJNMjAuNSAyLjAyaC0xN2MtMS4yNCAwLTIuMjUgMS4wMDctMi4yNSAyLjI0N3YxNS41MDdjMCAxLjIzOCAxLjAxIDIuMjQ2IDIuMjUgMi4yNDZoMTdjMS4yNCAwIDIuMjUtMS4wMDggMi4yNS0yLjI0NlY0LjI2N2MwLTEuMjQtMS4wMS0yLjI0Ny0yLjI1LTIuMjQ3em0uNzUgMTcuNzU0YzAgLjQxLS4zMzYuNzQ2LS43NS43NDZoLTE3Yy0uNDE0IDAtLjc1LS4zMzYtLjc1LS43NDZWNC4yNjdjMC0uNDEyLjMzNi0uNzQ3Ljc1LS43NDdoMTdjLjQxNCAwIC43NS4zMzUuNzUuNzQ3djE1LjUwN3oiPjwvcGF0aD48L2c+PC9zdmc+" />
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiPjxnPjxwYXRoIGZpbGw9IiMxZGExZjIiIGQ9Ik0xOS43NSAySDQuMjVDMy4wMSAyIDIgMy4wMSAyIDQuMjV2MTUuNUMyIDIwLjk5IDMuMDEgMjIgNC4yNSAyMmgxNS41YzEuMjQgMCAyLjI1LTEuMDEgMi4yNS0yLjI1VjQuMjVDMjIgMy4wMSAyMC45OSAyIDE5Ljc1IDJ6TTQuMjUgMy41aDE1LjVjLjQxMyAwIC43NS4zMzcuNzUuNzV2OS42NzZsLTMuODU4LTMuODU4Yy0uMTQtLjE0LS4zMy0uMjItLjUzLS4yMmgtLjAwM2MtLjIgMC0uMzkzLjA4LS41MzIuMjI0bC00LjMxNyA0LjM4NC0xLjgxMy0xLjgwNmMtLjE0LS4xNC0uMzMtLjIyLS41My0uMjItLjE5My0uMDMtLjM5NS4wOC0uNTM1LjIyN0wzLjUgMTcuNjQyVjQuMjVjMC0uNDEzLjMzNy0uNzUuNzUtLjc1em0tLjc0NCAxNi4yOGw1LjQxOC01LjUzNCA2LjI4MiA2LjI1NEg0LjI1Yy0uNDAyIDAtLjcyNy0uMzIyLS43NDQtLjcyem0xNi4yNDQuNzJoLTIuNDJsLTUuMDA3LTQuOTg3IDMuNzkyLTMuODUgNC4zODUgNC4zODR2My43MDNjMCAuNDEzLS4zMzcuNzUtLjc1Ljc1eiI+PC9wYXRoPjxjaXJjbGUgIGZpbGw9IiMxZGExZjIiIGN4PSI4Ljg2OCIgY3k9IjguMzA5IiByPSIxLjU0MiI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==" />
          <img src="data:image/svg+xml;base64,PHN2ZyB4PSIwIiB5PSIwIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGZpbGw9IiMxZGExZjIiIGQ9Ik0xMiAyMi43NUM2LjA3MiAyMi43NSAxLjI1IDE3LjkyOCAxLjI1IDEyUzYuMDcyIDEuMjUgMTIgMS4yNSAyMi43NSA2LjA3MiAyMi43NSAxMiAxNy45MjggMjIuNzUgMTIgMjIuNzV6bTAtMjBDNi45IDIuNzUgMi43NSA2LjkgMi43NSAxMlM2LjkgMjEuMjUgMTIgMjEuMjVzOS4yNS00LjE1IDkuMjUtOS4yNVMxNy4xIDIuNzUgMTIgMi43NXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWRhMWYyIiBkPSJNMTIgMTcuMTE1Yy0xLjg5MiAwLTMuNjMzLS45NS00LjY1Ni0yLjU0NC0uMjI0LS4zNDgtLjEyMy0uODEuMjI2LTEuMDM1LjM0OC0uMjI2LjgxMi0uMTI0IDEuMDM2LjIyNi43NDcgMS4xNjIgMi4wMTYgMS44NTUgMy4zOTUgMS44NTVzMi42NDgtLjY5MyAzLjM5Ni0xLjg1NGMuMjI0LS4zNS42ODgtLjQ1IDEuMDM2LS4yMjUuMzUuMjI0LjQ1LjY4OC4yMjYgMS4wMzYtMS4wMjUgMS41OTQtMi43NjYgMi41NDUtNC42NTggMi41NDV6Ij48L3BhdGg+PGNpcmNsZSBmaWxsPSIjMWRhMWYyIiBjeD0iMTQuNzM4IiBjeT0iOS40NTgiIHI9IjEuNDc4Ij48L2NpcmNsZT48Y2lyY2xlIGZpbGw9IiMxZGExZjIiIGN4PSI5LjI2MiIgY3k9IjkuNDU4IiByPSIxLjQ3OCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==" />  
          
          {/* To be implemented */}
          {/* <img src="src/components/PostBox/assets/uploadimage.svg" />
          <img src="src/components/PostBox/assets/gifupload.svg" />
          <img src="src/components/PostBox/assets/emojipicker.svg" /> */}
          
        </div>
      </div>
  )
}

const textFieldStyle: CSSProperties = {
    display: 'block',
    fontSize: '19px',
    position: 'relative',
    width: '47vh',
    maxWidth: '500px',
    overflow: 'hidden',
    minHeight: '24px',
    textAlign: 'left',
    padding: '10px 5px',
    boxSizing: 'border-box'
}

const sendButtonStyle: CSSProperties = {
    padding: '0px 24px',
    outline: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    border: '0',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 800,
    color: 'white',
    backgroundColor: '#1DA1F2',
    flexShrink: 0,
    margin: '-2vh 36vh'
 }

const thematicBreak: CSSProperties = {
    display: 'block',
    padding: '1.5px 5px',
    content: '',
    height: '1px',
    width: '47vh',
    backgroundColor: 'rgb(235, 238, 240)'
}

const thematicBreakVertical: CSSProperties = {
    display: 'block',
    padding: '5px 1.5px',
    content: '',
    height: '25px',
    width: '1px',
    marginLeft: '35vh',
    backgroundColor: 'rgb(235, 238, 240)'
}

const images: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '60px',
}

export default NewTweetForm