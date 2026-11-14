/**
 * TPS Technology - Central Data Management Layer
 * Provides centralized state, local storage persistence, and dynamic synchronization
 * between the public website (index.html) and the administrative panel (admin.html).
 */

const TPS_STORAGE_KEY = 'tps_enterprise_data';
const TPS_AUTH_KEY = 'tps_admin_session';

// Initial default seed data
const DEFAULT_TPS_DATA = {
  settings: {
    companyName: "Hangzhou TPS Technology Co., Ltd.",
    brandTitle: "Hangzhou TPS",
    brandSubtitle: "Technology Co., Ltd.",
    topBarMsg: "Global Leader in Digital Flatbed Cutters & Automated Channel Letter Benders",
    email: "info@tps-tech.com",
    phone: "+86 571 8888 9999",
    whatsapp: "+86 138 0000 0000",
    address: "Hangzhou Industrial High-Tech Zone, Zhejiang Province, China",
    heroBadge: "Next-Gen Industrial Cutting Automation",
    heroTitle1: "The Ultimate",
    heroTitle2: "Digital Cutting Power",
    heroDesc: "Redesigning production models with ultra-fast robotic flatbed cutters, modular multi-tool heads, and smart CCD vision for signage, packaging, textiles, and composites.",
    statSpeed: "1500 mm/s",
    statPrecision: "±0.05 mm",
    statCountries: "60+",
    statTools: "10+",
    statService: "24/7"
  },
  admin: {
    username: "admin",
    password: "admin123" // Default password
  },
  machines: [
    {
      id: "m-2516",
      model: "TPS-2516",
      title: "Digital Flatbed Cutting System",
      category: "cutter",
      badge: "FLAGSHIP MODEL",
      badgeClass: "eq-ribbon",
      sub: "2500 × 1600 mm Bed",
      desc: "Engineered for acrylic, corrugated board, KT board, foam, honeycomb, and composites with auto-tool change.",
      specs: [
        { label: "Cutting Speed", value: "Up to 1500 mm/s" },
        { label: "Cutting Thickness", value: "0.1 – 50 mm" },
        { label: "Repeatability", value: "±0.05 mm" },
        { label: "Registration", value: "High-Res CCD Camera" }
      ],
      videoTitle: "TPS-2516 Demonstration",
      imageUrl: "",
      active: true,
      order: 1
    },
    {
      id: "m-b130",
      model: "TPS-B130",
      title: "CNC Channel Letter Bender",
      category: "bender",
      badge: "SIGNAGE MASTER",
      badgeClass: "eq-ribbon dark",
      sub: "Channel Letter Bender",
      desc: "High-precision automated flanging, slotting, and bending for 3D letters in aluminum coils and stainless steel strips.",
      specs: [
        { label: "Material Width", value: "20 – 130 mm" },
        { label: "Material Thickness", value: "0.4 – 1.2 mm" },
        { label: "Bending Angle", value: "Min R7 mm / 30°–135°" },
        { label: "Control", value: "Closed-Loop Servo Drive" }
      ],
      videoTitle: "TPS-B130 Letter Bender Demonstration",
      imageUrl: "",
      active: true,
      order: 2
    },
    {
      id: "m-af3220",
      model: "TPS-AF3220",
      title: "Automated Conveyor Finishing Line",
      category: "conveyor",
      badge: "AUTO PRODUCTION",
      badgeClass: "eq-ribbon",
      sub: "Continuous Conveyor",
      desc: "Non-stop roll & sheet feeding with automatic alignment for high-capacity packaging and textile factories.",
      specs: [
        { label: "Table Width", value: "2000 mm × Continuous" },
        { label: "Feeding System", value: "Pneumatic Auto-Clamp" },
        { label: "Work Mode", value: "24/7 Automated Run" },
        { label: "Vacuum Bed", value: "High-Torque Synchronized" }
      ],
      videoTitle: "TPS-AF3220 Continuous Conveyor Demo",
      imageUrl: "",
      active: true,
      order: 3
    }
  ],
  tools: [
    {
      id: "t-01",
      badge: "EOT",
      tag: "Modular Head #01",
      title: "Electric Oscillating Tool (EOT)",
      subtitle: "High-frequency micro-reciprocation for tough substrates",
      desc: "Driven by a powerful high-torque motor, the blade oscillates up and down at high frequencies, slicing through thick, dense materials without tearing or edge deformation.",
      materials: ["Corrugated Cardboard", "Honeycomb Board", "Foam Core", "Leather", "Gasket Rubber"],
      spec1: "1.0 – 5.0 mm",
      spec2: "18,000 rpm",
      spec3: "Up to 30 mm",
      spec4: "Quick-Release Collet",
      active: true
    },
    {
      id: "t-02",
      badge: "RM",
      tag: "Modular Head #02",
      title: "High-Speed Router Spindle (RM)",
      subtitle: "Up to 60,000 RPM for clean edge milling and 3D carving",
      desc: "Precision air/water-cooled spindle operating up to 60,000 RPM, delivering polished edges on rigid plastics, woods, and non-ferrous metals without secondary finishing.",
      materials: ["Cast Acrylic", "MDF & Wood", "Aluminum Composite (ACP)", "Rigid PVC", "Bakelite"],
      spec1: "60,000 rpm",
      spec2: "1.5 kW / 2.2 kW",
      spec3: "Up to 50 mm",
      spec4: "Integrated Vacuum Hood",
      active: true
    },
    {
      id: "t-03",
      badge: "V-CUT",
      tag: "Modular Head #03",
      title: "Adjustable V-Cut Head",
      subtitle: "Precise 0°, 15°, 22.5°, 30°, 45° bevel grooves",
      desc: "Engineered for precise folding and complex 3D structures. Cuts clean V-grooves into honeycomb, heavy cardboard, and soundproof panels with perfect geometric angles.",
      materials: ["Honeycomb Board", "Acoustic Felt", "Heavy Grey Board", "Corrugated Plastic", "Foam Core"],
      spec1: "0°, 15°, 22.5°, 30°, 45°",
      spec2: "Instant Angle Lock",
      spec3: "Up to 16 mm",
      spec4: "Carbide V-Blade",
      active: true
    },
    {
      id: "t-04",
      badge: "CCD",
      tag: "Modular Head #04",
      title: "HD Vision CCD Camera System",
      subtitle: "Automatic mark detection & print-to-cut distortion compensation",
      desc: "Smart vision system scans printed registration marks across the entire bed in seconds. Automatically compensates for media shrinkage, stretching, or rotational skewing.",
      materials: ["Printed Acrylic", "Backlit Film", "Printed Cardboard", "Textiles", "Decals & Stickers"],
      spec1: "High-Speed HD Sensor",
      spec2: "Zero-Latency Recognition",
      spec3: "±0.02 mm Alignment",
      spec4: "Auto Distortion Matrix",
      active: true
    },
    {
      id: "t-05",
      badge: "POT",
      tag: "Modular Head #05",
      title: "Pneumatic Oscillating Tool (POT)",
      subtitle: "Compressed-air 8mm long stroke for dense foam and rubber",
      desc: "Powered by compressed air with an extended 8mm stroke amplitude. Delivers immense cutting force to power through heavy foam, thick rubber gaskets, and tough composites.",
      materials: ["High-Density EPE/EVA", "Automotive Gaskets", "Expanded Rubber", "Thick Felt", "Composite Prepreg"],
      spec1: "8.0 mm Long Stroke",
      spec2: "12,000 strokes/min",
      spec3: "Up to 100 mm Thickness",
      spec4: "Pneumatic 0.6 – 0.8 MPa",
      active: true
    }
  ],
  videoSlots: [
    { id: "hero", label: "Topo / Hero (Botão 'Watch 4K Speed Run')", url: "", defaultTitle: "TPS-2516 Flatbed Cutter — 4K Speed Run" },
    { id: "machine_tps2516", label: "Máquina: TPS-2516 Flatbed Cutter", url: "", defaultTitle: "TPS-2516 Demonstration & Test Cut" },
    { id: "machine_tpsb130", label: "Máquina: TPS-B130 Letter Bender", url: "", defaultTitle: "TPS-B130 Letter Bender in Action" },
    { id: "machine_tpsaf3220", label: "Máquina: TPS-AF3220 Conveyor System", url: "", defaultTitle: "TPS-AF3220 Continuous Conveyor Demo" },
    { id: "tool_modular", label: "Cabeçotes Modulares (Tools Showcase)", url: "", defaultTitle: "Electric Oscillating Tool in Action" },
    { id: "gallery_1", label: "Galeria de Vídeos — Card 1 (Acrílico / Router)", url: "", defaultTitle: "20mm Cast Acrylic Edge Milling" },
    { id: "gallery_2", label: "Galeria de Vídeos — Card 2 (Embalagens / Cartão)", url: "", defaultTitle: "Corrugated Box Creasing & Cutting" },
    { id: "gallery_3", label: "Galeria de Vídeos — Card 3 (Letras Corpóreas 3D)", url: "", defaultTitle: "Automated Channel Letter Bending" }
  ],
  videos: [
    {
      id: "v-01",
      title: "Speed Demonstration: 20mm Acrylic Router Cutting",
      subtitle: "High-RPM router spindle with polished crystal edges",
      duration: "01:45",
      videoUrl: "",
      featured: true
    },
    {
      id: "v-02",
      title: "High-Speed Corrugated Packaging Die-Less Cutting",
      subtitle: "EOT + Creasing Wheel prototyping in under 45 seconds",
      duration: "02:20",
      videoUrl: "",
      featured: true
    },
    {
      id: "v-03",
      title: "TPS-B130 Channel Letter Flanging & 3D Bending",
      subtitle: "Precision stainless steel letter bending with zero weld gap",
      duration: "03:10",
      videoUrl: "",
      featured: true
    }
  ],
  leads: [
    {
      id: "lead-101",
      name: "Carlos Eduardo Silva",
      company: "Visual Print Soluções",
      email: "carlos@visualprint.com.br",
      phone: "+55 11 98765-4321",
      equipment: "TPS-2516 Flatbed Digital Cutter",
      materials: "Acrílico 15mm, PVC Expandido, Alucobond",
      message: "Olá! Precisamos substituir nossa fresa antiga. Queremos cortar chapas de acrílico com acabamento cristal sem polimento manual. Gostaria de receber catálogo técnico e cotação com envio para Santos.",
      date: "Hoje, 10:14",
      timestamp: Date.now() - 3600000 * 2,
      status: "novo",
      notes: "Prioridade alta. Ligar via WhatsApp."
    },
    {
      id: "lead-102",
      name: "Markus Becker",
      company: "Nordic Signs GmbH",
      email: "m.becker@nordicsigns.de",
      phone: "+49 170 1234567",
      equipment: "TPS-B130 Channel Letter Bender",
      materials: "Edelstahl 0.8mm, Aluminium Coils",
      message: "Interested in the bending angle accuracy for small serif 3D letters. Do you have European CE certification and localized service in Germany?",
      date: "Ontem, 16:30",
      timestamp: Date.now() - 3600000 * 26,
      status: "contatado",
      notes: "Enviado catálogo técnico em alemão."
    },
    {
      id: "lead-103",
      name: "Jean Dupont",
      company: "Emballages Rapides SAS",
      email: "jdupont@packrapid.fr",
      phone: "+33 6 12 34 56 78",
      equipment: "TPS-AF3220 Automated Conveyor System",
      materials: "Carton ondulé double cannelure",
      message: "We need continuous roll feeding with optical CCD registration marks for corrugated sample boxes.",
      date: "12 Nov 2026",
      timestamp: Date.now() - 3600000 * 68,
      status: "fechado",
      notes: "Proposta aceita e contrato em validação."
    }
  ]
};

