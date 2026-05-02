export const prerender = false

import type { APIRoute } from 'astro'
import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { createClientDoc, type CalBooking } from '../../services/affine'

const CAL_SECRET = import.meta.env.CAL_WEBHOOK_SECRET

function verifySignature(body: string, signature: string | null): boolean {
  if (!CAL_SECRET) return true // skip if no secret configured
  if (!signature) return false
  const expected = createHmac('sha256', CAL_SECRET).update(body).digest('hex')
  const expectedBuf = Buffer.from(`sha256=${expected}`)
  const actualBuf = Buffer.from(signature)
  if (expectedBuf.length !== actualBuf.length) return false
  return timingSafeEqual(expectedBuf, actualBuf)
}

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text()
  const signature = request.headers.get('X-Cal-Signature-256')

  if (!verifySignature(rawBody, signature)) {
    return new Response('Unauthorized', { status: 401 })
  }

  let payload: any
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new Response('Bad Request', { status: 400 })
  }

  const event: string = payload.triggerEvent ?? payload.type ?? ''
  if (!['BOOKING_CREATED', 'BOOKING_CONFIRMED'].includes(event)) {
    // Ignore other Cal.com events
    return new Response('OK', { status: 200 })
  }

  const p = payload.payload ?? payload
  const attendee = Array.isArray(p.attendees) ? p.attendees[0] : null

  if (!attendee) {
    return new Response('Bad Request: no attendee', { status: 400 })
  }

  const booking: CalBooking = {
    uid: p.uid ?? createHash('sha256').update(rawBody).digest('hex').slice(0, 12),
    title: p.title ?? '',
    startTime: p.startTime ?? '',
    endTime: p.endTime ?? '',
    attendeeName: attendee.name ?? '',
    attendeeEmail: attendee.email ?? '',
    eventType: p.eventType?.title ?? p.type ?? '',
    notes: p.description ?? undefined,
  }

  try {
    const docId = await createClientDoc(booking)
    return new Response(JSON.stringify({ ok: true, docId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('[webhook-cal] AFFiNE error:', err?.message)
    // Still return 200 so Cal.com doesn't retry indefinitely
    return new Response(JSON.stringify({ ok: false, error: err?.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
