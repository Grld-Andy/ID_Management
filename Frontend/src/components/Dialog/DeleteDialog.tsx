import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
  deleteFunction: () => void;
  buttonText?: string;
}

const DeleteDialog: React.FC<Props> = ({
  text,
  deleteFunction,
  buttonText,
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const deleteItem = async () => {
    try {
      await deleteFunction();
      console.log("Deleted successfully");
      toast({
        title: `Successfully deleted ${text}`,
        description: new Date().toDateString(),
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } catch (err: any) {
      toast({
        title: `An error occurred while deleting.`,
        description: err.message,
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }

    setIsOpen(false); // Close modal or whatever you want to close
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" aria-description="delete product">
          {buttonText && <p className="hidden xl:block">{buttonText}</p>}
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[20px]">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px]">
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-black font-bold">{text}</span> and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteItem}
            className="bg-red-600 hover:bg-red-400"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
