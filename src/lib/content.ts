export type Photo = {
  src: string;
  alt: string;
  caption: string;
  /** object-position when the photo is cropped into a card */
  pos?: string;
};

export type Spec = { k: string; v: string };

export type Section = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  body?: string[];
  specs?: Spec[];
  photos: Photo[];
};

export const PROFILE = {
  name: "Max Bellotti",
  role: "Mechanical Engineering · Aerospace Focus",
  school: "Oregon State University Honors College",
  grad: "B.S. expected June 2028",
  email: ["maxbellotti29", "gmail.com"] as const,
  linkedin: "https://www.linkedin.com/in/max-bellotti-719903284/",
  linkedinLabel: "linkedin.com/in/max-bellotti",
  summary:
    "My work sits where design meets the shop floor: I model parts in Siemens NX, produce the drawings, then cut the parts myself on a manual lathe and mill.",
};

export const HERO_STATS: { v: string; k: string; suffix?: string }[] = [
  { v: "1", k: "FSAE Michigan 2026", suffix: "ST OVERALL" },
  { v: "3", k: "Machine shop quals" },
  { v: "7", k: "Engineering domains" },
  { v: "15", k: "Pinsetter downtime", suffix: "% ↓" },
];

export const SECTIONS: Section[] = [
  {
    id: "fsae",
    index: "01",
    kicker: "Formula SAE",
    title: "Suspension Manufacturing",
    lede: "Global Formula Racing runs a joint programme between DHBW Ravensburg and Oregon State University. I produce outboard suspension hardware in aluminium and steel — machined to the suspension group's drawings and checked against print before release to assembly.",
    body: [
      "Tie rods, uprights and clevises, cut on manual machines and inspected against the print rather than trusted to a CAM toolpath.",
      "On the design side I modelled a retaining plate in Siemens NX that ties the accumulator to the chassis geometry, validated it with 3D-printed prototypes before committing to metal, and produced the ASME Y14.5 drawings used in the suspension outboard cost report.",
      "In 2026 the car took the overall win at Formula SAE Michigan. I travelled with the team and worked the event — tech inspection, paddock turnaround and grid.",
    ],
    specs: [
      { k: "Programme", v: "DHBW Ravensburg / Oregon State" },
      { k: "Role", v: "Manufacturing group" },
      { k: "Materials", v: "Aluminium, steel, carbon fibre" },
      { k: "Drawing standard", v: "ASME Y14.5" },
      { k: "Michigan 2026", v: "1st overall" },
    ],
    photos: [
      {
        src: "/img/fsae/suspension-brackets.jpg",
        alt: "Machined aluminium rocker and clevis brackets with a spherical rod end and carbon-fibre tie rod, hand-labelled left and right before assembly.",
        caption:
          "Machined aluminium rocker and clevis brackets with a spherical rod end and carbon-fibre tie rod, hand-labelled left / right before assembly.",
      },
      {
        src: "/img/fsae/tie-rods.jpg",
        alt: "Turned steel tie-rod shafts with threaded ends, cut on the manual lathe and matched as a pair.",
        caption:
          "Turned steel tie-rod shafts with threaded ends, cut on the manual lathe and matched as a pair.",
      },
      {
        src: "/img/fsae/bracket-run.jpg",
        alt: "A production run of machined brackets in a bin, ready for inspection.",
        caption: "A production run of machined brackets ready for inspection.",
      },
      {
        src: "/img/fsae/trial-fit.jpg",
        alt: "Trial fit of a machined bracket against the installed pushrod and damper on the car.",
        caption: "Trial fit of a bracket against the installed pushrod and damper.",
      },
      {
        src: "/img/fsae/grid-walk.jpg",
        alt: "The team walking the car up to grid at Michigan International Speedway in the rain.",
        caption: "Walking the car up to grid at Michigan International Speedway.",
      },
      {
        src: "/img/fsae/tech-inspection.jpg",
        alt: "The car under the team tent during tech inspection at Formula SAE Michigan.",
        caption: "Tech inspection under the team tent.",
      },
      {
        src: "/img/fsae/front-wing.jpg",
        alt: "Front wing and endplate detail, with the outboard suspension visible behind it.",
        caption:
          "Front wing and endplate detail, with the outboard suspension behind it.",
      },
      {
        src: "/img/fsae/autocross.jpg",
        alt: "The car on course between the cones during the autocross event.",
        caption: "Autocross — the car on course between the cones.",
      },
    ],
  },
  {
    id: "shop",
    index: "02",
    kicker: "Fabrication",
    title: "Machine Shop",
    lede: "I am qualified on the lathe, mill and power tools through the OSU College of Engineering Innovation Labs. Most of the hardware in this portfolio was cut on manual machines, working from a print with a DRO, edge finder and dial indicator rather than a CAM toolpath.",
    body: [
      "Every qualification below required cutting a part to print and having it measured and signed off by an instructor before the machine was released to me.",
    ],
    specs: [
      { k: "Lathe qual", v: "11 Mar 2026 — knurled handle, turned + bored collar" },
      { k: "Mill qual", v: "10 Mar 2026 — angled cut, stepped block, slotted block" },
      { k: "Power tools qual", v: "6 Feb 2026 — cut and drilled steel plate" },
      { k: "Method", v: "DRO, edge finder, dial indicator" },
      { k: "Tightest called-out dim", v: "0.5282 in" },
    ],
    photos: [
      {
        src: "/img/shop/lathe-facing.jpg",
        alt: "Advancing the carriage on a facing pass at the manual lathe.",
        caption: "Advancing the carriage on a facing pass.",
      },
      {
        src: "/img/shop/lathe-compound.jpg",
        alt: "Setting the compound and tool post with the tailstock centre engaged.",
        caption: "Setting the compound and tool post, tailstock centre engaged.",
      },
      {
        src: "/img/shop/bushings.jpg",
        alt: "A run of turned and bored steel bushings, drilled through and faced to length.",
        caption:
          "A run of turned and bored steel bushings, drilled through and faced to length.",
      },
      {
        src: "/img/shop/milled-part-5282.jpg",
        alt: "A milled and tapped part held against a hand-written dimension of 0.5282 inches.",
        caption:
          "A milled and tapped part checked against a hand-written dimension of .5282 in.",
      },
      {
        src: "/img/shop/lathe-dro.jpg",
        alt: "The Sharp manual lathe set up with the DRO live and boring bars racked behind.",
        caption:
          "The Sharp manual lathe set up with the DRO live and boring bars racked behind.",
      },
      {
        src: "/img/shop/mill-drilling.jpg",
        alt: "Drilling a clamped aluminium plate in the mill vise, chips clearing from the flutes.",
        caption:
          "Drilling a clamped aluminium plate in the mill vise, chips clearing from the flutes.",
      },
      {
        src: "/img/shop/mill-setup.jpg",
        alt: "A 5/16 inch setup on a steel block held in the vise, indicated true before the cut.",
        caption:
          "A 5/16 in setup on a steel block held in the vise, indicated true before the cut.",
      },
      {
        src: "/img/shop/hardpoint-blanks.jpg",
        alt: "Aluminium hardpoint blanks for the chassis, sawn and faced to size and stacked.",
        caption:
          "Aluminium hardpoint blanks for the chassis, sawn and faced to size and stacked for the next operation.",
      },
      {
        src: "/img/shop/qual-lathe.jpg",
        alt: "Signed iLabs lathe qualification sheet with a knurled handle and a turned, bored collar.",
        caption: "Lathe qual, 11 Mar 2026 — a knurled handle and a turned, bored collar.",
      },
      {
        src: "/img/shop/qual-mill.jpg",
        alt: "Signed iLabs mill qualification sheet with an angled cut, a stepped block and a slotted block.",
        caption:
          "Mill qual, 10 Mar 2026 — an angled cut, a stepped block and a slotted block.",
      },
      {
        src: "/img/shop/qual-powertools.jpg",
        alt: "Signed iLabs power tools qualification sheet with a cut and drilled steel plate.",
        caption: "Power tools qual, 6 Feb 2026 — a cut and drilled steel plate.",
      },
    ],
  },
  {
    id: "cad",
    index: "03",
    kicker: "Drafting",
    title: "CAD & Technical Drawings",
    lede: "Drawings are the deliverable that lets somebody else make the part. I work in Siemens NX and produce fully dimensioned detail drawings with section and detail views, thread callouts and assembly BOMs.",
    specs: [
      { k: "Primary CAD", v: "Siemens NX" },
      { k: "Also", v: "Onshape, COMSOL, Blender" },
      { k: "Sheet", v: "A-size border, Siemens title block" },
      { k: "Views", v: "4 orthographic + section B-B + detail A 1:1" },
      { k: "Units", v: "Inches" },
    ],
    photos: [
      {
        src: "/img/cad/nx-drawing-sheet.jpg",
        alt: "A full Siemens NX drawing sheet with title block: four orthographic views, a section B-B, a shaded isometric and a detail A at 1:1, dimensioned in inches on an A-size border.",
        caption:
          "A full NX drawing sheet with title block: four orthographic views, a section B-B, a shaded isometric and a detail A at 1:1, dimensioned in inches on an A-size border.",
      },
      {
        src: "/img/cad/threaded-bushing.jpg",
        alt: "Threaded bushing drawing: front view, full section A-A with the M4 by 0.7 thread, side view and isometric.",
        caption:
          "Threaded bushing: front view, full section A-A with the M4 x 0.7 thread, side view and isometric.",
      },
      {
        src: "/img/cad/exploded-assembly.jpg",
        alt: "Exploded assembly drawing with ballooned part numbers and a quantity table.",
        caption: "Exploded assembly with ballooned part numbers and a quantity table.",
      },
      {
        src: "/img/cad/bearing-housing.jpg",
        alt: "Siemens NX solid model of a split bearing housing with the bolt bosses and bores modelled.",
        caption:
          "NX solid of a split bearing housing with the bolt bosses and bores modelled.",
      },
    ],
  },
  {
    id: "precision",
    index: "04",
    kicker: "Precision Manufacturing",
    title: "Product Design in NX",
    lede: "Bellotti's Precision Manufacturing is my own venture: a machined hex aluminium case that holds a glass decant vial, with a twist mechanism that raises the vial and a self-indexing cap.",
    body: [
      "Every part was modelled in Siemens NX from a skeleton sketch, so the body, vial holder and cap all update together when a dimension changes.",
      "The case went through printed iterations before any metal was cut. Each revision was printed, fitted against a real decant vial and a real bottle, then corrected in CAD.",
    ],
    specs: [
      { k: "Venture", v: "Bellotti's Precision Manufacturing" },
      { k: "Founded", v: "Feb 2026" },
      { k: "Assembly", v: "Top-down, SKELETON-driven" },
      { k: "Constraints", v: "3 (skeleton → vial, body)" },
      { k: "Mechanism", v: "Bayonet: lift, turn, locking detent" },
      { k: "Prototyping", v: "FDM, OrcaSlicer / Bambu Studio" },
    ],
    photos: [
      {
        src: "/img/precision/case-drawing.jpg",
        alt: "Drawing sheet for the case body and cap, shown in orthographic and section.",
        caption: "Drawing sheet for the case body and cap, shown in orthographic and section.",
      },
      {
        src: "/img/precision/nx-skeleton.jpg",
        alt: "Top-down assembly in Siemens NX: a SKELETON part drives the VIAL and BODY through three constraints.",
        caption:
          "Top-down assembly in NX: a SKELETON part drives the VIAL and BODY through three constraints.",
      },
      {
        src: "/img/precision/blender-frame.jpg",
        alt: "Frame from a Blender animation explaining the pin-in-slot travel of the mechanism.",
        caption: "Frame from a Blender animation explaining the pin-in-slot travel.",
      },
      {
        src: "/img/precision/hex-body.jpg",
        alt: "The hex outer body, shelled with recessed flats on each face.",
        caption: "The hex outer body, shelled with recessed flats on each face.",
      },
      {
        src: "/img/precision/bayonet-slot.jpg",
        alt: "The bayonet slot that indexes the cap: a lift, a turn and a locking detent.",
        caption: "The bayonet slot that indexes the cap: a lift, a turn and a locking detent.",
      },
      {
        src: "/img/precision/vial-holder.jpg",
        alt: "The tapered vial holder that the mechanism drives up through the body.",
        caption: "The tapered vial holder that the mechanism drives up through the body.",
      },
      {
        src: "/img/precision/print-iterations.jpg",
        alt: "Printed case body with cap iterations in red and black beside it.",
        caption: "Printed case body with cap iterations in red and black beside it.",
      },
      {
        src: "/img/precision/cap-trial-fit.jpg",
        alt: "A printed cap trial-fitted to a production bottle to check the indexing.",
        caption: "A printed cap trial-fitted to a production bottle to check the indexing.",
      },
      {
        src: "/img/precision/vials-envelope.jpg",
        alt: "The case beside the decant vials it was designed around, the size envelope that set every internal dimension.",
        caption:
          "The case beside the decant vials it was designed around — the size envelope that set every internal dimension, and the reason the body wall ended up as thin as it did.",
      },
    ],
  },
  {
    id: "navier",
    index: "05",
    kicker: "Industry",
    title: "Navier: Electric Hydrofoil",
    lede: "Navier builds the N30, a 30 ft electric hydrofoiling boat. Over two summers I worked on the development vessel: temperature and flow rig testing for the HVAC system, inventory and part flow through MRPeasy, and on-the-water troubleshooting of the lift-lock foiling system.",
    body: [
      "Alongside the rig testing I did CAD and fabrication work around the boat, and spent time on the water with it.",
      "I also ran a cost–benefit analysis in Excel for scaling operations to international markets, and engineered a plywood-constructed cart capable of loads up to 200 lbs.",
    ],
    specs: [
      { k: "Vessel", v: "N30 — 30 ft electric hydrofoil" },
      { k: "Term", v: "Jun 2023 – Sep 2024" },
      { k: "Rig testing", v: "HVAC temperature + fluid flow" },
      { k: "Systems", v: "Lift-lock foiling, on-water troubleshooting" },
      { k: "Inventory", v: "MRPeasy part tracking" },
      { k: "CAD", v: "Onshape" },
    ],
    photos: [
      {
        src: "/img/navier/n30-foiling.jpg",
        alt: "The Navier N30 up on its foils on Lake Tahoe, hull fully clear of the water.",
        caption: "The N30 up on its foils on Lake Tahoe, hull fully clear of the water.",
      },
      {
        src: "/img/navier/build-floor.jpg",
        alt: "The Navier build floor, looking down onto the boats in work.",
        caption: "The build floor, looking down onto the boats in work.",
      },
      {
        src: "/img/navier/trailer.jpg",
        alt: "The development vessel on its trailer with both drive units raised.",
        caption: "The development vessel on its trailer with both drive units raised.",
      },
      {
        src: "/img/navier/onshape-bench.jpg",
        alt: "An Onshape model open on the bench next to the formed stainless part it describes.",
        caption:
          "An Onshape model open on the bench next to the formed stainless part it describes.",
      },
      {
        src: "/img/navier/foil-strut.jpg",
        alt: "The carbon foil strut and pod, with the stainless fairing plate bolted to the leading edge.",
        caption:
          "The carbon foil strut and pod, with the stainless fairing plate bolted to the leading edge.",
      },
      {
        src: "/img/navier/coasters.jpg",
        alt: "Navier company coasters modelled in Onshape and 3D printed, given to Navier's first customer.",
        caption:
          "Company coasters I modelled in Onshape and printed — given to Navier's first customer.",
      },
      {
        src: "/img/navier/helm.jpg",
        alt: "At the helm of the N30 during an evening test on the water.",
        caption: "At the helm of the N30 during an evening test.",
      },
    ],
  },
  {
    id: "wirz",
    index: "06",
    kicker: "Research",
    title: "Wirz Aerospace Lab",
    lede: "In the Wirz Aerospace Lab I support simulation of Hall effect ion thrusters. My role is to take the physical plasma and vacuum chambers on campus, turn them into clean CAD, and prepare that geometry so it can be imported into COMSOL Multiphysics without breaking the mesh.",
    body: [
      "Imported STEP geometry is rarely simulation-ready. Each chamber is measured, checked for sealed cavities and mating references, then the interior plasma volume is extracted as its own solid so COMSOL has a fluid domain to solve in.",
      "Not all of the lab work is simulation. Chambers need structure to sit in and parts that wear out need replacing, and both jobs start with measuring what is already there.",
    ],
    photos: [
      {
        src: "/img/wirz/plasma-discharge.jpg",
        alt: "A plasma discharge running inside one of the lab's vacuum chambers, between the Helmholtz coils on the optical breadboard.",
        caption:
          "A plasma discharge running inside one of the lab's vacuum chambers, between the Helmholtz coils on the optical breadboard. Photographed through the chamber viewport during a test run.",
      },
      {
        src: "/img/wirz/lab-layout-nx.jpg",
        alt: "Siemens NX model of the lab building with the vacuum chambers, pump carts and control room placed to scale.",
        caption:
          "Siemens NX model of the lab building with the vacuum chambers, pump carts and control room placed to scale — used for layout planning before the equipment was moved in.",
      },
      {
        src: "/img/wirz/frame-8020.jpg",
        alt: "Building the 80/20 extrusion frame that carries two vacuum chambers, the V-braced lower frame going together on castors.",
        caption:
          "Building the frame that carries two vacuum chambers, from 80/20 extrusion — the V-braced lower frame going together on castors.",
      },
      {
        src: "/img/wirz/frame-gussets.jpg",
        alt: "The same 80/20 frame with the gusset plates fitted and the corner brackets torqued down.",
        caption: "The same frame with the gusset plates fitted and the corner brackets torqued down.",
      },
      {
        src: "/img/wirz/chamber-handle.jpg",
        alt: "A vacuum chamber handle, measured and rebuilt in CAD to produce a replacement.",
        caption:
          "A vacuum chamber handle. The original had no drawing, so I measured it and rebuilt it in CAD to produce a replacement.",
      },
      {
        src: "/img/wirz/handle-slicer.jpg",
        alt: "The handle model sliced for printing at 0.15 mm layers with an aligned seam.",
        caption:
          "The handle model sliced for printing — 0.15 mm layers, aligned seam, single wall on top surfaces.",
      },
      {
        src: "/img/wirz/geom-fourview.jpg",
        alt: "Four-view geometry check of the Diener chamber subsection as delivered.",
        caption: "Four-view check of the Diener chamber subsection as delivered.",
      },
      {
        src: "/img/wirz/geom-fluid-domain.jpg",
        alt: "The extracted plasma and vacuum domain, capped and solid, ready for COMSOL.",
        caption: "The extracted plasma / vacuum domain, capped and solid.",
      },
    ],
  },
  {
    id: "maintenance",
    index: "07",
    kicker: "Maintenance",
    title: "AMC-8270 Pinsetters",
    lede: "For a year I maintained the AMC-8270 pinsetters at the Oregon State Memorial Union. A pinsetter is a linkage problem in constant motion: a sweep bar, a spotting table on springs, ten independent pin grippers and a ball lift, all cycling every few seconds with customers waiting on the lane.",
    body: [
      "Most faults were mechanical rather than electrical — a stretched belt, a worn link, a gripper out of adjustment. Learning to watch the machine cycle and identify which linkage was late is the same skill as reading a mechanism in CAD, only faster and louder.",
    ],
    specs: [
      { k: "Machine", v: "AMC-8270 pinsetter" },
      { k: "Term", v: "Nov 2024 – Oct 2025" },
      { k: "Mechanical downtime", v: "Reduced 15%" },
      { k: "Also", v: "Trained new staff in troubleshooting + lockout/tagout" },
      { k: "Constraint", v: "Fixed changeover window, lanes booked either side" },
    ],
    photos: [
      {
        src: "/img/maintenance/pinsetter-interior.jpg",
        alt: "Inside the pinsetter: the spotting table lowered over the pin deck, with the gripper springs and bell-crank linkages that set each pin.",
        caption:
          "Inside the pinsetter: the spotting table lowered over the pin deck, with the gripper springs and bell-crank linkages that set each pin.",
      },
      {
        src: "/img/maintenance/sweep-bar.jpg",
        alt: "The sweep bar and pin deck at rest between cycles.",
        caption: "The sweep bar and pin deck at rest between cycles.",
      },
    ],
  },
];

