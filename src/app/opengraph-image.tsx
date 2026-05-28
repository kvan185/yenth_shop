import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          color: '#fffaf4',
          background: 'linear-gradient(135deg, #073c34 0%, #0e6f5c 56%, #245b8f 100%)',
          fontFamily: 'Arial',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>YenTH.shop</div>
          <div
            style={{
              border: '1px solid rgba(255,255,255,.38)',
              borderRadius: 999,
              padding: '12px 20px',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            TP. Hồ Chí Minh
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#f2c06a', fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
            Audit website miễn phí trong 24h
          </div>
          <div style={{ maxWidth: 940, fontSize: 72, fontWeight: 900, lineHeight: 0.98 }}>
            Website có proof, CTA mạnh và Local SEO rõ ràng.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 24, fontWeight: 700 }}>
          <span>Demo thật</span>
          <span>Blog SEO</span>
          <span>TP.HCM</span>
          <span>0375 266 538</span>
        </div>
      </div>
    ),
    size,
  );
}
