import { createStandaloneToast } from "@chakra-ui/react";

type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

export default function showToast(
    title: string,
    description: string,
    status: ToastStatus
) {
    const { toast } = createStandaloneToast();

    toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
    });
}
