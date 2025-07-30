import { ScrollArea } from "@/components/ui/scroll-area";
import { getAvailableEmojis } from "@remotion/animated-emoji";

function EmojiField({handleInputChange}) {

    const emojiList = getAvailableEmojis();

    console.log(emojiList);



    return (
        <div>
            <ScrollArea className="h-[200px] w-[350px] bg-zinc-100 rounded-md border p-4">
                <div className='grid grid-cols-3 md:grid-cols-5 gap-3'>
                    {emojiList.map((emoji, index) => (
                        <img key={index} src={"https://fonts.gstatic.com/s/e/notoemoji/latest/"+emoji.codepoint+"/512.gif"}
                            alt="😄"
                            width="42"
                            height="42" 
                            className='hover:bg-gray-200 rounded:md p-1 cursor-pointer'
                            onClick={()=>handleInputChange("https://fonts.gstatic.com/s/e/notoemoji/latest/"+emoji.codepoint+"/512.gif")}/>
                    ))}
                </div>
            </ScrollArea>

            
        </div>
    )
}

export default EmojiField
