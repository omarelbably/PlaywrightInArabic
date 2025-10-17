/**
 * Accessibility Types
 * Unified type definitions for the accessibility testing framework
 */

import { AxeResults, Result as AxeResult, NodeResult } from 'axe-core';

// Core accessibility interfaces
export interface AccessibilityViolation {
    id: string;
    impact?: 'minor' | 'moderate' | 'serious' | 'critical' | null;
    tags: string[];
    description: string;
    help: string;
    helpUrl: string;
    nodes: AccessibilityViolationNode[];
}

export interface AccessibilityViolationNode {
    html: string;
    impact?: 'minor' | 'moderate' | 'serious' | 'critical' | null;
    target: string[] | any;
    failureSummary?: string;
    element?: any;
}

export interface AccessibilityTestResult {
    url: string;
    testName: string;
    timestamp: Date;
    violations: AccessibilityViolation[];
    passes: AccessibilityViolation[];
    incomplete: AccessibilityViolation[];
    inapplicable: AccessibilityViolation[];
    axeResults?: AxeResults;
}

export interface AccessibilityReport {
    timestamp: Date;
    totalViolations: number;
    criticalViolations: number;
    seriousViolations: number;
    moderateViolations: number;
    minorViolations: number;
    pagesAnalyzed: number;
    testResults: AccessibilityTestResult[];
    summary: AccessibilitySummary;
    keyboardResults?: KeyboardTestResult;
    contrastResults?: ColorContrastResult;
    focusResults?: FocusManagementResult;
    structureResults?: PageStructureResult;
    ariaResults?: AriaTestResult;
}

export interface AccessibilitySummary {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    complianceScore: number;
    wcagLevel: 'A' | 'AA' | 'AAA';
    principleBreakdown: {
        perceivable: number;
        operable: number;
        understandable: number;
        robust: number;
    };
}

// Specific test result interfaces
export interface KeyboardTestResult {
    tabOrder: TabOrderResult[];
    skipLinks: SkipLinkResult[];
    focusTraps: FocusTrapResult[];
    keyboardShortcuts: KeyboardShortcutResult[];
}

export interface TabOrderResult {
    element: string;
    tabIndex: number;
    isLogical: boolean;
    issues: string[];
}

export interface SkipLinkResult {
    element: string;
    target: string;
    isVisible: boolean;
    isWorking: boolean;
    issues: string[];
}

export interface FocusTrapResult {
    container: string;
    isTrapping: boolean;
    canEscape: boolean;
    issues: string[];
}

export interface KeyboardShortcutResult {
    key: string;
    action: string;
    isWorking: boolean;
    conflicts: string[];
}

export interface ColorContrastResult {
    elements: ColorContrastElement[];
    overallScore: number;
    wcagAACompliance: boolean;
    wcagAAACompliance: boolean;
}

export interface ColorContrastElement {
    selector: string;
    foregroundColor: string;
    backgroundColor: string;
    contrastRatio: number;
    wcagLevel: 'AA' | 'AAA' | 'fail';
    fontSize: number;
    fontWeight: string;
    issues: string[];
}

export interface FocusManagementResult {
    focusIndicators: FocusIndicatorResult[];
    initialFocus: InitialFocusResult[];
    focusOrder: FocusOrderResult[];
}

export interface FocusIndicatorResult {
    element: string;
    hasVisibleIndicator: boolean;
    contrastRatio: number;
    thickness: number;
    issues: string[];
}

export interface InitialFocusResult {
    page: string;
    initialFocusElement: string;
    isAppropriate: boolean;
    issues: string[];
}

export interface FocusOrderResult {
    elements: string[];
    isLogical: boolean;
    issues: string[];
}

export interface PageStructureResult {
    headings: HeadingStructureResult;
    landmarks: LandmarkResult[];
    lists: ListStructureResult[];
    tables: TableStructureResult[];
}

export interface HeadingStructureResult {
    headings: HeadingElement[];
    hasH1: boolean;
    isHierarchical: boolean;
    issues: string[];
}

export interface HeadingElement {
    level: number;
    text: string;
    selector: string;
    isProperlyNested: boolean;
}

export interface LandmarkResult {
    type: string;
    selector: string;
    hasLabel: boolean;
    label: string;
    isUnique: boolean;
    issues: string[];
}

