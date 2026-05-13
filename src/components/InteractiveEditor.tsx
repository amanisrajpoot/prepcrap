"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";

interface InteractiveEditorProps {
  files?: Record<string, string>;
  filesJSON?: string;
  template?: "react" | "vanilla";
  showConsole?: boolean;
}

export default function InteractiveEditor({
  files,
  filesJSON,
  template = "react",
  showConsole = true,
}: InteractiveEditorProps) {
  const parsedFiles = filesJSON ? JSON.parse(filesJSON) : (files || {});

  return (
    <div className="InteractiveEditor my-6 rounded-xl overflow-hidden border border-[rgba(139,148,255,0.2)] shadow-md">
      <SandpackProvider
        template={template}
        theme="dark"
        files={parsedFiles}
        customSetup={{
          dependencies: {
            "lucide-react": "^0.292.0",
          },
        }}
      >
        <SandpackLayout className="!rounded-none !border-none">
          <SandpackCodeEditor
            showTabs
            showLineNumbers={true}
            showInlineErrors
            wrapContent
            className="!h-[400px]"
          />
          <div className="flex flex-col flex-1 border-l border-[rgba(139,148,255,0.2)] h-[400px]">
            <SandpackPreview className="!h-[60%] border-b border-[rgba(139,148,255,0.2)]" />
            {showConsole && (
              <SandpackConsole className="!h-[40%] !bg-[#151515]" />
            )}
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
