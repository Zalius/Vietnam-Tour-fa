import pg from "pg"

const { Client } = pg

const oldUrl = process.env.OLD_DATABASE_URL
const newUrl = process.env.NEW_DATABASE_URL

if (!oldUrl || !newUrl) {
  throw new Error("Set OLD_DATABASE_URL and NEW_DATABASE_URL before running.")
}

const oldDb = new Client({ connectionString: oldUrl })
const newDb = new Client({ connectionString: newUrl })

const tourTranslations = {
  "ha-long-bay-cruise": {
    title: "کروز شبانه خلیج ها لونگ",
    region: "شمال ویتنام",
    summary:
      "در آب‌های زمردی و میان هزاران صخره آهکی با یک کشتی سنتی لوکس، شبی آرام را روی خلیج ها لونگ بگذرانید.",
    description:
      "با یک کشتی چوبی سنتی روی آب‌های ثبت‌شده در یونسکوی خلیج ها لونگ حرکت کنید. در تالاب‌های پنهان کایاک‌سواری کنید، غارهای وسیع را ببینید و صبح را با مهی که از میان صخره‌های بلند برمی‌خیزد آغاز کنید. این سفر شبانه، آرامش لوکس را با زیبایی خام طبیعت ترکیب می‌کند.",
    start_location: "هانوی",
    end_location: "هانوی",
  },
  "hcmc-mekong-discovery": {
    title: "کشف هوشی‌مین و دلتای مکونگ",
    region: "جنوب ویتنام",
    summary:
      "انرژی زنده خیابان‌های تاریخی سایگون را تجربه کنید و سپس به آبراهه‌های آرام و سرسبز دلتای مکونگ بروید.",
    description:
      "این تور تضاد دلنشین میان هیاهوی «پاریس شرق» و زندگی آرام رودخانه‌ای جنوب ویتنام را نشان می‌دهد. روز اول به تونل‌های کو چی و معماری استعمار فرانسه می‌پردازید. روز دوم با قایق سامپان در کانال‌های پوشیده از نخل نارگیل بن تره حرکت می‌کنید و در کارگاه‌های محلی می‌بینید زندگی چگونه حول مکونگ شکل گرفته است.",
    start_location: "شهر هوشی‌مین",
    end_location: "شهر هوشی‌مین",
  },
  "hanoi-heritage-street-food": {
    title: "میراث هانوی و تجربه غذای خیابانی",
    region: "شمال ویتنام",
    summary:
      "تاریخ هزارساله شهر میان رودها را از میان معابد کهن، معماری استعماری و غرفه‌های افسانه‌ای غذای خیابانی کشف کنید.",
    description:
      "در روح ویتنام غرق شوید. این سفر دو روزه شما را از کوچه‌های پیچ‌درپیچ محله قدیمی عبور می‌دهد؛ جایی که هر خیابان نام حرفه‌ای را دارد که زمانی در آن رواج داشته است. از معبد آرام ادبیات دیدن می‌کنید، تعویض نگهبانان در آرامگاه هوشی‌مین را می‌بینید و یک شب را در تور غذایی انتخاب‌شده با طعم فو، بون چا و قهوه تخم‌مرغ معروف هانوی می‌گذرانید.",
    start_location: "هانوی",
    end_location: "هانوی",
  },
  "nha-trang-island-coastal": {
    title: "جزیره‌گردی نها ترانگ و میراث ساحلی",
    region: "ساحل جنوب مرکزی",
    summary:
      "به آب‌های شفاف خلیج نها ترانگ بروید و صخره‌های مرجانی رنگارنگ و برج‌های باستانی چام پو ناگار را کشف کنید.",
    description:
      "ببینید چرا نها ترانگ یکی از زیباترین خلیج‌های جهان شناخته می‌شود. این تجربه دو روزه میان ماجراجویی و آرامش تعادل برقرار می‌کند. روز اول با قایق تندرو به جزیره‌های خلوت می‌روید، در مناطق حفاظت‌شده دریایی شنا و اسنورکلینگ می‌کنید. روز دوم با بازدید از برج‌های چام پو ناگار قرن هشتم و پاگودای آرام لانگ سون وارد فرهنگ محلی می‌شوید و سفر را با تجربه حمام گل سنتی منطقه به پایان می‌رسانید.",
    start_location: "نها ترانگ",
    end_location: "نها ترانگ",
  },
  "phong-nha-caves-expedition": {
    title: "اکسپدیشن غارهای فونگ نها",
    region: "مرکز ویتنام",
    summary:
      "به قلب بزرگ‌ترین سامانه‌های غاری جهان سفر کنید و شگفتی‌های زیرزمینی پارک ملی فونگ نها-که بانگ را ببینید.",
    description:
      "شکوه زیرزمینی پارک ملی فونگ نها-که بانگ، ثبت‌شده در یونسکو، را کشف کنید. این برنامه شما را به دل کوه‌های آهکی کارستی می‌برد تا تالارهای عظیم غار پارادایس و غار اسرارآمیز فونگ نها را که با قایق قابل دسترسی است ببینید. با پیاده‌روی در جنگل به غارهای پنهان برسید، در رودخانه‌های شفاف زیرزمینی شنا کنید و زیبایی بکر و دست‌نخورده مهم‌ترین مقصد غارنوردی ویتنام را تجربه کنید.",
    start_location: "دونگ هوی",
    end_location: "دونگ هوی",
  },
}