// Initialize / Retrieve State
function getTpsData() {
  try {
    const raw = localStorage.getItem(TPS_STORAGE_KEY);
    if (!raw) {
      saveTpsData(DEFAULT_TPS_DATA);
      return JSON.parse(JSON.stringify(DEFAULT_TPS_DATA));
    }
    const parsed = JSON.parse(raw);
    const data = Object.assign({}, DEFAULT_TPS_DATA, parsed);
    if (!data.videoSlots || !Array.isArray(data.videoSlots) || data.videoSlots.length === 0) {
      data.videoSlots = JSON.parse(JSON.stringify(DEFAULT_TPS_DATA.videoSlots));
    }
    return data;
  } catch (e) {
    console.error("Error reading TPS Data from localStorage", e);
    return JSON.parse(JSON.stringify(DEFAULT_TPS_DATA));
  }
}

// Save State and dispatch event
function saveTpsData(data) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TPS_STORAGE_KEY, JSON.stringify(data));
    }
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('tps_data_updated', { detail: data }));
    }
  } catch (e) {
    console.error("Error saving TPS Data", e);
  }
}

// Reset to Default Seed Data
function resetTpsData() {
  saveTpsData(DEFAULT_TPS_DATA);
  return DEFAULT_TPS_DATA;
}

// Inquiries / Leads Operations
function addTpsLead(lead) {
  const data = getTpsData();
  const newLead = {
    id: 'lead-' + Date.now(),
    name: lead.name || 'Anônimo',
    company: lead.company || 'Não informada',
    email: lead.email || '',
    phone: lead.phone || '',
    equipment: lead.equipment || 'Não especificado',
    materials: lead.materials || '',
    message: lead.message || '',
    date: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    timestamp: Date.now(),
    status: 'novo',
    notes: ''
  };
  data.leads.unshift(newLead);
  saveTpsData(data);
  return newLead;
}

