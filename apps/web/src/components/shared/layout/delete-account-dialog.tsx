import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@starter/ui/components/shadcn/alert-dialog';
import { Input } from '@starter/ui/components/shadcn/input';
import { Label } from '@starter/ui/components/shadcn/label';
import { useForm } from '@tanstack/react-form';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type DeleteAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

const CONFIRM_PHRASE = 'delete my account';

export const DeleteAccountDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: DeleteAccountDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      confirmation: '',
    },
  });

  const handleConfirm = async () => {
    const value = form.getFieldValue('confirmation');
    if (value !== CONFIRM_PHRASE) {
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CONFIRM_PHRASE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isDeleting) {
          onOpenChange(newOpen);
          if (!newOpen) {
            form.reset();
            setCopied(false);
          }
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 py-4">
          <Label
            htmlFor="confirmation"
            className="font-medium text-sm"
          >
            Type the following phrase to confirm:
          </Label>
          <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
            <code className="flex-1 font-medium text-sm">{CONFIRM_PHRASE}</code>
            <button
              type="button"
              onClick={handleCopy}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
          <form.Field name="confirmation">
            {(field) => (
              <Input
                id="confirmation"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isDeleting}
                autoComplete="off"
              />
            )}
          </form.Field>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <form.Subscribe selector={(state) => state.values.confirmation}>
            {(confirmation) => (
              <AlertDialogAction
                onClick={handleConfirm}
                disabled={confirmation !== CONFIRM_PHRASE || isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-muted disabled:text-muted-foreground"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </AlertDialogAction>
            )}
          </form.Subscribe>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
