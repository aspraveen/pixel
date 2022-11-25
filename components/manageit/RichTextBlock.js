import React, { useCallback, useEffect, useMemo, useState } from "react"
import isHotkey from "is-hotkey"
import { Editable, withReact, Slate, ReactEditor } from "slate-react"
import { Editor, Transforms, createEditor, Node } from "slate"
import { withHistory } from "slate-history"
import { Box } from "@chakra-ui/react"
import { Element, Leaf, toggleMark, Toolbar } from "./RichTextComponents"

// @refresh reset
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
}

let initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
]

export const RichTextBlock = ({}) => {
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    const contents = localStorage.getItem("content")
    initialValue = JSON.parse(contents)
    console.log("🚀 ~ file: RichTextBlock.js ~ line 56 ~ useEffect ~ contents", contents)
  }, [])
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  //focus selection
  const [focused, setFocused] = React.useState(false)
  const savedSelection = React.useRef(editor.selection)

  const onFocus = React.useCallback(() => {
    setFocused(true)
    if (!editor.selection && value?.length) {
      Transforms.select(editor, savedSelection.current ?? Editor.end(editor, []))
    }
  }, [editor])

  const onBlur = React.useCallback(() => {
    setFocused(false)
    savedSelection.current = editor.selection
  }, [editor])

  const divRef = React.useRef(null)

  const focusEditor = React.useCallback(
    (e) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor)
        e.preventDefault()
      }
    },
    [editor],
  )

  const onKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  return (
    <Box ref={divRef} onMouseDown={focusEditor} borderWidth={"1px"}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value)
          const isAstChange = editor.operations.some((op) => "set_selection" !== op.type)
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            localStorage.setItem("content", content)
          }
        }}
      >
        <Toolbar />
        <Box padding={"15px 5px"}>
          <Editable
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
          />
        </Box>
      </Slate>
    </Box>
  )
}
