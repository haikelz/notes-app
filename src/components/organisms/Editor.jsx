import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Waduh</p>",
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