const aboutTranslation = {
  hero_title: "سفرهایی فکرشده، ساخته‌شده توسط کسانی که ویتنام را می‌شناسند.",
  intro_eyebrow: "تور ویتنام",
  intro_body: [
    "تور ویتنام سفرهای اختصاصی و گروهی کوچک را در سراسر کشور طراحی می‌کند؛ از خلیج ها لونگ و نین بین تا ساپا، هوی آن، هوئه، دا نانگ، شهر هوشی‌مین و دلتای مکونگ.",
    "کار ما ساده است: بفهمیم چه نوع سفری می‌خواهید، مسیر و راهنمای مناسب را برایتان انتخاب کنیم و جزئیات را پیش از رسیدن شما روشن و دقیق نگه داریم. نتیجه باید روان، شخصی و ریشه‌دار در همان جاهایی باشد که برای دیدنشان آمده‌اید.",
  ],
  values: [
    {
      title: "شناخت محلی",
      body: "مسیرها با کمک راهنماهایی شکل می‌گیرند که ریتم هر منطقه را می‌شناسند؛ از ساعت‌های خلوت بازارها تا چشم‌اندازهای آرام پس از رفتن جمعیت.",
    },
    {
      title: "سفرهای منعطف",
      body: "هر تور می‌تواند با سرعت حرکت، علایق، تاریخ سفر و نوع تجربه‌ای که از ویتنام می‌خواهید هماهنگ شود.",
    },
    {
      title: "سفر مسئولانه",
      body: "هرجا که کیفیت سفر را واقعی‌تر کند، با همکاران محلی، اقامتگاه‌های خانوادگی و تجربه‌های جامعه‌محور کار می‌کنیم.",
    },
  ],
  feature_eyebrow: "شیوه کار ما",
  feature_title: "برنامه‌های روشن، راهنماهای محلی و فضای کافی برای اتفاق‌های خوب.",
  feature_body:
    "ما بخش‌های ضروری سفر را دقیق برنامه‌ریزی می‌کنیم و در عین حال برای لحظه‌هایی که ویتنام را ماندگار می‌کنند جا می‌گذاریم: ناهاری آرام‌تر، توقفی در بازار، غروبی بهتر یا تغییر مسیر وقتی هوا چنین می‌خواهد.",
}

