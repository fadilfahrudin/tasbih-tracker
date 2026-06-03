import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;

    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
    }>;
};

export const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(
            null
        );

    const [isInstallable, setIsInstallable] =
        useState(false);

    useEffect(() => {
        const handler = (
            event: Event
        ) => {
            event.preventDefault();

            setDeferredPrompt(
                event as BeforeInstallPromptEvent
            );

            setIsInstallable(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handler
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handler
            );
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();

        const choice =
            await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            console.log("PWA installed");
        }

        setDeferredPrompt(null);

        setIsInstallable(false);
    };

    return {
        isInstallable,
        installApp,
    };
};