function updateTpsLead(id, updates) {
  const data = getTpsData();
  const idx = data.leads.findIndex(l => l.id === id);
  if (idx !== -1) {
    data.leads[idx] = Object.assign({}, data.leads[idx], updates);
    saveTpsData(data);
    return data.leads[idx];
  }
  return null;
}

function deleteTpsLead(id) {
  const data = getTpsData();
  data.leads = data.leads.filter(l => l.id !== id);
  saveTpsData(data);
}

// Machines Operations
function saveMachine(machine) {
  const data = getTpsData();
  if (machine.id) {
    const idx = data.machines.findIndex(m => m.id === machine.id);
    if (idx !== -1) {
      data.machines[idx] = Object.assign({}, data.machines[idx], machine);
    } else {
      data.machines.push(machine);
    }
  } else {
    machine.id = 'm-' + Date.now();
    data.machines.push(machine);
  }
  saveTpsData(data);
  return machine;
}

function deleteMachine(id) {
  const data = getTpsData();
  data.machines = data.machines.filter(m => m.id !== id);
  saveTpsData(data);
}

// Tools Operations
function saveTool(tool) {
  const data = getTpsData();
  if (tool.id) {
    const idx = data.tools.findIndex(t => t.id === tool.id);
    if (idx !== -1) {
      data.tools[idx] = Object.assign({}, data.tools[idx], tool);
    } else {
      data.tools.push(tool);
    }
  } else {
    tool.id = 't-' + Date.now();
    data.tools.push(tool);
  }
  saveTpsData(data);
  return tool;
}

