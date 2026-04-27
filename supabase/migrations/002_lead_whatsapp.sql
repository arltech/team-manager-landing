-- Add WhatsApp column to quiz_leads, make email optional

alter table public.quiz_leads alter column email drop not null;
alter table public.quiz_leads add column whatsapp text;

create index idx_quiz_leads_whatsapp on public.quiz_leads(whatsapp);
