import { useRef, useEffect } from "react";

export default function AutoResizeTextarea({ value, onChange, fontSizeClass, placeholder = 'Write something...' }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; 
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={1}
      className={`w-full overflow-hidden resize-none  ${fontSizeClass || 'text-base'} rounded-md focus:outline-none`}
      placeholder={placeholder}
    />
  );
}