export interface ListStructureResult {
    selector: string;
    type: 'ordered' | 'unordered' | 'description';
    itemCount: number;
    isProperlyStructured: boolean;
    issues: string[];
}

export interface TableStructureResult {
    selector: string;
    hasHeaders: boolean;
    hasCaption: boolean;
    isAccessible: boolean;
    issues: string[];
}

export interface AriaTestResult {
    attributes: AriaAttributeResult[];
    roles: AriaRoleResult[];
    labels: AriaLabelResult[];
    liveRegions: AriaLiveRegionResult[];
}

export interface AriaAttributeResult {
    element: string;
    attribute: string;
    value: string;
    isValid: boolean;
    isAppropriate: boolean;
    issues: string[];
}

export interface AriaRoleResult {
    element: string;
    role: string;
    isValid: boolean;
    hasRequiredAttributes: boolean;
    issues: string[];
}

export interface AriaLabelResult {
    element: string;
    labelType: 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'label';
    labelValue: string;
    isDescriptive: boolean;
    issues: string[];
}

export interface AriaLiveRegionResult {
    element: string;
    politeness: 'off' | 'polite' | 'assertive';
    isWorking: boolean;
    issues: string[];
}

// Configuration interfaces
export interface AccessibilityTestConfig {
    wcagLevel: 'A' | 'AA' | 'AAA';
    includeRules: string[];
    excludeRules: string[];
    testTypes: AccessibilityTestType[];
    outputFormats: OutputFormat[];
    reportingOptions: ReportingOptions;
}

export type AccessibilityTestType = 
    | 'axe-core'
    | 'keyboard-navigation' 
    | 'color-contrast'
    | 'focus-management'
    | 'page-structure'
    | 'aria-compliance';

export type OutputFormat = 'html' | 'json' | 'xml' | 'csv' | 'pdf';

export interface ReportingOptions {
    includeScreenshots: boolean;
    includeCodeExamples: boolean;
    includeRemediationSteps: boolean;
    groupByComponent: boolean;
    showOnlyViolations: boolean;
    theme: 'light' | 'dark' | 'auto';
}

// Utility type for converting axe-core results
export interface AxeResultConverter {
    convertAxeResults(axeResults: AxeResults): AccessibilityTestResult;
    convertAxeViolation(axeViolation: AxeResult): AccessibilityViolation;
    convertAxeNode(axeNode: NodeResult): AccessibilityViolationNode;
}

// Dashboard and metrics interfaces
export interface AccessibilityDashboard {
    overview: DashboardOverview;
    trends: AccessibilityTrend[];
    recommendations: AccessibilityRecommendation[];
    riskAssessment: RiskAssessment;
}

export interface DashboardOverview {
    totalIssues: number;
    criticalIssues: number;
    complianceScore: number;
    trend: 'improving' | 'declining' | 'stable';
    lastScanDate: Date;
}

export interface AccessibilityTrend {
    date: Date;
    violationCount: number;
    complianceScore: number;
    testsConducted: number;
}

export interface AccessibilityRecommendation {
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    estimatedEffort: string;
    impactScore: number;
}

export interface RiskAssessment {
    overallRisk: 'low' | 'medium' | 'high' | 'critical';
    legalRisk: 'low' | 'medium' | 'high';
    userExperienceRisk: 'low' | 'medium' | 'high';
    brandRisk: 'low' | 'medium' | 'high';
    mitigationSteps: string[];
}

// Error and debugging interfaces
export interface AccessibilityTestError {
    code: string;
    message: string;
    stack?: string;
    context: {
        url: string;
        testName: string;
        timestamp: Date;
    };
}

export interface DebugInfo {
    browserInfo: {
        name: string;
        version: string;
        platform: string;
    };
    testEnvironment: {
        nodeVersion: string;
        playwrightVersion: string;
        axeVersion: string;
    };
    pageInfo: {
        url: string;
        title: string;
        loadTime: number;
        elementCount: number;
    };
}

// Export utility functions type
export interface AccessibilityUtils {
    calculateComplianceScore(violations: AccessibilityViolation[], total: number): number;
    categorizeViolationsByPrinciple(violations: AccessibilityViolation[]): Record<string, AccessibilityViolation[]>;
    prioritizeViolations(violations: AccessibilityViolation[]): AccessibilityViolation[];
    generateRecommendations(violations: AccessibilityViolation[]): AccessibilityRecommendation[];
    formatViolationMessage(violation: AccessibilityViolation): string;
}