import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface Props {
  calLink: string
  style?: React.CSSProperties
}

export default function BookingWidget({ calLink, style }: Props) {
  useEffect(() => {
    getCalApi().then((cal) => {
      cal('ui', {
        styles: { branding: { brandColor: '#E5311D' } },
        hideEventTypeDetails: false,
      })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          if (typeof window !== 'undefined' && (window as any).umami) {
            ;(window as any).umami.track('booking_confirmed', { calLink })
          }
        },
      })
    })
  }, [calLink])

  return (
    <Cal
      calLink={calLink}
      style={style ?? { width: '100%', height: '700px', overflow: 'scroll' }}
    />
  )
}