function deleteTool(id) {
  const data = getTpsData();
  data.tools = data.tools.filter(t => t.id !== id);
  saveTpsData(data);
}

// Videos Operations
function saveVideo(video) {
  const data = getTpsData();
  if (video.id) {
    const idx = data.videos.findIndex(v => v.id === video.id);
    if (idx !== -1) {
      data.videos[idx] = Object.assign({}, data.videos[idx], video);
    } else {
      data.videos.push(video);
    }
  } else {
    video.id = 'v-' + Date.now();
    data.videos.push(video);
  }
  saveTpsData(data);
  return video;
}

function deleteVideo(id) {
  const data = getTpsData();
  data.videos = data.videos.filter(v => v.id !== id);
  saveTpsData(data);
}

// Video Slots Management (No titles or texts needed, just URL and location)
function saveVideoSlotUrl(slotId, url) {
  const data = getTpsData();
  if (!data.videoSlots) data.videoSlots = JSON.parse(JSON.stringify(DEFAULT_TPS_DATA.videoSlots));
  const slot = data.videoSlots.find(s => s.id === slotId);
  const cleanUrl = (url || '').trim();
  if (slot) {
    slot.url = cleanUrl;
  } else {
    data.videoSlots.push({ id: slotId, label: slotId, url: cleanUrl, defaultTitle: slotId });
  }
  // Sync with machine if it corresponds to an equipment
  if (slotId === 'machine_tps2516') {
    const m = data.machines.find(x => (x.model || x.title || '').includes('2516'));
    if (m) m.videoUrl = cleanUrl;
  } else if (slotId === 'machine_tpsb130') {
    const m = data.machines.find(x => (x.model || x.title || '').includes('B130'));
    if (m) m.videoUrl = cleanUrl;
  } else if (slotId === 'machine_tpsaf3220') {
    const m = data.machines.find(x => (x.model || x.title || '').includes('AF3220'));
    if (m) m.videoUrl = cleanUrl;
  }
  saveTpsData(data);
  return slot;
}

