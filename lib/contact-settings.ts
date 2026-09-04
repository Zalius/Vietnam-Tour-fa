import { pool } from "@/lib/db"

export type ContactSettings = {
  vietnamPhone: string
  iranPhone: string
  telegramId: string
  contactEmail: string
}

export const defaultContactSettings: ContactSettings = {
  vietnamPhone: "",
  iranPhone: "",
  telegramId: "",
  contactEmail: "info@tourvietnam.ir",
}

export async function ensureContactSettingsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_settings (
      id integer PRIMARY KEY DEFAULT 1,
      vietnam_phone text DEFAULT '' NOT NULL,
      iran_phone text DEFAULT '' NOT NULL,
      telegram_id text DEFAULT '' NOT NULL,
      contact_email text DEFAULT 'info@tourvietnam.ir' NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL,
      CONSTRAINT contact_settings_single_row CHECK (id = 1)
    )
  `)
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    await ensureContactSettingsTable()
    const result = await pool.query(
      `
        SELECT vietnam_phone, iran_phone, telegram_id, contact_email
        FROM contact_settings
        WHERE id = 1
        LIMIT 1
      `,
    )

    const row = result.rows[0]
    if (!row) return defaultContactSettings

    return {
      vietnamPhone: row.vietnam_phone ?? "",
      iranPhone: row.iran_phone ?? "",
      telegramId: row.telegram_id ?? "",
      contactEmail: row.contact_email || defaultContactSettings.contactEmail,
    }
  } catch {
    return defaultContactSettings
  }
}

export async function saveContactSettings(settings: ContactSettings) {
  await ensureContactSettingsTable()
  await pool.query(
    `
      INSERT INTO contact_settings (
        id,
        vietnam_phone,
        iran_phone,
        telegram_id,
        contact_email,
        updated_at
      )
      VALUES (1, $1, $2, $3, $4, now())
      ON CONFLICT (id) DO UPDATE SET
        vietnam_phone = EXCLUDED.vietnam_phone,
        iran_phone = EXCLUDED.iran_phone,
        telegram_id = EXCLUDED.telegram_id,
        contact_email = EXCLUDED.contact_email,
        updated_at = now()
    `,
    [
      settings.vietnamPhone,
      settings.iranPhone,
      settings.telegramId,
      settings.contactEmail,
    ],
  )
}
