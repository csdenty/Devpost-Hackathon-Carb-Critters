import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { startScanner } from '../lib/scanner';
import { startNativeScanner } from '../lib/nativeScanner';
import { Dinosaur } from './Dinosaur';

export function BarcodeScanner({ onCode, onSearch }: { onCode: (code: string) => void; onSearch: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraId, setCameraId] = useState('');

  useEffect(() => {
    let active = true;
    let stopNative = () => {};
    let detected = false;
    const accept = (code: string) => {
      if (!active || detected) return;
      detected = true;
      stopNative();
      stopCamera();
      onCode(code);
    };
    const hints = new Map<DecodeHintType, unknown>([
      [DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8]],
      [DecodeHintType.TRY_HARDER, true],
    ]);
    const reader = new BrowserMultiFormatReader(hints);
    const stopCamera = startScanner(video.current!, {
      getStream: async () => {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera unavailable');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: {
          ...(cameraId ? { deviceId: { exact: cameraId } } : { facingMode: { ideal: 'environment' } }),
          width: { ideal: 1920 }, height: { ideal: 1080 },
        } });
        if (active) void navigator.mediaDevices.enumerateDevices().then((devices) => {
          if (active) setCameras(devices.filter((device) => device.kind === 'videoinput'));
        }).catch(() => {});
        return stream;
      },
      decode: (stream, element, callback) => {
        stopNative = startNativeScanner(element, accept);
        return reader.decodeFromStream(stream, element, callback);
      },
    }, accept, () => { stopNative(); setError('We couldn’t open the camera. Check camera permission, or search for your food instead.'); });
    return () => { active = false; stopNative(); stopCamera(); };
  }, [onCode, cameraId]);

  return <section aria-label="Barcode camera">
    <Dinosaur expression="curious" compact><p>Let’s see what you’ve got! Show me the package barcode.</p></Dinosaur>
    <div className="camera"><video ref={video} autoPlay muted playsInline aria-label="Live camera preview for barcode scanning" /></div>
    <p role="status">{error || 'Allow camera access, then hold the package barcode steady inside the camera view.'}</p>
    <p className="small">Camera images stay on your device.</p>
    {cameras.length > 1 && <label>Camera
      <select value={cameraId} onChange={(event) => { setError(''); setCameraId(event.target.value); }}>
        <option value="">Automatic rear camera</option>
        {cameras.map((camera, index) => <option key={camera.deviceId} value={camera.deviceId}>{camera.label || `Camera ${index + 1}`}</option>)}
      </select>
    </label>}
    <p className="small">Keep the whole barcode visible, with the bars running up and down. Flatten the wrapper, avoid glare, and slowly move the phone farther away until the bars look sharp.</p>
    <button className="secondary" onClick={onSearch}>Search by name instead</button>
  </section>;
}
