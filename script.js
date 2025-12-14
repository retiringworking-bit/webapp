/**
 * Salaria - Hackathon Demo Script
 * Handles state, routing, and UI rendering
 */

// --- 1. State Management & Mock Data ---

// --- 1. State Management & Mock Data ---

const translations = {
    ru: {
        nav_dashboard: 'Дашборд',
        nav_my_salary: 'Моя зарплата',
        nav_employees: 'Сотрудники',
        nav_analytics: 'Аналитика',
        nav_settings: 'Настройки',
        page_title_dashboard: 'Обзор зарплат',
        label_total_payout: 'Итого к выплате',
        label_bonus_fund: 'Бонусный фонд',
        label_headcount: 'Сотрудников',
        label_avg_kpi: 'Средний KPI',
        trend_up_payout: '+12% к прошлому мес.',
        trend_high_eff: 'Высокая эффективность',
        trend_staff_ok: 'Штат укомплектован',
        chart_title: 'Динамика зарплатного фонда',
        chart_label: 'Выплаты',
        col_employee: 'Сотрудник',
        col_base: 'База',
        col_kpi: 'KPI',
        col_bonus: 'Бонус',
        col_total: 'Итого',
        ai_insight_title: 'AI Анализ зарплатного фонда',
        ai_insight_text: 'В этом месяце фонд оплаты труда вырос на <strong>12%</strong>. Основной драйвер роста — отдел разработки.',
        top_kpi_title: 'Топ сотрудников (KPI)',
        forecast_title: 'Прогноз на следующий месяц',
        forecast_text: 'Прогнозируемый расход (-2%)',
        forecast_trend: 'Ожидается рост KPI в отделе продаж',
        label_final_salary: 'Итоговая зарплата',
        label_payslip: 'Расчетный лист',
        label_efficiency: 'Эффективность (KPI)',
        label_fines: 'Штрафы'
    },
    en: {
        nav_dashboard: 'Dashboard',
        nav_my_salary: 'My Salary',
        nav_employees: 'Employees',
        nav_analytics: 'Analytics',
        nav_settings: 'Settings',
        page_title_dashboard: 'Salary Overview',
        label_total_payout: 'Total Payout',
        label_bonus_fund: 'Bonus Fund',
        label_headcount: 'Headcount',
        label_avg_kpi: 'Avg KPI',
        trend_up_payout: '+12% vs last month',
        trend_high_eff: 'High Efficiency',
        trend_staff_ok: 'Staff Full',
        chart_title: 'Payroll Dynamics',
        chart_label: 'Payouts',
        col_employee: 'Employee',
        col_base: 'Base',
        col_kpi: 'KPI',
        col_bonus: 'Bonus',
        col_total: 'Total',
        ai_insight_title: 'AI Payroll Analysis',
        ai_insight_text: 'Payroll increased by <strong>12%</strong> this month. Main driver is Engineering department.',
        top_kpi_title: 'Top Employees (KPI)',
        forecast_title: 'Next Month Forecast',
        forecast_text: 'Predicted Expense (-2%)',
        forecast_trend: 'Expected KPI growth in Sales',
        label_final_salary: 'Final Salary',
        label_payslip: 'Payslip',
        label_efficiency: 'Efficiency (KPI)',
        label_fines: 'Fines'
    },
    uz: {
        nav_dashboard: 'Boshqaruv paneli',
        nav_my_salary: 'Mening maoshim',
        nav_employees: 'Xodimlar',
        nav_analytics: 'Tahlil',
        nav_settings: 'Sozlamalar',
        page_title_dashboard: 'Maoshlar umumiy ko‘rinishi',
        label_total_payout: 'Jami to‘lov',
        label_bonus_fund: 'Bonus fondi',
        label_headcount: 'Xodimlar soni',
        label_avg_kpi: 'O‘rtacha KPI',
        trend_up_payout: 'O‘tgan oyga nisbatan +12%',
        trend_high_eff: 'Yuqori samaradorlik',
        trend_staff_ok: 'Shtat to‘liq',
        chart_title: 'Maosh fondi dinamikasi',
        chart_label: 'To‘lovlar',
        col_employee: 'Xodim',
        col_base: 'Bazaviy',
        col_kpi: 'KPI',
        col_bonus: 'Bonus',
        col_total: 'Jami',
        ai_insight_title: 'AI Maosh tahlili',
        ai_insight_text: 'Bu oyda maosh fondi <strong>12%</strong> ga oshdi. Asosiy sabab - IT bo‘limi.',
        top_kpi_title: 'Eng yaxshi xodimlar (KPI)',
        forecast_title: 'Keyingi oy prognozi',
        forecast_text: 'Kutilayotgan sarf (-2%)',
        forecast_trend: 'Savdo bo‘limida KPI o‘sishi kutilmoqda',
        label_final_salary: 'Yakuniy maosh',
        label_payslip: 'Hisob varaqasi',
        label_efficiency: 'Samaradorlik (KPI)',
        label_fines: 'Jarimalar'
    },
};

