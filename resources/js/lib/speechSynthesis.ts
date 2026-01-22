export type SpeakTextOptions = {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    namePattern?: RegExp;
    preferLangs?: string[];
    delayMs?: number;
    cancelDelayMs?: number;
};

const defaultOptions: Required<Omit<SpeakTextOptions, 'namePattern' | 'preferLangs'>> &
    Pick<SpeakTextOptions, 'namePattern' | 'preferLangs'> = {
    lang: 'es-PE',
    rate: 1,
    pitch: 1,
    volume: 1,
    namePattern: /google|microsoft|natural|neural/i,
    preferLangs: ['es-pe', 'es'],
    delayMs: 30,
    cancelDelayMs: 120,
};

export const speakText = (text: string, options: SpeakTextOptions = {}) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const settings = { ...defaultOptions, ...options };

    const normalizeLangs = (langs: string[]) =>
        langs.map((lang) => lang.toLowerCase());

    const preferredLangs = normalizeLangs(settings.preferLangs || []);

    const findVoice = () => {
        const voices = synth.getVoices();
        if (!voices.length) return null;

        const byPreferredLang = voices.find((voice) =>
            preferredLangs.some((lang) =>
                voice.lang?.toLowerCase().startsWith(lang),
            ),
        );
        if (byPreferredLang) return byPreferredLang;

        const byNameAndLang = voices.find(
            (voice) =>
                settings.namePattern?.test(voice.name) &&
                preferredLangs.some((lang) =>
                    voice.lang?.toLowerCase().startsWith(lang),
                ),
        );
        if (byNameAndLang) return byNameAndLang;

        const byAnyLang = voices.find((voice) =>
            preferredLangs.some((lang) =>
                voice.lang?.toLowerCase().startsWith(lang),
            ),
        );
        if (byAnyLang) return byAnyLang;

        return voices[0] ?? null;
    };

    const speakMessage = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = settings.lang;
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        utterance.volume = settings.volume;

        const selectedVoice = findVoice();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        if (synth.speaking || synth.pending) {
            synth.cancel();
            setTimeout(() => {
                synth.speak(utterance);
            }, settings.cancelDelayMs);
            return;
        }

        setTimeout(() => {
            synth.speak(utterance);
        }, settings.delayMs);
    };

    if (synth.getVoices().length === 0) {
        const previousHandler = synth.onvoiceschanged;
        synth.onvoiceschanged = () => {
            speakMessage();
            synth.onvoiceschanged = previousHandler ?? null;
        };
    } else {
        speakMessage();
    }
};
