const adminCanvas = document.getElementById("admin-canvas");
if (adminCanvas && window.THREE) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ canvas: adminCanvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const coreGeo = new THREE.DodecahedronGeometry(1.35, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x9b7bff,
    metalness: 0.55,
    roughness: 0.22,
    emissive: 0x1a1038,
    emissiveIntensity: 0.35,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const haloGeo = new THREE.RingGeometry(2.2, 2.5, 64);
  const haloMat = new THREE.MeshBasicMaterial({ color: 0x6ee7ff, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI / 2;
  group.add(halo);

  const orbitGeo = new THREE.TorusGeometry(2.8, 0.06, 16, 120);
  const orbitMat = new THREE.MeshStandardMaterial({ color: 0x6d8bff, metalness: 0.4, roughness: 0.3 });
  const orbit = new THREE.Mesh(orbitGeo, orbitMat);
  orbit.rotation.x = Math.PI / 2.8;
  group.add(orbit);

  const dots = new THREE.Group();
  const dotGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const dotMat = new THREE.MeshStandardMaterial({ color: 0x6ee7ff, metalness: 0.3, roughness: 0.2 });
  for (let i = 0; i < 36; i += 1) {
    const dot = new THREE.Mesh(dotGeo, dotMat);
    const angle = (i / 36) * Math.PI * 2;
    dot.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 0.4, Math.sin(angle) * 1.2);
    dots.add(dot);
  }
  group.add(dots);

  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  const key = new THREE.PointLight(0x9b7bff, 1.1, 20);
  key.position.set(4, 2, 6);
  const fill = new THREE.PointLight(0x6ee7ff, 0.7, 20);
  fill.position.set(-4, -2, 5);
  scene.add(ambient, key, fill);

  let targetX = 0;
  let targetY = 0;

  const resize = () => {
    const { width, height } = adminCanvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (event) => {
    const { innerWidth, innerHeight } = window;
    targetX = (event.clientX / innerWidth - 0.5) * 0.35;
    targetY = (event.clientY / innerHeight - 0.5) * 0.28;
  });

  const animate = () => {
    if (!prefersReduced) {
      group.rotation.y += 0.004;
      group.rotation.x += 0.002;
      dots.rotation.y += 0.002;
    }
    group.rotation.x += (targetY - group.rotation.x) * 0.02;
    group.rotation.y += (targetX - group.rotation.y) * 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}

const state = {
  admissions: [
    { id: 1, name: "Riya Patel", program: "B.Tech CSE", stage: "Applied", score: 82 },
    { id: 2, name: "Aman Verma", program: "MBA", stage: "Offered", score: 88 },
  ],
  students: [
    { id: 1, name: "Priya Sharma", roll: "CSE-101", dept: "CSE", status: "Active" },
    { id: 2, name: "Dev Malhotra", roll: "ME-204", dept: "ME", status: "Active" },
  ],
  courses: [
    { id: 1, code: "CSE301", name: "Data Structures", credits: 3, faculty: "Dr. Rao", sem: "5", cert: "Data Structures Certificate" },
  ],
  attendance: [
    { id: 1, className: "CSE A", course: "DSA", present: 86 },
  ],
  exams: [
    { id: 1, exam: "Mid Sem", course: "CSE301", date: "2026-04-02", hall: "H1" },
  ],
  faculty: [
    { id: 1, name: "Dr. Rao", dept: "CSE", load: 14, status: "Active" },
  ],
  fees: [
    { id: 1, student: "Priya Sharma", amount: 45000, due: "2026-04-10", status: "Pending" },
  ],
  hr: [
    { id: 1, name: "Rohit Jain", role: "Accountant", salary: 55000, shift: "Day" },
  ],
  library: [
    { id: 1, title: "Operating Systems", author: "Tanenbaum", copies: 4, status: "Available" },
  ],
  hostel: [
    { id: 1, room: "B-210", student: "Dev Malhotra", capacity: 2, status: "Occupied" },
  ],
  transport: [
    { id: 1, route: "North Loop", vehicle: "Bus 4", driver: "Mahesh", status: "Active" },
  ],
  placements: [
    { id: 1, company: "TCS", role: "Analyst", date: "2026-04-05", status: "Scheduled" },
  ],
  research: [
    { id: 1, project: "AI Lab", pi: "Dr. Iyer", funding: 250000, status: "Active" },
  ],
  facilities: [
    { id: 1, asset: "Generator", location: "Block A", condition: "Good", ticket: "" },
  ],
  inventory: [
    { id: 1, item: "Projectors", qty: 6, store: "Main", status: "In Stock" },
  ],
  procurement: [
    { id: 1, vendor: "Tech Supplies", item: "Laptops", amount: 180000, status: "Requested" },
  ],
  service: [
    { id: 1, requester: "Library", category: "IT", priority: "High", status: "Open" },
  ],
  communications: [
    { id: 1, audience: "Students", channel: "Email", message: "Mid-sem schedule released", date: "2026-03-18" },
  ],
  compliance: [
    { id: 1, title: "Criterion 1 Report", criterion: "Criterion 1", owner: "IQAC", file: "" },
  ],
};

const renderTable = (el, headers, rows) => {
  const thead = `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`;
  el.innerHTML = thead + tbody;
};

const updateAll = () => {
  renderTable(document.getElementById("admission-table"), ["Applicant", "Program", "Stage", "Score"],
    state.admissions.map((a) => [a.name, a.program, a.stage, a.score]));
  renderTable(document.getElementById("student-table"), ["Name", "Roll", "Dept", "Status"],
    state.students.map((s) => [s.name, s.roll, s.dept, s.status]));
  renderTable(document.getElementById("course-table"), ["Code", "Course", "Credits", "Faculty", "Sem", "Certificate"],
    state.courses.map((c) => [c.code, c.name, c.credits, c.faculty, c.sem, c.cert]));
  renderTable(document.getElementById("attendance-table"), ["Class", "Course", "Present %"],
    state.attendance.map((a) => [a.className, a.course, a.present]));
  renderTable(document.getElementById("exam-table"), ["Exam", "Course", "Date", "Hall"],
    state.exams.map((e) => [e.exam, e.course, e.date, e.hall]));
  renderTable(document.getElementById("faculty-table"), ["Name", "Dept", "Load", "Status"],
    state.faculty.map((f) => [f.name, f.dept, f.load, f.status]));
  renderTable(document.getElementById("fee-table"), ["Student", "Amount", "Due", "Status"],
    state.fees.map((f) => [f.student, `₹${f.amount}`, f.due, f.status]));
  renderTable(document.getElementById("hr-table"), ["Name", "Role", "Salary", "Shift"],
    state.hr.map((h) => [h.name, h.role, `₹${h.salary}`, h.shift]));
  renderTable(document.getElementById("library-table"), ["Title", "Author", "Copies", "Status"],
    state.library.map((l) => [l.title, l.author, l.copies, l.status]));
  renderTable(document.getElementById("hostel-table"), ["Room", "Student", "Capacity", "Status"],
    state.hostel.map((h) => [h.room, h.student, h.capacity, h.status]));
  renderTable(document.getElementById("transport-table"), ["Route", "Vehicle", "Driver", "Status"],
    state.transport.map((t) => [t.route, t.vehicle, t.driver, t.status]));
  renderTable(document.getElementById("placement-table"), ["Company", "Role", "Date", "Status"],
    state.placements.map((p) => [p.company, p.role, p.date, p.status]));
  renderTable(document.getElementById("research-table"), ["Project", "PI", "Funding", "Status"],
    state.research.map((r) => [r.project, r.pi, `₹${r.funding}`, r.status]));
  renderTable(document.getElementById("facility-table"), ["Asset", "Location", "Condition", "Ticket"],
    state.facilities.map((f) => [f.asset, f.location, f.condition, f.ticket || "-"]));
  renderTable(document.getElementById("inventory-table"), ["Item", "Qty", "Store", "Status"],
    state.inventory.map((i) => [i.item, i.qty, i.store, i.status]));
  renderTable(document.getElementById("procurement-table"), ["Vendor", "Item", "Amount", "Status"],
    state.procurement.map((p) => [p.vendor, p.item, `₹${p.amount}`, p.status]));
  renderTable(document.getElementById("service-table"), ["Requester", "Category", "Priority", "Status"],
    state.service.map((s) => [s.requester, s.category, s.priority, s.status]));
  renderTable(document.getElementById("comm-table"), ["Audience", "Channel", "Message", "Date"],
    state.communications.map((c) => [c.audience, c.channel, c.message, c.date]));
  renderTable(document.getElementById("compliance-table"), ["Title", "Criterion", "Owner", "File"],
    state.compliance.map((c) => [c.title, c.criterion, c.owner, c.file || "-"]));
};

const byId = (id) => document.getElementById(id);
const add = (list, item) => list.push({ id: Date.now(), ...item });

const actions = {
  "add-admission": () => add(state.admissions, {
    name: byId("admission-name").value || "New Applicant",
    program: byId("admission-program").value,
    stage: byId("admission-stage").value,
    score: Number(byId("admission-score").value || 0),
  }),
  "convert-student": () => {
    const applicant = state.admissions.shift();
    if (!applicant) return;
    add(state.students, { name: applicant.name, roll: `NEW-${Date.now()}`.slice(-6), dept: applicant.program.split(" ")[1] || "CSE", status: "Active" });
  },
  "add-student": () => add(state.students, {
    name: byId("student-name").value || "New Student",
    roll: byId("student-roll").value || `CSE-${Date.now()}`.slice(-6),
    dept: byId("student-dept").value,
    status: byId("student-status").value,
  }),
  "delete-student": () => state.students.pop(),
  "add-course": () => add(state.courses, {
    code: byId("course-code").value || "NEW100",
    name: byId("course-name").value || "New Course",
    credits: Number(byId("course-credits").value || 0),
    faculty: byId("course-faculty").value,
    sem: byId("course-sem").value,
    cert: byId("course-cert").value || "Certificate",
  }),
  "update-course": () => {
    const code = byId("course-code").value;
    const target = state.courses.find((c) => c.code === code);
    if (!target) return alert("Course code not found.");
    target.name = byId("course-name").value || target.name;
    target.credits = Number(byId("course-credits").value || target.credits);
    target.faculty = byId("course-faculty").value || target.faculty;
    target.sem = byId("course-sem").value || target.sem;
    target.cert = byId("course-cert").value || target.cert;
  },
  "delete-course": () => {
    const code = byId("course-code").value;
    const idx = state.courses.findIndex((c) => c.code === code);
    if (idx === -1) return alert("Course code not found.");
    state.courses.splice(idx, 1);
  },
  "issue-course-cert": () => {
    const code = byId("course-code").value;
    const target = state.courses.find((c) => c.code === code);
    if (!target) return alert("Course code not found.");
    alert(`Certificate issued: ${target.cert}`);
  },
  "mark-attendance": () => add(state.attendance, {
    className: byId("att-class").value,
    course: byId("att-course").value,
    present: Number(byId("att-present").value || 0),
  }),
  "schedule-exam": () => add(state.exams, {
    exam: byId("exam-name").value,
    course: byId("exam-course").value || "Course",
    date: byId("exam-date").value || "2026-04-15",
    hall: byId("exam-hall").value || "H1",
  }),
  "publish-results": () => alert("Results published to student portal."),
  "add-faculty": () => add(state.faculty, {
    name: byId("faculty-name").value || "New Faculty",
    dept: byId("faculty-dept").value,
    load: Number(byId("faculty-load").value || 0),
    status: byId("faculty-status").value,
  }),
  "add-invoice": () => add(state.fees, {
    student: byId("fee-student").value || "Student",
    amount: Number(byId("fee-amount").value || 0),
    due: byId("fee-due").value || "2026-04-15",
    status: byId("fee-status").value,
  }),
  "record-payment": () => { if (state.fees[0]) state.fees[0].status = "Paid"; },
  "add-employee": () => add(state.hr, {
    name: byId("hr-name").value || "Employee",
    role: byId("hr-role").value || "Staff",
    salary: Number(byId("hr-salary").value || 0),
    shift: byId("hr-shift").value,
  }),
  "run-payroll": () => alert("Payroll processed for current cycle."),
  "add-book": () => add(state.library, {
    title: byId("lib-title").value || "New Book",
    author: byId("lib-author").value || "Author",
    copies: Number(byId("lib-copies").value || 1),
    status: byId("lib-status").value,
  }),
  "issue-book": () => { if (state.library[0]) state.library[0].status = "Issued"; },
  "allocate-room": () => add(state.hostel, {
    room: byId("hostel-room").value || "A-101",
    student: byId("hostel-student").value || "Student",
    capacity: Number(byId("hostel-capacity").value || 1),
    status: byId("hostel-status").value,
  }),
  "add-route": () => add(state.transport, {
    route: byId("transport-route").value || "Route",
    vehicle: byId("transport-vehicle").value || "Bus",
    driver: byId("transport-driver").value || "Driver",
    status: byId("transport-status").value,
  }),
  "add-placement": () => add(state.placements, {
    company: byId("place-company").value || "Company",
    role: byId("place-role").value || "Role",
    date: byId("place-date").value || "2026-04-10",
    status: byId("place-status").value,
  }),
  "add-research": () => add(state.research, {
    project: byId("res-project").value || "Project",
    pi: byId("res-pi").value || "PI",
    funding: Number(byId("res-fund").value || 0),
    status: byId("res-status").value,
  }),
  "add-asset": () => add(state.facilities, {
    asset: byId("fac-asset").value || "Asset",
    location: byId("fac-location").value || "Block",
    condition: byId("fac-condition").value,
    ticket: byId("fac-ticket").value,
  }),
  "raise-ticket": () => alert("Ticket raised for facilities team."),
  "add-inventory": () => add(state.inventory, {
    item: byId("inv-item").value || "Item",
    qty: Number(byId("inv-qty").value || 0),
    store: byId("inv-store").value,
    status: byId("inv-status").value,
  }),
  "issue-inventory": () => { if (state.inventory[0]) state.inventory[0].qty = Math.max(0, state.inventory[0].qty - 1); },
  "add-procurement": () => add(state.procurement, {
    vendor: byId("proc-vendor").value || "Vendor",
    item: byId("proc-item").value || "Item",
    amount: Number(byId("proc-amount").value || 0),
    status: byId("proc-status").value,
  }),
  "add-ticket": () => add(state.service, {
    requester: byId("svc-requester").value || "Requester",
    category: byId("svc-category").value,
    priority: byId("svc-priority").value,
    status: byId("svc-status").value,
  }),
  "send-broadcast": () => add(state.communications, {
    audience: byId("comm-audience").value,
    channel: byId("comm-channel").value,
    message: byId("comm-message").value || "Update",
    date: byId("comm-date").value || "Now",
  }),
  "add-evidence": () => add(state.compliance, {
    title: byId("comp-title").value || "Evidence",
    criterion: byId("comp-criterion").value,
    owner: byId("comp-owner").value || "IQAC",
    file: byId("comp-file").files?.[0]?.name || "",
  }),
};

const bindActions = () => {
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      if (actions[action]) {
        actions[action]();
        updateAll();
      }
    });
  });
};

