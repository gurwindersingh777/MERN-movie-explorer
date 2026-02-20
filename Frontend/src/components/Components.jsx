import { Link } from "react-router-dom";

export function Button({ text, onClick, className, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1w-fit mt-3 text-sm border font-medium border-neutral-600  p-1.5 px-2.5 rounded-md hover:bg-white hover:text-black btn-primary ${className}`}
    >
      {icon} {text}
    </button>
  );
}

export function LinkBtn({ text, className, icon, path }) {
  return (
    <Link
      to={path}
      className={`flex items-center justify-center h-10 w-full  text-sm border font-medium border-neutral-600   rounded-md transition  ${className}`}
    >
      {icon} {text}
    </Link>
  );
}

export function Input({
  label,
  id,
  placeholder,
  type = "text",
  className = "",
  required = true,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] text-neutral-200" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full h-10 border border-neutral-700 bg-neutral-900 text-[13px] px-3   rounded-sm ${className}`}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export function Loader() {
  return <div>Loader</div>;
}
