/**
 * Premium Contact Email Template - Fully Responsive
 * @param {Object} data - Contact form data
 * @returns {string} - HTML string
 */
const getContactEmailTemplate = (data) => {
  // Escape helper (basic sanitization)
  const escape = (str = "") =>
    String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));

  const now = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>New Strategy Call Request | Shopify</title>
      <!--[if mso]>
      <style>
        * { font-family: sans-serif !important; }
      </style>
      <![endif]-->
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        /* General Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }

        /* Component Styles */
        .wrapper { width: 100%; background-color: #f8fafc; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
        
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 48px 40px; text-align: center; color: white; }
        .logo-text { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; display: block; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; font-family: 'Outfit', sans-serif; opacity: 0.95; }
        .header p { margin: 12px 0 0; opacity: 0.8; font-size: 16px; font-weight: 400; }
        
        .content { padding: 40px; }
        .section { margin-bottom: 40px; }
        .section-header { margin-bottom: 20px; }
        .section-title { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6366f1; background: #eef2ff; padding: 4px 12px; border-radius: 6px; display: inline-block; }
        
        .info-card { background: #fdfdfd; border: 1px solid #f1f5f9; border-radius: 12px; padding: 8px 0; }
        .info-grid { width: 100%; }
        .info-row td { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .info-row:last-child td { border-bottom: none; }
        
        .label { width: 140px; font-weight: 600; color: #64748b; font-size: 13px; }
        .value { color: #0f172a; font-size: 15px; font-weight: 500; }
        .value strong { color: #4f46e5; }
        
        .badge { display: inline-block; padding: 4px 10px; background: #f1f5f9; color: #475569; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-primary { background: #e0e7ff; color: #3730a3; }
        
        .feature-box { background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #6366f1; margin-top: 10px; font-style: italic; color: #334155; font-size: 14px; line-height: 1.7; }
        
        .cta-container { text-align: center; padding: 10px 0 20px; }
        .cta-button { display: inline-block; padding: 16px 32px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none !important; border-radius: 10px; font-weight: 600; font-size: 15px; font-family: 'Outfit', sans-serif; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }
        
        .footer { background-color: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5; }
        .footer .brand { font-weight: 700; color: #64748b; font-family: 'Outfit', sans-serif; }
        .footer .timestamp { margin-top: 12px; font-size: 11px; color: #cbd5e1; letter-spacing: 0.5px; text-transform: uppercase; }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
          .wrapper { padding: 0 !important; }
          .container { border-radius: 0 !important; border: none !important; width: 100% !important; }
          .content { padding: 30px 20px !important; }
          .header { padding: 40px 20px !important; }
          .logo-text { font-size: 24px !important; }
          .header h1 { font-size: 20px !important; }
          
          /* Stack the label and value on mobile */
          .info-row td { display: block !important; width: 100% !important; box-sizing: border-box !important; }
          .label { padding-bottom: 4px !important; padding-top: 14px !important; width: 100% !important; }
          .value { padding-top: 0 !important; padding-bottom: 14px !important; width: 100% !important; }
          .info-row:last-child td:last-child { padding-bottom: 14px !important; }
          
          .cta-button { width: 100% !important; box-sizing: border-box !important; }
        }
      </style>
    </head>
    <body>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapper">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="container">
              <!-- Header -->
              <tr>
                <td class="header">
                  <span class="logo-text">SHOPIFY</span>
                  <h1>New Strategy Call Request</h1>
                  <p>You've received a high-intent lead from your website</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td class="content">
                  
                  <!-- Contact Identity -->
                  <div class="section">
                    <div class="section-header">
                      <span class="section-title">👤 Contact Identity</span>
                    </div>
                    <div class="info-card">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="info-grid">
                        <tr class="info-row">
                          <td class="label">Full Name</td>
                          <td class="value">${escape(data.fullName)}</td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Work Email</td>
                          <td class="value">
                            <a href="mailto:${escape(data.workEmail)}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${escape(data.workEmail)}</a>
                          </td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Phone</td>
                          <td class="value">${escape(data.phone) || '<span style="color: #cbd5e1;">Not provided</span>'}</td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <!-- Store Profile -->
                  <div class="section">
                    <div class="section-header">
                      <span class="section-title">🏪 Store Profile</span>
                    </div>
                    <div class="info-card">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="info-grid">
                        <tr class="info-row">
                          <td class="label">Store Name</td>
                          <td class="value"><strong>${escape(data.storeName) || "Not provided"}</strong></td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Website</td>
                          <td class="value">
                            ${data.storeUrl ? `<a href="${escape(data.storeUrl)}" style="color: #4f46e5; text-decoration: underline;">${escape(data.storeUrl)}</a>` : '<span style="color: #cbd5e1;">Not provided</span>'}
                          </td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Niche</td>
                          <td class="value">${escape(data.whatDoYouSell) || "Not provided"}</td>
                        </tr>
                      </table>
                    </div>
                    ${data.storeUrl ? `
                      <div class="cta-container" style="margin-top: 20px;">
                        <a href="${escape(data.storeUrl)}" class="cta-button">Analyze Store ↗</a>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Business Strategy -->
                  <div class="section">
                    <div class="section-header">
                      <span class="section-title">🎯 Business Strategy</span>
                    </div>
                    <div class="info-card">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="info-grid">
                        <tr class="info-row">
                          <td class="label">Primary Goal</td>
                          <td class="value">${escape(data.achieve) || "Not provided"}</td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Timeline</td>
                          <td class="value"><span class="badge badge-primary">${escape(data.launchSoon) || "Not provided"}</span></td>
                        </tr>
                        <tr class="info-row">
                          <td class="label">Revenue</td>
                          <td class="value"><span class="badge badge-success">${escape(data.monthlyRevenue) || "Not provided"}</span></td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="margin-top: 25px;">
                      <div style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px;">Requested Features</div>
                      <div class="feature-box">
                        ${escape(data.features) || "The client didn't specify any additional features."}
                      </div>
                    </div>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td class="footer">
                  <p>Generated by <span class="brand">Shopify Intelligence</span></p>
                  <p style="margin-top: 4px;">Premium Shopify Growth Solutions</p>
                  <div class="timestamp">SUBMITTED ON ${now}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = getContactEmailTemplate;
