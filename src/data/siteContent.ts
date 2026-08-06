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
  homeNewsFeature: {
    videoSrc: "/media/bricklabclips-fox5dc.mp4",
    posterSrc: "/media/bricklabclips-fox5dc-poster.jpg",
    audienceValue: "750,000+",
    audienceLabel: "Live Viewers Across the Nation",
    description:
      "Founder Safwaan Majid joined FOX 5 DC live on air to share BrickLabClips' mission with viewers nationwide."
  },
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
    email: "majidsafwaan2@gmail.com",
    impactStats: [
      { value: "20,000+", label: "Followers" },
      { value: "118,000", label: "Approx. average views per TikTok video" },
      { value: "16M+", label: "Monthly viewers" },
      { value: "$2,000", label: "Committed to school STEM programs" },
      { value: "2", label: "Nearby middle schools previously supported" }
    ],
    schoolsInFocus: [
      "Belmont Ridge Middle School",
      "Watson Mountain Middle School",
      "Heritage High School",
      "Additional Virginia schools with demonstrated needs for STEM equipment and materials"
    ],
    fundsStatement:
      "100% of sponsorship proceeds received by BrickLabClips, excluding unavoidable payment-processing fees, will be allocated toward equipment, materials, and program support for participating school STEM programs.",
    tiers: [
      {
        name: "Community Sponsor",
        price: "$250",
        description: "Help provide useful building materials and classroom supplies for students.",
        benefits: [
          "Company name and linked logo on the BrickLabClips sponsorship page for one month",
          "Recognition in one BrickLabClips TikTok video caption and end card",
          "Thank-you acknowledgment in a sponsorship impact update",
          "Confirmation of the school program toward which the funding was allocated"
        ],
        buttonLabel: "Become a Community Sponsor",
        emailSubject: "BrickLabClips Community Sponsor Inquiry"
      },
      {
        name: "STEM Partner",
        price: "$500",
        description:
          "Support a larger equipment or materials need while receiving extended sponsor recognition.",
        benefits: [
          "Company name and linked logo on the sponsorship page for three months",
          "Sponsor recognition in eligible BrickLabClips TikTok content reaching at least 500,000 cumulative views",
          "Recognition in relevant school-funding and impact updates",
          "Brief post-campaign summary explaining how the sponsorship was used"
        ],
        buttonLabel: "Become a STEM Partner",
        emailSubject: "BrickLabClips STEM Partner Inquiry",
        recommended: true
      },
      {
        name: "Engineering Impact Partner",
        price: "$1,000",
        description:
          "Make a larger contribution toward hands-on STEM equipment and student engineering opportunities.",
        benefits: [
          "Featured company name, linked logo, and priority placement on the sponsorship page for six months",
          "Sponsor recognition across eligible BrickLabClips TikTok videos reaching at least 1 million cumulative views",
          "Recognition in major BrickLabClips school-funding announcements",
          "Detailed impact summary describing how the funds supported participating school programs"
        ],
        buttonLabel: "Become an Engineering Impact Partner",
        emailSubject: "BrickLabClips Engineering Impact Partner Inquiry"
      }
    ],
    customSupport:
      "Every contribution helps. Companies may also contact BrickLabClips about a smaller contribution, a custom sponsorship amount, an in-kind equipment donation, or a partnership structured around a specific school need.",
    details: [
      {
        title: "Cumulative View Commitments",
        body:
          "Cumulative-view commitments are fulfilled across eligible BrickLabClips TikTok videos posted during the sponsorship period. If the applicable view target is not reached within 90 days, sponsor recognition will continue on additional eligible videos until the committed cumulative view total is reached."
      },
      {
        title: "Measurement",
        body:
          "View totals are based on TikTok's publicly displayed view counts and available account analytics. Sponsorship commitments apply to cumulative views and sponsor placement. They do not guarantee clicks, leads, sales, conversions, or other business outcomes."
      },
      {
        title: "Disclosure",
        body:
          "Sponsored content will be clearly disclosed in accordance with applicable platform and advertising requirements."
      },
      {
        title: "Content and School Approval",
        body:
          "Student photographs, school names, testimonials, or school-specific materials will only be used when the appropriate permission has been received."
      },
      {
        title: "Final Scope",
        body:
          "BrickLabClips and the sponsor will confirm the recognition format, timing, branding materials, and intended school impact before the sponsorship begins."
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