function addCustomVideoSlot(url, customLabel) {
  const data = getTpsData();
  if (!data.videoSlots) data.videoSlots = JSON.parse(JSON.stringify(DEFAULT_TPS_DATA.videoSlots));
  const newId = 'gallery_custom_' + Date.now();
  const label = customLabel || `Galeria de Vídeos — Card #${data.videoSlots.filter(s => s.id.startsWith('gallery_')).length + 1}`;
  const newSlot = {
    id: newId,
    label: label,
    url: (url || '').trim(),
    defaultTitle: label
  };
  data.videoSlots.push(newSlot);
  saveTpsData(data);
  return newSlot;
}

function deleteVideoSlot(slotId) {
  const data = getTpsData();
  data.videoSlots = data.videoSlots.filter(s => s.id !== slotId);
  saveTpsData(data);
}

// Settings Operations
function saveSettings(newSettings) {
  const data = getTpsData();
  data.settings = Object.assign({}, data.settings, newSettings);
  saveTpsData(data);
  return data.settings;
}

// Auth Session Management
function isTpsAdminLoggedIn() {
  return sessionStorage.getItem(TPS_AUTH_KEY) === 'true';
}

function loginTpsAdmin(user, pass) {
  const data = getTpsData();
  if (user === data.admin.username && pass === data.admin.password) {
    sessionStorage.setItem(TPS_AUTH_KEY, 'true');
    return true;
  }
  return false;
}

function logoutTpsAdmin() {
  sessionStorage.removeItem(TPS_AUTH_KEY);
}

function changeTpsAdminPassword(newPass) {
  const data = getTpsData();
  data.admin.password = newPass;
  saveTpsData(data);
  return true;
}

// Data Export & Import
function exportTpsJson() {
  const data = getTpsData();
  const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", str);
  a.setAttribute("download", `tps-backup-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function importTpsJson(fileContent) {
  try {
    const parsed = JSON.parse(fileContent);
    if (parsed && parsed.settings && parsed.machines) {
      saveTpsData(parsed);
      return { success: true };
    }
    return { success: false, error: "Estrutura do arquivo JSON inválida." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
