import { describe, expect, it, vi } from 'vitest';
import { startScanner, type ScannerDependencies } from './scanner';

const flush = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };
function setup() {
  const track = { stop: vi.fn() };
  const stream = { getTracks: () => [track] } as unknown as MediaStream;
  const video = { srcObject: stream } as unknown as HTMLVideoElement;
  const controls = { stop: vi.fn() };
  return { track, stream, video, controls, onCode: vi.fn(), onError: vi.fn() };
}

describe('scanner lifecycle', () => {
  it('stops a stream that arrives after the user leaves the permission prompt', async () => {
    const context = setup();
    let grant!: (stream: MediaStream) => void;
    const decode = vi.fn();
    const stop = startScanner(context.video, { getStream: () => new Promise((resolve) => { grant = resolve; }), decode }, context.onCode, context.onError);
    stop();
    grant(context.stream);
    await flush();
    expect(context.track.stop).toHaveBeenCalled();
    expect(decode).not.toHaveBeenCalled();
    expect(context.onCode).not.toHaveBeenCalled();
  });
  it('accepts one detection, stops late decoder controls, and ignores duplicate callbacks', async () => {
    const context = setup();
    let detect!: Parameters<ScannerDependencies['decode']>[2];
    let finish!: (controls: { stop(): void }) => void;
    startScanner(context.video, {
      getStream: () => Promise.resolve(context.stream),
      decode: (_stream, _video, callback) => { detect = callback; return new Promise((resolve) => { finish = resolve; }); },
    }, context.onCode, context.onError);
    await flush();
    detect({ getText: () => '888849005994' });
    detect({ getText: () => 'duplicate' });
    finish(context.controls);
    await flush();
    expect(context.onCode).toHaveBeenCalledExactlyOnceWith('888849005994');
    expect(context.controls.stop).toHaveBeenCalled();
    expect(context.track.stop).toHaveBeenCalled();
    expect(context.video.srcObject).toBeNull();
  });
  it('releases the stream on decode failure and reports the error', async () => {
    const context = setup();
    startScanner(context.video, { getStream: () => Promise.resolve(context.stream), decode: () => Promise.reject(new Error('decode failed')) }, context.onCode, context.onError);
    await flush();
    expect(context.track.stop).toHaveBeenCalled();
    expect(context.onError).toHaveBeenCalledOnce();
  });
  it('releases active controls and ignores results after leaving', async () => {
    const context = setup();
    let detect!: Parameters<ScannerDependencies['decode']>[2];
    const stop = startScanner(context.video, {
      getStream: () => Promise.resolve(context.stream),
      decode: (_stream, _video, callback) => { detect = callback; return Promise.resolve(context.controls); },
    }, context.onCode, context.onError);
    await flush();
    stop();
    detect({ getText: () => 'late' });
    expect(context.controls.stop).toHaveBeenCalled();
    expect(context.track.stop).toHaveBeenCalled();
    expect(context.onCode).not.toHaveBeenCalled();
  });
});
