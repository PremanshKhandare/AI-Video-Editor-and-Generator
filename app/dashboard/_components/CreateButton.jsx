import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import VideoCreateOption from "./VideoCreateOption"


function CreateButton() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='w-full bg-gray-900'>+ Create New Video</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center text-2xl'>Let's create a new video</DialogTitle>
                        <DialogDescription>
                            <VideoCreateOption />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateButton
