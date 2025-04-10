import { FieldError } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    error?: FieldError
}

export function Input({ label, name, error, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600" data-error={name} >{error.message}</p>
            )}
        </div>
    )
}