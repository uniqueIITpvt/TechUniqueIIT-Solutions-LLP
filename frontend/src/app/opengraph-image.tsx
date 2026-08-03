import { ImageResponse } from 'next/og';

export const alt =
  'TechUniqueIIT Solutions LLP custom software, mobile apps, and digital marketing';
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
          background:
            'linear-gradient(135deg, #f8fafc 0%, #eef2ff 48%, #ecfeff 100%)',
          color: '#111827',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#4f46e5',
                letterSpacing: 0,
              }}
            >
              TechUniqueIIT Solutions LLP
            </div>
            <div
              style={{
                width: 92,
                height: 8,
                borderRadius: 999,
                background: '#14b8a6',
              }}
            />
          </div>
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 999,
              background: '#ffffff',
              color: '#334155',
              fontSize: 22,
              fontWeight: 700,
              border: '1px solid #cbd5e1',
            }}
          >
            www.techuniqueiit.com
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              maxWidth: 920,
              fontSize: 76,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            Custom Software, Mobile Apps & Digital Growth
          </div>
          <div
            style={{
              maxWidth: 880,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#475569',
              fontWeight: 500,
            }}
          >
            Practical technology delivery for web applications, enterprise
            products, software maintenance, and digital marketing.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18 }}>
          {[
            'Web Applications',
            'Mobile Apps',
            'Software Maintenance',
            'Digital Marketing',
          ].map((label, index) => (
            <div
              key={label}
              style={{
                padding: '14px 20px',
                borderRadius: 18,
                background: index % 2 === 0 ? '#111827' : '#0f766e',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
