type Detector = { detect(video: HTMLVideoElement): Promise<{ rawValue: string }[]> };
type DetectorConstructor = {
  new(options: { formats: string[] }): Detector;
  getSupportedFormats(): Promise<string[]>;
};

// Optional browser acceleration. ZXing continues independently if this is absent or fails.
export function startNativeScanner(video: HTMLVideoElement, onCode: (code: string) => void): () => void {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const DetectorClass = (globalThis as typeof globalThis & { BarcodeDetector?: DetectorConstructor }).BarcodeDetector;
  void (async () => {
    try {
      if (!DetectorClass) return;
      const supported = await DetectorClass.getSupportedFormats();
      const formats = ['upc_a', 'upc_e', 'ean_13', 'ean_8'].filter((format) => supported.includes(format));
      if (stopped || !formats.length) return;
      const detector = new DetectorClass({ formats });
      const scan = async () => {
        if (stopped) return;
        try {
          if (video.readyState >= 2) {
            const results = await detector.detect(video);
            if (stopped) return;
            const code = results.find((result) => result.rawValue)?.rawValue;
            if (code) { stopped = true; onCode(code); return; }
          }
        } catch { /* A frame may be unavailable while the camera starts. */ }
        if (!stopped) timer = setTimeout(() => { void scan(); }, 200);
      };
      await scan();
    } catch { /* Unsupported or blocked API: keep using ZXing. */ }
  })();
  return () => { stopped = true; clearTimeout(timer); };
}