export const COURSEWORK: Photo[] = [
  {
    src: "/img/course/dynamics.jpg",
    alt: "Hand-worked dynamics midterm, ENGR 217.",
    caption: "Dynamics midterm — ENGR 217",
  },
  {
    src: "/img/course/ph315.jpg",
    alt: "PH 315 final project write-up.",
    caption: "Final project — PH 315",
  },
  {
    src: "/img/course/aerolab.jpg",
    alt: "Aerodynamics lab report.",
    caption: "Aerodynamics lab report",
  },
  {
    src: "/img/course/bpm.jpg",
    alt: "Week one engineering plan for the BPM project.",
    caption: "Engineering plan — BPM week 1",
  },
  {
    src: "/img/course/circuits.jpg",
    alt: "Circuits lab bench with an ADALM2000 active learning module wired to a breadboard.",
    caption: "Circuits lab — ADALM2000 bench",
  },
];

export const COURSES = [
  "Dynamics",
  "Strength of Materials",
  "Materials Science",
  "Physics — Quantum",
  "Physics — E & M",
  "Coarse-Grained Models",
  "Electric Fundamentals",
  "Linear Algebra",
  "3D Modeling",
];

export type Tier = "primary" | "working" | "certified";

/**
 * Tiers, not scores. "Certified" means a signed iLabs qualification exists;
 * "primary" is a tool used on the work in this portfolio; "working" is real
 * project use without the same depth.
 */
export const TIER_LABEL: Record<Tier, string> = {
  primary: "Primary",
  working: "Working",
  certified: "Certified",
};

export const TIER_FILL: Record<Tier, number> = {
  primary: 100,
  certified: 100,
  working: 62,
};

export const SKILLS: { group: string; items: { name: string; tier: Tier; note?: string }[] }[] = [
  {
    group: "CAD & Simulation",
    items: [
      { name: "Siemens NX", tier: "primary" },
      { name: "Onshape", tier: "primary" },
      { name: "COMSOL Multiphysics", tier: "working" },
      { name: "Blender", tier: "working" },
    ],
  },
  {
    group: "Manufacturing",
    items: [
      { name: "Manual lathe", tier: "certified", note: "iLabs qual · 11 Mar 2026" },
      { name: "Manual mill", tier: "certified", note: "iLabs qual · 10 Mar 2026" },
      { name: "Power tools", tier: "certified", note: "iLabs qual · 6 Feb 2026" },
      { name: "Sandblasting & polishing", tier: "working" },
      { name: "Composite layup, ply cutting", tier: "working" },
    ],
  },
  {
    group: "Drafting & Additive",
    items: [
      { name: "ASME Y14.5 GD&T", tier: "primary" },
      { name: "Detail & assembly drawings, BOMs", tier: "primary" },
      { name: "OrcaSlicer / Bambu Studio", tier: "primary" },
      { name: "FDM prototyping", tier: "primary" },
    ],
  },
];

export type Role = {
  org: string;
  title: string;
  place: string;
  when: string;
  current?: boolean;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    org: "Global Formula Racing — FSAE",
    title: "Manufacturing group",
    place: "Corvallis, OR",
    when: "Sep 2025 — present",
    current: true,
    points: [
      "Manufactured suspension tie rods, uprights and clevises",
      "Designed a retaining plate in NX between the accumulator and chassis geometry; validated through 3D-print prototyping",
      "Created ASME Y14.5 drawings for the suspension outboard cost report",
      "Assisted at GFR's FSAE Michigan win in 2026",
      "Next year: steering + autonomous integration, aero CFD and front element exploration",
    ],
  },
  {
    org: "Wirz Aerospace Lab",
    title: "Research assistant",
    place: "Oregon State University",
    when: "Apr 2026 — present",
    current: true,
    points: [
      "Simulation of Hall effect ion thrusters through COMSOL Multiphysics",
      "Turning physical plasma chambers on campus into CAD models fit to import to COMSOL",
      "Readings on vacuum generation, plasma generation, gridded ion thrusters and Hall effect thrusters",
    ],
  },
  {
    org: "Bellotti's Precision Manufacturing",
    title: "Founder",
    place: "Alameda, CA",
    when: "Feb 2026 — present",
    current: true,
    points: [
      "Designed, 3D printed and machined cologne decant cases for the SF niche cologne community",
      "Top-down NX assembly driven by a skeleton part; bayonet cap mechanism",
    ],
  },
  {
    org: "Giga Energy",
    title: "Inventory management",
    place: "Long Beach, CA",
    when: "Aug 2025 — Sep 2025",
    points: ["Built a ground-up inventory management system for a throughput warehouse using MRPeasy"],
  },
  {
    org: "Sausalito Boat Rentals",
    title: "Mechanic and dock hand",
    place: "Sausalito, CA",
    when: "Jun 2025 — Sep 2025",
    points: [
      "Managed 30+ rentals per week, incoming business calls, trained new hires and provided on-site guidance to customers",
    ],
  },
  {
    org: "OSU Memorial Union",
    title: "Bowling mechanic",
    place: "Corvallis, OR",
    when: "Nov 2024 — Oct 2025",
    points: [
      "Reduced mechanical failure downtime on AMC-8270 bowling systems by 15%",
      "Trained new staff members in mechanical troubleshooting and safety procedures",
    ],
  },
  {
    org: "Navier",
    title: "Engineering intern",
    place: "Alameda, CA",
    when: "Jun 2023 — Sep 2024",
    points: [
      "Assisted with temperature and fluid flow rig testing for the N30 HVAC system",
      "On-the-water troubleshooting of N30 lift-lock foiling systems",
      "Engineered a plywood-constructed cart capable of loads up to 200 lbs",
      "Cost–benefit analysis in Excel for scaling operations to international markets",
      "MRPeasy inventory management, ensuring organized part tracking and material flow",
    ],
  },
];

