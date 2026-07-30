export const siteContent = {
  brand: {
    name: "BrickLabClips",
    shortDescription:
      "Build ideas, school materials, and student creations from the BricklabClips community.",
    logoPath: "/images/bricklabs-logo.jpg",
    tiktokUrl: "https://www.tiktok.com/@bricklabclips",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bricklabclips.org"
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "About Us", href: "/about" },
    { label: "Sponsor", href: "/sponsor" },
    { label: "Get Involved", href: "/get-involved" }
  ],
  ctas: {
    requestSupport: { label: "Request Materials", href: "/get-involved#school-request" },
    partner: { label: "Partner With Us", href: "/sponsor#sponsor-inquiry" },
    exploreBuilds: { label: "Explore Builds", href: "/library" }
  },
  audienceStats: [
    { label: "Monthly views", value: "16M+" },
    { label: "Followers", value: "20.4K" }
  ],
  impactStats: [
    { label: "Parts allocated to schools", value: "1,300+" },
    { label: "Schools supported", value: "2" },
    { label: "Materials raised", value: "$2,000+" },
    { label: "Students reached", value: "55+" },
    { label: "2026 goal", value: "10 requests" }
  ],
  problemSources: [
    {
      label: "39%",
      title: "Afterschool programs with tech and engineering",
      fact: "Only 39% of afterschool programs offered technology and engineering activities in 2020.",
      source: "America After 3PM STEM Report",
      href: "https://afterschoolalliance.org/documents/AA3PM/AA3PM-STEM-Report-2021.pdf"
    },
    {
      label: "27% vs 44%",
      title: "Income gap in hands-on activities",
      fact: "Parents in the lowest-income bracket reported technology and engineering activities at 27%, compared with 44% in the highest-income bracket.",
      source: "America After 3PM STEM Report",
      href: "https://afterschoolalliance.org/documents/AA3PM/AA3PM-STEM-Report-2021.pdf"
    },
    {
      label: "80%",
      title: "Virginia afterschool demand",
      fact: "In Virginia, 80% of youth are missing out on attending an afterschool program.",
      source: "VPOST Virginia After 3PM",
      href: "https://v-post.org/virginia-after-3pm/"
    },
    {
      label: "Nearly 500",
      title: "Local student interest",
      fact: "Nearly 500 elementary and middle school students from 15 Loudoun County schools joined a robotics/STEM Innovation Day.",
      source: "Loudoun County Public Schools",
      href: "https://www.lcps.org/o/lcps/article/2837213"
    }
  ],
  loopSummary:
    "Build videos create attention. Sponsor support helps turn that attention into materials schools can use.",
  loopSteps: [
    {
      title: "Watch builds",
      shortTitle: "Watch",
      description: "Short videos make engineering ideas visible."
    },
    {
      title: "Fund materials",
      shortTitle: "Fund",
      description: "Sponsors and revenue support school requests."
    },
    {
      title: "Ship parts",
      shortTitle: "Ship",
      description: "Approved requests become boxes sent to schools."
    },
    {
      title: "Students build",
      shortTitle: "Build",
      description: "Classrooms build, share, and inspire the next project."
    }
  ],
  programs: [
    {
      title: "Build Library",
      description:
        "Simple project guides for cardboard, code, brick-compatible parts, and classroom challenges.",
      href: "/library"
    },
    {
      title: "Build Challenge",
      description:
        "Students submit creative builds made with safe materials they already have or can request.",
      href: "/hackathon"
    },
    {
      title: "School Materials",
      description:
        "Teachers and coaches request parts. Approved materials are purchased and shipped directly.",
      href: "/get-involved#school-request"
    }
  ],
  challenge: {
    devpostUrl: process.env.NEXT_PUBLIC_HACKATHON_DEVPOST_URL || "",
    tracks: [
      "No-parts / household materials",
      "Cardboard arcade",
      "Brick-compatible mechanism",
      "Robotics/electronics",
      "Code/game",
      "Classroom/team build",
      "Impact invention"
    ],
    rubric: [
      { label: "Creativity", value: "25%" },
      { label: "Engineering concept", value: "25%" },
      { label: "Explanation", value: "20%" },
      { label: "Accessibility/replicability", value: "15%" },
      { label: "Presentation", value: "15%" }
    ],
    requirements: [
      "60-90 second video",
      "3 photos",
      "Materials list",
      "Short explanation of the engineering concept",
      "What problem it solves or what principle it demonstrates",
      "Optional code/files",
      "Parent, teacher, guardian, or approved adult contact for younger students"
    ],
    faqs: [
      {
        question: "Do students need expensive robotics parts?",
        answer:
          "No. Projects can use cardboard, recycled materials, classroom supplies, code, brick-compatible parts, electronics, or any safe creative materials."
      },
      {
        question: "Can a classroom submit a team project?",
        answer:
          "Yes. Classroom and team builds are welcome, especially when the project shows a clear engineering idea and can be explained by students."
      },
      {
        question: "Will students be publicly named?",
        answer:
          "BricklabClips does not require public student names. Students under 13 should submit through a parent, guardian, teacher, or approved adult."
      }
    ]
  },
  sponsor: {
    fundingUses: [
      "Robotics parts",
      "Motors and sensors",
      "Classroom tools",
      "Cardboard/build materials",
      "Challenge prizes",
      "Shipping and supplies"
    ],
    sponsorReceives: [
      "Clear call before launch",
      "Agreed campaign scope",
      "Transparent materials report",
      "Optional brand mention",
      "Disclosed sponsored content if content is included",
      "Photos/testimonials only when schools approve"
    ],
    faqs: [
      {
        question: "Is sponsorship customized?",
        answer:
          "No. Campaign scope, deliverables, and reporting are agreed on before launch based on the sponsor goal and school support need."
      },
      {
        question: "Can sponsors provide parts instead of cash support?",
        answer:
          "Yes. In-kind parts, shipping help, challenge prizes, and classroom materials can all be useful when they match real school needs."
      },
      {
        question: "Are views guaranteed?",
        answer:
          "No. BricklabClips can align scope and reporting before launch, but does not guarantee views or engagement."
      }
    ]
  },
  forms: {
    sponsorInterestOptions: ["cash", "in-kind parts", "prizes", "shipping", "other"],
    titleIOptions: ["yes", "no", "unsure"],
    programTypes: ["class", "robotics team", "club", "library", "afterschool", "other"],
    yesNoUnsureOptions: ["yes", "no", "unsure"],
    permissionOptions: ["yes", "no", "ask later"]
  },
  trust: {
    projectStatus:
      "BricklabClips is currently a creator-led STEM access project, not a 501(c)(3) nonprofit. Sponsorships and public contributions are not tax-deductible charitable donations unless processed through a qualified nonprofit or fiscal sponsor. BricklabClips funds approved school requests by purchasing and shipping materials directly.",
    legoDisclaimer:
      "BricklabClips is an independent STEM access project and is not sponsored, authorized, or endorsed by the LEGO Group. LEGO® is a trademark of the LEGO Group."
  },
  footer: {
    links: [
      { label: "Library", href: "/library" },
      { label: "About Us", href: "/about" },
      { label: "Sponsor", href: "/sponsor" },
      { label: "Get Involved", href: "/get-involved" },
      { label: "LEGO Fair Play Policy", href: "https://www.lego.com/en-us/legal/notices-and-policies/fair-play" }
    ]
  }
} as const;
