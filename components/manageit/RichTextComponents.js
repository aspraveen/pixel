import {
    IconButton,
    HStack,
    useColorMode,
    chakra,
    ListItem,
    OrderedList,
    UnorderedList,
  Heading,
  Button,
  Image
  } from "@chakra-ui/react";
  import {
    MdCode,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdImage,
    MdLooksOne,
    MdLooksTwo
  } from "react-icons/md";
  import {
  useSlate,
  useSlateStatic
  } from "slate-react";
  import { Editor, Transforms, Element as SlateElement } from "slate";
  import { HistoryEditor } from "slate-history";
  import isUrl from "is-url"
  import imageExtensions from "image-extensions"

const LIST_TYPES = [ "numbered-list", "bulleted-list" ];


  const isBlockActive = (editor, format) => {
    const nodeGen = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    });

    let node = nodeGen.next();
    while (!node.done) {
      return true;
    }
    return false;
  };

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type)
        ),
      split: true
    });
    const newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  export const MarkButton = ({
    format,
    icon
  }) => {
    const editor = useSlate();
    return (
      <IconButton
        variant="outline"
        colorScheme="blue"
        isActive={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        aria-label={format}
        icon={icon}
        borderWidth={0}
        fontSize={"20px"}
      />
    );
  };

  export const BlockButton = ({
    format,
    icon
  }) => {
    const editor = useSlate();
    return (
      <IconButton
        variant="outline"
        colorScheme="blue"
        isActive={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        aria-label={format}
        icon={icon}
        borderWidth={0}
        fontSize={"20px"}
      />
    );
  };

  export const Toolbar = () => {
    return (
      <HStack
        borderWidth={"0 0 1px 0"}
        padding={"10px 5px"}
        spacing={"5px"}
        wrap={"wrap"}
      >
        <MarkButton format="bold" icon={<MdFormatBold />} />
        <MarkButton format="italic" icon={<MdFormatItalic />} />
        <MarkButton format="underline" icon={<MdFormatUnderlined />} />
        <MarkButton format="code" icon={<MdCode />} />
        <InsertImageButton/>
        <BlockButton format="heading-one" icon={<MdLooksOne />} />
        <BlockButton format="heading-two" icon={<MdLooksTwo />} />
        <BlockButton format="block-quote" icon={<MdFormatQuote />} />
        <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
        <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
      </HStack>
    );
  };

  const InsertImageButton = () => {
    const editor = useSlateStatic()
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter the URL of the image:')
          if (url && !isImageUrl(url)) {
            alert('URL is not an image')
            return
          }
          insertImage(editor, url)
        }}
      >
        <MdImage/>
      </Button>
    )
  }

  const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
  }

  const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
  }

  const BlockquoteStyle = {
    margin: "1.5em 10px",
    padding: "0.5em 10px"
  };

  export const Element = ({
    attributes,
    children,
    element
  }) => {
    switch (element.type) {
      case "image":
        return (
          <div>
              <div contentEditable={false}>
                  <Image
                    src={element.url}
                    style={{
                        display: 'block',
                        maxWidth: '550px',
                        maxHeight: '20em',
                    }}
                  />
              </div>
              {children}
          </div>
      )
      case "block-quote":
        return (
          <chakra.blockquote
            style={BlockquoteStyle}
            borderLeftWidth={"10px"}
            borderLeftColor={"gray.200"}
            {...attributes}
          >
            {children}
          </chakra.blockquote>
        );
      case "list-item":
        return <ListItem {...attributes}>{children}</ListItem>;
      case "numbered-list":
        return <OrderedList {...attributes}>{children}</OrderedList>;
      case "bulleted-list":
        return <UnorderedList {...attributes}>{children}</UnorderedList>;
      case "heading-one":
        return (
          <Heading as="h1" size="3xl" {...attributes}>
            {children}
          </Heading>
        );
      case "heading-two":
        return (
          <Heading as="h2" size="2xl" {...attributes}>
            {children}
          </Heading>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  };

  export const Leaf = ({ attributes, children, leaf }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = (
        <chakra.code
          padding={"3px"}
          backgroundColor={colorMode === "dark" ? "gray.700" : "gray.200"}
          fontSize={"90%"}
        >
          {children}
        </chakra.code>
      );
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };