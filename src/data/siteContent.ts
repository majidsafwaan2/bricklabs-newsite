export type GuideStatus = "published" | "draft" | "coming-soon";

export type LibraryGuide = {
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  estimatedCost: string;
  materials: string[];
  alternatives: string[];
  concepts: string[];
  description: string;
  videoUrl: string;
  status: GuideStatus;
};

export const siteContent = {
  brand: {
    name: "BrickLabClips",
    shortDescription:
      "Build ideas, school materials, and student creations from the BricklabClips community.",
    logoPath: "/images/bricklabs-logo.jpg",
    tiktokUrl: "https://www.tiktok.com/",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bricklabclips.org"
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Build Challenge", href: "/hackathon" },
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
    { label: "Parts given to schools", value: "0" },
    { label: "Schools supported", value: "0" },
    { label: "Materials funded", value: "$0" },
    { label: "Students reached", value: "0" },
    { label: "Build guides live", value: "0" },
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
  library: {
    categories: [
      "Cardboard builds",
      "Household engineering",
      "Brick-compatible mechanisms",
      "Robotics/electronics",
      "Coding/game projects",
      "Classroom challenges"
    ],
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    guides: [
      {
        title: "Cardboard Arcade Button",
        category: "Cardboard builds",
        difficulty: "Beginner",
        estimatedTime: "30-45 min",
        estimatedCost: "$0-$5",
        materials: ["Cardboard", "Foil", "Tape", "Paper clips", "Optional microcontroller"],
        alternatives: ["Use cereal boxes instead of craft cardboard", "Use binder clips instead of paper clips"],
        concepts: ["Circuits", "Inputs", "Prototyping"],
        description:
          "Build a large pressable button that can demonstrate switches or connect to a simple classroom game controller.",
        videoUrl: "",
        status: "draft"
      },
      {
        title: "Rubber Band Car",
        category: "Household engineering",
        difficulty: "Beginner",
        estimatedTime: "45-60 min",
        estimatedCost: "$2-$8",
        materials: ["Cardboard base", "Rubber bands", "Skewers", "Bottle caps or wheels", "Straws"],
        alternatives: ["Use recycled lids for wheels", "Use pencils for axles"],
        concepts: ["Stored energy", "Friction", "Iteration"],
        description: "Create a simple vehicle powered by a rubber band, then tune wheel size and axle friction.",
        videoUrl: "",
        status: "draft"
      },
      {
        title: "Pulley Elevator",
        category: "Classroom challenges",
        difficulty: "Beginner",
        estimatedTime: "45-75 min",
        estimatedCost: "$3-$10",
        materials: ["String", "Small box", "Pencils or dowels", "Tape", "Weights"],
        alternatives: ["Use paper cups as the elevator car", "Use binder rings as pulley wheels"],
        concepts: ["Simple machines", "Mechanical advantage", "Load testing"],
        description: "Lift a small platform using a simple pulley system and compare single-pulley and multi-pulley designs.",
        videoUrl: "",
        status: "coming-soon"
      },
      {
        title: "Gear Ratio Demo",
        category: "Brick-compatible mechanisms",
        difficulty: "Intermediate",
        estimatedTime: "45-60 min",
        estimatedCost: "$0-$15",
        materials: ["Brick-compatible gears", "Axles", "Base plate or cardboard frame", "Handle"],
        alternatives: ["Use printed paper gear templates", "Use bottle caps with hand-cut teeth for a rough demo"],
        concepts: ["Gear ratios", "Torque", "Speed"],
        description: "Compare how gear size changes speed and torque using a compact hand-crank demonstration.",
        videoUrl: "",
        status: "coming-soon"
      },
      {
        title: "Marble Run Challenge",
        category: "Classroom challenges",
        difficulty: "Beginner",
        estimatedTime: "45-90 min",
        estimatedCost: "$0-$10",
        materials: ["Cardboard tubes", "Tape", "Marbles", "Paper cups", "Recycled packaging"],
        alternatives: ["Use paper strips as rails", "Use rolled newspaper for supports"],
        concepts: ["Gravity", "Energy transfer", "Testing constraints"],
        description: "Design a marble run that slows, turns, and lands consistently within a target zone.",
        videoUrl: "",
        status: "draft"
      },
      {
        title: "Paper Bridge Challenge",
        category: "Household engineering",
        difficulty: "Beginner",
        estimatedTime: "30-50 min",
        estimatedCost: "$0-$3",
        materials: ["Printer paper", "Tape", "Books", "Coins or washers"],
        alternatives: ["Use newspaper", "Use index cards"],
        concepts: ["Structures", "Compression", "Load distribution"],
        description: "Build bridges from paper and test how folds, arches, and trusses change strength.",
        videoUrl: "",
        status: "draft"
      },
      {
        title: "Scratch Arcade Game",
        category: "Coding/game projects",
        difficulty: "Beginner",
        estimatedTime: "60-90 min",
        estimatedCost: "$0",
        materials: ["Computer or tablet", "Scratch account optional", "Design worksheet"],
        alternatives: ["Use offline Scratch", "Use MakeCode Arcade if available"],
        concepts: ["Loops", "Events", "Variables"],
        description: "Create a small score-based game that can pair with a physical cardboard controller.",
        videoUrl: "",
        status: "coming-soon"
      },
      {
        title: "Chain Reaction Machine",
        category: "Household engineering",
        difficulty: "Intermediate",
        estimatedTime: "60-120 min",
        estimatedCost: "$0-$10",
        materials: ["Domino-like objects", "Cardboard ramps", "String", "Cups", "Balls"],
        alternatives: ["Use books, blocks, or recycled containers", "Use paper ramps"],
        concepts: ["Cause and effect", "Energy transfer", "Systems thinking"],
        description: "Create a sequence of at least five linked actions that completes a useful or funny final task.",
        videoUrl: "",
        status: "draft"
      },
      {
        title: "Simple Motorized Fan",
        category: "Robotics/electronics",
        difficulty: "Intermediate",
        estimatedTime: "45-75 min",
        estimatedCost: "$5-$15",
        materials: ["Small DC motor", "AA battery pack", "Switch", "Paper blades", "Tape"],
        alternatives: ["Use a recycled toy motor with adult supervision", "Use cardboard blades instead of plastic"],
        concepts: ["Circuits", "Motors", "Blade design"],
        description: "Safely wire a small motor and compare blade shapes for airflow using lightweight paper blades.",
        videoUrl: "",
        status: "coming-soon"
      },
      {
        title: "Low-Cost Robot Arm",
        category: "Robotics/electronics",
        difficulty: "Advanced",
        estimatedTime: "2-3 hr",
        estimatedCost: "$10-$25",
        materials: ["Cardboard", "String", "Straws", "Brads", "Optional servos", "Tape"],
        alternatives: ["Make a manual string-controlled arm", "Use craft sticks instead of cardboard beams"],
        concepts: ["Linkages", "Degrees of freedom", "Actuation"],
        description: "Prototype a grabber arm with cardboard linkages before adding optional electronic control.",
        videoUrl: "",
        status: "coming-soon"
      }
    ] satisfies LibraryGuide[]
  },
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
      { label: "Build Challenge", href: "/hackathon" },
      { label: "Sponsor", href: "/sponsor" },
      { label: "Get Involved", href: "/get-involved" },
      { label: "LEGO Fair Play Policy", href: "https://www.lego.com/en-us/legal/notices-and-policies/fair-play" }
    ]
  }
} as const;
