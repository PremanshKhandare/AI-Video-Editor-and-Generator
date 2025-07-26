import { GradientColors, SolidColors } from "@/app/_data/Colors"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function BackgroundField({ defaultValue, handleInputChange }) {
    return (
        <div>
            <Tabs defaultValue="solid" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="solid">Solid</TabsTrigger>
                    <TabsTrigger value="gradient">Gradient</TabsTrigger>
                </TabsList>
                <TabsContent value="solid">
                    <ScrollArea className="h-[200px] bg-zinc-100 w-[350px] rounded-md border p-4">
                        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                            {SolidColors.map((color, index) => (
                                <div className='w-full h-10 rounded-lg cursor-pointer'
                                    key={index}
                                    onClick={() => handleInputChange(color.hexCode)}
                                    style={{
                                        backgroundColor: color.hexCode
                                    }}>

                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="gradient">
                    <ScrollArea className="h-[200px] bg-zinc-100 w-[350px] rounded-md border p-4">
                        <div className='grid grid-cols-3 md:grid-cols-4 gap-3'>
                            {GradientColors.map((color, index) => (
                                <div className='w-full h-12 rounded-lg cursor-pointer'
                                    key={index}
                                    onClick={() => handleInputChange(color.gradient)}
                                    style={{
                                        background: color.gradient
                                    }}>

                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default BackgroundField
