import { pool } from "@/lib/db"
import {
  defaultSiteContent,
  type HeaderLink,
  type SiteContent,
} from "@/lib/site-content-defaults"

export { defaultSiteContent, type HeaderLink, type SiteContent }

export async function ensureSiteContentTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      key text PRIMARY KEY,
      content jsonb NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    )
  `)
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    await ensureSiteContentTable()
    const result = await pool.query(
      "SELECT content FROM site_content WHERE key = $1 LIMIT 1",
      ["main"],
    )
    return result.rows[0]?.content
      ? { ...defaultSiteContent, ...result.rows[0].content }
      : defaultSiteContent
  } catch {
    return defaultSiteContent
  }
}

export async function saveSiteContent(content: SiteContent) {
  await ensureSiteContentTable()
  await pool.query(
    `
      INSERT INTO site_content (key, content, updated_at)
      VALUES ($1, $2::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET
        content = EXCLUDED.content,
        updated_at = now()
    `,
    ["main", JSON.stringify(content)],
  )
}