const store = {
    settings: {
        theme: 'light',
        lang: 'ru'
    },
    currentUser: {
        role: 'admin', // admin, hr, employee
        id: 'emp_001'
    },
    currentMonth: 2, // 0 = Jan, 1 = Feb, 2 = Mar...
    employees: [
        {
            id: 'emp_001',
            name: 'Alex Admin',
            role: 'Administrator',
            baseSalary: 3000,
            joinDate: '2023-01-15',
            kpi: 100, // %
            history: [
                { month: 0, kpi: 100, bonus: 500, fine: 0 },
                { month: 1, kpi: 98, bonus: 0, fine: 0 },
                { month: 2, kpi: 100, bonus: 1000, fine: 0 }
            ]
        },
        {
            id: 'emp_002',
            name: 'Sarah HR',
            role: 'HR Manager',
            baseSalary: 2500,
            joinDate: '2023-03-10',
            kpi: 95,
            history: [
                { month: 0, kpi: 90, bonus: 100, fine: 0 },
                { month: 1, kpi: 95, bonus: 200, fine: 0 },
                { month: 2, kpi: 95, bonus: 200, fine: 0 }
            ]
        },
        {
            id: 'emp_003',
            name: 'John Dev',
            role: 'Senior Developer',
            baseSalary: 4000,
            joinDate: '2023-05-20',
            kpi: 110,
            history: [
                { month: 0, kpi: 100, bonus: 0, fine: 0 },
                { month: 1, kpi: 115, bonus: 500, fine: 50 },
                { month: 2, kpi: 120, bonus: 1000, fine: 0 }
            ]
        },
        {
            id: 'emp_004',
            name: 'Mike Sales',
            role: 'Sales Agent',
            baseSalary: 1500,
            joinDate: '2023-06-01',
            kpi: 80,
            history: [
                { month: 0, kpi: 150, bonus: 2000, fine: 0 },
                { month: 1, kpi: 60, bonus: 0, fine: 100 },
                { month: 2, kpi: 85, bonus: 100, fine: 0 }
            ]
        },
    ]
};

// Month Names
const MONTHS_RU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// --- 2. Core Functions ---

function init() {
    setupEventListeners();
    renderApp();
}