const setupNavigation = () => {
  const nav = document.getElementById("module-nav");
  nav.addEventListener("click", (event) => {
    const btn = event.target.closest(".nav-item");
    if (!btn) return;
    const target = btn.dataset.module;
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".module-section").forEach((section) => {
      section.classList.toggle("active", section.id === target);
    });
  });
  document.querySelectorAll("[data-module-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-module-jump");
      nav.querySelector(`[data-module=\"${target}\"]`).click();
    });
  });
};

const setupAttainment = () => {
  const calcBtn = document.getElementById("calc-btn");
  if (!calcBtn) return;
  const scoreEl = document.getElementById("calc-score");
  const statusEl = document.getElementById("calc-status");
  const gapEl = document.getElementById("calc-gap");
  const targetEl = document.getElementById("target");
  const weightEl = document.getElementById("weight");
  const parseNum = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };
  const compute = () => {
    const achieved = Array.from(document.querySelectorAll(".co-achieved")).map((el) => parseNum(el.value));
    const credits = Array.from(document.querySelectorAll(".co-credits")).map((el) => Math.max(1, parseNum(el.value)));
    const method = weightEl.value;
    let total = 0;
    let weightSum = 0;
    achieved.forEach((val, idx) => {
      const weight = method === "weighted" ? credits[idx] : 1;
      total += val * weight;
      weightSum += weight;
    });
    const overall = weightSum ? total / weightSum : 0;
    const target = parseNum(targetEl.value);
    const gap = target - overall;
    scoreEl.textContent = `Overall Attainment: ${overall.toFixed(1)}%`;
    gapEl.textContent = `Gap to Target: ${gap > 0 ? gap.toFixed(1) : 0}%`;
    statusEl.textContent = overall >= target ? "Status: On Track" : overall >= target - 10 ? "Status: Monitor" : "Status: Action Required";
  };
  calcBtn.addEventListener("click", compute);
  compute();
};

const setupCourseUpload = () => {
  const upload = document.getElementById("course-upload");
  if (!upload) return;
  upload.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const rows = reader.result.toString().trim().split(/\r?\n/);
      rows.slice(1).forEach((line) => {
        const [code, name, credits, faculty, sem, cert] = line.split(",");
        if (code && name) {
          add(state.courses, {
            code: code.trim(),
            name: name.trim(),
            credits: Number(credits || 0),
            faculty: (faculty || "").trim(),
            sem: (sem || "").trim(),
            cert: (cert || "").trim() || "Certificate",
          });
        }
      });
      updateAll();
    };
    reader.readAsText(file);
  });
};

updateAll();
bindActions();
setupNavigation();
setupAttainment();
setupCourseUpload();
