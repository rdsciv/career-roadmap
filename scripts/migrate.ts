/**
 * Apply migrations to the configured Postgres (Neon).
 * Reads every .sql file in src/lib/db/migrations in lexical order and runs it.
 *
 * Run:  pnpm migrate
 */
import "dotenv/config";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "DATABASE_URL is not set. Sign up at neon.tech (free), create a project, copy the pooled connection string into .env.local."
    );
    process.exit(1);
  }
  const sql = neon(url);
  const dir = join(process.cwd(), "src/lib/db/migrations");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Applying ${file}…`);
    const text = readFileSync(join(dir, file), "utf8");
    // Split on semicolons that end a line (rough but works for these files)
    const stmts = text
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const stmt of stmts) {
      await sql.query(stmt);
    }
  }
  console.log("✓ Migrations applied.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
