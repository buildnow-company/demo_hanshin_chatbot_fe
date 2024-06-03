"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "../icon/icon";
import { useActiveItemContext } from "../dropDown/activeItemContext";

interface InputNomalProps {
  addUserMessage: (message: string) => void;
  addGptMessage: (
    message: string,
    sources: any[],
    badgeProject?: string | null
  ) => void;
  setLoading: (loading: boolean) => void;
}

const InputNomal: React.FC<InputNomalProps> = ({
  addUserMessage,
  addGptMessage,
  setLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 250;
  const isSending = useRef(false);

  const { selectedProject } = useActiveItemContext();

  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    setInputValue(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSend = async () => {
    if (isSending.current) return;
    isSending.current = true;

    setInputValue("");

    if (!inputValue.trim()) {
      alert("내용을 입력해주세요.");
      isSending.current = false;
      return;
    }
    if (!selectedProject) {
      alert("프로젝트를 선택해주세요.");
      isSending.current = false;
      return;
    }

    console.log("handleSend called");
    addUserMessage(inputValue);
    updateLoading(true);

    try {
      const requestBody = {
        query: inputValue,
        project_name: selectedProject,
        memory_id: "66597b96612d7aa8c4ff5430",
      };
      const response = await fetch(
        "https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      addGptMessage(result.answer, result.sources, result.project_name);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      updateLoading(false);
      isSending.current = false;
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-neutral-white-opacity-80 backdrop-blur-[10px] flex justify-center items-center fixed bottom-0 z-10">
      <div className="max-w-[768px] w-full p-4 justify-start items-start inline-flex">
        <textarea
          className="grow shrink basis-0 pl-4 pr-3 py-4 bg-neutral-white rounded-tl-2xl rounded-bl-2xl border-l border-t border-b border-neutral-300 justify-start items-center flex resize-none text-paragraph-l text-neutral-700 focus:outline-none"
          style={{
            maxHeight: `${maxHeight}px`,
            overflow: inputValue ? "auto" : "hidden",
          }}
          placeholder={
            selectedProject
              ? `${selectedProject}에 대해 무엇이든 물어보세요`
              : "무엇이든 물어보세요"
          }
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          rows={1}
        />

        <div
          className="w-[60px] pl-4 pr-3 py-3 bg-neutral-white rounded-tr-2xl rounded-br-2xl border-r border-t border-b border-neutral-300 justify-start items-end flex"
          style={{
            height: textareaRef.current
              ? textareaRef.current.style.height
              : "auto",
          }}
        >
          <button className="w-8 h-8 blueBtnStyle-s" onClick={handleSend}>
            <Icon name="sendMessage" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNomal;
