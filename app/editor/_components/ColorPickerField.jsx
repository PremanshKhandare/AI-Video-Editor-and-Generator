import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import ColorPicker from 'react-best-gradient-color-picker'

function ColorPickerField({defaultColor, handleInputChange}) {
    return (
        <div className='flex gap-4 items-center mt-3'>
            <label>Text Color</label>

            <Popover>
                <PopoverTrigger asChild>
                    <div style={{
                        backgroundColor: defaultColor
                    }} className='w-10 h-10 rounded-lg cursor-pointer'>

                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <ColorPicker value={defaultColor}
                    width={250}
                    height={200}
                    onChange={(v)=>handleInputChange(v)} />
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default ColorPickerField
