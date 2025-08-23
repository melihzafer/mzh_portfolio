import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Email sender via Resend. Configure env vars: RESEND_API_KEY and CONTACT_TO_EMAIL
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message, honeypot } = body || {}

    if (honeypot) {
      // Silently accept bots
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.warn('Contact API missing RESEND_API_KEY or CONTACT_TO_EMAIL. Logging instead.')
      console.log('Contact form submission:', { name, email, message })
      return NextResponse.json({ ok: true, note: 'Email provider not configured' })
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL!],
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `From: ${name} <${email}>

${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
