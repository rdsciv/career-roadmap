// Auto-generated fixture from a real synthesis run. Used by the visualization spike.
// Regenerate via: pnpm tsx scripts/probe-synthesis.ts
import type { Roadmap } from "../types";
export const FIXTURE_ROADMAP: Roadmap = {
  "version": "1.0",
  "current_state": {
    "title": "Senior Software Engineer",
    "seniority": "ic_senior",
    "years_experience": 8,
    "domains": [
      "fintech",
      "payments",
      "backend infrastructure"
    ],
    "demonstrated_skills": [
      "Go",
      "Java",
      "Kotlin",
      "gRPC",
      "distributed systems",
      "payments",
      "on-call leadership",
      "tech lead"
    ]
  },
  "goal": {
    "raw": "Become a Director of Engineering at a Series B fintech in 4 years.",
    "normalized": "Attain a Director of Engineering role at a Series B-stage fintech company within 4 years.",
    "target_role": "Director of Engineering",
    "target_context": "Series B fintech, 4-year timeline",
    "quality": "clear"
  },
  "primary_path": [
    {
      "id": "m1",
      "title": "Formalize People Management — Become a Tech Lead Manager or Engineering Manager",
      "summary": "Convert existing informal tech-lead and on-call-leadership signals into a formal Engineering Manager or Tech Lead Manager role with direct reports, performance reviews, hiring authority, and 1:1 accountability. This is the most critical early move: at 8 YoE the natural EM conversion window is open now, and delaying it is the single largest failure mode on this path.",
      "timeframe": {
        "min_months": 0,
        "max_months": 18
      },
      "required_skills": [
        "formal 1:1s and performance reviews",
        "hiring and interview loop ownership",
        "people management fundamentals",
        "team health and retention",
        "managing up to a VP or CTO"
      ],
      "suggested_roles": [
        "Engineering Manager",
        "Tech Lead Manager",
        "Team Lead (with formal reports)"
      ],
      "suggested_companies": [
        "Current employer (if EM headcount exists)",
        "Series A fintech with a first-EM opening",
        "Stripe",
        "Plaid",
        "Marqeta"
      ],
      "actions": [
        {
          "title": "Negotiate a formal EM or TLM title with direct reports and hiring authority",
          "detail": "Work with your manager to formalize the people-management scope you partially have. If blocked internally, begin a targeted external search within 6 months. The goal is to own performance reviews, hiring decisions, and 1:1 cadence for at least 4–8 engineers.",
          "type": "role_change",
          "est_effort_hours": 40,
          "source_ids": [
            "S-pragmatic-engineer",
            "S-elegant-puzzle"
          ]
        },
        {
          "title": "Document every management action in a private hiring & management portfolio",
          "detail": "Maintain a living document recording every hire made, onboarding improvement, performance conversation, and team structure change. This portfolio is a high-signal artifact for Director-level interview panels.",
          "type": "artifact",
          "est_effort_hours": 20,
          "source_ids": [
            "S-elegant-puzzle"
          ]
        },
        {
          "title": "Complete Reforge Engineering Leadership or CTO Craft program",
          "detail": "Structured programs (Reforge Engineering Leadership track or CTO School) provide frameworks for the org-design, headcount planning, and executive communication gaps that are hardest to learn on the job.",
          "type": "cert",
          "est_effort_hours": 80,
          "source_ids": [
            "S-reforge",
            "S-cto-school"
          ]
        },
        {
          "title": "Join Rands Leadership Slack and attend fintech EM meetups",
          "detail": "Series B companies frequently hire Directors via warm referral. Invest immediately in the fintech engineering leadership community. Target at least 2 in-person fintech leadership events in the first year.",
          "type": "network",
          "est_effort_hours": 30,
          "source_ids": [
            "S-rands-slack"
          ]
        }
      ],
      "comp_band": {
        "role": "Engineering Manager / Tech Lead Manager",
        "location": "US (SF / NYC / remote-top-market)",
        "company_stage": "series_a",
        "base_min_usd": 180000,
        "base_max_usd": 230000,
        "total_min_usd": 200000,
        "total_max_usd": 280000,
        "year": 2025,
        "source_ids": [
          "S-levels-fyi-ladder",
          "S-carta-comp-report"
        ],
        "note": "Indicative band for a first-time EM at a Series A/B fintech; equity upside varies significantly by stage."
      },
      "pitfalls": [
        {
          "text": "Remaining in an IC track to accumulate more technical depth instead of formalizing management responsibilities is the single largest failure mode at this career stage. At 8 YoE, the natural EM conversion window is open now and closes within 2–3 years.",
          "source_ids": [
            "S-pragmatic-engineer",
            "S-firstround"
          ]
        },
        {
          "text": "Informal titles — tech lead, on-call lead — do not count as EM experience on a Director-level interview panel. Performance reviews, hiring decisions, and PIPs must be formalized.",
          "source_ids": [
            "S-elegant-puzzle"
          ]
        }
      ],
      "source_ids": [
        "S-pragmatic-engineer",
        "S-elegant-puzzle",
        "S-levels-fyi-ladder"
      ]
    },
    {
      "id": "m2",
      "title": "Scale to Senior Engineering Manager — Own a Product Area Across 2+ Teams",
      "summary": "Grow from managing one team to owning an entire product area (e.g., Payments Platform, Money Movement, Core Ledger) with 2–4 teams under management. Develop org design, headcount planning, cross-functional relationships with Product/Design/Compliance, and fintech regulatory fluency. This milestone is the primary proving ground for Director readiness.",
      "timeframe": {
        "min_months": 12,
        "max_months": 30
      },
      "required_skills": [
        "org design and headcount planning",
        "budget and headcount model ownership",
        "cross-functional leadership (Product, Design, Risk, Compliance)",
        "fintech compliance fluency (PCI-DSS, SOC 2 Type II)",
        "executive communication and OKR setting",
        "recruiting pipeline ownership"
      ],
      "suggested_roles": [
        "Senior Engineering Manager",
        "Engineering Lead",
        "Head of Payments Engineering"
      ],
      "suggested_companies": [
        "Series A/B fintech (payments-core product)",
        "Adyen",
        "Brex",
        "Ramp",
        "Modern Treasury",
        "Column"
      ],
      "actions": [
        {
          "title": "Own a headcount model and hiring plan for your product area",
          "detail": "Partner with finance to build a staffing model tied to roadmap and burn rate. Directors are screened on their ability to speak to unit economics and CAC; this is the on-ramp to that fluency.",
          "type": "project",
          "est_effort_hours": 60,
          "source_ids": [
            "S-firstround",
            "S-carta-comp-report"
          ]
        },
        {
          "title": "Lead a PCI-DSS or SOC 2 Type II audit as the engineering owner",
          "detail": "Volunteer to own the engineering side of the next compliance audit. The ability to translate PCI-DSS Level 1 and SOC 2 Type II requirements into an engineering roadmap is table-stakes at a payments fintech DoE level.",
          "type": "project",
          "est_effort_hours": 120,
          "source_ids": [
            "S-pci-soc2-fintech"
          ]
        },
        {
          "title": "Build and publish Architecture Decision Records (ADRs) for your domain",
          "detail": "Maintain a curated, well-written ADR library for your payments/infrastructure domain. This demonstrates staff-level technical judgment and scope to Director-level interviewers.",
          "type": "artifact",
          "est_effort_hours": 40,
          "source_ids": [
            "S-elegant-puzzle"
          ]
        },
        {
          "title": "Speak at a fintech conference (Money20/20, FinDEVr, or NACHA Payments)",
          "detail": "Directors are expected to represent the company externally. Submit a talk proposal in the first 6 months of this milestone. Topics around distributed payments infrastructure, reliability, or fintech compliance are directly relevant.",
          "type": "network",
          "est_effort_hours": 60,
          "source_ids": [
            "S-fintech-conf-career"
          ]
        },
        {
          "title": "Establish regular board/investor update communication patterns with your CTO or VP Eng",
          "detail": "Practice framing technical trade-offs for non-technical executives. Volunteer to co-present at board-prep sessions or investor reviews. Directors must communicate with clarity on risk, roadmap, and resource trade-offs at this level.",
          "type": "study",
          "est_effort_hours": 30,
          "source_ids": [
            "S-firstround",
            "S-elegant-puzzle"
          ]
        }
      ],
      "comp_band": {
        "role": "Senior Engineering Manager / Engineering Lead",
        "location": "US (SF / NYC / remote-top-market)",
        "company_stage": "series_b",
        "base_min_usd": 200000,
        "base_max_usd": 250000,
        "total_min_usd": 230000,
        "total_max_usd": 310000,
        "year": 2026,
        "source_ids": [
          "S-levels-fyi-doe",
          "S-carta-comp-report"
        ],
        "note": "Indicative band for a Senior EM at a Series B fintech; equity component varies by valuation and vest schedule."
      },
      "pitfalls": [
        {
          "text": "Directors at Series B companies must own headcount models and speak to burn rate and unit economics. Candidates who cannot frame engineering decisions in financial terms are frequently screened out at the final loop.",
          "source_ids": [
            "S-firstround",
            "S-carta-comp-report"
          ]
        },
        {
          "text": "Underestimating fintech compliance complexity (PCI-DSS Level 1, SOC 2 Type II, banking-partner security reviews) causes Directors to fail rapidly in the role. Build this fluency deliberately during the Senior EM phase.",
          "source_ids": [
            "S-pci-soc2-fintech"
          ]
        },
        {
          "text": "Title-hopping to an early-stage startup as 'Head of Engineering' with only 2 direct reports inflates the title without building the multi-team org design experience that Series B Director panels explicitly probe for.",
          "source_ids": [
            "S-lenny-newsletter"
          ]
        }
      ],
      "source_ids": [
        "S-elegant-puzzle",
        "S-firstround",
        "S-pragmatic-engineer",
        "S-pci-soc2-fintech"
      ]
    },
    {
      "id": "m3",
      "title": "Land Director of Engineering Role at a Series B Fintech",
      "summary": "Convert the demonstrated multi-team management track record, fintech compliance fluency, business acumen, and external reputation into a Director of Engineering offer at a Series B fintech. The role will own 2–4 EM or 8–15+ IC direct/indirect reports, the engineering budget, and cross-functional product-area leadership.",
      "timeframe": {
        "min_months": 36,
        "max_months": 48
      },
      "required_skills": [
        "manager-of-managers experience",
        "headcount and budget ownership",
        "board-level communication",
        "recruiting pipeline and offer calibration",
        "fintech regulatory/compliance narrative ownership",
        "OKR and roadmap alignment across Engineering, Product, and Design"
      ],
      "suggested_roles": [
        "Director of Engineering",
        "Director of Payments Engineering",
        "Director, Core Platform Engineering"
      ],
      "suggested_companies": [
        "Series B payments fintech (50–200 employees)",
        "Ramp",
        "Brex",
        "Sardine",
        "Synapse (or successors)",
        "Modern Treasury",
        "Lithic",
        "Payabli"
      ],
      "actions": [
        {
          "title": "Target Director of Engineering roles at Series B fintechs via warm referral network",
          "detail": "Series B companies hire Directors primarily via warm referrals. Activate the fintech EM network built in prior milestones. Prioritize roles where your payments/distributed-systems domain expertise is central to the company's core product.",
          "type": "role_change",
          "est_effort_hours": 80,
          "source_ids": [
            "S-rands-slack",
            "S-lenny-newsletter"
          ]
        },
        {
          "title": "Finalize and polish hiring portfolio and ADR library as interview artifacts",
          "detail": "Curate the hiring portfolio and ADR library built in previous milestones into a shareable format. Be prepared to walk a Director-level panel through every team structure change, hire, and architectural decision you owned.",
          "type": "artifact",
          "est_effort_hours": 20,
          "source_ids": [
            "S-elegant-puzzle"
          ]
        },
        {
          "title": "Prepare a headcount and budget case study from your Senior EM tenure",
          "detail": "Construct a narrative showing how you built a headcount model, partnered with finance, and delivered against a roadmap under budget constraints. This is a standard Director loop exercise at Series B companies.",
          "type": "artifact",
          "est_effort_hours": 20,
          "source_ids": [
            "S-firstround",
            "S-carta-comp-report"
          ]
        }
      ],
      "comp_band": {
        "role": "Director of Engineering",
        "location": "US (SF / NYC / remote-top-market)",
        "company_stage": "series_b",
        "base_min_usd": 220000,
        "base_max_usd": 270000,
        "total_min_usd": 250000,
        "total_max_usd": 320000,
        "year": 2029,
        "source_ids": [
          "S-levels-fyi-doe",
          "S-carta-comp-report"
        ],
        "note": "2023–2024 data; equity of 0.10%–0.35% over a 4-year vest is typical at Series B. Pre-liquidation equity value is highly variable by valuation."
      },
      "pitfalls": [
        {
          "text": "Neglecting upward management practice — framing trade-offs for non-technical executives and setting expectations under uncertainty — causes candidates to struggle both in the Director interview loop and in the role itself.",
          "source_ids": [
            "S-firstround"
          ]
        },
        {
          "text": "Not investing in an external fintech leadership network means missing the warm-referral channels through which most Series B Director roles are filled.",
          "source_ids": [
            "S-rands-slack"
          ]
        }
      ],
      "source_ids": [
        "S-levels-fyi-doe",
        "S-carta-comp-report",
        "S-lenny-newsletter",
        "S-firstround",
        "S-rands-slack"
      ]
    }
  ],
  "branches": [
    {
      "id": "b1",
      "label": "IC Staff/Principal Track → Late Conversion to Director",
      "rationale": "If the candidate prefers to preserve optionality toward a Principal Engineer or technical CTO path, they can spend 12–18 months building Staff-level organizational influence first, then convert to management. This adds 1–2 years to the Director timeline but keeps the IC exit ramp open.",
      "forks_after_milestone_id": "m1",
      "rejoins_at_milestone_id": "m2",
      "milestones": [
        {
          "id": "b1m1",
          "title": "Attain Staff or Principal Engineer Title and Build Org-Level Technical Influence",
          "summary": "Pursue a Staff or Principal Engineer title at the current employer or a larger fintech. Drive org-wide technical initiatives (e.g., distributed payments reliability, platform consolidation) that demonstrate influence beyond a single team. Simultaneously take on an 'Acting EM' or 'Tech Lead Manager' hybrid to begin accumulating people-management experience.",
          "timeframe": {
            "min_months": 0,
            "max_months": 18
          },
          "required_skills": [
            "staff-level system design",
            "org-wide technical strategy",
            "cross-team influence without authority",
            "ADR authorship and architecture review",
            "mentorship of senior engineers"
          ],
          "suggested_roles": [
            "Staff Engineer",
            "Principal Engineer",
            "Tech Lead Manager (hybrid)"
          ],
          "suggested_companies": [
            "Stripe",
            "Plaid",
            "Adyen",
            "Square / Block",
            "Marqeta"
          ],
          "actions": [
            {
              "title": "Drive a high-visibility cross-team technical initiative (e.g., payments reliability, gRPC migration)",
              "detail": "Own an initiative that requires coordinating 3+ teams and produces measurable org-wide impact. This is the core Staff-level promotion criterion and builds the cross-functional influence needed for Director later.",
              "type": "project",
              "est_effort_hours": 200,
              "source_ids": [
                "S-pragmatic-engineer",
                "S-elegant-puzzle"
              ]
            },
            {
              "title": "Begin Acting EM responsibilities alongside IC work (Tech Lead Manager hybrid)",
              "detail": "Negotiate a TLM hybrid role to begin accumulating formal people-management experience even while on the IC track. This prevents the common failure mode of having zero management experience when attempting the Director transition.",
              "type": "role_change",
              "est_effort_hours": 60,
              "source_ids": [
                "S-pragmatic-engineer"
              ]
            }
          ],
          "comp_band": {
            "role": "Staff / Principal Engineer",
            "location": "US (SF / NYC / remote-top-market)",
            "company_stage": "big_tech",
            "base_min_usd": 210000,
            "base_max_usd": 260000,
            "total_min_usd": 240000,
            "total_max_usd": 320000,
            "year": 2026,
            "source_ids": [
              "S-levels-fyi-doe",
              "S-levels-fyi-ladder"
            ],
            "note": "Staff/Principal bands at large fintechs; RSU-heavy at public companies."
          },
          "pitfalls": [
            {
              "text": "Staying IC too long — beyond 18 months on this branch — without any formal management scope materially reduces the probability of reaching Director within 4 years. Rejoin the management track by month 18 at the latest.",
              "source_ids": [
                "S-pragmatic-engineer",
                "S-firstround"
              ]
            }
          ],
          "source_ids": [
            "S-pragmatic-engineer",
            "S-elegant-puzzle",
            "S-levels-fyi-ladder"
          ]
        }
      ]
    },
    {
      "id": "b2",
      "label": "Strategic Move — Head of Engineering at a Seed/Series A Fintech",
      "rationale": "Rather than seeking an EM role internally, the candidate joins a Seed or Series A fintech as the founding or first Head of Engineering. If the company grows to Series B, the candidate converts directly to Director title. This is faster but riskier: startup existential risk is real, and a Head-of-Eng title with <5 reports does not satisfy Director panel scrutiny.",
      "forks_after_milestone_id": "m1",
      "rejoins_at_milestone_id": "m3",
      "milestones": [
        {
          "id": "b2m1",
          "title": "Join a Seed/Series A Fintech as Head of Engineering or First EM",
          "summary": "Target a founding or first EM/Head of Engineering role at a Seed or Series A payments fintech where you own the entire engineering function from the start. Ride the company's growth to Series B, converting the title to Director as headcount and org complexity grow.",
          "timeframe": {
            "min_months": 0,
            "max_months": 12
          },
          "required_skills": [
            "engineering function ownership from 0",
            "early-stage hiring and team building",
            "technical architecture ownership alongside management",
            "direct CTO/CEO partnership",
            "fintech compliance bootstrapping (PCI-DSS, SOC 2)"
          ],
          "suggested_roles": [
            "Head of Engineering",
            "VP of Engineering (small team)",
            "Founding Engineer Manager"
          ],
          "suggested_companies": [
            "Seed/Series A payments or embedded-finance startups",
            "YC fintech cohort companies",
            "a16z fintech portfolio companies",
            "Bessemer fintech portfolio companies"
          ],
          "actions": [
            {
              "title": "Identify and target 10–15 Seed/Series A fintechs where payments infrastructure is core",
              "detail": "Use the fintech leadership network (Rands Slack, FinTech meetups) to source warm introductions. Prioritize companies where your Go/gRPC/distributed-systems expertise is directly relevant to the core product.",
              "type": "network",
              "est_effort_hours": 60,
              "source_ids": [
                "S-rands-slack",
                "S-lenny-newsletter"
              ]
            },
            {
              "title": "Ensure offer includes equity and title that reflects multi-team growth ambition",
              "detail": "Negotiate a title (Head of Engineering or VP Eng) and equity package that reflects the expectation of growing to 15+ engineers and a Director-equivalent scope. Document the org growth trajectory in the offer letter or a follow-on memo.",
              "type": "artifact",
              "est_effort_hours": 20,
              "source_ids": [
                "S-carta-comp-report",
                "S-lenny-newsletter"
              ]
            },
            {
              "title": "Bootstrap PCI-DSS and SOC 2 compliance posture as the first engineering leader",
              "detail": "Own the compliance roadmap from day one. This is a critical Director-level differentiator at a payments fintech and an opportunity to build deep fluency that peers on the EM track will lack.",
              "type": "project",
              "est_effort_hours": 150,
              "source_ids": [
                "S-pci-soc2-fintech"
              ]
            }
          ],
          "comp_band": {
            "role": "Head of Engineering (Seed/Series A Fintech)",
            "location": "US (SF / NYC / remote-top-market)",
            "company_stage": "seed",
            "base_min_usd": 170000,
            "base_max_usd": 220000,
            "total_min_usd": 180000,
            "total_max_usd": 250000,
            "year": 2025,
            "source_ids": [
              "S-carta-comp-report"
            ],
            "note": "Base is typically lower at Seed stage; upside is in equity (0.25%–1.0% range possible). Carta data covers startup comp at this stage."
          },
          "pitfalls": [
            {
              "text": "A 'Head of Engineering' title with only 2–3 direct reports does not satisfy Director-level interview panels at Series B companies. Ensure the role has a credible path to managing 2+ teams (8–15+ engineers) within 18–24 months.",
              "source_ids": [
                "S-lenny-newsletter"
              ]
            },
            {
              "text": "Startup existential risk is real: if the company fails before reaching Series B, the candidate loses 2–3 years of title-building runway. Maintain an active external network as insurance.",
              "source_ids": [
                "S-rands-slack",
                "S-lenny-newsletter"
              ]
            }
          ],
          "source_ids": [
            "S-lenny-newsletter",
            "S-carta-comp-report",
            "S-rands-slack",
            "S-pci-soc2-fintech"
          ]
        }
      ]
    },
    {
      "id": "b3",
      "label": "Payments/Infrastructure Specialist Director vs. General Engineering Director",
      "rationale": "The candidate's deep payments, gRPC, and distributed-systems background is a strong differentiator for payment-infrastructure-focused Director roles (Director of Payments Engineering, Director of Core Platform). These roles are rarer but command premium compensation and are harder to compete for generalists.",
      "forks_after_milestone_id": "m2",
      "rejoins_at_milestone_id": null,
      "milestones": [
        {
          "id": "b3m1",
          "title": "Target Director of Payments Engineering or Director, Core Platform at a Payments Fintech",
          "summary": "Leverage the candidate's unique combination of Go/gRPC/distributed-systems depth and Senior EM org-design experience to pursue specialist Director roles where the payments stack is the core product. These roles command premium compensation and are a stronger career moat than general DoE roles.",
          "timeframe": {
            "min_months": 36,
            "max_months": 48
          },
          "required_skills": [
            "payments protocol and ledger architecture",
            "high-throughput distributed systems at scale",
            "PCI-DSS Level 1 compliance ownership",
            "money-movement and settlement domain expertise",
            "multi-team engineering leadership for platform teams"
          ],
          "suggested_roles": [
            "Director of Payments Engineering",
            "Director, Core Payments Platform",
            "Director, Money Movement Engineering",
            "Director, Infrastructure and Reliability"
          ],
          "suggested_companies": [
            "Stripe",
            "Adyen",
            "Brex",
            "Ramp",
            "Modern Treasury",
            "Column",
            "Lithic",
            "Payabli"
          ],
          "actions": [
            {
              "title": "Publish technical writing on distributed payments systems or event sourcing for ledgers",
              "detail": "Write 2–3 deep-dive technical posts (on a personal blog, Substack, or company eng blog) on payments-specific distributed systems topics. This builds external reputation as a domain authority that generalist Director candidates cannot easily replicate.",
              "type": "artifact",
              "est_effort_hours": 80,
              "source_ids": [
                "S-fintech-conf-career",
                "S-pragmatic-engineer"
              ]
            },
            {
              "title": "Present a payments infrastructure talk at Money20/20 or FinDEVr",
              "detail": "A conference talk at a major fintech venue directly signals Director-level domain authority and satisfies the expectation that Directors represent the company externally.",
              "type": "network",
              "est_effort_hours": 60,
              "source_ids": [
                "S-fintech-conf-career"
              ]
            }
          ],
          "comp_band": {
            "role": "Director of Payments Engineering",
            "location": "US (SF / NYC / remote-top-market)",
            "company_stage": "series_b",
            "base_min_usd": 230000,
            "base_max_usd": 280000,
            "total_min_usd": 270000,
            "total_max_usd": 360000,
            "year": 2029,
            "source_ids": [
              "S-levels-fyi-doe",
              "S-carta-comp-report"
            ],
            "note": "Specialist payments Director roles may command a premium above the general DoE band at Series B; equity upside also higher if targeting Series B with a core payments product."
          },
          "pitfalls": [
            {
              "text": "Hyper-specializing in payments infrastructure can narrow the total addressable job market for DoE roles. If the candidate wants optionality beyond fintech, they should broaden scope during the Senior EM phase.",
              "source_ids": [
                "S-pragmatic-engineer",
                "S-lenny-newsletter"
              ]
            }
          ],
          "source_ids": [
            "S-levels-fyi-doe",
            "S-carta-comp-report",
            "S-fintech-conf-career",
            "S-pragmatic-engineer"
          ]
        }
      ]
    }
  ],
  "final_goal": {
    "title": "Director of Engineering at a Series B Fintech",
    "summary": "Attain a Director of Engineering role at a Series B-stage fintech company within 4 years, owning 2–4 engineering teams, the engineering budget, cross-functional product-area leadership, and fintech regulatory/compliance accountability. Target base compensation of $220K–$270K with total cash of $250K–$320K and equity of 0.10%–0.35% over a 4-year vest.",
    "comp_band": {
      "role": "Director of Engineering",
      "location": "US (SF / NYC / remote-top-market)",
      "company_stage": "series_b",
      "base_min_usd": 220000,
      "base_max_usd": 270000,
      "total_min_usd": 250000,
      "total_max_usd": 320000,
      "year": 2029,
      "source_ids": [
        "S-levels-fyi-doe",
        "S-carta-comp-report"
      ],
      "note": "2023–2024 aggregated data for Series B fintech (50–200 employees). Equity of 0.10%–0.35% over 4-year vest; pre-liquidation value is highly variable."
    },
    "source_ids": [
      "S-levels-fyi-doe",
      "S-carta-comp-report",
      "S-pragmatic-engineer",
      "S-lenny-newsletter"
    ]
  },
  "sources": [
    {
      "id": "S-pragmatic-engineer",
      "url": "https://newsletter.pragmaticengineer.com/p/from-engineer-to-director",
      "title": "From Software Engineer to Sr Director of Engineering – The Pragmatic Engineer",
      "publisher": "The Pragmatic Engineer (Gergely Orosz)",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-elegant-puzzle",
      "url": "https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186",
      "title": "An Elegant Puzzle: Systems of Engineering Management – Will Larson",
      "publisher": "Stripe Press",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-reforge",
      "url": "https://www.reforge.com/engineering-leadership",
      "title": "Engineering Leadership Program – Reforge",
      "publisher": "Reforge",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-cto-school",
      "url": "https://www.ctocraft.com/cto-school/",
      "title": "CTO School / CTO Craft Programs",
      "publisher": "CTO Craft",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-rands-slack",
      "url": "https://randsinrepose.com/welcome-to-rands-leadership-slack/",
      "title": "Welcome to Rands Leadership Slack",
      "publisher": "Rands in Repose (Michael Lopp)",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-levels-fyi-ladder",
      "url": "https://www.levels.fyi/blog/swe-to-engineering-manager.html",
      "title": "From SWE to Engineering Manager: What the Ladder Looks Like – Levels.fyi Blog",
      "publisher": "Levels.fyi",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-carta-comp-report",
      "url": "https://carta.com/blog/compensation-report-2024/",
      "title": "Carta 2024 Startup Compensation Report",
      "publisher": "Carta",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-firstround",
      "url": "https://review.firstround.com/this-is-what-impactful-engineering-leadership-looks-like",
      "title": "This Is What Impactful Engineering Leadership Looks Like – First Round Review",
      "publisher": "First Round Capital",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-pci-soc2-fintech",
      "url": "https://www.vanta.com/resources/soc-2-vs-pci-dss",
      "title": "SOC 2 vs PCI DSS: What Fintech Companies Need to Know – Vanta",
      "publisher": "Vanta",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-fintech-conf-career",
      "url": "https://www.money2020.com/speakers",
      "title": "Money20/20 Speaker Profiles – Fintech Leadership Examples",
      "publisher": "Money20/20",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-levels-fyi-doe",
      "url": "https://www.levels.fyi/t/director-of-engineering",
      "title": "Director of Engineering Salaries – Levels.fyi",
      "publisher": "Levels.fyi",
      "retrieved_at": "2025-07-09"
    },
    {
      "id": "S-lenny-newsletter",
      "url": "https://www.lennysnewsletter.com/p/how-to-become-a-director-of-engineering",
      "title": "How to Become a Director of Engineering – Lenny's Newsletter",
      "publisher": "Lenny's Newsletter",
      "retrieved_at": "2025-07-09"
    }
  ],
  "generated_at": "2025-07-09T00:00:00Z",
  "model": "research-bundle-v1"
} as Roadmap;
