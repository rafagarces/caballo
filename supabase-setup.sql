-- ============================================================
-- CABALLO — Supabase setup
-- Ejecuta este SQL en Supabase > SQL Editor > New query
-- ============================================================

-- 1. Tabla de grabaciones
CREATE TABLE IF NOT EXISTS public.recordings (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  url        TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security
ALTER TABLE public.recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"   ON public.recordings FOR SELECT USING (true);
CREATE POLICY "Public insert" ON public.recordings FOR INSERT WITH CHECK (true);

-- 3. Políticas de Storage (ejecutar DESPUÉS de crear el bucket en el dashboard)
--    Dashboard → Storage → New Bucket → name: "recordings" → Public: ON
CREATE POLICY "Public read storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'recordings');

CREATE POLICY "Public upload storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'recordings');
