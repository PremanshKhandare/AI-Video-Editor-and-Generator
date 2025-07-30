import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDown({ label, defaultValue, options, handleInputChange }) {
    return (
        <div className='mt-3 flex flex-col gap-2'>
            <label>{label}</label>
            <Select onValueChange={(value) => handleInputChange(value)}>
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder={defaultValue} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((item, index) => (
                        <SelectItem key={index} value={item?.name ?? item}>{item?.name ?? item}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default DropDown
