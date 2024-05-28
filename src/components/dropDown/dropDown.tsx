"use client"

import React, { useState } from 'react';
import DropDownItem from './dropDownItem';

interface DropDownProps {
    activeItem: string | null;
    setActiveItem: (projectName: string | null) => void;
    onSelect: (projectName: string) => void; // 선택한 프로젝트 이름을 전달하기 위한 콜백 함수
}

const DropDown : React.FC<DropDownProps> = ({ activeItem, setActiveItem, onSelect }) => {

    const handleItemClick = (projectName: string) => {
        if (activeItem === projectName) {
            // 이미 활성화된 아이템을 다시 클릭하면 비활성화
            setActiveItem(null);
            onSelect("");
        } else {
            setActiveItem(projectName); // 다른 아이템을 클릭하면 해당 아이템을 활성화하고 이전 아이템 비활성화
            onSelect(projectName); // 선택한 프로젝트 이름을 DropDownController로 전달
        }
    };


    return (
        <div className="absolute top-full left-0 mt-2 p-2 bg-neutral-white rounded-2xl border border-neutral-300 
                        flex-col justify-start items-start gap-1 inline-flex shadow-lg">
            <DropDownItem projecName ="예시 텍스트 1" 
                          isActive={activeItem === "예시 텍스트 1"}
                          onClick={() => handleItemClick("예시 텍스트 1")}/>
            <DropDownItem projecName ="예시 텍스트 2" 
                          isActive={activeItem === "예시 텍스트 2"}
                          onClick={() => handleItemClick("예시 텍스트 2")}/>
            <DropDownItem projecName ="예시 텍스트 3" 
                          isActive={activeItem === "예시 텍스트 3"}
                          onClick={() => handleItemClick("예시 텍스트 3")}/>
        </div>
        
    );
};

export default DropDown;