function setupEventListeners() {
    // Nav Click
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = btn.dataset.view;
            if (view) {
                switchView(view);
            }
        });
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    langBtn.addEventListener('click', () => {
        const langs = ['ru', 'uz', 'en'];
        let idx = langs.indexOf(store.settings.lang);
        idx = (idx + 1) % langs.length;
        store.settings.lang = langs[idx];

        // Update Button Text
        langBtn.querySelector('span').textContent = store.settings.lang.toUpperCase();

        applyTranslations();
        renderApp(); // Re-render to update dynamic content
    });

    // Role Switcher (Hackathon Demo Only)
    const roleSelect = document.getElementById('demo-role-switcher');
    roleSelect.value = store.currentUser.role;
    roleSelect.addEventListener('change', (e) => {
        store.currentUser.role = e.target.value;
        // Update user profile mock
        const users = { 'admin': 'Alex Admin', 'hr': 'Sarah HR', 'employee': 'John Dev' };
        document.getElementById('user-name-mini').textContent = users[e.target.value];
        document.getElementById('user-role-mini').textContent = e.target.value.toUpperCase();

        renderApp(); // Re-render triggers role based checks
    });

    // Month Selectors
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
}

// --- 2.1 Localization Helper ---
function t(key) {
    return translations[store.settings.lang][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[store.settings.lang][key]) {
            el.textContent = translations[store.settings.lang][key];
        }
    });
}

// --- 3. Logic & Math ---

function calculateSalary(empId, monthIndex) {
    const employee = store.employees.find(e => e.id === empId);
    if (!employee) return 0;

    const data = employee.history.find(h => h.month === monthIndex);
    if (!data) return 0; // Not hired yet or no data

    // Formula: Base + (Base * (KPI-100)% if > 100?) -> Simplified for demo:
    // Salary = Base * (KPI / 100) + Bonus - Fine
    const base = employee.baseSalary;
    const kpiFactor = data.kpi / 100;
    const kpiPart = base * kpiFactor;

    // Or strictly as user req: Base + KPI + Bonus - Fine (assuming KPI is a cash value? User said "KPI %")
    // Let's interpret: Effective Salary = Base * KPI% + Bonus - Fine

    const finalSalary = (base * kpiFactor) + data.bonus - data.fine;
    return Math.floor(finalSalary);
}

function changeMonth(delta) {
    let newMonth = store.currentMonth + delta;
    if (newMonth < 0) newMonth = 0;
    if (newMonth > 11) newMonth = 11;
    store.currentMonth = newMonth;
    renderApp();
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const isDark = body.classList.contains('dark-mode');
    const icon = document.querySelector('#theme-toggle i');
    icon.classList.remove(isDark ? 'ph-moon' : 'ph-sun');
    icon.classList.add(isDark ? 'ph-sun' : 'ph-moon');
}

// --- 4. Renderers ---

function renderApp() {
    // Update Header
    document.getElementById('selected-month-display').textContent = `${MONTHS_RU[store.currentMonth]} 2024`;

    // Visibility based on Role
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = (store.currentUser.role === 'admin' || store.currentUser.role === 'hr') ? 'flex' : 'none';
    });

    // Default to Dashboard triggers reload of current view
    const activeNav = document.querySelector('.nav-item.active');
    const currentView = activeNav ? activeNav.dataset.view : 'dashboard';
    switchView(currentView);
}

