import React from 'react';
import Icon from '../icon/icon';
import PdfData from './pdfData';

interface PdfBubbleProps {
    sources: { source: string, page: number }[];
}

const PdfBubble: React.FC<PdfBubbleProps> = ({ sources }) => {
    const extractFilePathAndName = (fullPath: string) => {
        const parts = fullPath.split('/');
        const fileName = parts.pop() || '';
        const filePath = parts.join('/');
        return { fileName, filePath };
    };

    return (
        <div className="w-full p-4 bg-neutral-100 rounded-[10px] flex-col justify-start items-end gap-4 inline-flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex fill-neutral-500">
                <Icon name = "speaker" width={16} height={16} />
                 <div className="grow shrink basis-0 text-neutral-500 text-paragraph-m font-semibold">해당 내용의 출처가 되는 서류를 살펴보시겠어요?</div>
            </div>
            <div className="w-full flex-col justify-start items-end inline-flex gap-[-2px]">
                {sources.map((source, index) => {
                    // 파일 경로와 파일 이름을 추출
                    const { fileName, filePath } = extractFilePathAndName(source.source);

                    return (
                        <PdfData
                            key={index}
                            number={`발췌 ${index + 1}`}
                            pdfName={fileName} // 추출한 파일 이름 사용
                            pdfPath={filePath} // 추출한 파일 경로 사용
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PdfBubble;