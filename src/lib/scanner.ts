type Controls = { stop(): void };
type ScanResult = { getText(): string };
export type ScannerDependencies = {
  getStream: () => Promise<MediaStream>;
  decode: (stream: MediaStream, video: HTMLVideoElement, onResult: (result?: ScanResult) => void) => Promise<Controls>;
};

// Own the stream ourselves, so leaving during a permission prompt also cleans up.
export function startScanner(
  video: HTMLVideoElement,
  dependencies: ScannerDependencies,
  onCode: (code: string) => void,
  onError: (error: unknown) => void,
): () => void {
  let stopped = false;
  let stream: MediaStream | undefined;
  let controls: Controls | undefined;
  const releaseTracks = () => stream?.getTracks().forEach((track) => track.stop());
  const stop = () => {
    stopped = true;
    controls?.stop();
    releaseTracks();
    video.srcObject = null;
  };
  void (async () => {
    try {
      stream = await dependencies.getStream();
      if (stopped) { releaseTracks(); return; }
      controls = await dependencies.decode(stream, video, (result) => {
        if (!stopped && result) {
          const code = result.getText();
          stop();
          onCode(code);
        }
      });
      if (stopped) controls.stop();
    } catch (error) {
      if (!stopped) {
        stop();
        onError(error);
      }
    }
  })();
  return stop;
}
