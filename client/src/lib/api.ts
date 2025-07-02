const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

// Projects API
export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function addProject(project: any) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function updateProject(id: string, project: any) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function deleteProject(id: string) {
  await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" });
}

// Goals API
export async function fetchGoals() {
  const res = await fetch(`${API_BASE}/goals`);
  return res.json();
}

export async function addGoal(goal: any) {
  const res = await fetch(`${API_BASE}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return res.json();
}

export async function updateGoal(id: string, goal: any) {
  const res = await fetch(`${API_BASE}/goals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return res.json();
}

export async function deleteGoal(id: string) {
  await fetch(`${API_BASE}/goals/${id}`, { method: "DELETE" });
}

// Expenses API
export async function fetchExpenses() {
  const res = await fetch(`${API_BASE}/expenses`);
  return res.json();
}

export async function addExpense(expense: any) {
  const res = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function updateExpense(id: string, expense: any) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function deleteExpense(id: string) {
  await fetch(`${API_BASE}/expenses/${id}`, { method: "DELETE" });
}