export const SOFTWARE = {
  name: "The Forsaken Path",
  tag: "A dungeon-crawler ARPG for Roblox — cooldown-based combat, affix-driven loot.",
  stack: ["Luau", "Rojo", "Lune", "Blender (headless)"],
  pillars: [
    {
      k: "Server-authoritative, always",
      v: "The client sends intent, never results. Dungeon games are the most-exploited genre on Roblox; retrofitting trust boundaries later is a rewrite.",
    },
    {
      k: "Loot is the retention loop",
      v: "Item level gates affix tiers, rarity gates affix count — so a high-ilvl Rare beats a low-ilvl Legendary and the whole level ladder stays relevant.",
    },
    {
      k: "Deterministic rolls",
      v: "Items persist as (baseId, itemLevel, rarity, seed) and are regenerated on load. Compact storage, safe migration, auditable.",
    },
    {
      k: "Filesystem is the source of truth",
      v: "Code lives as .luau and syncs into Studio via Rojo. The .rbxl is a build artifact and is gitignored.",
    },
  ],
  extras: [
    "Offline balance harnesses in Lune for tuning combat maths without opening Studio",
    "Headless Blender scripts that generate game assets, textures and icons from source",
    "Architecture decisions recorded with rationale and rejected alternatives",
  ],
};

export const PERSONAL = [
  { k: "Mile PR", v: "4:16" },
  { k: "Instruments", v: "Guitar, banjo" },
  { k: "Sports instructor", v: "2 years" },
  { k: "Little League umpire", v: "3 years" },
];
