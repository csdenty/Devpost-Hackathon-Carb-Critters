import { afterEach, describe, expect, it, vi } from 'vitest';
import { startNativeScanner } from './nativeScanner';

const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe('optional native barcode scanning', () => {
  function setup(detect = vi.fn().mockResolvedValue([{ rawValue: '888849005994' }])) {
    class Detector {
      static getSupportedFormats = vi.fn().mockResolvedValue(['upc_a', 'qr_code']);
      detect = detect;
    }
    vi.stubGlobal('BarcodeDetector', Detector);
    return { detect, Detector, video: { readyState: 2 } as HTMLVideoElement, onCode: vi.fn() };
  }
  it('detects a UPC exactly once without another scheduled scan', async () => {
    vi.useFakeTimers();
    const context = setup();
    const stop = startNativeScanner(context.video, context.onCode);
    await flush();
    await vi.advanceTimersByTimeAsync(1000);
    expect(context.onCode).toHaveBeenCalledExactlyOnceWith('888849005994');
    expect(context.detect).toHaveBeenCalledOnce();
    stop();
  });
  it('ignores a detection that completes after camera departure', async () => {
    let finish!: (results: { rawValue: string }[]) => void;
    const context = setup(vi.fn(() => new Promise((resolve) => { finish = resolve; })));
    const stop = startNativeScanner(context.video, context.onCode);
    await flush();
    stop();
    finish([{ rawValue: 'late' }]);
    await flush();
    expect(context.onCode).not.toHaveBeenCalled();
  });
  it('retries an unavailable frame and stops retrying on cleanup', async () => {
    vi.useFakeTimers();
    const context = setup(vi.fn().mockRejectedValue(new Error('frame unavailable')));
    const stop = startNativeScanner(context.video, context.onCode);
    await flush();
    await vi.advanceTimersByTimeAsync(200);
    expect(context.detect).toHaveBeenCalledTimes(2);
    stop();
    await vi.advanceTimersByTimeAsync(1000);
    expect(context.detect).toHaveBeenCalledTimes(2);
  });
  it('allows the existing decoder to continue when native scanning is unsupported', async () => {
    const context = setup();
    context.Detector.getSupportedFormats.mockResolvedValue(['qr_code']);
    const stop = startNativeScanner(context.video, context.onCode);
    await flush();
    expect(context.detect).not.toHaveBeenCalled();
    stop();
    vi.stubGlobal('BarcodeDetector', undefined);
    expect(() => startNativeScanner(context.video, context.onCode)()).not.toThrow();
  });
});
