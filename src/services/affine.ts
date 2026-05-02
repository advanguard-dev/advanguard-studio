// AFFiNE Cloud GraphQL service
// Required env vars:
//   AFFINE_API_URL       — default: https://app.affine.pro
//   AFFINE_TOKEN         — user session token (cookie __session or API token)
//   AFFINE_WORKSPACE_ID  — target workspace ID

const AFFINE_URL = import.meta.env.AFFINE_API_URL ?? 'https://app.affine.pro'
const AFFINE_TOKEN = import.meta.env.AFFINE_TOKEN
const WORKSPACE_ID = import.meta.env.AFFINE_WORKSPACE_ID

export interface CalBooking {
  uid: string
  title: string
  startTime: string
  endTime: string
  attendeeName: string
  attendeeEmail: string
  eventType: string
  notes?: string
}

async function gql(query: string, variables: Record<string, unknown>) {
  const res = await fetch(`${AFFINE_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AFFINE_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`AFFiNE GraphQL ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(`AFFiNE GQL error: ${json.errors[0].message}`)
  return json.data
}

export async function createClientDoc(booking: CalBooking): Promise<string> {
  if (!AFFINE_TOKEN || !WORKSPACE_ID) {
    throw new Error('Missing AFFINE_TOKEN or AFFINE_WORKSPACE_ID env vars')
  }

  // Create empty doc in workspace
  const data = await gql(
    `mutation CreateDoc($workspaceId: String!) {
       createDoc(workspaceId: $workspaceId) { id }
     }`,
    { workspaceId: WORKSPACE_ID }
  )

  const docId: string = data.createDoc.id

  // AFFiNE content is Yjs-based — title + body must be set via @affine/sdk or AFFiNE app.
  // The doc is created; open it in AFFiNE and the booking metadata below is logged for reference.
  console.info('[affine] Created doc', docId, 'for booking', booking.uid, {
    client: booking.attendeeName,
    email: booking.attendeeEmail,
    event: booking.eventType,
    start: booking.startTime,
  })

  // TODO: once AFFiNE exposes a content mutation, set the page title to:
  //   `${booking.attendeeName} — ${booking.eventType} — ${booking.startTime}`

  return docId
}
