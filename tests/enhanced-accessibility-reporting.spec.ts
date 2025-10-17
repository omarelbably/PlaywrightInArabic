/**
 * Enhanced Accessibility Reporting Demo
 * Demonstrates the rich HTML reporting capabilities with detailed WCAG analysis
 */

import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { EnhancedAccessibilityHTMLReporter } from './accessibility/EnhancedAccessibilityHTMLReporter';
import { AccessibilityReport, AccessibilityTestResult, AccessibilityViolation } from './accessibility/AccessibilityTypes';
import * as path from 'path';

test.describe('Enhanced Accessibility Reporting', () => {
    let reporter: EnhancedAccessibilityHTMLReporter;
    let testResults: AccessibilityTestResult[] = [];

    test.beforeAll(async () => {
        reporter = new EnhancedAccessibilityHTMLReporter({
            title: 'Comprehensive Accessibility Assessment',
            includeSummary: true,
            includeViolations: true,
            includeRemediation: true,
            includeCodeExamples: true,
            theme: 'auto',
            showOnlyFailures: false,
            groupByCategory: true,
            includeTechnicalDetails: true,
            generatePrintableVersion: true
        });
    });

    test('Comprehensive accessibility scan - Multiple pages', async ({ page }) => {
        const urlsToTest = [
            'https://www.saucedemo.com/',
            'https://the-internet.herokuapp.com/login',
            'https://the-internet.herokuapp.com/tables',
            'https://the-internet.herokuapp.com/javascript_alerts',
            'https://the-internet.herokuapp.com/dynamic_content'
        ];

        for (const url of urlsToTest) {
            await page.goto(url);
            
            // Wait for page to load completely
            await page.waitForLoadState('networkidle');
            
            const axeResults = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
                .analyze();

            const violations: AccessibilityViolation[] = axeResults.violations.map(violation => ({
                id: violation.id,
                impact: violation.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
                tags: violation.tags,
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                nodes: violation.nodes.map(node => ({
                    html: node.html,
                    impact: node.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
                    target: node.target,
                    failureSummary: node.failureSummary
                }))
            }));

            const passes: AccessibilityViolation[] = axeResults.passes.map(pass => ({
                id: pass.id,
                impact: pass.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
                tags: pass.tags,
                description: pass.description,
                help: pass.help,
                helpUrl: pass.helpUrl,
                nodes: pass.nodes.map(node => ({
                    html: node.html,
                    impact: node.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
                    target: node.target,
                    failureSummary: node.failureSummary
                }))
            }));

            const testResult: AccessibilityTestResult = {
                url: url,
                testName: `Accessibility scan - ${new URL(url).hostname}${new URL(url).pathname}`,
                timestamp: new Date(),
                violations: violations,
                passes: passes,
                incomplete: [],
                inapplicable: [],
                axeResults: axeResults
            };

            testResults.push(testResult);

            // Log progress
            console.log(`Scanned ${url}: ${violations.length} violations found`);
        }
    });

    test('Generate enhanced HTML report', async () => {
        const report: AccessibilityReport = {
            timestamp: new Date(),
            totalViolations: testResults.reduce((sum, result) => sum + result.violations.length, 0),
            criticalViolations: testResults.reduce((sum, result) => 
                sum + result.violations.filter(v => v.impact === 'critical').length, 0),
            seriousViolations: testResults.reduce((sum, result) => 
                sum + result.violations.filter(v => v.impact === 'serious').length, 0),
            moderateViolations: testResults.reduce((sum, result) => 
                sum + result.violations.filter(v => v.impact === 'moderate').length, 0),
            minorViolations: testResults.reduce((sum, result) => 
                sum + result.violations.filter(v => v.impact === 'minor').length, 0),
            pagesAnalyzed: testResults.length,
            testResults: testResults,
            summary: {
                totalTests: testResults.length,
                passedTests: testResults.filter(result => result.violations.length === 0).length,
                failedTests: testResults.filter(result => result.violations.length > 0).length,
                complianceScore: 0, // Will be calculated by reporter
                wcagLevel: 'AA',
                principleBreakdown: {
                    perceivable: 0,
                    operable: 0,
                    understandable: 0,
                    robust: 0
                }
            }
        };

        // Calculate compliance score
        const totalTests = testResults.length;
        const passedTests = testResults.filter(result => result.violations.length === 0).length;
        report.summary.complianceScore = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

        // Calculate principle breakdown
        const allViolations = testResults.flatMap(result => result.violations);
        report.summary.principleBreakdown = {
            perceivable: allViolations.filter(v => v.tags.some(tag => tag.includes('cat.color') || tag.includes('cat.images') || tag.includes('cat.multimedia'))).length,
            operable: allViolations.filter(v => v.tags.some(tag => tag.includes('cat.keyboard') || tag.includes('cat.time-and-media'))).length,
            understandable: allViolations.filter(v => v.tags.some(tag => tag.includes('cat.language') || tag.includes('cat.predictable'))).length,
            robust: allViolations.filter(v => v.tags.some(tag => tag.includes('cat.parsing') || tag.includes('cat.compatibility'))).length
        };

        // Generate the enhanced HTML report
        const outputPath = path.join(process.cwd(), 'accessibility-report.html');
        await reporter.generateReport(report, testResults, outputPath);

        // Verify the report was created
        const fs = require('fs');
        expect(fs.existsSync(outputPath)).toBeTruthy();

        console.log('\n🎉 Enhanced Accessibility Report Generated!');
        console.log(`📊 Report Location: ${outputPath}`);
        console.log(`📈 Compliance Score: ${report.summary.complianceScore}%`);
        console.log(`🔍 Total Violations: ${report.totalViolations}`);
        console.log(`🚨 Critical Issues: ${report.criticalViolations}`);
        console.log(`⚠️  Serious Issues: ${report.seriousViolations}`);
        console.log(`⚡ Moderate Issues: ${report.moderateViolations}`);
        console.log(`💡 Minor Issues: ${report.minorViolations}`);
        console.log(`📄 Pages Analyzed: ${report.pagesAnalyzed}`);
        
        if (report.summary.complianceScore < 100) {
            console.log('\n📋 Next Steps:');
            console.log('1. Open the HTML report in your browser');
            console.log('2. Review violations by severity (Critical → Serious → Moderate → Minor)');
            console.log('3. Use the interactive filters to focus on specific issues');
            console.log('4. Follow the detailed remediation steps for each violation');
            console.log('5. Implement fixes and re-run the tests');
        } else {
            console.log('\n✅ Congratulations! Your application meets all tested accessibility requirements.');
        }
    });

    test('Test specific accessibility issues for demonstration', async ({ page }) => {
        // Create a test page with intentional accessibility violations for demonstration
        const testPageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Accessibility Test Page</title>
            <style>
                .low-contrast { color: #999; background: #fff; }
                .very-low-contrast { color: #ccc; background: #fff; }
                .missing-focus { outline: none; }
                .small-text { font-size: 10px; }
            </style>
        </head>
        <body>
            <h1>Accessibility Test Page</h1>
            
            <!-- Missing alt text -->
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwZiIvPgo8L3N2Zz4K">
            
            <!-- Low contrast text -->
            <p class="low-contrast">This text has low contrast and may be hard to read.</p>
            <p class="very-low-contrast small-text">This text has very low contrast and is small.</p>
            
            <!-- Missing form labels -->
            <form>
                <input type="text" placeholder="Enter your name">
                <input type="email" placeholder="Enter your email">
                <button type="submit">Submit</button>
            </form>
            
            <!-- Improper heading structure -->
            <h3>This is a level 3 heading without h2</h3>
            <h5>This is a level 5 heading</h5>
            
            <!-- Missing focus indicators -->
            <button class="missing-focus">Button without focus indicator</button>
            
            <!-- Empty links -->
            <a href="#"></a>
            
            <!-- Table without headers -->
            <table>
                <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>City</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>25</td>
                    <td>New York</td>
                </tr>
            </table>
            
            <!-- Interactive element that's not keyboard accessible -->
            <div onclick="alert('Clicked!')">Click me (not keyboard accessible)</div>
        </body>
        </html>
        `;

        await page.setContent(testPageContent);
        
        const axeResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();

        const violations: AccessibilityViolation[] = axeResults.violations.map(violation => ({
            id: violation.id,
            impact: violation.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
            tags: violation.tags,
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            nodes: violation.nodes.map(node => ({
                html: node.html,
                impact: node.impact as 'minor' | 'moderate' | 'serious' | 'critical' | null,
                target: node.target,
                failureSummary: node.failureSummary
            }))
        }));

        const testResult: AccessibilityTestResult = {
            url: 'test://demonstration-page',
            testName: 'Accessibility Demonstration Page',
            timestamp: new Date(),
            violations: violations,
            passes: [],
            incomplete: [],
            inapplicable: []
        };

        // Generate a focused report for this demonstration
        const demoReport: AccessibilityReport = {
            timestamp: new Date(),
            totalViolations: violations.length,
            criticalViolations: violations.filter(v => v.impact === 'critical').length,
            seriousViolations: violations.filter(v => v.impact === 'serious').length,
            moderateViolations: violations.filter(v => v.impact === 'moderate').length,
            minorViolations: violations.filter(v => v.impact === 'minor').length,
            pagesAnalyzed: 1,
            testResults: [testResult],
            summary: {
                totalTests: 1,
                passedTests: 0,
                failedTests: 1,
                complianceScore: 0,
                wcagLevel: 'AA',
                principleBreakdown: {
                    perceivable: violations.filter(v => v.tags.some(tag => tag.includes('cat.color') || tag.includes('cat.images'))).length,
                    operable: violations.filter(v => v.tags.some(tag => tag.includes('cat.keyboard'))).length,
                    understandable: violations.filter(v => v.tags.some(tag => tag.includes('cat.language'))).length,
                    robust: violations.filter(v => v.tags.some(tag => tag.includes('cat.parsing'))).length
                }
            }
        };

        const demoOutputPath = path.join(process.cwd(), 'accessibility-demo-report.html');
        await reporter.generateReport(demoReport, [testResult], demoOutputPath);

        console.log(`\n🔍 Demonstration Report Generated: ${demoOutputPath}`);
        console.log(`Found ${violations.length} accessibility violations for demonstration purposes.`);

        // The test should show violations exist (this is expected for demo purposes)
        expect(violations.length).toBeGreaterThan(0);
    });
});