async function createSchema() {
  await newDb.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id text PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL UNIQUE,
      "emailVerified" boolean DEFAULT false NOT NULL,
      image text,
      "createdAt" timestamp DEFAULT now() NOT NULL,
      "updatedAt" timestamp DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "session" (
      id text PRIMARY KEY,
      "expiresAt" timestamp NOT NULL,
      token text NOT NULL UNIQUE,
      "createdAt" timestamp DEFAULT now() NOT NULL,
      "updatedAt" timestamp DEFAULT now() NOT NULL,
      "ipAddress" text,
      "userAgent" text,
      "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "account" (
      id text PRIMARY KEY,
      "accountId" text NOT NULL,
      "providerId" text NOT NULL,
      "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      "accessToken" text,
      "refreshToken" text,
      "idToken" text,
      "accessTokenExpiresAt" timestamp,
      "refreshTokenExpiresAt" timestamp,
      scope text,
      password text,
      "createdAt" timestamp DEFAULT now() NOT NULL,
      "updatedAt" timestamp DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "verification" (
      id text PRIMARY KEY,
      identifier text NOT NULL,
      value text NOT NULL,
      "expiresAt" timestamp NOT NULL,
      "createdAt" timestamp DEFAULT now() NOT NULL,
      "updatedAt" timestamp DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tours (
      id serial PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      title text NOT NULL,
      region text NOT NULL,
      summary text DEFAULT '' NOT NULL,
      description text DEFAULT '' NOT NULL,
      price integer DEFAULT 0 NOT NULL,
      duration_days integer DEFAULT 1 NOT NULL,
      start_location text DEFAULT '' NOT NULL,
      end_location text DEFAULT '' NOT NULL,
      max_group_size integer DEFAULT 12 NOT NULL,
      difficulty text DEFAULT 'متوسط' NOT NULL,
      main_image text DEFAULT '' NOT NULL,
      gallery jsonb DEFAULT '[]'::jsonb NOT NULL,
      highlights jsonb DEFAULT '[]'::jsonb NOT NULL,
      included jsonb DEFAULT '[]'::jsonb NOT NULL,
      itinerary jsonb DEFAULT '[]'::jsonb NOT NULL,
      featured boolean DEFAULT false NOT NULL,
      published boolean DEFAULT true NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS about_page (
      id serial PRIMARY KEY,
      slug text DEFAULT 'main' NOT NULL UNIQUE,
      hero_eyebrow text DEFAULT 'درباره ما' NOT NULL,
      hero_title text DEFAULT 'سفرهایی فکرشده، ساخته‌شده توسط کسانی که ویتنام را می‌شناسند.' NOT NULL,
      hero_image text DEFAULT '/images/Vietnam/Ha_Long_Bay_2.jpg' NOT NULL,
      intro_eyebrow text DEFAULT 'تور ویتنام' NOT NULL,
      intro_title text DEFAULT 'ما تورها را بر اساس مکان‌های واقعی، زمان‌بندی درست و مراقبت محلی می‌سازیم.' NOT NULL,
      intro_body jsonb DEFAULT '[]'::jsonb NOT NULL,
      values jsonb DEFAULT '[]'::jsonb NOT NULL,
      feature_eyebrow text DEFAULT 'شیوه کار ما' NOT NULL,
      feature_title text DEFAULT 'برنامه‌های روشن، راهنماهای محلی و فضای کافی برای اتفاق‌های خوب.' NOT NULL,
      feature_body text DEFAULT '' NOT NULL,
      feature_image text DEFAULT '/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg' NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    );
  `)
}

async function copyAuthTable(table, columns, conflictColumn = "id") {
  const { rows } = await oldDb.query(
    `SELECT ${columns.map((c) => `"${c}"`).join(", ")} FROM "${table}"`,
  )
  for (const row of rows) {
    const values = columns.map((column) => row[column])
    await newDb.query(
      `
        INSERT INTO "${table}" (${columns.map((c) => `"${c}"`).join(", ")})
        VALUES (${columns.map((_, i) => `$${i + 1}`).join(", ")})
        ON CONFLICT ("${conflictColumn}") DO NOTHING
      `,
      values,
    )
  }
  return rows.length
}

async function copyTours() {
  const { rows } = await oldDb.query("SELECT * FROM tours ORDER BY id")
  for (const row of rows) {
    const translated = { ...row, ...(tourTranslations[row.slug] ?? {}) }
    await newDb.query(
      `
        INSERT INTO tours (
          id, slug, title, region, summary, description, price, duration_days,
          start_location, end_location, max_group_size, difficulty, main_image,
          gallery, highlights, included, itinerary, featured, published,
          created_at, updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
          $14::jsonb, $15::jsonb, $16::jsonb, $17::jsonb, $18, $19, $20, $21
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          region = EXCLUDED.region,
          summary = EXCLUDED.summary,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          duration_days = EXCLUDED.duration_days,
          start_location = EXCLUDED.start_location,
          end_location = EXCLUDED.end_location,
          max_group_size = EXCLUDED.max_group_size,
          difficulty = EXCLUDED.difficulty,
          main_image = EXCLUDED.main_image,
          gallery = EXCLUDED.gallery,
          highlights = EXCLUDED.highlights,
          included = EXCLUDED.included,
          itinerary = EXCLUDED.itinerary,
          featured = EXCLUDED.featured,
          published = EXCLUDED.published,
          created_at = EXCLUDED.created_at,
          updated_at = EXCLUDED.updated_at
      `,
      [
        translated.id,
        translated.slug,
        translated.title,
        translated.region,
        translated.summary,
        translated.description,
        translated.price,
        translated.duration_days,
        translated.start_location,
        translated.end_location,
        translated.max_group_size,
        translated.difficulty,
        translated.main_image,
        JSON.stringify(translated.gallery ?? []),
        JSON.stringify(translated.highlights ?? []),
        JSON.stringify(translated.included ?? []),
        JSON.stringify(translated.itinerary ?? []),
        translated.featured,
        translated.published,
        translated.created_at,
        translated.updated_at,
      ],
    )
  }
  await newDb.query(
    "SELECT setval(pg_get_serial_sequence('tours', 'id'), COALESCE((SELECT MAX(id) FROM tours), 1), true)",
  )
  return rows.length
}

async function copyAboutPage() {
  const { rows } = await oldDb.query("SELECT * FROM about_page ORDER BY id")
  for (const row of rows) {
    const translated = {
      ...row,
      hero_title: aboutTranslation.hero_title,
      intro_eyebrow: aboutTranslation.intro_eyebrow,
      intro_body: aboutTranslation.intro_body,
      values: aboutTranslation.values,
      feature_eyebrow: aboutTranslation.feature_eyebrow,
      feature_title: aboutTranslation.feature_title,
      feature_body: aboutTranslation.feature_body,
    }

    await newDb.query(
      `
        INSERT INTO about_page (
          id, slug, hero_eyebrow, hero_title, hero_image, intro_eyebrow,
          intro_title, intro_body, values, feature_eyebrow, feature_title,
          feature_body, feature_image, updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11, $12, $13, $14
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          hero_eyebrow = EXCLUDED.hero_eyebrow,
          hero_title = EXCLUDED.hero_title,
          hero_image = EXCLUDED.hero_image,
          intro_eyebrow = EXCLUDED.intro_eyebrow,
          intro_title = EXCLUDED.intro_title,
          intro_body = EXCLUDED.intro_body,
          values = EXCLUDED.values,
          feature_eyebrow = EXCLUDED.feature_eyebrow,
          feature_title = EXCLUDED.feature_title,
          feature_body = EXCLUDED.feature_body,
          feature_image = EXCLUDED.feature_image,
          updated_at = EXCLUDED.updated_at
      `,
      [
        translated.id,
        translated.slug,
        translated.hero_eyebrow,
        translated.hero_title,
        translated.hero_image,
        translated.intro_eyebrow,
        translated.intro_title,
        JSON.stringify(translated.intro_body ?? []),
        JSON.stringify(translated.values ?? []),
        translated.feature_eyebrow,
        translated.feature_title,
        translated.feature_body,
        translated.feature_image,
        translated.updated_at,
      ],
    )
  }
  await newDb.query(
    "SELECT setval(pg_get_serial_sequence('about_page', 'id'), COALESCE((SELECT MAX(id) FROM about_page), 1), true)",
  )
  return rows.length
}

async function main() {
  await oldDb.connect()
  await newDb.connect()

  try {
    await newDb.query("BEGIN")
    await createSchema()
    const users = await copyAuthTable("user", [
      "id",
      "name",
      "email",
      "emailVerified",
      "image",
      "createdAt",
      "updatedAt",
    ])
    const sessions = await copyAuthTable("session", [
      "id",
      "expiresAt",
      "token",
      "createdAt",
      "updatedAt",
      "ipAddress",
      "userAgent",
      "userId",
    ])
    const accounts = await copyAuthTable("account", [
      "id",
      "accountId",
      "providerId",
      "userId",
      "accessToken",
      "refreshToken",
      "idToken",
      "accessTokenExpiresAt",
      "refreshTokenExpiresAt",
      "scope",
      "password",
      "createdAt",
      "updatedAt",
    ])
    const verifications = await copyAuthTable("verification", [
      "id",
      "identifier",
      "value",
      "expiresAt",
      "createdAt",
      "updatedAt",
    ])
    const tours = await copyTours()
    const about = await copyAboutPage()
    await newDb.query("COMMIT")
    console.log(
      JSON.stringify(
        { users, sessions, accounts, verifications, tours, about },
        null,
        2,
      ),
    )
  } catch (error) {
    await newDb.query("ROLLBACK")
    throw error
  } finally {
    await oldDb.end()
    await newDb.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
