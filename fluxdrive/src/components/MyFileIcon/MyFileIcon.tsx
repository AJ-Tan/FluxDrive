import { FileIcon, defaultStyles } from "react-file-icon";

function MyFileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  const style =
    defaultStyles[extension as keyof typeof defaultStyles] ?? defaultStyles.txt;

  return (
    <FileIcon
      extension={extension}
      {...style}
      color="#ef4444"
      glyphColor="#ffffff"
    />
  );
}

export default MyFileIcon;
