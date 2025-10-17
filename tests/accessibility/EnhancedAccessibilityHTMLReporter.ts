/**
 * Enhanced HTML Report Generator
 * Creates rich, interactive accessibility reports with dynamic cards,
 * detailed rule explanations, and actionable remediation guidance
 */

import { WCAGGuidelinesDatabase, WCAGRule } from './WCAGGuidelinesDatabase';
import { AccessibilityReport, AccessibilityViolation, AccessibilityTestResult } from './AccessibilityTypes';
import * as fs from 'fs';

export interface ReportConfiguration {
    title: string;
    includeSummary: boolean;
    includeViolations: boolean;
    includeRemediation: boolean;
    includeCodeExamples: boolean;
    theme: 'light' | 'dark' | 'auto';
    showOnlyFailures: boolean;
    groupByCategory: boolean;
    includeTechnicalDetails: boolean;
    generatePrintableVersion: boolean;
}

export interface ReportMetrics {
    totalViolations: number;
    criticalViolations: number;
    seriousViolations: number;
    moderateViolations: number;
    minorViolations: number;
    passedTests: number;
    failedTests: number;
    complianceScore: number;
    wcagLevel: string;
}

export class EnhancedAccessibilityHTMLReporter {
    private readonly wcagDatabase: WCAGGuidelinesDatabase;
    private readonly configuration: ReportConfiguration;

    constructor(config: Partial<ReportConfiguration> = {}) {
        this.wcagDatabase = WCAGGuidelinesDatabase.getInstance();
        this.configuration = {
            title: 'Accessibility Assessment Report',
            includeSummary: true,
            includeViolations: true,
            includeRemediation: true,
            includeCodeExamples: true,
            theme: 'auto',
            showOnlyFailures: false,
            groupByCategory: true,
            includeTechnicalDetails: true,
            generatePrintableVersion: false,
            ...config
        };
    }

    public async generateReport(
        report: AccessibilityReport,
        testResults: AccessibilityTestResult[],
        outputPath: string
    ): Promise<void> {
        const metrics = this.calculateMetrics(report, testResults);
        const html = this.generateHTML(report, testResults, metrics);
        
        await fs.promises.writeFile(outputPath, html, 'utf8');
        
        if (this.configuration.generatePrintableVersion) {
            const printableHtml = this.generatePrintableHTML(report, testResults, metrics);
            const printablePath = outputPath.replace('.html', '-printable.html');
            await fs.promises.writeFile(printablePath, printableHtml, 'utf8');
        }
    }

    private calculateMetrics(report: AccessibilityReport, testResults: AccessibilityTestResult[]): ReportMetrics {
        const allViolations = testResults.flatMap(result => result.violations);
        
        const criticalViolations = allViolations.filter(v => this.getViolationSeverity(v) === 'Critical').length;
        const seriousViolations = allViolations.filter(v => this.getViolationSeverity(v) === 'Serious').length;
        const moderateViolations = allViolations.filter(v => this.getViolationSeverity(v) === 'Moderate').length;
        const minorViolations = allViolations.filter(v => this.getViolationSeverity(v) === 'Minor').length;
        
        const passedTests = testResults.filter(result => result.violations.length === 0).length;
        const failedTests = testResults.filter(result => result.violations.length > 0).length;
        
        const totalTests = passedTests + failedTests;
        const complianceScore = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

        return {
            totalViolations: allViolations.length,
            criticalViolations,
            seriousViolations,
            moderateViolations,
            minorViolations,
            passedTests,
            failedTests,
            complianceScore,
            wcagLevel: 'AA' // Could be determined from violations
        };
    }

    private getViolationSeverity(violation: AccessibilityViolation): string {
        const rule = this.wcagDatabase.getRule(violation.id);
        return rule?.impact || 'Minor';
    }

    private generateHTML(
        report: AccessibilityReport,
        testResults: AccessibilityTestResult[],
        metrics: ReportMetrics
    ): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.configuration.title}</title>
    <style>
        ${this.generateCSS()}
    </style>
</head>
<body class="theme-${this.configuration.theme}" data-theme="${this.configuration.theme}">
    <div class="report-container">
        ${this.generateHeader(report, metrics)}
        ${this.configuration.includeSummary ? this.generateSummary(metrics, testResults) : ''}
        ${this.generateQuickActions()}
        ${this.generateFilters()}
        ${this.configuration.includeViolations ? this.generateViolationsSection(testResults) : ''}
        ${this.generateTestResultsSection(testResults)}
        ${this.generateFooter()}
    </div>
    <script>
        ${this.generateJavaScript()}
    </script>
