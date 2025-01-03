import { Icon } from "@iconify/react/dist/iconify.js";

export function Input({ icon = null, active = false, className, placeholder, onInput, value, typeInput = "text", onClick = null, error }) {
    return (
        <div className={className}>
            <div className={`w-full ${icon != null && 'grid grid-cols-[1fr,50px]'} gap-2 border-2 ${active && 'bg-white'}  border-white rounded-full overflow-hidden mb-1`}>
                <input type={typeInput} className={`block bg-transparent outline-none ps-5 py-3 ${active ? 'text-primary' : 'text-white'} text-[15px]`} onInput={onInput} value={value ?? ''} placeholder={placeholder} />
                {
                    icon &&
                    <div className={`flex justify-center items-center h-full ${onClick != null && 'cursor-pointer'} `} onClick={onClick}>
                        <Icon icon={icon} className={`text-2xl ${active ? ' text-primary' : 'text-white'}`} />
                    </div>
                }
            </div>
            <p className="text-sm text-red-500">{error ?? ''}</p>
        </div>
    )
}