function switchView(viewName) {
    // Update Active Nav
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-item[data-view="${viewName}"]`)?.classList.add('active');

    const container = document.getElementById('app-view-container');
    container.innerHTML = ''; // Clear

    switch (viewName) {
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'my-salary':
            renderMySalary(container);
            break;
        case 'employees':
            renderInfos(container); // Allow if not employee, else redirect logic in real app
            break;
        case 'analytics':
            renderAnalytics(container);
            break;
        default:
            container.innerHTML = '<h2>Раздел в разработке</h2>';
    }
}

// --- View: Dashboard ---
function renderDashboard(container) {
    // Calculate Totals
    let totalPayout = 0;
    let totalBonus = 0;

    // If Admin/HR -> All employees. If Employee -> Just themselves
    const relevantEmployees = (store.currentUser.role === 'employee')
        ? store.employees.filter(e => e.id === 'emp_003') // Mock logic: Employee logged in as John
        : store.employees;

    relevantEmployees.forEach(emp => {
        const salary = calculateSalary(emp.id, store.currentMonth);
        const data = emp.history.find(h => h.month === store.currentMonth);
        if (data) totalBonus += data.bonus;
        totalPayout += salary;
    });

    const html = `
        <div class="dashboard-grid">
            <div class="card stat-card">
                <span class="label">${t('label_total_payout')}</span>
                <span class="value">$${totalPayout.toLocaleString()}</span>
                <span class="trend up"><i class="ph ph-trend-up"></i> ${t('trend_up_payout')}</span>
            </div>
            <div class="card stat-card">
                <span class="label">${t('label_bonus_fund')}</span>
                <span class="value">$${totalBonus.toLocaleString()}</span>
                <span class="trend up"><i class="ph ph-trend-up"></i> ${t('trend_high_eff')}</span>
            </div>
            <div class="card stat-card">
                <span class="label">${t('label_headcount')}</span>
                <span class="value">${relevantEmployees.length}</span>
                <span class="trend"><i class="ph ph-users"></i> ${t('trend_staff_ok')}</span>
            </div>
            <div class="card stat-card">
                <span class="label">${t('label_avg_kpi')}</span>
                <span class="value">98%</span>
                <span class="trend down"><i class="ph ph-trend-down"></i> -2%</span>
            </div>

            <div class="card full-width" style="height: 300px;">
                <h3>${t('chart_title')}</h3>
                <canvas id="mainChart"></canvas>
            </div>
        </div>
    `;
    container.innerHTML = html;

    // Init Chart
    setTimeout(() => {
        const ctx = document.getElementById('mainChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Бер'], // Mock for now
                datasets: [{
                    label: t('chart_label'),
                    data: [12000, 13500, totalPayout], // Mock history + current
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }, 100);
}

// --- View: My Salary / Employee Detail ---
function renderMySalary(container) {
    // Mock: Assume current user is emp_003 (John Dev) for 'Employee' view
    // Or if Admin allows selecting, but for now simple:
    const empId = store.currentUser.role === 'employee' ? 'emp_003' : 'emp_001';
    const emp = store.employees.find(e => e.id === empId);
    const history = emp.history.find(h => h.month === store.currentMonth);

    if (!history) {
        container.innerHTML = '<h2>Нет данных за этот месяц</h2>';
        return;
    }

    const calculated = calculateSalary(emp.id, store.currentMonth);
    const kpiMultiplier = history.kpi / 100;

    container.innerHTML = `
        <div class="dashboard-grid">
             <div class="card half-width">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div>
                        <h2>${emp.name}</h2>
                        <p style="color:var(--text-muted)">${emp.role}</p>
                    </div>
                    <div class="badge" style="font-size:1.2rem; padding: 8px 16px;">
                        KPI: ${history.kpi}%
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <span class="label">${t('label_final_salary')}</span>
                    <div class="value" style="font-size: 3rem; color: var(--primary);">$${calculated.toLocaleString()}</div>
                </div>
             </div>

             <div class="card half-width">
                <h3>${t('label_payslip')}</h3>
                <table style="width:100%; margin-top:1rem; border-collapse:collapse;">
                    <tr style="border-bottom:1px solid var(--border-color); height: 40px;">
                        <td>${t('col_base')}</td>
                        <td style="text-align:right">$${emp.baseSalary}</td>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color); height: 40px; color: var(--success);">
                        <td>${t('label_efficiency')}</td>
                        <td style="text-align:right">x ${kpiMultiplier}</td>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color); height: 40px; color: var(--success);">
                        <td>${t('col_bonus')}</td>
                        <td style="text-align:right">+$${history.bonus}</td>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color); height: 40px; color: var(--danger);">
                        <td>${t('label_fines')}</td>
                        <td style="text-align:right">-$${history.fine}</td>
                    </tr>
                </table>
             </div>
        </div>
    `;
}

// Placeholders for other views
// --- View: Employee List (HR/Admin) ---
function renderInfos(container) {
    // Only accessible if admin/hr
    if (store.currentUser.role === 'employee') {
        container.innerHTML = '<div class="card"><h3>Доступ запрещен</h3></div>';
        return;
    }

    const rows = store.employees.map(emp => {
        const salary = calculateSalary(emp.id, store.currentMonth);
        const data = emp.history.find(h => h.month === store.currentMonth);

        // Safety check for missing month data
        const kpi = data ? data.kpi : 0;
        const bonus = data ? data.bonus : 0;

        let badgeClass = 'med';
        if (kpi >= 100) badgeClass = 'high';
        if (kpi < 80) badgeClass = 'low';

        return `
            <tr style="cursor: pointer;" onclick="alert('View details for ${emp.name}')">
                <td>
                    <div style="font-weight:600;">${emp.name}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">${emp.role}</div>
                </td>
                <td>$${emp.baseSalary}</td>
                <td><span class="status-badge ${badgeClass}">${kpi}%</span></td>
                <td>$${bonus}</td>
                <td style="font-weight:700;">$${salary.toLocaleString()}</td>
                <td>
                    <button class="icon-btn" style="width:30px; height:30px;"><i class="ph ph-caret-right"></i></button>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="card full-width">
            <div style="display:flex; justify-content:space-between; margin-bottom: 1.5rem;">
                <h3>${t('nav_employees')}</h3>
                <button class="icon-btn" onclick="alert('Export PDF/Excel... Done!')"><i class="ph ph-download-simple"></i></button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>${t('col_employee')}</th>
                            <th>${t('col_base')}</th>
                            <th>${t('col_kpi')}</th>
                            <th>${t('col_bonus')}</th>
                            <th>${t('col_total')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- View: Analytics (AI) ---
function renderAnalytics(container) {
    container.innerHTML = `
        <div class="dashboard-grid">
            <div class="card full-width ai-insight">
                <div class="ai-icon"><i class="ph ph-sparkle"></i></div>
                <div>
                    <h4 style="margin-bottom:0.5rem;">${t('ai_insight_title')}</h4>
                    <p style="font-size:0.9rem; line-height:1.5;">
                        ${t('ai_insight_text')}
                    </p>
                </div>
            </div>

            <div class="card half-width">
                <h3>${t('top_kpi_title')}</h3>
                <ul style="list-style:none; margin-top:1rem; display:flex; flex-direction:column; gap:1rem;">
                    ${store.employees
            .sort((a, b) => {
                const ka = a.history.find(h => h.month === store.currentMonth)?.kpi || 0;
                const kb = b.history.find(h => h.month === store.currentMonth)?.kpi || 0;
                return kb - ka;
            })
            .map((e, i) => `
                        <li style="display:flex; align-items:center; gap:1rem;">
                            <div style="width:24px; height:24px; background:${i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32'}; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:bold; color:white;">${i + 1}</div>
                            <img src="https://ui-avatars.com/api/?name=${e.name}&background=random" style="width:32px; border-radius:50%;">
                            <div style="flex:1;">
                                <div style="font-weight:500;">${e.name}</div>
                                <div style="font-size:0.8rem; color:var(--text-muted);">${e.role}</div>
                            </div>
                            <div style="font-weight:700;">${e.history.find(h => h.month === store.currentMonth)?.kpi}%</div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="card half-width">
                <h3>${t('forecast_title')}</h3>
                <div style="margin-top:1.5rem; text-align:center;">
                    <div style="font-size:3rem; font-weight:700; color:var(--primary);">$19,500</div>
                    <p style="color:var(--text-muted);">${t('forecast_text')}</p>
                    
                    <div style="margin-top:2rem; text-align:left;">
                        <p style="font-size:0.9rem; margin-bottom:0.5rem;"><i class="ph ph-trend-up"></i> ${t('forecast_trend')}</p>
                        <p style="font-size:0.9rem;"><i class="ph ph-check-circle"></i> Нет запланированных крупных бонусов</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Run
init();