</body>
</html>`;
    }

    private generateCSS(): string {
        return `
/* === GLOBAL STYLES === */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.3s ease;
}

/* === CSS VARIABLES === */
:root {
    --primary-color: #2563eb;
    --success-color: #16a34a;
    --warning-color: #d97706;
    --error-color: #dc2626;
    --critical-color: #991b1b;
    --info-color: #0891b2;
    --border-radius: 12px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --transition: all 0.2s ease;
}

/* Light Theme */
.theme-light, .theme-auto {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    --border-color: #e2e8f0;
    --card-bg: #ffffff;
    --hover-bg: #f8fafc;
}

/* Dark Theme */
.theme-dark {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --border-color: #334155;
    --card-bg: #1e293b;
    --hover-bg: #334155;
}

/* === LAYOUT === */
.report-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
}

/* === HEADER === */
.report-header {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.report-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.report-subtitle {
    color: var(--text-secondary);
    font-size: 1.125rem;
}

.report-meta {
    display: flex;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
}

.meta-item {
    display: flex;
    flex-direction: column;
    text-align: right;
}

.meta-label {
    color: var(--text-muted);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.meta-value {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
}

/* === SUMMARY CARDS === */
.summary-section {
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.section-icon {
    font-size: 1.5rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.summary-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.summary-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.summary-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--card-accent, var(--primary-color));
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.card-icon {
    font-size: 2rem;
    opacity: 0.7;
}

.card-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.card-description {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.4;
}

.card-progress {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 1rem;
}

.progress-fill {
    height: 100%;
    background: var(--card-accent, var(--primary-color));
    transition: width 0.6s ease;
}

/* === SEVERITY COLORS === */
.severity-critical { --card-accent: var(--critical-color); }
.severity-serious { --card-accent: var(--error-color); }
.severity-moderate { --card-accent: var(--warning-color); }
.severity-minor { --card-accent: var(--info-color); }
.compliance-score { --card-accent: var(--success-color); }

/* === QUICK ACTIONS === */
.quick-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.action-button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
}

.action-button.secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

/* === FILTERS === */
.filters-section {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.filter-label {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.875rem;
}

.filter-control {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.875rem;
}

/* === VIOLATIONS SECTION === */
.violations-section {
    margin-bottom: 2rem;
}

.violations-grid {
    display: grid;
    gap: 1.5rem;
}

.violation-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: var(--transition);
}

.violation-card:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

.violation-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: between;
    align-items: flex-start;
    gap: 1rem;
}

.violation-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.violation-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.violation-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.badge-critical {
    background: rgba(153, 27, 27, 0.1);
    color: var(--critical-color);
    border: 1px solid rgba(153, 27, 27, 0.2);
}

.badge-serious {
    background: rgba(220, 38, 38, 0.1);
    color: var(--error-color);
    border: 1px solid rgba(220, 38, 38, 0.2);
}

.badge-moderate {
    background: rgba(217, 119, 6, 0.1);
    color: var(--warning-color);
    border: 1px solid rgba(217, 119, 6, 0.2);
}

.badge-minor {
    background: rgba(8, 145, 178, 0.1);
    color: var(--info-color);
    border: 1px solid rgba(8, 145, 178, 0.2);
}

.violation-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.violation-content {
    padding: 0 1.5rem 1.5rem;
}

.expandable-section {
    border-top: 1px solid var(--border-color);
    margin-top: 1rem;
}

.section-header {
    padding: 1rem 1.5rem;
    background: var(--bg-secondary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
}

.section-header:hover {
    background: var(--hover-bg);
}

.section-header-title {
    font-weight: 600;
    color: var(--text-primary);
}

.expand-icon {
    transition: transform 0.2s ease;
}

.expanded .expand-icon {
    transform: rotate(180deg);
}

.section-content {
    padding: 1.5rem;
    display: none;
}

.expanded .section-content {
    display: block;
}

/* === CODE EXAMPLES === */
.code-examples {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
}

.code-example {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
}

.code-example-header {
    padding: 0.75rem 1rem;
    background: var(--bg-tertiary);
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
}

.code-example-content {
    padding: 1rem;
    background: var(--bg-primary);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
}

.code-bad {
    border-left: 4px solid var(--error-color);
}

.code-good {
    border-left: 4px solid var(--success-color);
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 768px) {
    .report-container {
        padding: 1rem;
    }
    
    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .report-title {
        font-size: 2rem;
    }
    
    .summary-grid {
        grid-template-columns: 1fr;
    }
    
    .filters-grid {
        grid-template-columns: 1fr;
    }
    
    .quick-actions {
        flex-direction: column;
    }
    
    .violation-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .violation-meta {
        width: 100%;
    }
}

/* === PRINT STYLES === */
@media print {
    body {
        background: white !important;
        color: black !important;
    }
    
    .report-container {
        max-width: none;
        padding: 0;
    }
    
    .summary-card,
    .violation-card {
        box-shadow: none;
        border: 1px solid #ddd;
        break-inside: avoid;
    }
    
    .quick-actions,
    .filters-section {
        display: none;
    }
    
    .section-content {
        display: block !important;
    }
    
    .expandable-section .section-header {
        background: #f5f5f5;
    }
}

/* === ANIMATIONS === */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease forwards;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.loading {
    animation: pulse 1.5s ease-in-out infinite;
}

/* === ACCESSIBILITY === */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Focus styles for keyboard navigation */
button:focus,
select:focus,
input:focus,
.section-header:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --shadow: 0 0 0 1px currentColor;
        --shadow-lg: 0 0 0 2px currentColor;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;
    }

    private generateHeader(report: AccessibilityReport, metrics: ReportMetrics): string {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
<header class="report-header">
    <div class="header-content">
        <div>
            <h1 class="report-title">${this.configuration.title}</h1>
            <p class="report-subtitle">
                Comprehensive WCAG ${metrics.wcagLevel} Accessibility Assessment
            </p>
        </div>
        <div class="report-meta">
            <div class="meta-item">
                <span class="meta-label">Generated</span>
                <span class="meta-value">${currentDate}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Pages Tested</span>
                <span class="meta-value">${report.pagesAnalyzed || 1}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Compliance Score</span>
                <span class="meta-value" style="color: ${this.getComplianceScoreColor(metrics.complianceScore)}">
                    ${metrics.complianceScore}%
                </span>
            </div>
        </div>
    </div>
</header>`;
    }

    private generateSummary(metrics: ReportMetrics, testResults: AccessibilityTestResult[]): string {
        return `
<section class="summary-section">
    <h2 class="section-title">
        <span class="section-icon">📊</span>
        Executive Summary
    </h2>
    <div class="summary-grid">
        <div class="summary-card compliance-score">
            <div class="card-header">
                <h3 class="card-title">Compliance Score</h3>
                <span class="card-icon">🎯</span>
            </div>
            <div class="card-value">${metrics.complianceScore}%</div>
            <div class="card-description">
                Overall accessibility compliance based on WCAG ${metrics.wcagLevel} guidelines
            </div>
            <div class="card-progress">
                <div class="progress-fill" style="width: ${metrics.complianceScore}%"></div>
            </div>
        </div>

        <div class="summary-card severity-critical">
            <div class="card-header">
                <h3 class="card-title">Critical Issues</h3>
                <span class="card-icon">🚨</span>
            </div>
            <div class="card-value">${metrics.criticalViolations}</div>
            <div class="card-description">
                Issues that completely block access for users with disabilities
            </div>
        </div>

        <div class="summary-card severity-serious">
            <div class="card-header">
                <h3 class="card-title">Serious Issues</h3>
                <span class="card-icon">⚠️</span>
            </div>
            <div class="card-value">${metrics.seriousViolations}</div>
            <div class="card-description">
                Issues that significantly impact user experience
            </div>
        </div>

        <div class="summary-card severity-moderate">
            <div class="card-header">
                <h3 class="card-title">Moderate Issues</h3>
                <span class="card-icon">⚡</span>
            </div>
            <div class="card-value">${metrics.moderateViolations}</div>
            <div class="card-description">
                Issues that may cause difficulties for some users
            </div>
        </div>

        <div class="summary-card severity-minor">
            <div class="card-header">
                <h3 class="card-title">Minor Issues</h3>
                <span class="card-icon">💡</span>
            </div>
            <div class="card-value">${metrics.minorViolations}</div>
            <div class="card-description">
                Issues with minimal impact on accessibility
            </div>
        </div>

        <div class="summary-card">
            <div class="card-header">
                <h3 class="card-title">Total Violations</h3>
                <span class="card-icon">📋</span>
            </div>
            <div class="card-value">${metrics.totalViolations}</div>
            <div class="card-description">
                All accessibility violations found across tested pages
            </div>
        </div>
    </div>
</section>`;
    }

    private generateQuickActions(): string {
        return `
<section class="quick-actions">
    <button class="action-button" onclick="exportReport('pdf')">
        <span>📄</span> Export PDF
    </button>
    <button class="action-button secondary" onclick="exportReport('json')">
        <span>📊</span> Export Data
    </button>
    <button class="action-button secondary" onclick="toggleTheme()">
        <span>🌙</span> Toggle Theme
    </button>
    <button class="action-button secondary" onclick="printReport()">
        <span>🖨️</span> Print Report
    </button>
    <button class="action-button secondary" onclick="showHelp()">
        <span>❓</span> Help Guide
    </button>
</section>`;
    }

    private generateFilters(): string {
        return `
<section class="filters-section">
    <div class="filters-grid">
        <div class="filter-group">
            <label class="filter-label" for="severity-filter">Filter by Severity</label>
            <select id="severity-filter" class="filter-control" onchange="filterBySeverity(this.value)">
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="serious">Serious</option>
                <option value="moderate">Moderate</option>
                <option value="minor">Minor</option>
            </select>
        </div>
        <div class="filter-group">
            <label class="filter-label" for="category-filter">Filter by Category</label>
            <select id="category-filter" class="filter-control" onchange="filterByCategory(this.value)">
                <option value="">All Categories</option>
                <option value="perceivable">Perceivable</option>
                <option value="operable">Operable</option>
                <option value="understandable">Understandable</option>
                <option value="robust">Robust</option>
            </select>
        </div>
        <div class="filter-group">
            <label class="filter-label" for="search-filter">Search Violations</label>
            <input type="text" id="search-filter" class="filter-control" placeholder="Search..." oninput="searchViolations(this.value)">
        </div>
        <div class="filter-group">
            <label class="filter-label" for="show-resolved">Show Status</label>
            <select id="show-resolved" class="filter-control" onchange="filterByStatus(this.value)">
                <option value="">All Issues</option>
                <option value="unresolved">Unresolved Only</option>
                <option value="resolved">Resolved Only</option>
            </select>
        </div>
    </div>
</section>`;
    }

    private generateViolationsSection(testResults: AccessibilityTestResult[]): string {
        const allViolations = testResults.flatMap(result => 
            result.violations.map((violation: AccessibilityViolation) => ({
                ...violation,
                url: result.url,
                testName: result.testName
            }))
        );

        if (allViolations.length === 0) {
            return `
<section class="violations-section">
    <h2 class="section-title">
        <span class="section-icon">✅</span>
        Accessibility Violations
    </h2>
    <div class="summary-card compliance-score">
        <div class="card-header">
            <h3 class="card-title">Congratulations!</h3>
            <span class="card-icon">🎉</span>
        </div>
        <div class="card-description" style="font-size: 1.125rem; margin-top: 1rem;">
            No accessibility violations were found. Your application meets the tested WCAG guidelines.
        </div>
    </div>
</section>`;
        }

        const violationCards = allViolations.map(violation => this.generateViolationCard(violation)).join('');

        return `
<section class="violations-section">
    <h2 class="section-title">
        <span class="section-icon">🔍</span>
        Accessibility Violations (${allViolations.length})
    </h2>
    <div class="violations-grid" id="violations-container">
        ${violationCards}
    </div>
</section>`;
    }

    private generateViolationCard(violation: any): string {
        const rule = this.wcagDatabase.getRule(violation.id);
        const severity = rule?.impact || 'Minor';
        const severityClass = severity.toLowerCase();
        
        return `
<div class="violation-card" data-severity="${severityClass}" data-category="${rule?.principle.toLowerCase() || ''}" data-id="${violation.id}">
    <div class="violation-header">
        <div style="flex: 1;">
            <h3 class="violation-title">${rule?.title || violation.id}</h3>
            <div class="violation-meta">
                <span class="violation-badge badge-${severityClass}">${severity}</span>
                <span class="violation-badge" style="background: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2);">
                    ${rule?.level || 'AA'}
                </span>
                <span class="violation-badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2);">
                    ${rule?.principle || 'General'}
                </span>
            </div>
            <p class="violation-description">
                ${rule?.explanation || violation.description || 'No detailed explanation available.'}
            </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span style="font-size: 0.875rem; color: var(--text-muted);">
                ${violation.nodes?.length || 0} element(s) affected
            </span>
            <span style="font-size: 0.875rem; color: var(--text-muted);">
                Page: ${violation.testName || 'Unknown'}
            </span>
        </div>
    </div>

    <div class="violation-content">
        ${rule ? this.generateRuleDetails(rule, violation) : ''}
        ${this.generateAffectedElements(violation)}
    </div>
</div>`;
    }

    private generateRuleDetails(rule: WCAGRule, violation: any): string {
        return `
<div class="expandable-section">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">📋 Detailed Information</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">User Impact</h4>
            <p style="color: var(--text-secondary);">${rule.userImpact}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">WCAG Reference</h4>
            <p style="color: var(--text-secondary);">${rule.guideline}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Common Mistakes</h4>
            <ul style="margin-left: 1.5rem; color: var(--text-secondary);">
                ${rule.commonMistakes.map(mistake => `<li style="margin-bottom: 0.25rem;">${mistake}</li>`).join('')}
            </ul>
        </div>
    </div>
</div>

<div class="expandable-section">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">🔧 How to Fix</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        <ol style="margin-left: 1.5rem; color: var(--text-secondary);">
            ${rule.remediationSteps.map(step => `<li style="margin-bottom: 0.5rem;">${step}</li>`).join('')}
        </ol>
    </div>
</div>

${rule.codeExamples.length > 0 ? `
<div class="expandable-section">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">💻 Code Examples</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        <div class="code-examples">
            ${rule.codeExamples.map(example => `
                <div class="code-example code-bad">
                    <div class="code-example-header">❌ Incorrect Implementation</div>
                    <div class="code-example-content"><pre><code>${this.escapeHtml(example.bad)}</code></pre></div>
                </div>
                <div class="code-example code-good">
                    <div class="code-example-header">✅ Correct Implementation</div>
                    <div class="code-example-content"><pre><code>${this.escapeHtml(example.good)}</code></pre></div>
                </div>
                <p style="margin: 1rem 0; color: var(--text-secondary); font-style: italic;">
                    ${example.description}
                </p>
            `).join('')}
        </div>
    </div>
</div>
` : ''}

<div class="expandable-section">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">🧪 Testing Methods</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        <ul style="margin-left: 1.5rem; color: var(--text-secondary);">
            ${rule.testingMethods.map(method => `<li style="margin-bottom: 0.25rem;">${method}</li>`).join('')}
        </ul>
    </div>
</div>

<div class="expandable-section">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">📚 Additional Resources</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        <ul style="margin-left: 1.5rem; color: var(--text-secondary);">
            ${rule.resources.map(resource => `<li style="margin-bottom: 0.25rem;">${resource}</li>`).join('')}
        </ul>
    </div>
</div>`;
    }

    private generateAffectedElements(violation: any): string {
        if (!violation.nodes || violation.nodes.length === 0) {
            return '';
        }

        return `
<div class="expandable-section expanded">
    <div class="section-header" onclick="toggleSection(this)">
        <span class="section-header-title">🎯 Affected Elements (${violation.nodes.length})</span>
        <span class="expand-icon">▼</span>
    </div>
    <div class="section-content">
        ${violation.nodes.map((node: any, index: number) => `
            <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--error-color);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <strong style="color: var(--text-primary);">Element ${index + 1}</strong>
                    <span style="font-size: 0.875rem; color: var(--text-muted);">
                        ${node.impact || 'Unknown impact'}
                    </span>
                </div>
                <div style="font-family: monospace; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                    ${this.escapeHtml(node.html || 'HTML not available')}
                </div>
                ${node.target ? `
                    <div style="font-size: 0.875rem; color: var(--text-muted);">
                        <strong>Selector:</strong> ${this.getTargetSelector(node.target)}
                    </div>
                ` : ''}
                ${node.failureSummary ? `
                    <div style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <strong>Details:</strong> ${node.failureSummary}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
</div>`;
    }

    private generateTestResultsSection(testResults: AccessibilityTestResult[]): string {
        return `
<section class="violations-section">
    <h2 class="section-title">
        <span class="section-icon">📝</span>
        Test Results Summary
    </h2>
    <div class="violations-grid">
        ${testResults.map(result => `
            <div class="violation-card">
                <div class="violation-header">
                    <div style="flex: 1;">
                        <h3 class="violation-title">${result.testName}</h3>
                        <div class="violation-meta">
                            <span class="violation-badge ${result.violations.length === 0 ? 'badge-success' : 'badge-serious'}" style="${result.violations.length === 0 ? 'background: rgba(22, 163, 74, 0.1); color: var(--success-color); border: 1px solid rgba(22, 163, 74, 0.2);' : ''}">
                                ${result.violations.length === 0 ? 'PASSED' : 'FAILED'}
                            </span>
                            <span class="violation-badge" style="background: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2);">
                                ${result.violations.length} issues
                            </span>
                        </div>
                        <p class="violation-description">
                            URL: ${result.url}
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: ${result.violations.length === 0 ? 'var(--success-color)' : 'var(--error-color)'};">
                            ${result.violations.length === 0 ? '✅' : '❌'}
                        </div>
                    </div>
                </div>
                ${result.violations.length > 0 ? `
                    <div class="violation-content">
                        <div style="display: grid; gap: 0.5rem;">
                            ${result.violations.map((violation: AccessibilityViolation) => `
                                <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px; font-size: 0.875rem;">
                                    <strong>${violation.id}</strong>: ${violation.description}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
</section>`;
    }

    private generateFooter(): string {
        return `
<footer style="margin-top: 3rem; padding: 2rem; text-align: center; color: var(--text-muted); border-top: 1px solid var(--border-color);">
    <p>Generated by Enhanced Accessibility Reporter • WCAG 2.1/2.2 Compliance Assessment</p>
    <p style="margin-top: 0.5rem; font-size: 0.875rem;">
        This report provides guidance based on WCAG guidelines. Regular testing and manual review are recommended.
    </p>
</footer>`;
    }

    private generateJavaScript(): string {
        return `
// Theme management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    body.className = body.className.replace(/theme-\\w+/, 'theme-' + newTheme);
    localStorage.setItem('accessibility-report-theme', newTheme);
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('accessibility-report-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        document.body.className = document.body.className.replace(/theme-\\w+/, 'theme-' + savedTheme);
    }
    
    // Animate cards on load
    const cards = document.querySelectorAll('.summary-card, .violation-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// Section expansion
function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector('.section-content');
    const icon = header.querySelector('.expand-icon');
    
    section.classList.toggle('expanded');
}

// Filtering functions
function filterBySeverity(severity) {
    const cards = document.querySelectorAll('.violation-card');
    cards.forEach(card => {
        if (!severity || card.getAttribute('data-severity') === severity) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    const cards = document.querySelectorAll('.violation-card');
    cards.forEach(card => {
        if (!category || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchViolations(query) {
    const cards = document.querySelectorAll('.violation-card');
    const lowercaseQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.violation-title').textContent.toLowerCase();
        const description = card.querySelector('.violation-description').textContent.toLowerCase();
        
        if (!query || title.includes(lowercaseQuery) || description.includes(lowercaseQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByStatus(status) {
    // This would be implemented with actual status tracking
    console.log('Filtering by status:', status);
}

// Export functions
function exportReport(format) {
    if (format === 'pdf') {
        window.print();
    } else if (format === 'json') {
        // This would export the data as JSON
        console.log('Exporting as JSON...');
    }
}

function printReport() {
    window.print();
}

function showHelp() {
    alert('This accessibility report provides detailed information about WCAG compliance issues found on your website. Use the filters to focus on specific types of issues, and expand sections to see detailed remediation guidance.');
}

// Progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or reset filters
        document.getElementById('severity-filter').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('search-filter').value = '';
        filterBySeverity('');
        filterByCategory('');
        searchViolations('');
    }
});
`;
    }

    private generatePrintableHTML(
        report: AccessibilityReport,
        testResults: AccessibilityTestResult[],
        metrics: ReportMetrics
    ): string {
        // Generate a simplified version optimized for printing
        return this.generateHTML(report, testResults, metrics)
            .replace(/<script>[\s\S]*?<\/script>/g, '')
            .replace(/class="quick-actions"[^>]*>[\s\S]*?<\/section>/g, '')
            .replace(/class="filters-section"[^>]*>[\s\S]*?<\/section>/g, '')
            .replace(/class="section-content"/g, 'class="section-content" style="display: block !important;"');
    }

    private escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    private getComplianceScoreColor(score: number): string {
        if (score >= 90) return 'var(--success-color)';
        if (score >= 70) return 'var(--warning-color)';
        return 'var(--error-color)';
    }

    private getTargetSelector(target: any): string {
        return Array.isArray(target) ? target[0] : target;
    }
}