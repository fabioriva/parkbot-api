import sgMail from '@sendgrid/mail'

class Notifications {
  async sendEmailNotification (to, subject, text, html) {
    if (Array.isArray(to) && to.length === 0) return

    const { SENDGRID_API_KEY: apiKey, SENDGRID_SENDER: from } = process.env
    if (!apiKey || !from) {
      throw new Error('SENDGRID_API_KEY and SENDGRID_SENDER are required to send notifications')
    }

    sgMail.setApiKey(apiKey)
    const message = { to, from, subject, text, ...(html ? { html } : {}) }

    // Each recipient receives a separate email, without exposing the mailing list.
    return Array.isArray(to) ? sgMail.sendMultiple(message) : sgMail.send(message)
  }
}

export default Notifications
