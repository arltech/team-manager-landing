-- Quiz diagnóstico — Team Manager landing

create table public.quiz_responses (
  id uuid default gen_random_uuid() primary key,
  q1_visibility text not null check (q1_visibility in ('realtime', 'partial', 'ask', 'no_idea')),
  q2_team_reports text not null check (q2_team_reports in ('standard', 'some', 'when_pressed', 'never')),
  q3_units_below_target text not null check (q3_units_below_target in ('daily', 'mid_month', 'closing', 'after')),
  q4_lost_seller text not null check (q4_lost_seller in ('never', 'once', 'few_times', 'frequent')),
  q5_monday_meeting text not null check (q5_monday_meeting in ('productive', 'half', 'mostly', 'only_way')),
  diagnostic text not null check (diagnostic in ('visibility_compromised', 'turnover_risk', 'pressure_culture', 'blind_closing', 'healthy_operation')),
  network_size text,
  vertical text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text,
  created_at timestamptz default now() not null
);

create table public.quiz_leads (
  id uuid default gen_random_uuid() primary key,
  quiz_response_id uuid references public.quiz_responses(id) on delete set null,
  email text not null,
  name text,
  network_name text,
  diagnostic text not null,
  email_sent boolean default false,
  email_sent_at timestamptz,
  created_at timestamptz default now() not null
);

alter table public.quiz_responses enable row level security;
alter table public.quiz_leads enable row level security;

create policy "quiz_responses_insert_service" on public.quiz_responses
  for insert with check (true);

create policy "quiz_leads_insert_service" on public.quiz_leads
  for insert with check (true);

-- Sem policies de SELECT/UPDATE/DELETE — apenas service_role acessa.

create index idx_quiz_responses_created on public.quiz_responses(created_at desc);
create index idx_quiz_responses_diagnostic on public.quiz_responses(diagnostic);
create index idx_quiz_leads_email on public.quiz_leads(email);
create index idx_quiz_leads_diagnostic on public.quiz_leads(diagnostic);
create index idx_quiz_leads_created on public.quiz_leads(created_at desc);
